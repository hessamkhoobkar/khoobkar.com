<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';

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

<div class="mx-auto max-w-6xl">
	<header class="mb-12">
		<h1 class="mb-4 text-4xl font-bold text-surface-50">Insights</h1>
		<p class="text-lg text-surface-300">
			Thoughts, insights, and updates from our team on technology, design, and digital innovation.
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
	{:else if blogPosts.length === 0}
		<div class="py-12 text-center">
			<div class="mb-4 text-6xl">📝</div>
			<h2 class="mb-2 text-2xl font-semibold text-surface-200">No posts yet</h2>
			<p class="text-surface-400">Check back soon for new insights and articles.</p>
		</div>
	{:else}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each blogPosts as post}
				<article
					class="hover:bg-surface-750 overflow-hidden rounded-lg bg-surface-800 transition-colors"
				>
					{#if post.meta.image}
						<div class="aspect-video bg-surface-700">
							<img src={post.meta.image} alt={post.meta.title} class="h-full w-full object-cover" />
						</div>
					{/if}

					<div class="p-6">
						<div class="mb-3 flex items-center gap-2 text-sm text-surface-400">
							<time datetime={post.meta.date}>
								{new Date(post.meta.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
							{#if post.meta.readingTime}
								<span>•</span>
								<span>{post.meta.readingTime} min read</span>
							{/if}
						</div>

						<h2 class="mb-3 line-clamp-2 text-xl font-semibold text-surface-50">
							<a href="/insights/{post.meta.slug}" class="transition-colors hover:text-primary-400">
								{post.meta.title}
							</a>
						</h2>

						<p class="mb-4 line-clamp-3 text-surface-300">
							{post.meta.description}
						</p>

						{#if post.meta.tags && post.meta.tags.length > 0}
							<div class="mb-4 flex flex-wrap gap-2">
								{#each post.meta.tags.slice(0, 3) as tag}
									<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300">
										{tag}
									</span>
								{/each}
								{#if post.meta.tags.length > 3}
									<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-400">
										+{post.meta.tags.length - 3} more
									</span>
								{/if}
							</div>
						{/if}

						<a
							href="/insights/{post.meta.slug}"
							class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
						>
							Read more
							<span>→</span>
						</a>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
