<script lang="ts">
	import { onMount } from 'svelte';
	import { getRelatedContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let relatedPosts: ContentItem[] = $state([]);

	onMount(async () => {
		if (data.post) {
			relatedPosts = await getRelatedContent(data.post);
		}
	});
</script>

<svelte:head>
	<title>{data.post.meta.title} - Khoobkar</title>
	<meta name="description" content={data.post.meta.description} />
	{#if data.post.meta.image}
		<meta property="og:image" content={data.post.meta.image} />
	{/if}
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={data.post.meta.date} />
	{#if data.post.meta.author}
		<meta property="article:author" content={data.post.meta.author} />
	{/if}
	{#if data.post.meta.tags}
		{#each data.post.meta.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>

<div class="mx-auto max-w-4xl">
	<!-- Navigation breadcrumb -->
	<nav class="mb-8 text-sm text-surface-400">
		<a href="/" class="hover:text-surface-300">Home</a>
		<span class="mx-2">→</span>
		<a href="/insights" class="hover:text-surface-300">Insights</a>
		<span class="mx-2">→</span>
		<span class="text-surface-300">{data.post.meta.title}</span>
	</nav>

	<!-- Blog post header -->
	<header class="mb-8 border-b border-surface-200 pb-8">
		<h1 class="mb-4 text-4xl font-bold text-surface-50">{data.post.meta.title}</h1>

		<div class="mb-4 flex flex-wrap items-center gap-4 text-sm text-surface-300">
			{#if data.post.meta.date}
				<time datetime={data.post.meta.date} class="flex items-center gap-2">
					<span>📅</span>
					{new Date(data.post.meta.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			{/if}

			{#if data.post.meta.author}
				<span class="flex items-center gap-2">
					<span>👤</span>
					{data.post.meta.author}
				</span>
			{/if}

			{#if data.post.meta.readingTime}
				<span class="flex items-center gap-2">
					<span>⏱️</span>
					{data.post.meta.readingTime} min read
				</span>
			{/if}
		</div>

		{#if data.post.meta.description}
			<p class="text-lg text-surface-200">{data.post.meta.description}</p>
		{/if}

		{#if data.post.meta.tags && data.post.meta.tags.length > 0}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each data.post.meta.tags as tag}
					<span class="rounded-full bg-primary-500/20 px-3 py-1 text-xs text-primary-300">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<!-- Blog post content -->
	<div class="prose prose-lg mb-12 max-w-none prose-invert">
		{@html data.post.content}
	</div>

	<!-- Related posts -->
	{#if relatedPosts.length > 0}
		<section class="border-t border-surface-200 pt-12">
			<h2 class="mb-6 text-2xl font-bold text-surface-50">Related Posts</h2>
			<div class="grid gap-6 md:grid-cols-2">
				{#each relatedPosts as relatedPost}
					<article class="hover:bg-surface-750 rounded-lg bg-surface-800 p-6 transition-colors">
						<h3 class="mb-2 line-clamp-2 text-lg font-semibold text-surface-50">
							<a
								href="/insights/{relatedPost.meta.slug}"
								class="transition-colors hover:text-primary-400"
							>
								{relatedPost.meta.title}
							</a>
						</h3>
						<p class="mb-4 line-clamp-2 text-sm text-surface-300">
							{relatedPost.meta.description}
						</p>
						<div class="flex items-center justify-between text-xs text-surface-400">
							<time datetime={relatedPost.meta.date}>
								{new Date(relatedPost.meta.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
							{#if relatedPost.meta.readingTime}
								<span>{relatedPost.meta.readingTime} min read</span>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Back to insights -->
	<div class="mt-12 border-t border-surface-200 pt-8">
		<a
			href="/insights"
			class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
		>
			<span>←</span>
			Back to all insights
		</a>
	</div>
</div>
