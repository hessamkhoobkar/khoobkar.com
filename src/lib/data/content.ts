import type { Component } from 'svelte';

export interface ContentMeta {
	title: string;
	description: string;
	date: string;
	author?: string;
	tags?: string[];
	featured?: boolean;
	published?: boolean;
	slug: string;
	category: 'work' | 'projects' | 'insight';
	readingTime?: number;
	image?: string;
}

export interface ContentItem {
	meta: ContentMeta;
	path?: string;
	component: Component; // mdsvex component
}

export interface ContentCollection {
	items: ContentItem[];
	total: number;
	categories: string[];
	tags: string[];
}

// Content configuration
export const contentConfig = {
	postsPerPage: 10,
	excerptLength: 160,
	dateFormat: 'MMMM dd, yyyy',
	defaultAuthor: 'Khoobkar Team',
	featuredPostsLimit: 3,
	relatedPostsLimit: 4
};

// Content categories configuration
export const contentCategories = {
	work: {
		title: 'Previous Work',
		description: 'Client projects and freelance work showcase',
		path: '/work',
		icon: '💼'
	},
	projects: {
		title: 'Projects',
		description: 'SaaS applications, experiments, and complex components',
		path: '/projects',
		icon: '🚀'
	},
	insight: {
		title: 'Strategic Insights',
		description: 'Business impact and technology strategy for leaders',
		path: '/insights',
		icon: '💡'
	}
};
