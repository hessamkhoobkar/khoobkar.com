<script lang="ts">
	import { onMount } from 'svelte';
	import { getFeaturedContent, getAllPublishedContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import { gsap } from 'gsap';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import Users from '@lucide/svelte/icons/users';
	import Clock from '@lucide/svelte/icons/clock';
	import Award from '@lucide/svelte/icons/award';
	import Code from '@lucide/svelte/icons/code';
	import Zap from '@lucide/svelte/icons/zap';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Heart from '@lucide/svelte/icons/heart';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
	import Globe from '@lucide/svelte/icons/globe';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Code2 from '@lucide/svelte/icons/code-2';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Footer from '$lib/components/layout/Footer.svelte';

	// State variables
	let featuredContent: ContentItem[] = $state([]);
	let recentContent: ContentItem[] = $state([]);
	let loading = $state(true);

	// Real data based on about page
	const stats = [
		{
			title: 'Years Experience',
			value: '6+',
			subtitle: 'Senior-level expertise in modern web development',
			icon: Briefcase,
			color: 'text-primary-400'
		},
		{
			title: 'Projects Delivered',
			value: '50+',
			subtitle: 'From startups to enterprise applications',
			icon: Rocket,
			color: 'text-blue-400'
		},
		{
			title: 'Happy Clients',
			value: '30+',
			subtitle: 'Trusted by businesses worldwide',
			icon: Users,
			color: 'text-green-400'
		},
		{
			title: 'Developers Mentored',
			value: '7',
			subtitle: 'Building the next generation of developers',
			icon: Heart,
			color: 'text-purple-400'
		}
	];

	// Updated work categories - Front-end should be larger since you're a senior front-end developer
	const workCategories = [
		{ name: 'Front-end Projects', count: 35, percentage: 70, color: 'bg-primary-500' },
		{ name: 'UI Design Projects', count: 10, percentage: 20, color: 'bg-blue-500' },
		{ name: 'Full-stack Projects', count: 5, percentage: 10, color: 'bg-green-500' }
	];

	// Real recent activity based on experience
	const recentActivity = [
		{
			icon: Code,
			type: 'Project',
			title: 'POMECHAIN - Vue.js Component Library',
			time: 'Currently',
			status: 'in-progress'
		},
		{
			icon: Award,
			type: 'Achievement',
			title: 'Coinhaven - React to SvelteKit Migration',
			time: 'Completed',
			status: 'completed'
		},
		{
			icon: TrendingUp,
			type: 'Performance',
			title: '35% Load Time Improvement',
			time: 'Achieved',
			status: 'completed'
		}
	];

	// Real tech stack from about page
	const techStack = [
		'JavaScript (ES6+)',
		'TypeScript',
		'HTML5',
		'CSS3',
		'React.js',
		'Next.js',
		'Svelte',
		'SvelteKit',
		'Vue.js',
		'Nuxt.js',
		'TailwindCSS',
		'SCSS/SASS',
		'GraphQL',
		'REST APIs',
		'WebSocket',
		'Zustand',
		'Pinia',
		'Context API',
		'Git',
		'Vite',
		'Webpack',
		'Docker',
		'CI/CD',
		'Agile/Scrum'
	];

	// Real experience highlights
	const experienceHighlights = [
		'Architected high-performance Vue.js/Nuxt.js component library with TypeScript',
		'Led React to SvelteKit migration achieving 30% performance improvement',
		'Achieved 35% reduction in page load times through advanced optimization',
		'Mentored team of 7 developers, elevating coding standards through rigorous reviews',
		'Built real-time WebSocket data sync for low-latency trading features'
	];

	// Expertise showcase from projects page
	const expertiseShowcase = [
		{
			icon: Zap,
			title: 'SaaS Architecture',
			description: 'Scalable, performant applications built with modern tech stacks',
			metrics: ['99.9% Uptime', 'Sub-200ms Response', 'Auto-scaling']
		},
		{
			icon: Code2,
			title: 'Complex Components',
			description: 'Reusable, maintainable components that solve real-world problems',
			metrics: ['Zero Dependencies', 'TypeScript', 'Accessible']
		},
		{
			icon: Sparkles,
			title: 'Innovation Experiments',
			description: 'Cutting-edge web technologies and creative solutions',
			metrics: ['WebGL', 'WebAssembly', 'PWA']
		}
	];

	onMount(async () => {
		try {
			const [featured, all] = await Promise.all([getFeaturedContent(), getAllPublishedContent()]);

			featuredContent = featured;
			recentContent = all.slice(0, 6);

			// Initialize GSAP animations for dashboard
			if (typeof window !== 'undefined') {
				// Animate stat cards
				gsap.fromTo(
					'.stat-card',
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
				);

				// Animate progress bars
				setTimeout(() => {
					gsap.to('.progress-bar', {
						width: (i, el) => el.dataset.percentage + '%',
						duration: 1,
						delay: 0.3,
						ease: 'power2.out'
					});
				}, 300);

				// Animate tech tags
				gsap.fromTo(
					'.tech-tag',
					{ scale: 0.9, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.3, stagger: 0.02, delay: 0.5, ease: 'power2.out' }
				);
			}
		} catch (error) {
			console.error('Failed to load content:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Dashboard | Hessam Khoobkar</title>
	<meta
		name="description"
		content="Senior front-end developer dashboard - Overview of projects, expertise, and professional achievements."
	/>
</svelte:head>

<!-- Dashboard Layout -->
<div class="mt-4">
	<!-- Dashboard Header Section -->
	<section class="mx-auto max-w-7xl px-4 py-8">
		<div class="mb-8 rounded-2xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
			<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<h1 class="text-3xl font-bold text-surface-50">Dashboard</h1>
					<p class="mt-1 text-sm text-surface-400">Welcome back, Hessam</p>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="flex items-center gap-2 rounded-xl border border-surface-700 bg-surface-800 px-4 py-2"
					>
						<div class="h-2 w-2 rounded-full bg-green-500"></div>
						<span class="text-sm font-medium text-surface-300">Available</span>
					</div>
					<a
						href="/contact"
						class="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30"
					>
						<MessageSquare class="mr-2 inline h-4 w-4" />
						Get in Touch
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Dashboard Content -->
	<div class="mx-auto max-w-7xl space-y-12 px-4 py-8">
		<!-- Key Metrics Cards -->
		<section>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each stats as stat}
					{@const Icon = stat.icon}
					<div
						class="stat-card group relative overflow-hidden rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm transition-all hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
					>
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<p class="text-sm font-medium text-surface-400">{stat.title}</p>
								<p class="mt-2 text-3xl font-bold text-surface-50">{stat.value}</p>
								<p class="mt-1 text-xs text-surface-500">{stat.subtitle}</p>
							</div>
							<div class="rounded-lg bg-primary-500/10 p-3">
								<Icon class="h-5 w-5 {stat.color}" />
							</div>
						</div>
						<div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-700">
							<div
								class="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-1000"
								style="width: {stat.title === 'Years Experience'
									? 100
									: stat.title === 'Projects Delivered'
										? 100
										: stat.title === 'Happy Clients'
											? 60
											: 14}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Dashboard Content Grid -->
		<section>
			<div class="grid gap-6 lg:grid-cols-3">
				<!-- Left Column - Sidebar Widgets -->
				<div class="space-y-6 lg:col-span-1">
					<!-- Expertise Breakdown Widget -->
					<div class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
						<div class="mb-6 flex items-center justify-between">
							<h3 class="text-lg font-semibold text-surface-50">Expertise Breakdown</h3>
							<TrendingUp class="h-5 w-5 text-primary-400" />
						</div>
						<div class="space-y-5">
							{#each workCategories as category}
								<div>
									<div class="mb-2 flex items-center justify-between">
										<span class="text-sm font-medium text-surface-300">{category.name}</span>
										<span class="text-sm font-semibold text-surface-50">{category.count}</span>
									</div>
									<div class="relative h-2 overflow-hidden rounded-full bg-surface-700">
										<div
											class="progress-bar h-full rounded-full {category.color} transition-all duration-1000"
											data-percentage={category.percentage}
											style="width: 0%"
										></div>
									</div>
									<div class="mt-1 text-xs text-surface-500">{category.percentage}%</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Quick Actions Widget -->
					<div class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
						<h3 class="mb-4 text-lg font-semibold text-surface-50">Quick Actions</h3>
						<div class="space-y-3">
							<a
								href="/work"
								class="flex items-center gap-3 rounded-lg border border-surface-700 bg-surface-700/50 p-4 transition-all hover:border-primary-500/50 hover:bg-surface-700"
							>
								<Code class="h-5 w-5 text-primary-400" />
								<span class="flex-1 text-sm font-medium text-surface-300">View Portfolio</span>
								<ArrowRight class="h-4 w-4 text-surface-500" />
							</a>
							<a
								href="/contact"
								class="flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 p-4 text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/30"
							>
								<MessageSquare class="h-5 w-5" />
								<span class="flex-1 text-sm font-medium">Contact Me</span>
								<ArrowRight class="h-4 w-4" />
							</a>
						</div>
					</div>

					<!-- Profile Info Widget -->
					<div class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
						<div class="mb-4 flex items-center gap-4">
							<div class="relative">
								<img
									src="https://khoobkar.com/_app/immutable/assets/hessam-avatar.b941527b.jpg"
									class="h-16 w-16 rounded-xl object-cover"
									alt="Hessam Khoobkar"
								/>
								<div
									class="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-surface-800 bg-green-500"
								></div>
							</div>
							<div class="flex-1">
								<h4 class="font-semibold text-surface-50">Hessam Khoobkar</h4>
								<p class="text-sm text-surface-400">Senior Front-End Architect</p>
							</div>
						</div>
						<div class="space-y-2 text-sm">
							<div class="flex items-center gap-3 text-surface-400">
								<MapPin class="h-4 w-4 text-primary-400" />
								<span>Tallinn, Estonia</span>
							</div>
							<div class="flex items-center gap-3 text-surface-400">
								<Globe class="h-4 w-4 text-blue-400" />
								<span>Remote Available</span>
							</div>
							<div class="flex items-center gap-3 text-surface-400">
								<Clock class="h-4 w-4 text-green-400" />
								<span>24h Response</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column - Main Content -->
				<div class="space-y-6 lg:col-span-2">
					<!-- Recent Activity Widget -->
					<div class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
						<div class="mb-6 flex items-center justify-between">
							<div>
								<h3 class="text-lg font-semibold text-surface-50">Recent Activity</h3>
								<p class="text-xs text-surface-500">Latest updates and milestones</p>
							</div>
							<a
								href="/work"
								class="text-xs text-primary-400 transition-colors hover:text-primary-300"
							>
								View All →
							</a>
						</div>
						<div class="space-y-4">
							{#each recentActivity as activity}
								{@const ActivityIcon = activity.icon}
								<div
									class="flex items-center gap-4 rounded-lg border border-surface-700 bg-surface-700/30 p-4 transition-all hover:border-primary-500/50 hover:bg-surface-700/50"
								>
									<div
										class="rounded-lg bg-primary-500/10 p-3 {activity.status === 'completed'
											? 'bg-green-500/10'
											: activity.status === 'in-progress'
												? 'bg-yellow-500/10'
												: ''}"
									>
										<ActivityIcon
											class="h-5 w-5 {activity.status === 'completed'
												? 'text-green-400'
												: activity.status === 'in-progress'
													? 'text-yellow-400'
													: 'text-primary-400'}"
										/>
									</div>
									<div class="flex-1">
										<h4 class="text-sm font-semibold text-surface-50">{activity.title}</h4>
										<div class="mt-1 flex items-center gap-2 text-xs text-surface-400">
											<span>{activity.type}</span>
											<span>•</span>
											<span>{activity.time}</span>
										</div>
									</div>
									<div
										class="rounded-full px-3 py-1 text-xs font-semibold {activity.status ===
										'completed'
											? 'bg-green-500/20 text-green-400'
											: activity.status === 'in-progress'
												? 'bg-yellow-500/20 text-yellow-400'
												: 'bg-surface-700 text-surface-400'}"
									>
										{activity.status}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Tech Stack Widget -->
					<div class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
						<div class="mb-6">
							<h3 class="text-lg font-semibold text-surface-50">Tech Stack</h3>
							<p class="mt-1 text-xs text-surface-500">
								Modern technologies and tools used in production
							</p>
						</div>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
							{#each techStack as tech}
								<div
									class="tech-tag rounded-lg border border-surface-700 bg-surface-700/30 px-3 py-2 text-center text-xs font-medium text-surface-300 transition-all hover:border-primary-500/50 hover:bg-surface-700/50"
								>
									{tech}
								</div>
							{/each}
						</div>
					</div>

					<!-- Key Achievements Widget -->
					<div class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
						<div class="mb-6">
							<h3 class="text-lg font-semibold text-surface-50">Key Achievements</h3>
							<p class="mt-1 text-xs text-surface-500">Career highlights and milestones</p>
						</div>
						<div class="space-y-3">
							{#each experienceHighlights as highlight}
								<div
									class="flex items-start gap-3 rounded-lg border border-surface-700 bg-surface-700/30 p-4"
								>
									<CheckCircle2 class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
									<p class="text-sm leading-relaxed text-surface-300">{highlight}</p>
								</div>
							{/each}
						</div>
					</div>

					<!-- Expertise Areas Widget -->
					<div class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm">
						<div class="mb-6">
							<h3 class="text-lg font-semibold text-surface-50">Expertise Areas</h3>
							<p class="mt-1 text-xs text-surface-500">Specialized knowledge and capabilities</p>
						</div>
						<div class="grid gap-4 sm:grid-cols-3">
							{#each expertiseShowcase as area}
								{@const IconComponent = area.icon}
								<div
									class="rounded-lg border border-surface-700 bg-surface-700/30 p-4 transition-all hover:border-primary-500/50"
								>
									<div class="mb-3 flex items-center gap-2">
										<div class="rounded-lg bg-primary-500/10 p-2">
											<IconComponent class="h-4 w-4 text-primary-400" />
										</div>
										<h4 class="text-sm font-semibold text-surface-50">{area.title}</h4>
									</div>
									<p class="mb-3 text-xs leading-relaxed text-surface-400">{area.description}</p>
									<div class="space-y-1.5">
										{#each area.metrics as metric}
											<div class="flex items-center gap-2 text-xs text-surface-500">
												<div class="h-1 w-1 rounded-full bg-primary-400"></div>
												<span>{metric}</span>
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<section class="mx-auto max-w-7xl px-4">
			<Footer />
		</section>
	</div>
</div>
