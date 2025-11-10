<script lang="ts">
	import type { ContentItem } from '$lib/data/content';
	import { ArrowRight, Clock, Star, Eye, Calendar } from '@lucide/svelte';

	let {
		post,
		basePath = '/insights',
		showImage = true,
		showFeatured = true,
		showReadingTime = true,
		showDate = true,
		buttonText = 'Read more',
		contentTypeIcon = null,
		contentTypeLabel = ''
	}: {
		post: ContentItem;
		basePath?: string;
		showImage?: boolean;
		showFeatured?: boolean;
		showReadingTime?: boolean;
		showDate?: boolean;
		buttonText?: string;
		contentTypeIcon?: any;
		contentTypeLabel?: string;
	} = $props();

	const MediaIconComponent = contentTypeIcon ?? Eye;

	let contentTypeLabelValue = $state((contentTypeLabel ?? '').trim());
	let secondaryLabel = $state('');

	$effect(() => {
		const trimmedLabel = (contentTypeLabel ?? '').trim();
		contentTypeLabelValue = trimmedLabel;

		if (trimmedLabel.length > 0) {
			secondaryLabel = trimmedLabel;
			return;
		}

		const tags = post.meta?.tags ?? [];
		if (tags.length > 0) {
			secondaryLabel = tags[0];
			return;
		}

		secondaryLabel = basePath === '/projects' ? 'Project' : 'Insight';
	});
</script>

<article
	class="group relative overflow-hidden rounded-2xl border border-surface-700 bg-gradient-to-br from-surface-800 to-surface-900 transition-transform duration-300 focus-within:border-primary-500/60 focus-within:shadow-lg focus-within:shadow-primary-500/10 hover:-translate-y-1 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10"
>
	<a
		href={`${basePath}/${post.meta.slug}`}
		class="flex h-full flex-col focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 focus-visible:outline-none"
		aria-label={`Read ${post.meta.title}`}
	>
		<!-- Media -->
		{#if showImage && post.meta.image}
			<div
				class="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-500/20 to-primary-600/20"
			>
				<img
					src={post.meta.image}
					alt={post.meta.title}
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105"
					loading="lazy"
					decoding="async"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/20 to-transparent"
				></div>
				{#if showFeatured && post.meta.featured}
					<div class="absolute top-4 right-4">
						<div
							class="flex items-center gap-1 rounded-full bg-primary-500 px-2 py-1 text-xs font-medium text-surface-900 shadow-sm shadow-primary-500/40"
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
					<MediaIconComponent size={48} class="text-primary-400" aria-hidden="true" />
				</div>
				<div
					class="absolute inset-0 bg-gradient-to-t from-surface-900/70 via-surface-900/10 to-transparent"
				></div>
				{#if showFeatured && post.meta.featured}
					<div class="absolute top-4 right-4">
						<div
							class="flex items-center gap-1 rounded-full bg-primary-500 px-2 py-1 text-xs font-medium text-surface-900 shadow-sm shadow-primary-500/40"
						>
							<Star size={12} />
							Featured
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Content -->
		<div class="flex flex-1 flex-col p-6">
			<div class="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-surface-400">
				<div class="flex flex-wrap items-center gap-2">
					{#if contentTypeIcon || contentTypeLabelValue.length > 0}
						<div
							class="flex items-center gap-1 rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 tracking-wide text-primary-300 uppercase"
						>
							{#if contentTypeIcon}
								<MediaIconComponent size={14} aria-hidden="true" />
							{/if}
							{#if contentTypeLabelValue.length > 0}
								<span>{contentTypeLabelValue}</span>
							{/if}
						</div>
					{/if}
					{#if showDate && post.meta.date}
						<time
							datetime={post.meta.date}
							class="flex items-center gap-1 rounded-full bg-surface-700/50 px-3 py-1 text-[11px]"
						>
							<Calendar size={12} aria-hidden="true" />
							{new Date(post.meta.date).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}
						</time>
					{/if}
					{#if showReadingTime}
						<div
							class="flex items-center gap-1 rounded-full bg-surface-700/50 px-3 py-1 text-[11px]"
						>
							<Clock size={12} aria-hidden="true" />
							{post.meta.readingTime ? `${post.meta.readingTime} min read` : 'Quick read'}
						</div>
					{/if}
				</div>
				{#if secondaryLabel}
					<span
						class="rounded-full bg-surface-700/50 px-3 py-1 text-[11px] tracking-wide text-surface-300 uppercase"
					>
						{secondaryLabel}
					</span>
				{/if}
			</div>

			<h3
				class="mb-3 text-xl leading-snug font-semibold text-surface-50 transition-colors duration-200 group-hover:text-primary-300 group-focus-visible:text-primary-300"
			>
				{post.meta.title}
			</h3>

			<p class="mb-6 line-clamp-3 text-sm leading-relaxed text-surface-300">
				{post.meta.description}
			</p>

			{#if post.meta.tags && post.meta.tags.length > 0}
				<div class="mb-6 flex flex-wrap gap-2">
					{#each post.meta.tags.slice(0, 3) as tag}
						<span class="rounded-full bg-surface-700/80 px-3 py-1 text-xs text-surface-300">
							{tag}
						</span>
					{/each}
					{#if post.meta.tags.length > 3}
						<span class="rounded-full bg-surface-700/80 px-3 py-1 text-xs text-surface-400">
							+{post.meta.tags.length - 3} more
						</span>
					{/if}
				</div>
			{/if}

			<div
				class="mt-auto flex items-center justify-between pt-3 text-sm font-medium text-primary-500"
			>
				<span class="flex items-center gap-2">
					<span>{buttonText}</span>
					<ArrowRight
						size={16}
						class="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
						aria-hidden="true"
					/>
				</span>
				{#if post.meta.date}
					<time
						datetime={post.meta.date}
						class="text-xs font-normal text-surface-500"
						aria-label={`Published ${new Date(post.meta.date).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric'
						})}`}
					>
						Updated {new Date(post.meta.date).toLocaleDateString('en-US', {
							month: 'short',
							year: 'numeric'
						})}
					</time>
				{:else if secondaryLabel}
					<span class="text-xs font-normal text-surface-500">{secondaryLabel}</span>
				{/if}
			</div>
		</div>
	</a>
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
