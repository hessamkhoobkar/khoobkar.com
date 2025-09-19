export interface ContentMeta {
	title: string;
	description: string;
	date: string;
	author?: string;
	tags?: string[];
	featured?: boolean;
	published?: boolean;
	slug: string;
	category: 'blog' | 'case-study' | 'resource' | 'work';
	readingTime?: number;
	image?: string;
}

export interface ContentItem {
	meta: ContentMeta;
	content?: string;
	path?: string;
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
	blog: {
		title: 'Blog Posts',
		description: 'Insights, thoughts, and updates from our team',
		path: '/insights',
		icon: '📝'
	},
	'case-study': {
		title: 'Case Studies',
		description: 'Detailed analysis of our projects and their outcomes',
		path: '/work/case-studies',
		icon: '📊'
	},
	resource: {
		title: 'Resources',
		description: 'Useful tools, guides, and resources for developers',
		path: '/resources',
		icon: '🛠️'
	},
	work: {
		title: 'Work',
		description: 'Our portfolio and project showcases',
		path: '/work',
		icon: '💼'
	}
};
