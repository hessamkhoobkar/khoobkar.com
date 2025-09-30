<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';

	let blogPosts: ContentItem[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			blogPosts = await loadContent('blog');
		} catch (error) {
			console.error('Failed to load blog posts:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Insights - Khoobkar</title>
	<meta name="description" content="Insights, thoughts, and updates from our team" />
</svelte:head>

<div class="">
	<header
		class="relative mt-4 mb-8 h-80 w-full overflow-hidden rounded-2xl border border-surface-600"
	>
		<Silk speed={5} scale={1} color="#ef5e03" noiseIntensity={1.5} rotation={0} />
		<div class="absolute inset-0 z-2 flex flex-col items-center justify-center">
			<h1 class="mb-4 text-5xl font-bold text-surface-50">Insights</h1>
			<p class="w-2xl text-center text-xl">Thoughts, insights, and updates from me.</p>
		</div>
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
	{:else if blogPosts.length === 0}
		<div class="py-12 text-center">
			<div class="mb-4 text-6xl">📝</div>
			<h2 class="mb-2 text-2xl font-semibold text-surface-200">No posts yet</h2>
			<p class="text-surface-400">Check back soon for new insights and articles.</p>
		</div>
	{:else}
		<div class="masonry-grid">
			{#each blogPosts as post}
				<ArticleCard {post} basePath="/insights" />
			{/each}
		</div>
	{/if}
</div>
