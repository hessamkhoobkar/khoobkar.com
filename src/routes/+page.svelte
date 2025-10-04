<script lang="ts">
	import { onMount } from 'svelte';
	import { getFeaturedContent, getAllPublishedContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { TextPlugin } from 'gsap/TextPlugin';
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import Users from '@lucide/svelte/icons/users';
	import Clock from '@lucide/svelte/icons/clock';
	import Award from '@lucide/svelte/icons/award';
	import Code from '@lucide/svelte/icons/code';
	import Palette from '@lucide/svelte/icons/palette';
	import Zap from '@lucide/svelte/icons/zap';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Star from '@lucide/svelte/icons/star';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Target from '@lucide/svelte/icons/target';
	import Heart from '@lucide/svelte/icons/heart';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Mail from '@lucide/svelte/icons/mail';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Globe from '@lucide/svelte/icons/globe';
	import Coffee from '@lucide/svelte/icons/coffee';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Github from '@lucide/svelte/icons/github';

	// Register GSAP plugins
	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger, TextPlugin);
	}

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

	onMount(async () => {
		try {
			const [featured, all] = await Promise.all([getFeaturedContent(), getAllPublishedContent()]);

			featuredContent = featured;
			recentContent = all.slice(0, 6); // Get 6 most recent items

			// Initialize GSAP animations
			if (typeof window !== 'undefined') {
				// Animate stats on load
				gsap.fromTo(
					'.stat-card',
					{ y: 50, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
				);

				// Animate work categories with progress bars
				gsap.fromTo(
					'.progress-bar',
					{ width: '0%' },
					{
						width: (i, el) => el.dataset.percentage + '%',
						duration: 1.5,
						delay: 0.5,
						ease: 'power2.out'
					}
				);

				// Animate tech stack tags
				gsap.fromTo(
					'.tech-tag',
					{ scale: 0, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.3, stagger: 0.02, delay: 1, ease: 'back.out(1.7)' }
				);

				// Floating animation for hero elements
				gsap.to('.floating', {
					y: -10,
					duration: 2,
					ease: 'power2.inOut',
					yoyo: true,
					repeat: -1
				});

				// Parallax effect for background elements
				ScrollTrigger.create({
					trigger: '.parallax-bg',
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1,
					animation: gsap.to('.parallax-bg', { y: -100 })
				});
			}
		} catch (error) {
			console.error('Failed to load content:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Hessam Khoobkar | Senior Front-End Developer - React, Svelte, Next.js Expert</title>
	<meta
		name="description"
		content="Senior front-end developer with 10+ years experience crafting pixel-perfect web applications. Available for full-time opportunities and freelance projects. Specializing in React, Svelte, Next.js, and modern web technologies."
	/>
	<meta
		name="keywords"
		content="front-end developer, senior developer, React developer, Svelte developer, web development, freelance developer, responsive design, UI development"
	/>
</svelte:head>

<!-- Full-Width Stunning Dashboard -->
<div class="min-h-screen">
	<!-- Hero Section with Silk Animation -->
	<section class="relative overflow-hidden">
		<div class="absolute inset-0 z-0">
			<Silk speed={3} scale={1.2} color="#ef5e03" noiseIntensity={2} rotation={15} />
		</div>
		<div class="relative z-10 ml-[336px] flex min-h-[80vh] items-center justify-center p-8">
			<div class="text-center">
				<div class="floating mb-8">
					<div
						class="inline-flex items-center gap-3 rounded-full border border-primary-500/30 bg-primary-500/10 px-6 py-3 backdrop-blur-sm"
					>
						<div class="h-2 w-2 animate-pulse rounded-full bg-primary-400"></div>
						<span class="font-medium text-primary-300">Available for New Projects</span>
					</div>
				</div>

				<h1 class="floating mb-6 text-7xl leading-tight font-bold text-surface-50">
					Crafting <span
						class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
						>Digital Excellence</span
					><br />
					<span class="text-5xl text-surface-300">One Pixel at a Time</span>
				</h1>

				<p class="floating mx-auto mb-12 max-w-5xl text-2xl leading-relaxed text-surface-200">
					Senior Front-End Developer with <strong class="text-primary-400">6+ years</strong> of
					experience building
					<strong class="text-surface-50">high-performance web applications</strong> that deliver
					<strong class="text-primary-400">30-60% performance improvements</strong> and exceptional user
					experiences.
				</p>

				<div class="floating flex flex-wrap justify-center gap-6">
					<a
						href="/work"
						class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-2xl shadow-primary-500/30 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 opacity-0 transition-opacity group-hover:opacity-100"
						></div>
						<span class="relative flex items-center gap-2">
							<Code class="h-5 w-5" />
							View My Work
						</span>
					</a>
					<a
						href="/contact"
						class="group relative overflow-hidden rounded-2xl border-2 border-primary-500 bg-primary-500/10 px-8 py-4 font-bold text-primary-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary-500/20"
					>
						<span class="relative flex items-center gap-2">
							<MessageSquare class="h-5 w-5" />
							Let's Work Together
						</span>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Dashboard Content -->
	<div class="py-8">
		<div class="space-y-12">
			<!-- Stats Grid with Stunning Animations -->
			<section>
				<div class="mb-8 text-center">
					<h2 class="mb-4 text-4xl font-bold text-surface-50">Impact by Numbers</h2>
					<p class="text-xl text-surface-300">Measurable results that speak for themselves</p>
				</div>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{#each stats as stat}
						{@const Icon = stat.icon}
						<div
							class="stat-card group relative overflow-hidden rounded-2xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-700/30 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary-500/50 hover:bg-gradient-to-br hover:from-primary-600/10 hover:to-primary-500/5 hover:shadow-2xl hover:shadow-primary-500/20"
						>
							<div
								class="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 blur-xl transition-opacity group-hover:opacity-100"
							></div>
							<div class="relative">
								<div class="mb-4 flex items-center justify-between">
									<div
										class="rounded-xl bg-surface-700/50 p-3 transition-all group-hover:scale-110 group-hover:bg-primary-500/20"
									>
										<Icon
											class="h-8 w-8 {stat.color} transition-colors group-hover:text-primary-400"
										/>
									</div>
									<div class="text-right">
										<p
											class="text-4xl font-bold text-surface-50 transition-colors group-hover:text-primary-400"
										>
											{stat.value}
										</p>
									</div>
								</div>
								<h3 class="mb-2 text-lg font-semibold text-surface-50">{stat.title}</h3>
								<p class="text-sm text-surface-400">{stat.subtitle}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Main Content Grid -->
			<div class="grid gap-8 lg:grid-cols-3">
				<!-- Left Column -->
				<div class="space-y-8 lg:col-span-1">
					<!-- Work Categories with Animated Progress -->
					<div
						class="rounded-2xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-700/30 p-8 backdrop-blur-sm"
					>
						<h3 class="mb-6 text-2xl font-bold text-surface-50">Work Distribution</h3>
						<div class="space-y-6">
							{#each workCategories as category}
								<div class="group">
									<div class="mb-3 flex items-center justify-between text-sm">
										<span class="font-medium text-surface-300">{category.name}</span>
										<span class="text-surface-400">{category.count} projects</span>
									</div>
									<div class="h-3 overflow-hidden rounded-full bg-surface-700/50">
										<div
											class="progress-bar h-full rounded-full {category.color} transition-all duration-1000 ease-out"
											data-percentage={category.percentage}
											style="width: 0%"
										></div>
									</div>
									<div class="mt-2 text-xs text-surface-500">{category.percentage}%</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Profile Card with Real Info -->
					<div
						class="rounded-2xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-700/30 p-8 backdrop-blur-sm"
					>
						<div class="text-center">
							<div
								class="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-2xl shadow-primary-500/30"
							>
								<img
									src="https://khoobkar.com/_app/immutable/assets/hessam-avatar.b941527b.jpg"
									class="h-full w-full object-cover"
									alt="Hessam Khoobkar"
								/>
							</div>
							<h3 class="mb-2 text-xl font-bold text-surface-50">Hessam Khoobkar</h3>
							<p class="mb-4 font-medium text-primary-400">Senior Front-End Developer</p>
							<div class="mb-4 flex flex-wrap justify-center gap-2">
								<span class="rounded-full bg-primary-500/20 px-3 py-1 text-xs text-primary-300"
									>Available</span
								>
								<span class="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300"
									>Open to Work</span
								>
							</div>
							<div class="space-y-2 text-sm text-surface-400">
								<div class="flex items-center justify-center gap-2">
									<MapPin class="h-4 w-4 text-primary-400" />
									<span>Tallinn, Estonia</span>
								</div>
								<div class="flex items-center justify-center gap-2">
									<Globe class="h-4 w-4 text-primary-400" />
									<span>Available Globally (Remote)</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Quick Actions -->
					<div
						class="rounded-2xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-700/30 p-8 backdrop-blur-sm"
					>
						<h3 class="mb-6 text-xl font-bold text-surface-50">Quick Actions</h3>
						<div class="space-y-4">
							<a
								href="/work"
								class="group flex items-center gap-4 rounded-xl bg-surface-700/50 p-4 text-surface-200 transition-all hover:bg-primary-600/20 hover:text-primary-300"
							>
								<div
									class="rounded-lg bg-primary-500/20 p-2 transition-all group-hover:bg-primary-500/30"
								>
									<Code class="h-5 w-5" />
								</div>
								<span class="font-medium">View Portfolio</span>
								<ArrowRight
									class="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
								/>
							</a>
							<a
								href="/services"
								class="group flex items-center gap-4 rounded-xl bg-surface-700/50 p-4 text-surface-200 transition-all hover:bg-primary-600/20 hover:text-primary-300"
							>
								<div
									class="rounded-lg bg-primary-500/20 p-2 transition-all group-hover:bg-primary-500/30"
								>
									<Palette class="h-5 w-5" />
								</div>
								<span class="font-medium">Explore Services</span>
								<ArrowRight
									class="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
								/>
							</a>
							<a
								href="/contact"
								class="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 p-4 text-white transition-all hover:from-primary-500 hover:to-primary-400"
							>
								<div class="rounded-lg bg-white/20 p-2">
									<MessageSquare class="h-5 w-5" />
								</div>
								<span class="font-medium">Get in Touch</span>
								<ArrowRight
									class="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
								/>
							</a>
						</div>
					</div>
				</div>

				<!-- Right Column -->
				<div class="space-y-8 lg:col-span-2">
					<!-- Recent Activity -->
					<div
						class="rounded-2xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-700/30 p-8 backdrop-blur-sm"
					>
						<div class="mb-6 flex items-center justify-between">
							<h3 class="text-2xl font-bold text-surface-50">Recent Achievements</h3>
							<a href="/work" class="text-primary-400 transition-colors hover:text-primary-300">
								View all →
							</a>
						</div>
						<div class="space-y-4">
							{#each recentActivity as activity}
								{@const ActivityIcon = activity.icon}
								<div
									class="group flex items-center gap-6 rounded-xl bg-surface-700/30 p-6 transition-all hover:bg-surface-700/50"
								>
									<div
										class="rounded-xl bg-surface-600/50 p-3 transition-all group-hover:bg-primary-500/20"
									>
										<ActivityIcon
											class="h-6 w-6 text-surface-300 transition-colors group-hover:text-primary-400"
										/>
									</div>
									<div class="flex-1">
										<h4 class="font-semibold text-surface-50">{activity.title}</h4>
										<p class="text-sm text-surface-400">{activity.type} • {activity.time}</p>
									</div>
									<div
										class="rounded-full px-3 py-1 text-xs font-medium {activity.status ===
										'completed'
											? 'bg-green-500/20 text-green-300'
											: activity.status === 'in-progress'
												? 'bg-yellow-500/20 text-yellow-300'
												: 'bg-gray-500/20 text-gray-300'}"
									>
										{activity.status}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Tech Stack with Animation -->
					<div
						class="rounded-2xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-700/30 p-8 backdrop-blur-sm"
					>
						<h3 class="mb-6 text-2xl font-bold text-surface-50">Technical Arsenal</h3>
						<p class="mb-6 text-surface-300">
							Modern stack, proven in production, optimized for performance
						</p>
						<div class="flex flex-wrap gap-3">
							{#each techStack as tech}
								<span
									class="tech-tag rounded-full bg-surface-700/50 px-4 py-2 text-sm text-surface-300 transition-all hover:scale-105 hover:bg-primary-600/20 hover:text-primary-300"
								>
									{tech}
								</span>
							{/each}
						</div>
					</div>

					<!-- Experience Highlights -->
					<div
						class="rounded-2xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-700/30 p-8 backdrop-blur-sm"
					>
						<h3 class="mb-6 text-2xl font-bold text-surface-50">Key Achievements</h3>
						<div class="space-y-4">
							{#each experienceHighlights as highlight}
								<div class="flex items-start gap-4 rounded-xl bg-surface-700/30 p-4">
									<div class="mt-1 rounded-full bg-primary-500/20 p-1">
										<CheckCircle2 class="h-4 w-4 text-primary-400" />
									</div>
									<p class="text-surface-300">{highlight}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Persona-Specific Sections with Enhanced Design -->
			<section>
				<div class="mb-8 text-center">
					<h2 class="mb-4 text-4xl font-bold text-surface-50">How Can I Help You?</h2>
					<p class="text-xl text-surface-300">Tailored solutions for every type of collaboration</p>
				</div>
				<div class="grid gap-8 lg:grid-cols-3">
					<!-- For Alex the Recruiter -->
					<div
						class="group relative overflow-hidden rounded-2xl border border-surface-700/50 bg-gradient-to-br from-blue-600/10 to-blue-500/5 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-500/50"
					>
						<div
							class="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
						></div>
						<div class="relative">
							<div class="mb-6 flex items-center gap-3">
								<div class="rounded-xl bg-blue-500/20 p-3">
									<Users class="h-8 w-8 text-blue-400" />
								</div>
								<h3 class="text-2xl font-bold text-surface-50">For Recruiters</h3>
							</div>
							<p class="mb-6 text-surface-300">
								Senior-level front-end expertise with <strong class="text-blue-400">6+ years</strong
								>
								of experience. Proven track record delivering
								<strong class="text-surface-50">30-60% performance improvements</strong>
								and mentoring teams of 7+ developers.
							</p>
							<div class="space-y-3">
								<a
									href="/work"
									class="block rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-all hover:scale-105 hover:bg-blue-500"
								>
									View Portfolio
								</a>
								<a
									href="/contact"
									class="block rounded-xl border border-blue-500 bg-blue-500/10 px-6 py-3 text-center font-semibold text-blue-300 transition-all hover:bg-blue-500/20"
								>
									Schedule Interview
								</a>
							</div>
						</div>
					</div>

					<!-- For Jordan the Freelance Client -->
					<div
						class="group relative overflow-hidden rounded-2xl border border-surface-700/50 bg-gradient-to-br from-yellow-600/10 to-yellow-500/5 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-yellow-500/50"
					>
						<div
							class="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-yellow-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
						></div>
						<div class="relative">
							<div class="mb-6 flex items-center gap-3">
								<div class="rounded-xl bg-yellow-500/20 p-3">
									<Award class="h-8 w-8 text-yellow-400" />
								</div>
								<h3 class="text-2xl font-bold text-surface-50">For Clients</h3>
							</div>
							<p class="mb-6 text-surface-300">
								Reliable freelance developer with <strong class="text-yellow-400"
									>transparent communication</strong
								>
								and proven results. <strong class="text-surface-50">50+ projects delivered</strong>
								with
								<strong class="text-yellow-400">30+ happy clients</strong> worldwide.
							</p>
							<div class="space-y-3">
								<a
									href="/services"
									class="block rounded-xl bg-yellow-600 px-6 py-3 text-center font-semibold text-white transition-all hover:scale-105 hover:bg-yellow-500"
								>
									View Services
								</a>
								<a
									href="/contact"
									class="block rounded-xl border border-yellow-500 bg-yellow-500/10 px-6 py-3 text-center font-semibold text-yellow-300 transition-all hover:bg-yellow-500/20"
								>
									Start Project
								</a>
							</div>
						</div>
					</div>

					<!-- For Sam the Peer Developer -->
					<div
						class="group relative overflow-hidden rounded-2xl border border-surface-700/50 bg-gradient-to-br from-green-600/10 to-green-500/5 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-green-500/50"
					>
						<div
							class="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-green-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
						></div>
						<div class="relative">
							<div class="mb-6 flex items-center gap-3">
								<div class="rounded-xl bg-green-500/20 p-3">
									<Zap class="h-8 w-8 text-green-400" />
								</div>
								<h3 class="text-2xl font-bold text-surface-50">For Developers</h3>
							</div>
							<p class="mb-6 text-surface-300">
								Educational content, resources, and insights for fellow developers.
								<strong class="text-green-400">7 developers mentored</strong> and
								<strong class="text-surface-50">open-source contributions</strong>
								to help the community grow.
							</p>
							<div class="space-y-3">
								<a
									href="/insights"
									class="block rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition-all hover:scale-105 hover:bg-green-500"
								>
									Read Blog
								</a>
								<a
									href="/resources"
									class="block rounded-xl border border-green-500 bg-green-500/10 px-6 py-3 text-center font-semibold text-green-300 transition-all hover:bg-green-500/20"
								>
									View Resources
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Call to Action Section -->
			<section
				class="relative overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-600/20 via-primary-500/10 to-transparent p-12 text-center backdrop-blur-sm"
			>
				<div class="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-transparent"></div>
				<div
					class="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl"
				></div>
				<div
					class="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl"
				></div>

				<div class="relative">
					<div class="mb-8 flex justify-center">
						<div class="rounded-full bg-primary-500/20 p-6">
							<Rocket class="h-12 w-12 text-primary-400" />
						</div>
					</div>
					<h2 class="mb-6 text-5xl font-bold text-surface-50">
						Let's Create Something <span
							class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
							>Extraordinary</span
						>
					</h2>
					<p class="mx-auto mb-10 max-w-4xl text-xl text-surface-200">
						Whether you're hiring for your team, need an expert for your next project, or want to
						discuss web development, I'd love to connect. I respond within 24 hours and am ready to
						dive into challenging projects.
					</p>

					<div class="flex flex-wrap justify-center gap-6">
						<a
							href="/contact"
							class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-primary-500/30 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50"
						>
							<div
								class="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 opacity-0 transition-opacity group-hover:opacity-100"
							></div>
							<span class="relative flex items-center gap-3">
								<Mail class="h-6 w-6" />
								Get in Touch
							</span>
						</a>
						<a
							href="/work"
							class="group relative overflow-hidden rounded-2xl border-2 border-primary-500 bg-primary-500/10 px-10 py-5 text-lg font-bold text-primary-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary-500/20"
						>
							<span class="relative flex items-center gap-3">
								<Code class="h-6 w-6" />
								View Portfolio
								<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
							</span>
						</a>
					</div>

					<!-- Availability status -->
					<div
						class="mt-12 inline-flex items-center gap-4 rounded-2xl border border-primary-500/30 bg-primary-500/10 px-8 py-4 backdrop-blur-sm"
					>
						<div class="relative flex h-4 w-4">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"
							></span>
							<span class="relative inline-flex h-4 w-4 rounded-full bg-primary-500"></span>
						</div>
						<span class="text-lg font-semibold text-primary-300">Available for New Projects</span>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
