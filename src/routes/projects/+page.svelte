<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import {
		Rocket,
		ExternalLink,
		Github,
		TrendingUp,
		Users,
		Award,
		ArrowRight,
		Eye,
		Clock,
		Star,
		BarChart3,
		Layers,
		Globe,
		Smartphone,
		Sparkles,
		Code2
	} from '@lucide/svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

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
</script>

<svelte:head>
	<title>Projects - Khoobkar</title>
	<meta
		name="description"
		content="Explore my SaaS applications, experiments, and complex components. See how I build scalable, innovative solutions that drive real business results."
	/>
</svelte:head>

<!-- Hero Section -->
<SilkHero
	icon={Rocket}
	title="Innovation in Action"
	subtitle="SaaS applications, experiments, and complex components that push the boundaries of what's possible on the web"
	silkColor="#ef5e03"
	silkSpeed={5}
	silkScale={1}
	silkNoiseIntensity={1.5}
	silkRotation={0}
/>

<!-- Stats Section -->
<section class="relative z-10 container mx-auto px-4">
	<div class="flex flex-wrap justify-center gap-4">
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

<!-- Footer CTA -->
<section class="container mx-auto px-4 py-20">
	<Footer />
</section>
