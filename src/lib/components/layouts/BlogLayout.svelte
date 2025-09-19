<script lang="ts">
	import { page } from '$app/stores';

	let { children } = $props();

	// Get metadata from the page data
	const meta = $derived($page.data?.meta);
</script>

<article class="mx-auto max-w-4xl">
	{#if meta}
		<header class="mb-8 border-b border-surface-200 pb-8">
			<h1 class="mb-4 text-4xl font-bold text-surface-50">{meta.title}</h1>

			<div class="flex flex-wrap items-center gap-4 text-sm text-surface-300">
				{#if meta.date}
					<time datetime={meta.date} class="flex items-center gap-2">
						<span>📅</span>
						{new Date(meta.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>
				{/if}

				{#if meta.author}
					<span class="flex items-center gap-2">
						<span>👤</span>
						{meta.author}
					</span>
				{/if}

				{#if meta.readingTime}
					<span class="flex items-center gap-2">
						<span>⏱️</span>
						{meta.readingTime} min read
					</span>
				{/if}
			</div>

			{#if meta.description}
				<p class="mt-4 text-lg text-surface-200">{meta.description}</p>
			{/if}

			{#if meta.tags && meta.tags.length > 0}
				<div class="mt-4 flex flex-wrap gap-2">
					{#each meta.tags as tag}
						<span class="rounded-full bg-primary-500/20 px-3 py-1 text-xs text-primary-300">
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
</article>
