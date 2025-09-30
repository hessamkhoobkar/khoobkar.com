<script lang="ts">
	import type { ContentItem } from '$lib/data/content';
	import { ArrowRight } from '@lucide/svelte';

	export let post: ContentItem;
	export let basePath: string = '/insights';

	const href = `${basePath}/${post.meta.slug}`;
</script>

<article
	class="group hover:bg-surface-750 flex flex-col overflow-hidden rounded-2xl bg-surface-800 transition-colors"
>
	{#if post.meta.image}
		<div class="aspect-video overflow-hidden bg-surface-700">
			<a {href} class="block h-full w-full">
				<img
					src={post.meta.image}
					alt={post.meta.title}
					class="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
				/>
			</a>
		</div>
	{/if}

	<div class="flex flex-col p-6">
		<div class="flex-1">
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

			<h2 class="mb-3 line-clamp-2 block text-xl font-semibold text-surface-50">
				<a {href} class="block transition-colors hover:text-primary-400">
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
		</div>

		<div class="mt-4">
			<a
				{href}
				class="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-surface-600 bg-surface-800/50 px-6 py-2.5 text-sm text-surface-300 transition-all duration-500 hover:scale-[1.02] hover:border-primary-400/80 hover:bg-gradient-to-r hover:from-primary-400/20 hover:via-primary-500/30 hover:to-primary-400/20 hover:text-primary-300 hover:shadow-2xl hover:shadow-primary-500/40"
			>
				<!-- Animated shimmer effect on hover -->
				<span
					class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover/btn:translate-x-full"
				></span>

				<span class="relative font-medium">Read more</span>
				<ArrowRight
					size={18}
					class="relative transition-all duration-500 ease-out group-hover/btn:translate-x-1 group-hover/btn:scale-110"
				/>
			</a>
		</div>
	</div>
</article>
