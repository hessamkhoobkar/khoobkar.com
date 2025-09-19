<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.resource.meta.title} - Khoobkar</title>
	<meta name="description" content={data.resource.meta.description} />
	{#if data.resource.meta.image}
		<meta property="og:image" content={data.resource.meta.image} />
	{/if}
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={data.resource.meta.date} />
	{#if data.resource.meta.author}
		<meta property="article:author" content={data.resource.meta.author} />
	{/if}
	{#if data.resource.meta.tags}
		{#each data.resource.meta.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>

<div class="mx-auto max-w-4xl">
	<!-- Navigation breadcrumb -->
	<nav class="mb-8 text-sm text-surface-400">
		<a href="/" class="hover:text-surface-300">Home</a>
		<span class="mx-2">→</span>
		<a href="/resources" class="hover:text-surface-300">Resources</a>
		<span class="mx-2">→</span>
		<span class="text-surface-300">{data.resource.meta.title}</span>
	</nav>

	<!-- Resource header -->
	<header class="mb-8 border-b border-surface-200 pb-8">
		<div
			class="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-500/20 px-3 py-1 text-sm text-secondary-300"
		>
			<span>🛠️</span>
			Resource
		</div>

		<h1 class="mb-4 text-4xl font-bold text-surface-50">{data.resource.meta.title}</h1>

		<div class="mb-4 flex flex-wrap items-center gap-4 text-sm text-surface-300">
			{#if data.resource.meta.date}
				<time datetime={data.resource.meta.date} class="flex items-center gap-2">
					<span>📅</span>
					{new Date(data.resource.meta.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			{/if}

			{#if data.resource.meta.author}
				<span class="flex items-center gap-2">
					<span>👤</span>
					{data.resource.meta.author}
				</span>
			{/if}

			{#if data.resource.meta.readingTime}
				<span class="flex items-center gap-2">
					<span>⏱️</span>
					{data.resource.meta.readingTime} min read
				</span>
			{/if}
		</div>

		{#if data.resource.meta.description}
			<p class="text-lg text-surface-200">{data.resource.meta.description}</p>
		{/if}

		{#if data.resource.meta.tags && data.resource.meta.tags.length > 0}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each data.resource.meta.tags as tag}
					<span class="rounded-full bg-secondary-500/20 px-3 py-1 text-xs text-secondary-300">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<!-- Resource content -->
	<div class="prose prose-lg mb-12 max-w-none prose-invert">
		{@html data.resource.content}
	</div>

	<!-- Back to resources -->
	<div class="mt-12 border-t border-surface-200 pt-8">
		<a
			href="/resources"
			class="inline-flex items-center gap-2 text-secondary-400 transition-colors hover:text-secondary-300"
		>
			<span>←</span>
			Back to all resources
		</a>
	</div>
</div>
