<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';

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
</script>

<svelte:head>
	<title>Work - Khoobkar</title>
	<meta name="description" content="Portfolio and case studies showcasing our best work" />
</svelte:head>

<div class="mx-auto max-w-6xl">
	<header class="mb-12">
		<h1 class="mb-4 text-4xl font-bold text-surface-50">Our Work</h1>
		<p class="text-lg text-surface-300">
			Discover our portfolio of successful projects and the impact we've made for our clients.
		</p>
	</header>

	{#if loading}
		<div class="grid gap-8 md:grid-cols-2">
			{#each Array(4) as _}
				<div class="animate-pulse overflow-hidden rounded-lg bg-surface-800">
					<div class="h-48 bg-surface-700"></div>
					<div class="p-6">
						<div class="mb-4 h-4 rounded bg-surface-700"></div>
						<div class="mb-2 h-3 rounded bg-surface-700"></div>
						<div class="h-3 w-2/3 rounded bg-surface-700"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else if caseStudies.length === 0}
		<div class="py-12 text-center">
			<div class="mb-4 text-6xl">💼</div>
			<h2 class="mb-2 text-2xl font-semibold text-surface-200">Case studies coming soon</h2>
			<p class="text-surface-400">We're preparing detailed case studies of our recent projects.</p>
		</div>
	{:else}
		<div class="grid gap-8 md:grid-cols-2">
			{#each caseStudies as caseStudy}
				<article
					class="hover:bg-surface-750 overflow-hidden rounded-lg bg-surface-800 transition-all duration-300 hover:scale-[1.02]"
				>
					{#if caseStudy.meta.image}
						<div class="aspect-video overflow-hidden bg-surface-700">
							<img
								src={caseStudy.meta.image}
								alt={caseStudy.meta.title}
								class="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
							/>
						</div>
					{/if}

					<div class="p-6">
						<div class="mb-3 flex items-center gap-2 text-sm text-surface-400">
							<span class="rounded bg-primary-500/20 px-2 py-1 text-xs text-primary-300">
								Case Study
							</span>
							<time datetime={caseStudy.meta.date}>
								{new Date(caseStudy.meta.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short'
								})}
							</time>
							{#if caseStudy.meta.readingTime}
								<span>•</span>
								<span>{caseStudy.meta.readingTime} min read</span>
							{/if}
						</div>

						<h2 class="mb-3 line-clamp-2 text-xl font-semibold text-surface-50">
							<a
								href="/work/{caseStudy.meta.slug}"
								class="transition-colors hover:text-primary-400"
							>
								{caseStudy.meta.title}
							</a>
						</h2>

						<p class="mb-4 line-clamp-3 text-surface-300">
							{caseStudy.meta.description}
						</p>

						{#if caseStudy.meta.tags && caseStudy.meta.tags.length > 0}
							<div class="mb-4 flex flex-wrap gap-2">
								{#each caseStudy.meta.tags.slice(0, 4) as tag}
									<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">
										{tag}
									</span>
								{/each}
							</div>
						{/if}

						<a
							href="/work/{caseStudy.meta.slug}"
							class="inline-flex items-center gap-2 font-medium text-primary-400 transition-colors hover:text-primary-300"
						>
							View case study
							<span>→</span>
						</a>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
