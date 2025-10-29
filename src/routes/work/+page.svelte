<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import {
		Briefcase,
		ExternalLink,
		Github,
		TrendingUp,
		Users,
		Award,
		Target,
		Zap,
		Code2,
		Sparkles,
		CheckCircle2,
		Rocket,
		Eye
	} from '@lucide/svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let caseStudies: ContentItem[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			caseStudies = await loadContent('case-studies');
		} catch (error) {
			console.error('Failed to load case studies:', error);
		} finally {
			loading = false;
		}
	});

	// Stats for impact showcase
	const stats = [
		{ icon: Briefcase, label: 'Projects Delivered', value: '50+', color: 'primary' },
		{ icon: Users, label: 'Happy Clients', value: '30+', color: 'primary' },
		{ icon: Award, label: 'Years Experience', value: '10+', color: 'primary' },
		{ icon: TrendingUp, label: 'Avg. Performance Gain', value: '60%', color: 'primary' }
	];

	// Expertise areas
	const expertise = [
		{
			icon: Zap,
			title: 'Performance Engineering',
			description: 'Lightning-fast load times, 90+ Lighthouse scores, Core Web Vitals optimization'
		},
		{
			icon: Code2,
			title: 'Modern Tech Stack',
			description: 'React, Svelte, Next.js, TypeScript - building with cutting-edge technologies'
		},
		{
			icon: Target,
			title: 'Conversion Optimization',
			description: 'UX-driven design that turns visitors into customers, proven ROI increases'
		},
		{
			icon: Sparkles,
			title: 'Pixel-Perfect Design',
			description: 'Meticulous attention to detail, responsive across all devices and browsers'
		}
	];
</script>

<svelte:head>
	<title>Portfolio & Work - Hessam Khoobkar | Senior Front-End Developer</title>
	<meta
		name="description"
		content="Explore my portfolio of web development projects. From e-commerce platforms to SaaS applications, see real examples of pixel-perfect implementations and performance-optimized solutions."
	/>
	<meta
		name="keywords"
		content="web development portfolio, React projects, Svelte applications, front-end work, case studies, web developer portfolio"
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Portfolio & Work - Hessam Khoobkar" />
	<meta
		property="og:description"
		content="Explore my portfolio of web development projects showcasing pixel-perfect implementations."
	/>
	<meta property="og:url" content="https://khoobkar.com/work" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Portfolio & Work - Hessam Khoobkar" />
	<meta name="twitter:description" content="Explore my portfolio of web development projects." />
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<SilkHero
		icon={Briefcase}
		title="Portfolio & Success Stories"
		subtitle="Real projects. Real results. Real impact on businesses and users."
		silkColor="#ef5e03"
		silkSpeed={5}
		silkScale={1}
		silkNoiseIntensity={1.5}
		silkRotation={0}
	/>

	<div class="mx-auto max-w-7xl space-y-12 px-4 py-8">
		<!-- Stats Showcase -->
		<section
			class="grid gap-6 rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-transparent p-8 md:grid-cols-4"
		>
			{#each stats as stat}
				{@const Icon = stat.icon}
				<div class="group text-center transition-transform hover:scale-110">
					<div class="mb-3 flex justify-center">
						<div
							class="rounded-xl bg-primary-500/20 p-3 transition-all group-hover:bg-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-500/30"
						>
							<Icon size={32} class="text-primary-400" />
						</div>
					</div>
					<div
						class="mb-1 text-3xl font-bold text-surface-50 transition-all group-hover:text-primary-300 md:text-4xl"
					>
						{stat.value}
					</div>
					<div class="text-sm text-surface-300">{stat.label}</div>
				</div>
			{/each}
		</section>

		<!-- Value Proposition -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center md:p-12">
			<div class="mb-6 flex justify-center">
				<div class="rounded-full bg-primary-500/20 p-4">
					<Rocket size={48} class="text-primary-400" />
				</div>
			</div>
			<h2 class="mb-4 text-3xl font-bold text-surface-50 md:text-4xl">
				Building Digital Experiences That <span class="text-primary-400">Drive Results</span>
			</h2>
			<p class="mx-auto mb-8 max-w-3xl text-lg text-surface-200 md:text-xl">
				For 10+ years, I've partnered with startups, growing businesses, and enterprises to create
				web experiences that users love and businesses depend on. Every line of code is written with
				purpose, every design decision backed by data.
			</p>
			<div class="flex flex-wrap items-center justify-center gap-4 text-sm text-surface-300">
				<div class="flex items-center gap-2">
					<CheckCircle2 size={20} class="text-primary-400" />
					<span>On-time delivery</span>
				</div>
				<div class="flex items-center gap-2">
					<CheckCircle2 size={20} class="text-primary-400" />
					<span>Clean, maintainable code</span>
				</div>
				<div class="flex items-center gap-2">
					<CheckCircle2 size={20} class="text-primary-400" />
					<span>Proven ROI improvements</span>
				</div>
				<div class="flex items-center gap-2">
					<CheckCircle2 size={20} class="text-primary-400" />
					<span>Mobile-first approach</span>
				</div>
			</div>
		</section>

		<!-- Expertise Areas -->
		<section>
			<div class="mb-8 text-center">
				<h2 class="mb-3 text-3xl font-bold text-surface-50">Core Expertise</h2>
				<p class="text-lg text-surface-300">
					Specialized skills that deliver measurable business impact
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				{#each expertise as area}
					{@const Icon = area.icon}
					<div
						class="group hover:bg-surface-750 rounded-2xl border border-surface-600 bg-surface-800 p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 md:p-8"
					>
						<div class="mb-4 flex items-start gap-4">
							<div
								class="rounded-xl bg-primary-500/20 p-3 transition-all group-hover:scale-110 group-hover:bg-primary-500/30"
							>
								<Icon size={28} class="text-primary-400" />
							</div>
							<div class="flex-1">
								<h3 class="mb-2 text-xl font-semibold text-surface-50">{area.title}</h3>
								<p class="text-surface-300">{area.description}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Case Studies Section Header -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center">
			<div class="mb-4 flex justify-center">
				<div class="rounded-full bg-primary-500/20 p-4">
					<Eye size={40} class="text-primary-400" />
				</div>
			</div>
			<h2 class="mb-4 text-3xl font-bold text-surface-50">Featured Projects & Case Studies</h2>
			<p class="mx-auto max-w-2xl text-lg text-surface-300">
				Detailed breakdowns of challenges, solutions, and measurable outcomes from real-world
				projects
			</p>
		</section>

		{#if loading}
			<div class="grid gap-8 md:grid-cols-2">
				{#each Array(6) as _}
					<div class="animate-pulse overflow-hidden rounded-2xl bg-surface-800">
						<div class="h-56 bg-surface-700"></div>
						<div class="p-6">
							<div class="mb-4 h-4 rounded bg-surface-700"></div>
							<div class="mb-2 h-3 rounded bg-surface-700"></div>
							<div class="h-3 w-2/3 rounded bg-surface-700"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if caseStudies.length === 0}
			<!-- Empty State with Project Highlights -->
			<div class="space-y-8">
				<div class="rounded-2xl border border-surface-600 bg-surface-800 p-12 text-center">
					<div class="mb-6 flex justify-center">
						<div class="rounded-full bg-primary-500/20 p-6">
							<Briefcase size={48} class="text-primary-400" />
						</div>
					</div>
					<h2 class="mb-4 text-2xl font-semibold text-surface-50">Case Studies Coming Soon</h2>
					<p class="mx-auto mb-8 max-w-2xl text-surface-300">
						I'm currently documenting detailed case studies of my recent projects. In the meantime,
						here's a quick overview of my work:
					</p>
				</div>

				<!-- Project Highlights -->
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">🛒</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">E-commerce Platforms</h3>
						<p class="mb-4 text-sm text-surface-300">
							Built responsive e-commerce solutions with Shopify, WooCommerce, and custom React
							applications. Improved conversion rates by 30-45%.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">React</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">Next.js</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">Shopify</span>
						</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">💼</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">SaaS Applications</h3>
						<p class="mb-4 text-sm text-surface-300">
							Developed scalable SaaS platforms with complex dashboards, real-time data
							visualization, and intuitive user interfaces.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">Svelte</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">Vue.js</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">D3.js</span>
						</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">📱</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Progressive Web Apps</h3>
						<p class="mb-4 text-sm text-surface-300">
							Created PWAs with offline functionality, push notifications, and native-like
							performance across all devices.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">PWA</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">
								Service Workers
							</span>
						</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">🎨</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Design System Implementation</h3>
						<p class="mb-4 text-sm text-surface-300">
							Built component libraries and design systems from Figma designs, ensuring consistency
							across large applications.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">
								Storybook
							</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">Tailwind</span
							>
						</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">⚡</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Performance Optimization</h3>
						<p class="mb-4 text-sm text-surface-300">
							Optimized existing applications, reducing load times by 50-70% and achieving perfect
							Lighthouse scores.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">
								Lighthouse
							</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300"
								>Core Web Vitals</span
							>
						</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">🌐</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Corporate Websites</h3>
						<p class="mb-4 text-sm text-surface-300">
							Developed professional corporate websites with CMS integration, multi-language
							support, and SEO optimization.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">CMS</span>
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">SEO</span>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-2">
				{#each caseStudies as caseStudy}
					<ArticleCard
						post={caseStudy}
						basePath="/work"
						contentTypeIcon={Briefcase}
						contentTypeLabel="Case Study"
						buttonText="View case study"
					/>
				{/each}
			</div>

			<!-- CTA Section -->
			<Footer />
		{/if}
	</div>
</div>
