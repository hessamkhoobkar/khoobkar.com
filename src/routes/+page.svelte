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
	import Zap from '@lucide/svelte/icons/zap';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import Star from '@lucide/svelte/icons/star';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Heart from '@lucide/svelte/icons/heart';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Mail from '@lucide/svelte/icons/mail';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
	import Globe from '@lucide/svelte/icons/globe';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Trophy from '@lucide/svelte/icons/trophy';
	import Target from '@lucide/svelte/icons/target';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import Code2 from '@lucide/svelte/icons/code-2';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Footer from '$lib/components/layout/Footer.svelte';

	// Register GSAP plugins
	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger, TextPlugin);
	}

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

	// Process highlights from process page
	const processHighlights = [
		{
			icon: Zap,
			title: 'Transparent Development',
			description:
				'Real-time insights into my development process, challenges faced, and solutions implemented',
			metrics: ['Weekly Updates', 'Code Reviews', 'Performance Metrics']
		},
		{
			icon: Target,
			title: 'Problem-Solving Focus',
			description:
				'Detailed case studies showing how I approach complex technical challenges and deliver results',
			metrics: ['Root Cause Analysis', 'Solution Architecture', 'Impact Measurement']
		},
		{
			icon: Lightbulb,
			title: 'Innovation Showcase',
			description:
				'Rebuilding previous projects with modern techniques to demonstrate continuous improvement',
			metrics: ['Before/After Comparisons', 'Technology Upgrades', 'Performance Gains']
		}
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
	<!-- Premium Hero Section with Stunning Visuals -->
	<section
		class="relative min-h-screen overflow-hidden bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950"
	>
		<!-- Animated Background Elements -->
		<div class="absolute inset-0 z-0">
			<Silk speed={2} scale={1.5} color="#ef5e03" noiseIntensity={3} rotation={25} />
			<div
				class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
			></div>
			<div
				class="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-primary-500/20 to-transparent blur-3xl"
			></div>
			<div
				class="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-primary-500/20 to-transparent blur-3xl delay-1000"
			></div>
		</div>

		<!-- Main Hero Content -->
		<div class="relative z-10 flex min-h-screen items-center justify-center px-8 py-20">
			<div class="mx-auto max-w-7xl text-center">
				<!-- Premium Status Badge -->
				<div
					class="floating mb-8 inline-flex items-center gap-4 rounded-full border border-primary-500/30 bg-gradient-to-r from-primary-600/20 to-primary-500/10 px-8 py-4 shadow-2xl backdrop-blur-lg"
				>
					<div class="relative">
						<div class="h-3 w-3 animate-ping rounded-full bg-primary-400"></div>
						<div class="absolute inset-0 h-3 w-3 rounded-full bg-primary-500"></div>
					</div>
					<span class="text-lg font-semibold text-primary-200">Available for Premium Projects</span>
					<div class="ml-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-300">
						HIRING NOW
					</div>
				</div>

				<!-- Main Headline with Premium Typography -->
				<h1 class="floating mb-8 text-8xl leading-[0.9] font-black text-surface-50">
					<span class="block">THE</span>
					<span
						class="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent"
					>
						FRONTEND
					</span>
					<span class="block text-6xl text-surface-300">MASTERMIND</span>
				</h1>

				<!-- Compelling Subtitle -->
				<div class="floating mx-auto mb-12 max-w-4xl">
					<p class="mb-4 text-3xl font-bold text-surface-100">
						Who Transforms <span class="text-primary-400">Vision</span> Into
						<span class="text-surface-50">Digital Reality</span>
					</p>
					<p class="text-xl leading-relaxed text-surface-300">
						Senior Front-End Architect delivering <strong class="text-primary-400"
							>30-60% performance boosts</strong
						>, mentoring teams of 7+, and building applications used by
						<strong class="text-surface-50">millions of users</strong> worldwide.
					</p>
				</div>

				<!-- Premium Action Buttons -->
				<div class="floating mb-16 flex flex-wrap justify-center gap-8">
					<a
						href="/work"
						class="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 px-12 py-6 text-xl font-bold text-white shadow-2xl shadow-primary-500/40 transition-all duration-500 hover:scale-110 hover:shadow-primary-500/60"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 opacity-0 transition-opacity group-hover:opacity-100"
						></div>
						<span class="relative flex items-center gap-3">
							<Code class="h-6 w-6" />
							Explore My Portfolio
						</span>
						<div
							class="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm"
						></div>
					</a>
					<a
						href="/contact"
						class="group relative overflow-hidden rounded-3xl border-2 border-primary-500/50 bg-gradient-to-r from-primary-600/10 to-primary-500/5 px-12 py-6 text-xl font-bold text-primary-200 backdrop-blur-lg transition-all duration-500 hover:scale-110 hover:border-primary-400 hover:bg-primary-500/20"
					>
						<span class="relative flex items-center gap-3">
							<MessageSquare class="h-6 w-6" />
							Start Your Project
						</span>
						<div
							class="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary-500/30 backdrop-blur-sm"
						></div>
					</a>
				</div>

				<!-- Success Metrics -->
				<div class="floating mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
					<div class="text-center">
						<div class="mb-2 text-4xl font-black text-primary-400">6+</div>
						<div class="text-lg text-surface-300">Years Excellence</div>
					</div>
					<div class="text-center">
						<div class="mb-2 text-4xl font-black text-blue-400">50+</div>
						<div class="text-lg text-surface-300">Projects Delivered</div>
					</div>
					<div class="text-center">
						<div class="mb-2 text-4xl font-black text-green-400">30+</div>
						<div class="text-lg text-surface-300">Happy Clients</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Dashboard Content -->
	<div class="py-8">
		<div class="space-y-12">
			<!-- Premium Impact Metrics Section -->
			<section class="relative py-20">
				<div
					class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
				></div>
				<div class="relative">
					<div class="mb-16 text-center">
						<div
							class="mb-4 inline-flex items-center gap-3 rounded-full border border-primary-500/30 bg-primary-500/10 px-6 py-2 backdrop-blur-sm"
						>
							<Award class="h-5 w-5 text-primary-400" />
							<span class="font-semibold text-primary-300">PROVEN EXCELLENCE</span>
						</div>
						<h2 class="mb-6 text-6xl font-black text-surface-50">
							Impact That <span
								class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
								>Matters</span
							>
						</h2>
						<p class="text-2xl text-surface-300">Numbers that tell the story of success</p>
					</div>

					<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						{#each stats as stat}
							{@const Icon = stat.icon}
							<div
								class="stat-card group relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 p-8 backdrop-blur-xl transition-all duration-700 hover:scale-110 hover:border-primary-500/60 hover:bg-gradient-to-br hover:from-primary-600/20 hover:to-primary-500/10 hover:shadow-2xl hover:shadow-primary-500/30"
							>
								<!-- Premium Glow Effect -->
								<div
									class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
								></div>

								<!-- Floating Icon Background -->
								<div
									class="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 blur-2xl transition-all group-hover:scale-150 group-hover:opacity-100"
								></div>

								<div class="relative z-10">
									<!-- Icon with Premium Styling -->
									<div class="mb-6 flex items-center justify-between">
										<div class="relative">
											<div
												class="rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 p-4 transition-all group-hover:scale-125 group-hover:rotate-12"
											>
												<Icon
													class="h-10 w-10 {stat.color} transition-colors group-hover:text-primary-300"
												/>
											</div>
											<div
												class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
											></div>
										</div>
										<div class="text-right">
											<div
												class="text-5xl font-black text-surface-50 transition-colors group-hover:text-primary-400"
											>
												{stat.value}
											</div>
											<div class="text-xs font-semibold tracking-wider text-primary-400 uppercase">
												Achievement
											</div>
										</div>
									</div>

									<!-- Premium Content -->
									<h3
										class="mb-3 text-xl font-bold text-surface-50 transition-colors group-hover:text-primary-300"
									>
										{stat.title}
									</h3>
									<p
										class="leading-relaxed text-surface-400 transition-colors group-hover:text-surface-300"
									>
										{stat.subtitle}
									</p>

									<!-- Success Indicator -->
									<div class="mt-4 flex items-center gap-2">
										<div
											class="h-1 w-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
										></div>
										<span class="text-xs font-semibold text-primary-400">SUCCESS</span>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<!-- Bottom CTA -->
					<div class="mt-16 text-center">
						<p class="mb-6 text-xl text-surface-300">
							Ready to add your project to these success stories?
						</p>
						<a
							href="/contact"
							class="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-primary-500/30 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50"
						>
							<Rocket class="h-5 w-5" />
							Start Your Success Story
						</a>
					</div>
				</div>
			</section>

			<!-- Process Highlights Section -->
			<section class="relative py-20">
				<div
					class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
				></div>
				<div class="relative">
					<div class="mb-16 text-center">
						<div
							class="mb-4 inline-flex items-center gap-3 rounded-full border border-primary-500/30 bg-primary-500/10 px-6 py-2 backdrop-blur-sm"
						>
							<Code class="h-5 w-5 text-primary-400" />
							<span class="font-semibold text-primary-300">DEVELOPMENT PROCESS</span>
						</div>
						<h2 class="mb-6 text-6xl font-black text-surface-50">
							Process <span
								class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
								>Excellence</span
							>
						</h2>
						<p class="text-2xl text-surface-300">
							From transparent development to innovative problem-solving, every aspect is designed
							to deliver exceptional results
						</p>
					</div>

					<div class="grid gap-8 md:grid-cols-3">
						{#each processHighlights as highlight}
							{@const IconComponent = highlight.icon}
							<div
								class="group relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 p-8 backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:border-primary-500/60 hover:shadow-2xl hover:shadow-primary-500/30"
							>
								<!-- Premium Glow Effect -->
								<div
									class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
								></div>

								<div class="relative z-10">
									<div class="mb-6 flex items-center gap-3">
										<div
											class="rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 p-4 transition-all group-hover:scale-125 group-hover:rotate-12"
										>
											<IconComponent class="h-6 w-6 text-primary-400" />
										</div>
										<h3 class="text-2xl font-bold text-surface-50 group-hover:text-primary-300">
											{highlight.title}
										</h3>
									</div>
									<p class="mb-6 leading-relaxed text-surface-400 group-hover:text-surface-300">
										{highlight.description}
									</p>
									<div class="space-y-3">
										{#each highlight.metrics as metric}
											<div class="flex items-center gap-3">
												<div
													class="rounded-full bg-gradient-to-r from-primary-500/30 to-primary-600/20 p-1.5"
												>
													<CheckCircle2 size={16} class="text-primary-400" />
												</div>
												<span class="text-sm font-semibold text-surface-300">{metric}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- Expertise Showcase Section -->
			<section class="relative py-20">
				<div
					class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
				></div>
				<div class="relative">
					<div class="mb-16 text-center">
						<div
							class="mb-4 inline-flex items-center gap-3 rounded-full border border-primary-500/30 bg-primary-500/10 px-6 py-2 backdrop-blur-sm"
						>
							<Sparkles class="h-5 w-5 text-primary-400" />
							<span class="font-semibold text-primary-300">TECHNICAL EXCELLENCE</span>
						</div>
						<h2 class="mb-6 text-6xl font-black text-surface-50">
							Technical <span
								class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
								>Expertise</span
							>
						</h2>
						<p class="text-2xl text-surface-300">
							From SaaS architecture to innovative experiments, every project demonstrates deep
							technical expertise and business impact
						</p>
					</div>

					<div class="grid gap-8 md:grid-cols-3">
						{#each expertiseShowcase as area}
							{@const IconComponent = area.icon}
							<div
								class="group relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 p-8 backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:border-primary-500/60 hover:shadow-2xl hover:shadow-primary-500/30"
							>
								<!-- Premium Glow Effect -->
								<div
									class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
								></div>

								<div class="relative z-10">
									<div class="mb-6 flex items-center gap-3">
										<div
											class="rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 p-4 transition-all group-hover:scale-125 group-hover:rotate-12"
										>
											<IconComponent class="h-6 w-6 text-primary-400" />
										</div>
										<h3 class="text-2xl font-bold text-surface-50 group-hover:text-primary-300">
											{area.title}
										</h3>
									</div>
									<p class="mb-6 leading-relaxed text-surface-400 group-hover:text-surface-300">
										{area.description}
									</p>
									<div class="space-y-3">
										{#each area.metrics as metric}
											<div class="flex items-center gap-3">
												<div
													class="rounded-full bg-gradient-to-r from-primary-500/30 to-primary-600/20 p-1.5"
												>
													<CheckCircle2 size={16} class="text-primary-400" />
												</div>
												<span class="text-sm font-semibold text-surface-300">{metric}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- Main Content Grid -->
			<div class="grid gap-8 lg:grid-cols-3">
				<!-- Left Column -->
				<div class="space-y-8 lg:col-span-1">
					<!-- Premium Expertise Breakdown -->
					<div
						class="relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 p-8 backdrop-blur-xl"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
						></div>
						<div class="relative z-10">
							<div class="mb-6 flex items-center justify-between">
								<div>
									<h3 class="text-2xl font-black text-surface-50">Expertise</h3>
									<p class="text-sm font-semibold text-primary-400">SPECIALIZATION BREAKDOWN</p>
								</div>
								<div class="rounded-2xl bg-primary-500/20 p-3">
									<TrendingUp class="h-6 w-6 text-primary-400" />
								</div>
							</div>

							<div class="space-y-8">
								{#each workCategories as category}
									<div class="group relative">
										<!-- Premium Progress Container -->
										<div class="relative mb-4 flex items-center justify-between">
											<div class="flex items-center gap-3">
												<div
													class="h-3 w-3 rounded-full {category.color
														.replace('bg-', 'from- bg-gradient-to-r')
														.replace('-500', '-400 to-')
														.replace('-500', '-600')} shadow-lg"
												></div>
												<span class="text-lg font-bold text-surface-100">{category.name}</span>
											</div>
											<div class="text-right">
												<div class="text-2xl font-black text-surface-50">{category.count}</div>
												<div class="text-xs text-surface-400">projects</div>
											</div>
										</div>

										<!-- Animated Progress Bar -->
										<div
											class="relative h-4 overflow-hidden rounded-full bg-surface-700/50 backdrop-blur-sm"
										>
											<div
												class="absolute inset-0 rounded-full bg-gradient-to-r from-surface-600/30 to-surface-500/30"
											></div>
											<div
												class="progress-bar relative h-full rounded-full {category.color} shadow-lg transition-all duration-1500 ease-out"
												data-percentage={category.percentage}
												style="width: 0%"
											>
												<div
													class="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent"
												></div>
												<div
													class="absolute top-1/2 right-2 -translate-y-1/2 text-xs font-bold text-white"
												>
													{category.percentage}%
												</div>
											</div>
										</div>

										<!-- Achievement Badge -->
										<div class="mt-3 flex items-center justify-between">
											<div class="flex items-center gap-2">
												<Star class="h-4 w-4 text-primary-400" />
												<span class="text-sm text-surface-400">
													{category.percentage >= 50
														? 'Primary Expertise'
														: category.percentage >= 25
															? 'Secondary Skill'
															: 'Growing Area'}
												</span>
											</div>
											<div class="rounded-full bg-primary-500/20 px-3 py-1">
												<span class="text-xs font-bold text-primary-300">
													{category.percentage >= 50
														? 'MASTER'
														: category.percentage >= 25
															? 'EXPERT'
															: 'GROWING'}
												</span>
											</div>
										</div>
									</div>
								{/each}
							</div>

							<!-- Bottom Insight -->
							<div
								class="mt-8 rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-600/10 to-primary-500/5 p-6"
							>
								<div class="mb-3 flex items-center gap-3">
									<Zap class="h-5 w-5 text-primary-400" />
									<span class="font-bold text-primary-300">INSIGHT</span>
								</div>
								<p class="text-sm leading-relaxed text-surface-300">
									<strong class="text-primary-400">70% Front-end Focus</strong> demonstrates deep specialization
									in modern web technologies, ensuring your projects get the expertise they deserve.
								</p>
							</div>
						</div>
					</div>

					<!-- Premium Profile Showcase -->
					<div
						class="relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 backdrop-blur-xl"
					>
						<!-- Premium Background Effects -->
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-transparent to-primary-600/10"
						></div>
						<div
							class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-r from-primary-500/20 to-transparent blur-3xl"
						></div>

						<div class="relative z-10 p-8 text-center">
							<!-- Premium Avatar with Glow -->
							<div class="relative mx-auto mb-6 inline-block">
								<div
									class="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-500/30 via-primary-400/20 to-primary-600/30 blur-xl"
								></div>
								<div
									class="relative h-28 w-28 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-2xl shadow-primary-500/40"
								>
									<img
										src="https://khoobkar.com/_app/immutable/assets/hessam-avatar.b941527b.jpg"
										class="h-full w-full object-cover"
										alt="Hessam Khoobkar"
									/>
									<div
										class="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent"
									></div>
								</div>
								<!-- Online Status -->
								<div
									class="absolute -right-1 -bottom-1 h-8 w-8 rounded-full border-4 border-surface-800 bg-green-500 shadow-lg"
								>
									<div class="absolute inset-1 animate-pulse rounded-full bg-green-400"></div>
								</div>
							</div>

							<!-- Premium Name & Title -->
							<h3 class="mb-2 text-2xl font-black text-surface-50">Hessam Khoobkar</h3>
							<p
								class="mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-lg font-bold text-transparent"
							>
								Senior Front-End Architect
							</p>

							<!-- Premium Status Badges -->
							<div class="mb-6 flex flex-wrap justify-center gap-3">
								<div
									class="relative rounded-full border border-primary-500/30 bg-gradient-to-r from-primary-600/30 to-primary-500/20 px-4 py-2"
								>
									<div
										class="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-transparent"
									></div>
									<span class="relative text-sm font-bold text-primary-200">AVAILABLE NOW</span>
								</div>
								<div
									class="relative rounded-full border border-green-500/30 bg-gradient-to-r from-green-600/30 to-green-500/20 px-4 py-2"
								>
									<div
										class="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-transparent"
									></div>
									<span class="relative text-sm font-bold text-green-200">HIRING</span>
								</div>
							</div>

							<!-- Location & Availability -->
							<div class="space-y-3 text-surface-300">
								<div class="flex items-center justify-center gap-3">
									<div class="rounded-full bg-primary-500/20 p-2">
										<MapPin class="h-4 w-4 text-primary-400" />
									</div>
									<span class="font-semibold">Tallinn, Estonia</span>
								</div>
								<div class="flex items-center justify-center gap-3">
									<div class="rounded-full bg-blue-500/20 p-2">
										<Globe class="h-4 w-4 text-blue-400" />
									</div>
									<span class="font-semibold">Global Remote Available</span>
								</div>
								<div class="flex items-center justify-center gap-3">
									<div class="rounded-full bg-green-500/20 p-2">
										<Clock class="h-4 w-4 text-green-400" />
									</div>
									<span class="font-semibold">24h Response Time</span>
								</div>
							</div>

							<!-- Premium CTA -->
							<div class="mt-8">
								<a
									href="/contact"
									class="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 font-bold text-white shadow-xl shadow-primary-500/30 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50"
								>
									<div
										class="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 to-primary-300 opacity-0 transition-opacity group-hover:opacity-100"
									></div>
									<MessageSquare class="relative h-5 w-5" />
									<span class="relative">Let's Connect</span>
								</a>
							</div>

							<!-- Social Proof -->
							<div class="mt-6 border-t border-surface-700/50 pt-6">
								<p class="mb-2 text-sm text-surface-400">Trusted by</p>
								<div class="flex items-center justify-center gap-4">
									<div class="text-xs text-surface-500">30+ Companies</div>
									<div class="h-4 w-px bg-surface-600"></div>
									<div class="text-xs text-surface-500">50+ Projects</div>
									<div class="h-4 w-px bg-surface-600"></div>
									<div class="text-xs text-surface-500">6+ Years</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Premium Action Center -->
					<div
						class="relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 backdrop-blur-xl"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
						></div>
						<div class="relative z-10 p-8">
							<div class="mb-8 text-center">
								<h3 class="mb-2 text-2xl font-black text-surface-50">Take Action</h3>
								<p class="text-sm font-semibold text-primary-400">YOUR NEXT MOVE</p>
							</div>

							<div class="space-y-4">
								<!-- Portfolio Action -->
								<a
									href="/work"
									class="group relative flex items-center gap-4 rounded-2xl border border-transparent bg-gradient-to-r from-surface-700/40 to-surface-600/30 p-6 text-surface-200 transition-all duration-300 hover:scale-105 hover:border-primary-500/30 hover:bg-gradient-to-r hover:from-primary-600/20 hover:to-primary-500/10"
								>
									<div
										class="relative rounded-xl bg-gradient-to-br from-primary-500/30 to-primary-600/20 p-3 transition-all group-hover:scale-110 group-hover:rotate-6"
									>
										<Code class="h-6 w-6 text-primary-300" />
										<div
											class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
										></div>
									</div>
									<div class="flex-1">
										<span
											class="block text-lg font-bold text-surface-100 transition-colors group-hover:text-primary-300"
											>Explore Portfolio</span
										>
										<span class="text-sm text-surface-400">See my latest work</span>
									</div>
									<ArrowRight
										class="h-5 w-5 transition-all group-hover:translate-x-2 group-hover:text-primary-400"
									/>
								</a>

								<!-- Contact Action - Premium -->
								<a
									href="/contact"
									class="group relative flex items-center gap-4 rounded-2xl border border-primary-500/30 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/40"
								>
									<div
										class="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-primary-300/20 opacity-0 transition-opacity group-hover:opacity-100"
									></div>
									<div
										class="relative rounded-xl bg-white/20 p-3 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:rotate-6"
									>
										<MessageSquare class="h-6 w-6 text-white" />
									</div>
									<div class="relative flex-1">
										<span
											class="block text-lg font-bold transition-colors group-hover:text-primary-100"
											>Start Project</span
										>
										<span class="text-sm text-primary-100/80">Let's build something amazing</span>
									</div>
									<ArrowRight
										class="h-5 w-5 transition-all group-hover:translate-x-2 group-hover:text-primary-100"
									/>
									<div
										class="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm"
									></div>
								</a>
							</div>

							<!-- Bottom Incentive -->
							<div
								class="mt-8 rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-600/10 to-primary-500/5 p-6"
							>
								<div class="mb-3 flex items-center gap-3">
									<Zap class="h-5 w-5 text-primary-400" />
									<span class="text-sm font-bold text-primary-300">QUICK START</span>
								</div>
								<p class="text-sm leading-relaxed text-surface-300">
									<strong class="text-primary-400">Free consultation</strong> for your next project.
									Let's discuss how I can help you achieve your goals.
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column -->
				<div class="space-y-8 lg:col-span-2">
					<!-- Premium Achievement Showcase -->
					<div
						class="relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 backdrop-blur-xl"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
						></div>
						<div class="relative z-10 p-8">
							<div class="mb-8 flex items-center justify-between">
								<div>
									<h3 class="mb-2 text-3xl font-black text-surface-50">Success Stories</h3>
									<p class="text-sm font-semibold text-primary-400">RECENT VICTORIES</p>
								</div>
								<a
									href="/work"
									class="group flex items-center gap-2 rounded-2xl border border-primary-500/30 bg-primary-600/20 px-4 py-2 text-primary-300 transition-all hover:scale-105 hover:bg-primary-600/30"
								>
									<span class="font-semibold">View Portfolio</span>
									<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
								</a>
							</div>

							<div class="space-y-6">
								{#each recentActivity as activity}
									{@const ActivityIcon = activity.icon}
									<div
										class="group relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-surface-700/40 to-surface-600/30 p-6 transition-all duration-300 hover:scale-105 hover:border-primary-500/30 hover:bg-gradient-to-r hover:from-primary-600/20 hover:to-primary-500/10"
									>
										<!-- Premium Glow Effect -->
										<div
											class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/10 opacity-0 blur-sm transition-opacity group-hover:opacity-100"
										></div>

										<div class="relative z-10 flex items-center gap-6">
											<!-- Premium Icon Container -->
											<div class="relative">
												<div
													class="rounded-2xl bg-gradient-to-br from-primary-500/30 to-primary-600/20 p-4 transition-all group-hover:scale-110 group-hover:rotate-6"
												>
													<ActivityIcon
														class="h-8 w-8 text-primary-300 transition-colors group-hover:text-primary-200"
													/>
												</div>
												<div
													class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
												></div>
											</div>

											<!-- Content -->
											<div class="flex-1">
												<h4
													class="mb-2 text-xl font-bold text-surface-50 transition-colors group-hover:text-primary-300"
												>
													{activity.title}
												</h4>
												<div class="flex items-center gap-3 text-sm text-surface-400">
													<span class="font-semibold">{activity.type}</span>
													<div class="h-1 w-1 rounded-full bg-surface-500"></div>
													<span>{activity.time}</span>
												</div>
											</div>

											<!-- Premium Status Badge -->
											<div class="relative">
												<div
													class="rounded-2xl px-4 py-2 text-sm font-bold {activity.status ===
													'completed'
														? 'border border-green-500/30 bg-gradient-to-r from-green-600/30 to-green-500/20 text-green-200'
														: activity.status === 'in-progress'
															? 'border border-yellow-500/30 bg-gradient-to-r from-yellow-600/30 to-yellow-500/20 text-yellow-200'
															: 'border border-gray-500/30 bg-gradient-to-r from-gray-600/30 to-gray-500/20 text-gray-200'}"
												>
													<div
														class="absolute inset-0 rounded-2xl {activity.status === 'completed'
															? 'bg-gradient-to-r from-green-400/20 to-transparent'
															: activity.status === 'in-progress'
																? 'bg-gradient-to-r from-yellow-400/20 to-transparent'
																: 'bg-gradient-to-r from-gray-400/20 to-transparent'} opacity-0 transition-opacity group-hover:opacity-100"
													></div>
													<span class="relative tracking-wider uppercase">
														{activity.status}
													</span>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>

							<!-- Bottom Success Indicator -->
							<div
								class="mt-8 rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-600/10 to-primary-500/5 p-6"
							>
								<div class="mb-3 flex items-center gap-3">
									<Award class="h-5 w-5 text-primary-400" />
									<span class="text-sm font-bold text-primary-300">TRACK RECORD</span>
								</div>
								<p class="text-sm leading-relaxed text-surface-300">
									<strong class="text-primary-400">Consistent delivery</strong> of high-impact projects.
									Every milestone achieved, every deadline met, every client satisfied.
								</p>
							</div>
						</div>
					</div>

					<!-- Premium Tech Arsenal Showcase -->
					<div
						class="relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 backdrop-blur-xl"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
						></div>
						<div class="relative z-10 p-8">
							<div class="mb-8">
								<h3 class="mb-2 text-3xl font-black text-surface-50">Tech Arsenal</h3>
								<p class="mb-4 text-sm font-semibold text-primary-400">BATTLE-TESTED TOOLS</p>
								<p class="text-lg leading-relaxed text-surface-300">
									Modern stack, <strong class="text-primary-400">proven in production</strong>,
									<strong class="text-surface-50">optimized for performance</strong>
								</p>
							</div>

							<!-- Premium Tech Grid -->
							<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
								{#each techStack as tech}
									<div
										class="tech-tag group relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-surface-700/50 to-surface-600/30 p-4 transition-all duration-300 hover:scale-110 hover:border-primary-500/30 hover:bg-gradient-to-br hover:from-primary-600/30 hover:to-primary-500/20 hover:shadow-lg hover:shadow-primary-500/20"
									>
										<!-- Premium Glow Effect -->
										<div
											class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500/20 via-transparent to-primary-500/20 opacity-0 blur-sm transition-opacity group-hover:opacity-100"
										></div>

										<div class="relative z-10 text-center">
											<div
												class="text-sm font-bold text-surface-200 transition-colors group-hover:text-primary-300"
											>
												{tech}
											</div>
											<div class="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-600/50">
												<div
													class="h-full w-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-1000 group-hover:w-full"
												></div>
											</div>
										</div>
									</div>
								{/each}
							</div>

							<!-- Tech Categories -->
							<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
								<!-- Frontend Technologies -->
								<div
									class="rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-600/10 to-primary-500/5 p-6"
								>
									<div class="mb-4 flex items-center gap-3">
										<div class="rounded-xl bg-primary-500/20 p-2">
											<Code class="h-5 w-5 text-primary-400" />
										</div>
										<span class="font-bold text-primary-300">Frontend</span>
									</div>
									<p class="text-sm leading-relaxed text-surface-300">
										<strong class="text-primary-400">React, Svelte, Vue.js</strong> with modern tooling
										for lightning-fast development.
									</p>
								</div>

								<!-- Backend & APIs -->
								<div
									class="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-500/5 p-6"
								>
									<div class="mb-4 flex items-center gap-3">
										<div class="rounded-xl bg-blue-500/20 p-2">
											<Zap class="h-5 w-5 text-blue-400" />
										</div>
										<span class="font-bold text-blue-300">APIs & Data</span>
									</div>
									<p class="text-sm leading-relaxed text-surface-300">
										<strong class="text-blue-400">GraphQL, REST APIs</strong> with seamless data integration
										and real-time updates.
									</p>
								</div>

								<!-- DevOps & Tools -->
								<div
									class="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-600/10 to-green-500/5 p-6"
								>
									<div class="mb-4 flex items-center gap-3">
										<div class="rounded-xl bg-green-500/20 p-2">
											<Rocket class="h-5 w-5 text-green-400" />
										</div>
										<span class="font-bold text-green-300">DevOps</span>
									</div>
									<p class="text-sm leading-relaxed text-surface-300">
										<strong class="text-green-400">Docker, CI/CD</strong> for reliable deployment and
										scalable infrastructure.
									</p>
								</div>
							</div>

							<!-- Bottom CTA -->
							<div
								class="mt-8 rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-600/10 to-primary-500/5 p-6"
							>
								<div class="mb-3 flex items-center gap-3">
									<Star class="h-5 w-5 text-primary-400" />
									<span class="text-sm font-bold text-primary-300">READY TO BUILD</span>
								</div>
								<p class="mb-4 text-sm leading-relaxed text-surface-300">
									<strong class="text-primary-400">24 cutting-edge technologies</strong> at your disposal.
									Let's choose the perfect stack for your project.
								</p>
								<a
									href="/contact"
									class="inline-flex items-center gap-2 rounded-xl border border-primary-500/30 bg-primary-600/20 px-4 py-2 text-sm font-semibold text-primary-300 transition-all hover:scale-105 hover:bg-primary-600/30"
								>
									<span>Contact me</span>
									<ArrowRight class="h-4 w-4" />
								</a>
							</div>
						</div>
					</div>

					<!-- Premium Achievement Highlights -->
					<div
						class="relative overflow-hidden rounded-3xl border border-surface-700/30 bg-gradient-to-br from-surface-800/60 to-surface-700/40 backdrop-blur-xl"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-600/5"
						></div>
						<div class="relative z-10 p-8">
							<div class="mb-8">
								<h3 class="mb-2 text-3xl font-black text-surface-50">Key Achievements</h3>
								<p class="text-sm font-semibold text-primary-400">CAREER HIGHLIGHTS</p>
							</div>

							<div class="space-y-6">
								{#each experienceHighlights as highlight}
									<div
										class="group relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-surface-700/40 to-surface-600/30 p-6 transition-all duration-300 hover:scale-105 hover:border-primary-500/30 hover:bg-gradient-to-r hover:from-primary-600/20 hover:to-primary-500/10"
									>
										<div
											class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/10 opacity-0 blur-sm transition-opacity group-hover:opacity-100"
										></div>

										<div class="relative z-10 flex items-start gap-4">
											<div
												class="relative mt-1 rounded-full bg-gradient-to-r from-primary-500/30 to-primary-600/20 p-2 transition-all group-hover:scale-110"
											>
												<CheckCircle2 class="h-5 w-5 text-primary-300" />
												<div
													class="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
												></div>
											</div>
											<p
												class="leading-relaxed font-medium text-surface-300 transition-colors group-hover:text-surface-200"
											>
												{highlight}
											</p>
										</div>
									</div>
								{/each}
							</div>

							<div
								class="mt-8 rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-600/10 to-primary-500/5 p-6"
							>
								<div class="mb-3 flex items-center gap-3">
									<Trophy class="h-5 w-5 text-primary-400" />
									<span class="text-sm font-bold text-primary-300">PROVEN RESULTS</span>
								</div>
								<p class="text-sm leading-relaxed text-surface-300">
									<strong class="text-primary-400">Consistent excellence</strong> across all projects.
									From startups to enterprise, every client gets world-class results.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Call to Action Section -->
			<Footer />
		</div>
	</div>
</div>
