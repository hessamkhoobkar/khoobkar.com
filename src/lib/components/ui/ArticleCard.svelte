<script lang="ts">
	import type { ContentItem } from '$lib/data/content';
	import { ArrowRight, Clock, Star, Eye, Calendar } from '@lucide/svelte';

	export let post: ContentItem;
	export let basePath: string = '/insights';
	export let showImage: boolean = true;
	export let showFeatured: boolean = true;
	export let showReadingTime: boolean = true;
	export let showDate: boolean = true;
	export let buttonText: string = 'Read more';
	export let contentTypeIcon: any = null;
	export let contentTypeLabel: string = '';

	const href = `${basePath}/${post.meta.slug}`;
</script>

<article
	class="group relative overflow-hidden rounded-2xl border border-surface-700 bg-gradient-to-br from-surface-800 to-surface-900 transition-all duration-300 hover:border-primary-500/50"
>
	<!-- Project Image -->
	{#if showImage && post.meta.image}
		<div
			class="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-500/20 to-primary-600/20"
		>
			<img
				src={post.meta.image}
				alt={post.meta.title}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent"></div>
			{#if showFeatured && post.meta.featured}
				<div class="absolute top-4 right-4">
					<div
						class="flex items-center gap-1 rounded-full bg-primary-500 px-2 py-1 text-xs font-medium text-surface-900"
					>
						<Star size={12} />
						Featured
					</div>
				</div>
			{/if}
		</div>
	{:else if showImage}
		<div
			class="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-500/20 to-primary-600/20"
		>
			<div class="flex h-full w-full items-center justify-center">
				{#if contentTypeIcon}
					<svelte:component this={contentTypeIcon} size={48} class="text-primary-400" />
				{:else}
					<Eye size={48} class="text-primary-400" />
				{/if}
			</div>
			<div class="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent"></div>
			{#if showFeatured && post.meta.featured}
				<div class="absolute top-4 right-4">
					<div
						class="flex items-center gap-1 rounded-full bg-primary-500 px-2 py-1 text-xs font-medium text-surface-900"
					>
						<Star size={12} />
						Featured
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Project Content -->
	<div class="p-6">
		<div class="mb-4 flex items-start justify-between">
			<div class="flex items-center gap-2">
				{#if contentTypeIcon && contentTypeLabel}
					<svelte:component this={contentTypeIcon} size={20} class="text-primary-400" />
					<span class="text-sm font-medium text-primary-400">{contentTypeLabel}</span>
				{/if}
			</div>
			{#if showReadingTime}
				<div class="flex items-center gap-2 text-sm text-surface-400">
					<Clock size={14} />
					<span>{post.meta.readingTime || 5} min</span>
				</div>
			{/if}
		</div>

		<h3
			class="mb-4 text-xl font-semibold text-surface-100 transition-colors group-hover:text-primary-400"
		>
			{post.meta.title}
		</h3>

		<p class="mb-4 line-clamp-3 text-surface-400">
			{post.meta.description}
		</p>

		<!-- Tags -->
		{#if post.meta.tags && post.meta.tags.length > 0}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each post.meta.tags.slice(0, 3) as tag}
					<span class="rounded-full bg-surface-700 px-2 py-1 text-xs text-surface-300">
						{tag}
					</span>
				{/each}
				{#if post.meta.tags.length > 3}
					<span class="rounded-full bg-surface-700 px-2 py-1 text-xs text-surface-400">
						+{post.meta.tags.length - 3} more
					</span>
				{/if}
			</div>
		{/if}

		<!-- Project Actions -->
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4 text-sm text-surface-400">
				{#if showDate}
					<div class="flex items-center gap-1">
						<Calendar size={14} />
						<span>{new Date(post.meta.date).toLocaleDateString()}</span>
					</div>
				{/if}
				<div class="flex items-center gap-1">
					<Eye size={14} />
					<span>View Details</span>
				</div>
			</div>
			<a
				{href}
				class="flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 font-medium text-surface-900 transition-colors hover:bg-primary-400"
			>
				<span>{buttonText}</span>
				<ArrowRight size={16} />
			</a>
		</div>
	</div>
</article>

<style>
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
