<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import {
		Rocket,
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
		ArrowRight,
		Eye,
		Clock,
		Star,
		BarChart3,
		Layers,
		Globe,
		Smartphone
	} from '@lucide/svelte';

	let projects: ContentItem[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			projects = await loadContent('projects');
		} catch (error) {
			console.error('Failed to load projects:', error);
		} finally {
			loading = false;
		}
	});

	// Project categories for filtering
	const projectCategories = [
		{ id: 'all', label: 'All Projects', icon: Rocket },
		{ id: 'saas', label: 'SaaS Applications', icon: Layers },
		{ id: 'experiments', label: 'Experiments', icon: Sparkles },
		{ id: 'components', label: 'Complex Components', icon: Code2 },
		{ id: 'games', label: 'Web Games', icon: Globe }
	];

	let selectedCategory = $state('all');

	// Filter projects based on selected category
	const filteredProjects = $derived(() => {
		if (selectedCategory === 'all') return projects;
		return projects.filter((project: ContentItem) => project.meta.tags?.includes(selectedCategory));
	});

	// Stats for impact showcase
	const stats = [
		{ icon: Rocket, label: 'Active Projects', value: '5+', color: 'primary' },
		{ icon: Users, label: 'Users Impacted', value: '10K+', color: 'primary' },
		{ icon: TrendingUp, label: 'Performance Gain', value: '85%', color: 'primary' },
		{ icon: Award, label: 'Innovation Score', value: '95%', color: 'primary' }
	];

	// Expertise areas
	const expertise = [
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
</script>

<svelte:head>
	<title>Projects - Khoobkar</title>
	<meta
		name="description"
		content="Explore my SaaS applications, experiments, and complex components. See how I build scalable, innovative solutions that drive real business results."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<Silk />
	<div class="relative z-10 container mx-auto px-4 text-center">
		<div class="mx-auto max-w-4xl">
			<h1
				class="mb-6 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-6xl font-bold text-transparent md:text-8xl"
			>
				Innovation in Action
			</h1>
			<p class="mb-8 text-xl leading-relaxed text-surface-300 md:text-2xl">
				SaaS applications, experiments, and complex components that push the boundaries of what's
				possible on the web
			</p>
			<div class="mb-12 flex flex-wrap justify-center gap-4">
				{#each stats as stat}
					{@const Icon = stat.icon}
					<div
						class="flex items-center gap-2 rounded-full border border-surface-700 bg-surface-800/50 px-4 py-2 backdrop-blur-sm"
					>
						<Icon size={20} class="text-primary-400" />
						<span class="text-sm font-medium text-surface-200">{stat.value}</span>
						<span class="text-xs text-surface-400">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Expertise Showcase -->
<section class="bg-surface-900 py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">Technical Excellence</h2>
			<p class="mx-auto max-w-3xl text-xl text-surface-400">
				From SaaS architecture to innovative experiments, every project demonstrates deep technical
				expertise and business impact
			</p>
		</div>

		<div class="mb-16 grid gap-8 md:grid-cols-3">
			{#each expertise as area}
				{@const Icon = area.icon}
				<div
					class="group relative overflow-hidden rounded-2xl border border-surface-700 bg-gradient-to-br from-surface-800 to-surface-900 p-8 transition-all duration-300 hover:border-primary-500/50"
				>
					<div
						class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<div class="relative z-10">
						<div class="mb-4 flex items-center gap-3">
							<Icon size={24} class="text-primary-400" />
							<h3 class="text-xl font-semibold text-surface-100">{area.title}</h3>
						</div>
						<p class="mb-6 text-surface-400">{area.description}</p>
						<div class="space-y-2">
							{#each area.metrics as metric}
								<div class="flex items-center gap-2 text-sm text-surface-300">
									<CheckCircle2 size={16} class="text-primary-400" />
									<span>{metric}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Project Categories -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">Project Portfolio</h2>
			<p class="mx-auto max-w-3xl text-xl text-surface-400">
				Each project represents a unique challenge solved with innovative technology and strategic
				thinking
			</p>
		</div>

		<!-- Category Filter -->
		<div class="mb-12 flex flex-wrap justify-center gap-4">
			{#each projectCategories as category}
				{@const Icon = category.icon}
				<button
					class="flex items-center gap-2 rounded-full border px-6 py-3 transition-all duration-200 {selectedCategory ===
					category.id
						? 'border-primary-500 bg-primary-500 text-surface-900'
						: 'border-surface-700 bg-surface-800 text-surface-300 hover:border-primary-500/50 hover:text-surface-100'}"
					onclick={() => (selectedCategory = category.id)}
				>
					<Icon size={18} />
					<span class="font-medium">{category.label}</span>
				</button>
			{/each}
		</div>

		<!-- Projects Grid -->
		{#if loading}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _}
					<div class="animate-pulse">
						<div class="h-80 rounded-2xl bg-surface-800"></div>
					</div>
				{/each}
			</div>
		{:else if filteredProjects().length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects() as project}
					<ArticleCard
						post={project}
						basePath="/projects"
						contentTypeIcon={Rocket}
						contentTypeLabel="Project"
						buttonText="Explore"
					/>
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center">
				<Rocket size={64} class="mx-auto mb-4 text-surface-600" />
				<h3 class="mb-2 text-2xl font-semibold text-surface-300">No projects found</h3>
				<p class="text-surface-500">
					Try selecting a different category or check back later for new projects.
				</p>
			</div>
		{/if}
	</div>
</section>

<!-- Call to Action -->
<section class="bg-gradient-to-br from-primary-500/10 to-primary-600/10 py-20">
	<div class="container mx-auto px-4 text-center">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">
				Ready to Build Something Amazing?
			</h2>
			<p class="mb-8 text-xl text-surface-400">
				Let's discuss how I can help you create innovative solutions that drive real business
				results
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 font-semibold text-surface-900 transition-colors hover:bg-primary-400"
				>
					<span>Start a Project</span>
					<ArrowRight size={20} />
				</a>
				<a
					href="/process"
					class="inline-flex items-center gap-2 rounded-full border border-surface-700 px-8 py-4 font-semibold text-surface-300 transition-colors hover:border-primary-500 hover:text-surface-100"
				>
					<span>View My Process</span>
					<Eye size={20} />
				</a>
			</div>
		</div>
	</div>
</section>
