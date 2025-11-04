import type { ContentItem, ContentMeta, ContentCollection } from '$lib/data/content';
import { contentConfig } from '$lib/data/content';
import type { Component } from 'svelte';

// Type for mdsvex module exports
// mdsvex exports frontmatter as individual named exports
interface MdsvexModule {
	metadata?: ContentMeta;
	title?: string;
	description?: string;
	date?: string;
	author?: string;
	tags?: string[];
	featured?: boolean;
	published?: boolean;
	slug?: string;
	category?: string;
	readingTime?: number;
	image?: string;
	layout?: string;
	default: Component;
	[key: string]: any; // Allow any other exports
}

/**
 * Load all markdown files from a specific directory
 */
export async function loadContent(category: string): Promise<ContentItem[]> {
	const modules = import.meta.glob('../../content/**/*.md', {
		eager: true
	}) as Record<string, MdsvexModule>;

	const items: ContentItem[] = [];

	for (const [path, module] of Object.entries(modules)) {
		// Normalize path separators (handle both / and \ for Windows)
		const normalizedPath = path.replace(/\\/g, '/');
		const pathParts = normalizedPath.split('/');
		const pathCategory = pathParts[pathParts.length - 2];

		// Map category names
		let normalizedCategory = pathCategory;
		if (pathCategory === 'case-studies') normalizedCategory = 'work';
		if (pathCategory === 'insights') normalizedCategory = 'insight';

		if (normalizedCategory !== category) continue;

		const slug = pathParts[pathParts.length - 1].replace('.md', '') || '';
		
		// mdsvex exports frontmatter as individual named exports
		// Prefer individual exports over metadata object
		const metadata = {
			title: (module as any).title,
			description: (module as any).description,
			date: (module as any).date,
			author: (module as any).author,
			tags: (module as any).tags,
			featured: (module as any).featured,
			published: (module as any).published,
			slug: (module as any).slug,
			category: (module as any).category,
			readingTime: (module as any).readingTime,
			image: (module as any).image,
			// Fallback to metadata object if individual exports don't exist
			...(Object.keys((module as any).metadata || {}).length > 0 ? (module as any).metadata : {})
		};

		if (!metadata || !metadata.title) continue;

		// Ensure metadata has required fields
		const fullMetadata: ContentMeta = {
			title: metadata.title || '',
			description: metadata.description || '',
			date: metadata.date || '',
			author: metadata.author,
			tags: metadata.tags,
			featured: metadata.featured,
			published: metadata.published !== false,
			slug: metadata.slug || slug,
			category: (normalizedCategory as ContentMeta['category']) || metadata.category || normalizedCategory,
			readingTime: metadata.readingTime,
			image: metadata.image
		};

		items.push({
			meta: fullMetadata,
			path,
			component: module.default
		});
	}

	// Sort by date (newest first)
	return items.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

/**
 * Load a single content item by category and slug
 */
export async function loadContentItem(category: string, slug: string): Promise<ContentItem | null> {
	// Reuse loadContent to ensure consistent logic
	const items = await loadContent(category);
	
	// Find the item matching the slug (check both path slug and metadata slug)
	const item = items.find((item) => {
		const pathParts = item.path?.replace(/\\/g, '/').split('/') || [];
		const pathSlug = pathParts[pathParts.length - 1]?.replace('.md', '') || '';
		const metadataSlug = item.meta.slug;
		
		// Match by either path slug or metadata slug
		return pathSlug === slug || metadataSlug === slug;
	});

	return item || null;
}

/**
 * Get all published content items
 */
export async function getAllPublishedContent(): Promise<ContentItem[]> {
	const categories = ['work', 'projects', 'insight'];
	const allContent: ContentItem[] = [];

	for (const category of categories) {
		const items = await loadContent(category);
		allContent.push(...items.filter((item) => item.meta.published !== false));
	}

	return allContent.sort(
		(a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
	);
}

/**
 * Get featured content items
 */
export async function getFeaturedContent(): Promise<ContentItem[]> {
	const allContent = await getAllPublishedContent();
	return allContent
		.filter((item) => item.meta.featured === true)
		.slice(0, contentConfig.featuredPostsLimit);
}

/**
 * Get content by category with pagination
 */
export async function getContentByCategory(
	category: string,
	page: number = 1,
	limit: number = contentConfig.postsPerPage
): Promise<ContentCollection> {
	const items = await loadContent(category);
	const publishedItems = items.filter((item) => item.meta.published !== false);

	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const paginatedItems = publishedItems.slice(startIndex, endIndex);

	const tags = [...new Set(publishedItems.flatMap((item) => item.meta.tags || []))];
	const categories = [...new Set(publishedItems.map((item) => item.meta.category))];

	return {
		items: paginatedItems,
		total: publishedItems.length,
		categories,
		tags
	};
}

/**
 * Get related content based on tags
 */
export async function getRelatedContent(
	currentItem: ContentItem,
	limit: number = contentConfig.relatedPostsLimit
): Promise<ContentItem[]> {
	const allContent = await getAllPublishedContent();
	const currentTags = currentItem.meta.tags || [];

	if (currentTags.length === 0) {
		return allContent.filter((item) => item.meta.slug !== currentItem.meta.slug).slice(0, limit);
	}

	// Score items based on tag overlap
	const scoredItems = allContent
		.filter((item) => item.meta.slug !== currentItem.meta.slug)
		.map((item) => {
			const itemTags = item.meta.tags || [];
			const commonTags = itemTags.filter((tag) => currentTags.includes(tag));
			return {
				item,
				score: commonTags.length
			};
		})
		.filter((scored) => scored.score > 0)
		.sort((a, b) => b.score - a.score);

	return scoredItems.slice(0, limit).map((scored) => scored.item);
}

/**
 * Search content by query
 */
export async function searchContent(query: string): Promise<ContentItem[]> {
	const allContent = await getAllPublishedContent();
	const searchQuery = query.toLowerCase();

	return allContent.filter((item) => {
		const title = item.meta.title.toLowerCase();
		const description = item.meta.description.toLowerCase();
		const tags = (item.meta.tags || []).join(' ').toLowerCase();

		return (
			title.includes(searchQuery) ||
			description.includes(searchQuery) ||
			tags.includes(searchQuery)
		);
	});
}

/**
 * Generate reading time estimate
 */
export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate excerpt from content
 * Note: With mdsvex, we can't easily extract text from components.
 * This function is kept for backward compatibility but may need refactoring.
 */
export function generateExcerpt(
	content: string | undefined,
	length: number = contentConfig.excerptLength
): string {
	if (!content) return '';

	// Remove markdown syntax and HTML tags
	const plainText = content
		.replace(/[#*`_~[\]]/g, '')
		.replace(/<[^>]*>/g, '')
		.trim();

	if (plainText.length <= length) {
		return plainText;
	}

	return plainText.substring(0, length).trim() + '...';
}
