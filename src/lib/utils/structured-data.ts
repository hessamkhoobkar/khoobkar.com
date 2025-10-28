import type { ContentItem } from '$lib/data/content';

/**
 * Site configuration for structured data
 */
export const siteConfig = {
	name: 'Khoobkar',
	url: 'https://khoobkar.com',
	logo: 'https://khoobkar.com/lib/assets/logo.png',
	author: {
		name: 'Hessam Khoobkar',
		url: 'https://khoobkar.com'
	},
	language: 'en-US'
};

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
	return {
		'@type': 'Organization',
		name: siteConfig.name,
		url: siteConfig.url,
		logo: {
			'@type': 'ImageObject',
			url: siteConfig.logo
		}
	};
}

/**
 * Generate Person schema for author
 */
export function generateAuthorSchema(authorName?: string) {
	return {
		'@type': 'Person',
		name: authorName || siteConfig.author.name,
		url: siteConfig.url
	};
}

/**
 * Normalize image URL to absolute URL
 */
export function normalizeImageUrl(imageUrl?: string, defaultImage?: string): string {
	if (!imageUrl) {
		return defaultImage || `${siteConfig.url}/images/default-og.jpg`;
	}

	if (imageUrl.startsWith('http')) {
		return imageUrl;
	}

	return `${siteConfig.url}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
}

/**
 * Generate BlogPosting schema for individual blog post
 */
export function generateBlogPostingSchema(post: ContentItem, baseUrl: string = '/insights') {
	const articleUrl = `${siteConfig.url}${baseUrl}/${post.meta.slug}`;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.meta.title,
		description: post.meta.description,
		image: normalizeImageUrl(post.meta.image),
		datePublished: post.meta.date,
		dateModified: post.meta.date, // TODO: Add modified date to content meta
		author: generateAuthorSchema(post.meta.author),
		publisher: generateOrganizationSchema(),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl
		},
		keywords: post.meta.tags?.join(', ') || '',
		articleSection: post.meta.tags?.[0] || 'General',
		wordCount: post.content ? post.content.split(/\s+/).length : 0,
		timeRequired: post.meta.readingTime ? `PT${post.meta.readingTime}M` : undefined,
		inLanguage: siteConfig.language,
		url: articleUrl
	};
}

/**
 * Generate Blog schema for blog listing page
 */
export function generateBlogSchema(
	posts: ContentItem[],
	pageUrl: string,
	title: string,
	description: string,
	maxPosts: number = 10
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: title,
		description: description,
		url: pageUrl,
		author: generateAuthorSchema(),
		publisher: generateOrganizationSchema(),
		blogPost: posts.slice(0, maxPosts).map((post) => ({
			'@type': 'BlogPosting',
			headline: post.meta.title,
			description: post.meta.description,
			image: normalizeImageUrl(post.meta.image),
			datePublished: post.meta.date,
			author: generateAuthorSchema(post.meta.author),
			url: `${siteConfig.url}/insights/${post.meta.slug}`
		})),
		inLanguage: siteConfig.language
	};
}

/**
 * Generate Article schema (for case studies, resources, etc.)
 */
export function generateArticleSchema(content: ContentItem, baseUrl: string) {
	const articleUrl = `${siteConfig.url}${baseUrl}/${content.meta.slug}`;

	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: content.meta.title,
		description: content.meta.description,
		image: normalizeImageUrl(content.meta.image),
		datePublished: content.meta.date,
		dateModified: content.meta.date,
		author: generateAuthorSchema(content.meta.author),
		publisher: generateOrganizationSchema(),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl
		},
		keywords: content.meta.tags?.join(', ') || '',
		wordCount: content.content ? content.content.split(/\s+/).length : 0,
		inLanguage: siteConfig.language,
		url: articleUrl
	};
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`
		}))
	};
}

/**
 * Generate WebSite schema for homepage
 */
export function generateWebSiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteConfig.name,
		url: siteConfig.url,
		author: generateAuthorSchema(),
		publisher: generateOrganizationSchema(),
		inLanguage: siteConfig.language,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}
