import type { ContentItem, ContentMeta, ContentCollection } from '$lib/data/content';
import { contentConfig } from '$lib/data/content';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Type for mdsvex module exports
interface MdsvexModule {
	metadata?: ContentMeta;
	default?: unknown;
}

// Configure marked with syntax highlighting using extensions
marked.use({
	breaks: true,
	gfm: true,
	sanitize: false,
	escapeHtml: true,
	renderer: {
		code({ text, lang }: { text: string; lang?: string }): string {
			const language = lang || 'plaintext';

			if (language && hljs.getLanguage(language)) {
				try {
					const highlighted = hljs.highlight(text, { language }).value;
					return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
				} catch (err) {
					console.error('Highlight.js error:', err);
				}
			}

			// Escape HTML for plain code
			const escaped = text
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;');

			return `<pre><code>${escaped}</code></pre>`;
		}
	}
});

// Markdown to HTML converter using marked
function markdownToHtml(markdown: string): string {
	// Remove frontmatter
	let withoutFrontmatter = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

	// Remove the first H1 if it exists (since we display title separately)
	withoutFrontmatter = withoutFrontmatter.replace(/^# .*$/m, '').trim();

	// Escape standalone < and > characters that aren't part of HTML tags
	// Handle patterns like "< 2 seconds", "< 200ms", etc.
	withoutFrontmatter = withoutFrontmatter.replace(/<(\s*\d)/g, '&lt;$1');
	withoutFrontmatter = withoutFrontmatter.replace(/(\d\s*)>/g, '$1&gt;');

	// Convert markdown to HTML using marked
	const html = marked.parse(withoutFrontmatter, { async: false }) as string;

	return html;
}

/**
 * Load all markdown files from a specific directory
 */
export async function loadContent(category: string): Promise<ContentItem[]> {
	const modules = import.meta.glob('../../content/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const items: ContentItem[] = [];

	for (const [path, rawContent] of Object.entries(modules)) {
		const pathParts = path.split('/');
		const pathCategory = pathParts[pathParts.length - 2];

		if (pathCategory !== category) continue;

		const slug = path.split('/').pop()?.replace('.md', '') || '';
		const markdownContent = rawContent as string;

		// Parse frontmatter manually
		const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n/);
		if (!frontmatterMatch) continue;

		const frontmatter = frontmatterMatch[1];
		const metadata: ContentMeta = {
			title: '',
			description: '',
			date: '',
			slug,
			category: pathCategory as ContentMeta['category']
		};

		// Parse frontmatter fields
		frontmatter.split('\n').forEach((line) => {
			const [key, ...valueParts] = line.split(':');
			if (key && valueParts.length > 0) {
				const value = valueParts
					.join(':')
					.trim()
					.replace(/^['"]|['"]$/g, '');
				const cleanKey = key.trim();

				if (cleanKey === 'title') metadata.title = value;
				else if (cleanKey === 'description') metadata.description = value;
				else if (cleanKey === 'date') metadata.date = value;
				else if (cleanKey === 'author') metadata.author = value;
				else if (cleanKey === 'featured') metadata.featured = value === 'true';
				else if (cleanKey === 'published') metadata.published = value === 'true';
				else if (cleanKey === 'readingTime') metadata.readingTime = parseInt(value);
				else if (cleanKey === 'image') metadata.image = value;
				else if (cleanKey === 'tags') {
					// Parse tags array
					const tagsMatch = value.match(/\[(.*?)\]/);
					if (tagsMatch) {
						metadata.tags = tagsMatch[1].split(',').map((tag) => tag.trim().replace(/['"]/g, ''));
					}
				}
			}
		});

		const content = markdownToHtml(markdownContent);

		items.push({
			meta: metadata,
			content,
			path
		});
	}

	// Sort by date (newest first)
	return items.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

/**
 * Load a single content item by category and slug
 */
export async function loadContentItem(category: string, slug: string): Promise<ContentItem | null> {
	const rawModules = import.meta.glob('../../content/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	for (const [path, rawContent] of Object.entries(rawModules)) {
		const pathParts = path.split('/');
		const pathCategory = pathParts[pathParts.length - 2];
		const pathSlug = pathParts[pathParts.length - 1].replace('.md', '');

		if (pathCategory === category && pathSlug === slug) {
			const markdownContent = rawContent as string;

			// Parse frontmatter manually
			const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n/);
			if (!frontmatterMatch) continue;

			const frontmatter = frontmatterMatch[1];
			const metadata: ContentMeta = {
				title: '',
				description: '',
				date: '',
				slug,
				category: category as ContentMeta['category']
			};

			// Parse frontmatter fields
			frontmatter.split('\n').forEach((line) => {
				const [key, ...valueParts] = line.split(':');
				if (key && valueParts.length > 0) {
					const value = valueParts
						.join(':')
						.trim()
						.replace(/^['"]|['"]$/g, '');
					const cleanKey = key.trim();

					if (cleanKey === 'title') metadata.title = value;
					else if (cleanKey === 'description') metadata.description = value;
					else if (cleanKey === 'date') metadata.date = value;
					else if (cleanKey === 'author') metadata.author = value;
					else if (cleanKey === 'featured') metadata.featured = value === 'true';
					else if (cleanKey === 'published') metadata.published = value === 'true';
					else if (cleanKey === 'readingTime') metadata.readingTime = parseInt(value);
					else if (cleanKey === 'image') metadata.image = value;
					else if (cleanKey === 'tags') {
						// Parse tags array
						const tagsMatch = value.match(/\[(.*?)\]/);
						if (tagsMatch) {
							metadata.tags = tagsMatch[1].split(',').map((tag) => tag.trim().replace(/['"]/g, ''));
						}
					}
				}
			});

			const content = markdownToHtml(markdownContent);

			return {
				meta: metadata,
				content,
				path
			};
		}
	}

	return null;
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
		const content = item.content?.toLowerCase() || '';

		return (
			title.includes(searchQuery) ||
			description.includes(searchQuery) ||
			tags.includes(searchQuery) ||
			content.includes(searchQuery)
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
 */
export function generateExcerpt(
	content: string,
	length: number = contentConfig.excerptLength
): string {
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
