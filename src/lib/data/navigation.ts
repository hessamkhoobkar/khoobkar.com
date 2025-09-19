export interface NavigationItem {
	href: string;
	label: string;
	external?: boolean;
	description?: string;
}

export const mainNavigation: NavigationItem[] = [
	{ href: '/', label: 'Overview', description: 'Home page overview' },
	{ href: '/work', label: 'Work', description: 'Portfolio and projects' },
	{ href: '/insights', label: 'Insights', description: 'Blog posts and articles' },
	{ href: '/resources', label: 'Resources', description: 'Useful resources and tools' },
	{ href: '/about', label: 'About', description: 'About us and our story' },
	{ href: '/now', label: 'Now', description: "What we're currently working on" }
];

export const footerNavigation: NavigationItem[] = [
	{ href: '/privacy', label: 'Privacy Policy' },
	{ href: '/terms', label: 'Terms of Service' },
	{ href: '/contact', label: 'Contact' }
];

export const socialLinks: NavigationItem[] = [
	{ href: 'https://twitter.com/khoobkar', label: 'Twitter', external: true },
	{ href: 'https://linkedin.com/company/khoobkar', label: 'LinkedIn', external: true },
	{ href: 'https://github.com/khoobkar', label: 'GitHub', external: true }
];
