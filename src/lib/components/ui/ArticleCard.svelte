<script lang="ts">
	import type { ContentItem } from '$lib/data/content';

	export let post: ContentItem;
	export let basePath: string = '/insights';

	const href = `${basePath}/${post.meta.slug}`;
</script>

<article class="hover:bg-surface-750 overflow-hidden rounded-2xl bg-surface-800 transition-colors">
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
			<a {href} class="transition-colors hover:text-primary-400">
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
			{href}
			class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
		>
			Read more
			<span>→</span>
		</a>
	</div>
</article>
