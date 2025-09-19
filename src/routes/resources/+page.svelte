<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';

	let resources: ContentItem[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			resources = await loadContent('resources');
		} catch (error) {
			console.error('Failed to load resources:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Resources - Khoobkar</title>
	<meta
		name="description"
		content="Useful tools, guides, and resources for developers and designers"
	/>
</svelte:head>

<div class="mx-auto max-w-6xl">
	<header class="mb-12">
		<h1 class="mb-4 text-4xl font-bold text-surface-50">Resources</h1>
		<p class="text-lg text-surface-300">
			Curated tools, guides, and resources to help you build better digital products.
		</p>
	</header>

	{#if loading}
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each Array(6) as _}
				<div class="animate-pulse rounded-lg bg-surface-800 p-6">
					<div class="mb-4 h-4 rounded bg-surface-700"></div>
					<div class="mb-2 h-3 rounded bg-surface-700"></div>
					<div class="h-3 w-2/3 rounded bg-surface-700"></div>
				</div>
			{/each}
		</div>
	{:else if resources.length === 0}
		<div class="py-12 text-center">
			<div class="mb-4 text-6xl">🛠️</div>
			<h2 class="mb-2 text-2xl font-semibold text-surface-200">Resources coming soon</h2>
			<p class="text-surface-400">We're preparing a collection of useful tools and guides.</p>
		</div>
	{:else}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each resources as resource}
				<article
					class="hover:bg-surface-750 rounded-lg bg-surface-800 p-6 transition-all duration-300 hover:scale-[1.02]"
				>
					<div class="mb-3 flex items-center gap-2 text-sm text-surface-400">
						<span class="rounded bg-secondary-500/20 px-2 py-1 text-xs text-secondary-300">
							Resource
						</span>
						<time datetime={resource.meta.date}>
							{new Date(resource.meta.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</time>
						{#if resource.meta.readingTime}
							<span>•</span>
							<span>{resource.meta.readingTime} min read</span>
						{/if}
					</div>

					<h2 class="mb-3 line-clamp-2 text-xl font-semibold text-surface-50">
						<a
							href="/resources/{resource.meta.slug}"
							class="transition-colors hover:text-secondary-400"
						>
							{resource.meta.title}
						</a>
					</h2>

					<p class="mb-4 line-clamp-3 text-surface-300">
						{resource.meta.description}
					</p>

					{#if resource.meta.tags && resource.meta.tags.length > 0}
						<div class="mb-4 flex flex-wrap gap-2">
							{#each resource.meta.tags.slice(0, 3) as tag}
								<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">
									{tag}
								</span>
							{/each}
							{#if resource.meta.tags.length > 3}
								<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-400">
									+{resource.meta.tags.length - 3} more
								</span>
							{/if}
						</div>
					{/if}

					<a
						href="/resources/{resource.meta.slug}"
						class="inline-flex items-center gap-2 font-medium text-secondary-400 transition-colors hover:text-secondary-300"
					>
						View resource
						<span>→</span>
					</a>
				</article>
			{/each}
		</div>
	{/if}
</div>
