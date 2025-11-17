import { House, Briefcase, Rocket, Lightbulb, User, Mail } from '@lucide/svelte';

export interface NavigationItem {
	href: string;
	label: string;
	icon?: string;
	external?: boolean;
	description?: string;
}

export const mainNavigation: NavigationItem[] = [
	{ href: '/', label: 'Home', icon: 'home', description: 'Overview and value proposition' },
	{
		href: '/work',
		label: 'Work',
		icon: 'briefcase',
		description: 'Previous projects and client work'
	},
	{
		href: '/projects',
		label: 'Projects',
		icon: 'rocket',
		description: 'SaaS, experiments, and complex components'
	},
	{
		href: '/insights',
		label: 'Insights',
		icon: 'lightbulb',
		description: 'Strategic content for business leaders'
	},
	{ href: '/about', label: 'About', icon: 'user', description: 'My story, expertise, and value' },
	{
		href: '/contact',
		label: 'Contact',
		icon: 'mail',
		description: 'Get in touch and start a conversation'
	}
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

export const navigationIconMap = {
	home: House,
	briefcase: Briefcase,
	rocket: Rocket,
	lightbulb: Lightbulb,
	user: User,
	mail: Mail
};
