<script lang="ts">
	import { onMount } from 'svelte';
	import { getRelatedContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let relatedCaseStudies: ContentItem[] = $state([]);

	onMount(async () => {
		if (data.caseStudy) {
			relatedCaseStudies = await getRelatedContent(data.caseStudy);
		}
	});
</script>

<svelte:head>
	<title>{data.caseStudy.meta.title} - Khoobkar</title>
	<meta name="description" content={data.caseStudy.meta.description} />
	{#if data.caseStudy.meta.image}
		<meta property="og:image" content={data.caseStudy.meta.image} />
	{/if}
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={data.caseStudy.meta.date} />
	{#if data.caseStudy.meta.author}
		<meta property="article:author" content={data.caseStudy.meta.author} />
	{/if}
	{#if data.caseStudy.meta.tags}
		{#each data.caseStudy.meta.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>

<div class="mx-auto max-w-4xl">
	<!-- Navigation breadcrumb -->
	<nav class="mb-8 text-sm text-surface-400">
		<a href="/" class="hover:text-surface-300">Home</a>
		<span class="mx-2">→</span>
		<a href="/work" class="hover:text-surface-300">Work</a>
		<span class="mx-2">→</span>
		<span class="text-surface-300">{data.caseStudy.meta.title}</span>
	</nav>

	<!-- Case study header -->
	<header class="mb-12 text-center">
		{#if data.caseStudy.meta.image}
			<div class="mb-8 overflow-hidden rounded-lg">
				<img
					src={data.caseStudy.meta.image}
					alt={data.caseStudy.meta.title}
					class="h-64 w-full object-cover"
				/>
			</div>
		{/if}

		<div
			class="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-500/20 px-3 py-1 text-sm text-primary-300"
		>
			<span>📊</span>
			Case Study
		</div>

		<h1 class="mb-6 text-5xl leading-tight font-bold text-surface-50">
			{data.caseStudy.meta.title}
		</h1>

		{#if data.caseStudy.meta.description}
			<p class="mx-auto mb-8 max-w-3xl text-xl text-surface-200">
				{data.caseStudy.meta.description}
			</p>
		{/if}

		<div class="flex flex-wrap items-center justify-center gap-6 text-sm text-surface-300">
			{#if data.caseStudy.meta.date}
				<div class="flex items-center gap-2">
					<span>📅</span>
					{new Date(data.caseStudy.meta.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</div>
			{/if}

			{#if data.caseStudy.meta.readingTime}
				<div class="flex items-center gap-2">
					<span>⏱️</span>
					{data.caseStudy.meta.readingTime} min read
				</div>
			{/if}

			{#if data.caseStudy.meta.author}
				<div class="flex items-center gap-2">
					<span>👤</span>
					{data.caseStudy.meta.author}
				</div>
			{/if}
		</div>

		{#if data.caseStudy.meta.tags && data.caseStudy.meta.tags.length > 0}
			<div class="mt-6 flex flex-wrap justify-center gap-2">
				{#each data.caseStudy.meta.tags as tag}
					<span class="rounded-full bg-surface-800 px-3 py-1 text-xs text-surface-300">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<!-- Case study content -->
	<div class="prose prose-lg mb-12 max-w-none prose-invert">
		{@html data.caseStudy.content}
	</div>

	<!-- Call to action -->
	<div
		class="mb-12 rounded-lg bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-8 text-center"
	>
		<h2 class="mb-4 text-2xl font-bold text-surface-50">Interested in working with us?</h2>
		<p class="mb-6 text-surface-200">
			Let's discuss how we can help transform your business with similar results.
		</p>
		<a
			href="/contact"
			class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-500"
		>
			<span>💬</span>
			Get in touch
		</a>
	</div>

	<!-- Related case studies -->
	{#if relatedCaseStudies.length > 0}
		<section class="border-t border-surface-200 pt-12">
			<h2 class="mb-6 text-2xl font-bold text-surface-50">Related Case Studies</h2>
			<div class="grid gap-6 md:grid-cols-2">
				{#each relatedCaseStudies as relatedCase}
					<article class="hover:bg-surface-750 rounded-lg bg-surface-800 p-6 transition-colors">
						<h3 class="mb-2 line-clamp-2 text-lg font-semibold text-surface-50">
							<a
								href="/work/{relatedCase.meta.slug}"
								class="transition-colors hover:text-primary-400"
							>
								{relatedCase.meta.title}
							</a>
						</h3>
						<p class="mb-4 line-clamp-2 text-sm text-surface-300">
							{relatedCase.meta.description}
						</p>
						<div class="flex items-center justify-between text-xs text-surface-400">
							<time datetime={relatedCase.meta.date}>
								{new Date(relatedCase.meta.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
							{#if relatedCase.meta.readingTime}
								<span>{relatedCase.meta.readingTime} min read</span>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Back to work -->
	<div class="mt-12 border-t border-surface-200 pt-8">
		<a
			href="/work"
			class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
		>
			<span>←</span>
			Back to all work
		</a>
	</div>
</div>
