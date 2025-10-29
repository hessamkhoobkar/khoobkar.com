<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import { generateBlogSchema } from '$lib/utils/structured-data';
	import type { ContentItem } from '$lib/data/content';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import { FileText } from '@lucide/svelte';

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

	// Generate JSON-LD structured data for blog listing page
	const structuredData = $derived(
		generateBlogSchema(
			blogPosts,
			'https://khoobkar.com/insights',
			'Insights - Khoobkar',
			'Thoughts, insights, and updates from Hessam Khoobkar'
		)
	);
</script>

<svelte:head>
	<title>Insights - Khoobkar</title>
	<meta name="description" content="Insights, thoughts, and updates from our team" />

	<!-- JSON-LD Structured Data for SEO -->
	{@html '<script type="application/ld+json">' + JSON.stringify(structuredData) + '</script>'}
</svelte:head>

<div class="mt-4">
	<SilkHero
		icon={FileText}
		title="Insights"
		subtitle="Thoughts, insights, and updates from me."
		silkColor="#ef5e03"
		silkSpeed={5}
		silkScale={1}
		silkNoiseIntensity={1.5}
		silkRotation={0}
	/>

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
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each blogPosts as post}
				<ArticleCard {post} basePath="/insights" buttonText="Read more" />
			{/each}
		</div>
	{/if}
</div>
