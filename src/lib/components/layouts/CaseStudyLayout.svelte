<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();

	// Get metadata from the page data
	const meta = $derived($page.data?.meta);
</script>

<article class="mx-auto max-w-4xl">
	{#if meta}
		<header class="mb-12 text-center">
			{#if meta.image}
				<div class="mb-8 overflow-hidden rounded-lg">
					<img src={meta.image} alt={meta.title} class="h-64 w-full object-cover" />
				</div>
			{/if}

			<div
				class="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-500/20 px-3 py-1 text-sm text-primary-300"
			>
				<span>📊</span>
				Case Study
			</div>

			<h1 class="mb-6 text-5xl leading-tight font-bold text-surface-50">{meta.title}</h1>

			{#if meta.description}
				<p class="mx-auto mb-8 max-w-3xl text-xl text-surface-200">{meta.description}</p>
			{/if}

			<div class="flex flex-wrap items-center justify-center gap-6 text-sm text-surface-300">
				{#if meta.date}
					<div class="flex items-center gap-2">
						<span>📅</span>
						{new Date(meta.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
				{/if}

				{#if meta.readingTime}
					<div class="flex items-center gap-2">
						<span>⏱️</span>
						{meta.readingTime} min read
					</div>
				{/if}

				{#if meta.author}
					<div class="flex items-center gap-2">
						<span>👤</span>
						{meta.author}
					</div>
				{/if}
			</div>

			{#if meta.tags && meta.tags.length > 0}
				<div class="mt-6 flex flex-wrap justify-center gap-2">
					{#each meta.tags as tag}
						<span class="rounded-full bg-surface-800 px-3 py-1 text-xs text-surface-300">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>
	{/if}

	<div class="prose prose-lg max-w-none prose-invert">
		{@render children?.()}
	</div>

	<Footer />
</article>
