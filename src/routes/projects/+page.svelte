<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import { Rocket } from '@lucide/svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let projects: ContentItem[] = $state([]);
	let loading = $state(true);
	let selectedFilter = $state('all');

	onMount(async () => {
		try {
			projects = await loadContent('projects');
		} catch (error) {
			console.error('Failed to load projects:', error);
		} finally {
			loading = false;
		}
	});

	const filters = $derived(() => {
		const tagCounts = new Map<string, number>();
		let total = 0;

		for (const project of projects) {
			total += 1;
			for (const tag of project.meta.tags || []) {
				tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
			}
		}

		const formatLabel = (value: string) =>
			value
				.split('-')
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(' ');

		return [
			{ value: 'all', label: 'All Projects', count: total },
			...Array.from(tagCounts.entries())
				.sort(([a], [b]) => a.localeCompare(b))
				.filter(([, count]) => count >= 2)
				.map(([value, count]) => ({
					value,
					label: formatLabel(value),
					count
				}))
		];
	});

	$effect(() => {
		if (!filters().some((filter) => filter.value === selectedFilter)) {
			selectedFilter = 'all';
		}
	});

	const filteredProjects = $derived(() => {
		if (selectedFilter === 'all') {
			return projects;
		}

		return projects.filter((project) => project.meta.tags?.includes(selectedFilter));
	});
</script>

<svelte:head>
	<title>Projects - Khoobkar</title>
	<meta
		name="description"
		content="Explore my SaaS applications, experiments, and complex components. See how I build scalable, innovative solutions that drive real business results."
	/>
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<SilkHero
		icon={Rocket}
		title="Projects & Creative Solutions"
		subtitle="From experimental prototypes to real-world solutions—a showcase of creativity in motion."
		silkColor="#ef5e03"
		silkSpeed={5}
		silkScale={1}
		silkNoiseIntensity={1.5}
		silkRotation={0}
	/>

	<section class="mx-auto max-w-8xl space-y-4">
		<div class="flex flex-wrap items-center justify-center gap-3 overflow-x-auto pb-6">
			{#each filters() as filter}
				<button
					type="button"
					aria-pressed={selectedFilter === filter.value}
					class="group flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 focus-visible:outline-none {selectedFilter ===
					filter.value
						? 'border-primary-500 bg-primary-500 text-surface-900 shadow-lg shadow-primary-500/20'
						: 'border-surface-700/80 bg-surface-900/70 text-surface-300 hover:border-primary-500/50 hover:text-surface-100'}"
					onclick={() => (selectedFilter = filter.value)}
				>
					<span>{filter.label}</span>
					<span
						class="rounded-full bg-surface-950/60 px-2 py-0.5 text-xs font-semibold tracking-wide transition-colors duration-150 {selectedFilter ===
						filter.value
							? 'bg-surface-900/70 text-primary-300'
							: 'text-surface-500 group-hover:text-primary-300'}"
					>
						{filter.count}
					</span>
				</button>
			{/each}
		</div>

		{#if loading}
			<div class="grid gap-8 md:grid-cols-2">
				{#each Array(6) as _}
					<div class="animate-pulse rounded-2xl border border-surface-800 bg-surface-900/60 p-6">
						<div class="mb-4 h-4 rounded bg-surface-700"></div>
						<div class="mb-2 h-3 rounded bg-surface-700"></div>
						<div class="h-3 w-2/3 rounded bg-surface-700"></div>
					</div>
				{/each}
			</div>
		{:else if filteredProjects().length > 0}
			<div class="grid gap-8 md:grid-cols-2">
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
					Try selecting a different focus or check back later for new projects.
				</p>
			</div>
		{/if}

		<Footer />
	</section>
</div>
