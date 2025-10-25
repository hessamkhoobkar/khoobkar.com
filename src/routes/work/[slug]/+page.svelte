<script lang="ts">
	import { onMount } from 'svelte';
	import { getRelatedContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import type { PageData } from './$types';
	import {
		ArrowLeft,
		Calendar,
		Clock,
		Tag,
		TrendingUp,
		CheckCircle2,
		Rocket,
		Mail
	} from '@lucide/svelte';

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

<div class="mx-auto max-w-5xl">
	<!-- Navigation breadcrumb -->
	<nav class="mb-8 flex items-center gap-2 text-sm text-surface-400">
		<a href="/" class="transition-colors hover:text-primary-400">Home</a>
		<span>→</span>
		<a href="/work" class="transition-colors hover:text-primary-400">Work</a>
		<span>→</span>
		<span class="text-surface-300">{data.caseStudy.meta.title}</span>
	</nav>

	<!-- Case study header -->
	<header class="mb-12">
		{#if data.caseStudy.meta.image}
			<div
				class="group relative mb-8 overflow-hidden rounded-2xl border border-surface-600 shadow-2xl"
			>
				<img
					src={data.caseStudy.meta.image}
					alt={data.caseStudy.meta.title}
					class="h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
				<!-- Gradient overlay -->
				<div
					class="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent"
				></div>
			</div>
		{/if}

		<div class="mb-6 flex items-center justify-center gap-3">
			<div
				class="inline-flex items-center gap-2 rounded-full bg-primary-500/20 px-4 py-2 text-sm font-semibold text-primary-300"
			>
				<TrendingUp size={18} />
				<span>Case Study</span>
			</div>
		</div>

		<h1
			class="mb-6 text-center text-4xl leading-tight font-bold text-surface-50 md:text-5xl lg:text-6xl"
		>
			{data.caseStudy.meta.title}
		</h1>

		{#if data.caseStudy.meta.description}
			<p class="mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed text-surface-200">
				{data.caseStudy.meta.description}
			</p>
		{/if}

		<!-- Meta information grid -->
		<div
			class="mx-auto mb-8 flex max-w-2xl flex-wrap items-center justify-center gap-6 rounded-xl border border-surface-600 bg-surface-800/50 p-6 text-sm backdrop-blur-sm"
		>
			{#if data.caseStudy.meta.date}
				<div class="flex items-center gap-2 text-surface-300">
					<Calendar size={18} class="text-primary-400" />
					<span>
						{new Date(data.caseStudy.meta.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</span>
				</div>
			{/if}

			{#if data.caseStudy.meta.readingTime}
				<div class="flex items-center gap-2 text-surface-300">
					<Clock size={18} class="text-primary-400" />
					<span>{data.caseStudy.meta.readingTime} min read</span>
				</div>
			{/if}

			{#if data.caseStudy.meta.author}
				<div class="flex items-center gap-2 text-surface-300">
					<span class="font-medium">By {data.caseStudy.meta.author}</span>
				</div>
			{/if}
		</div>

		{#if data.caseStudy.meta.tags && data.caseStudy.meta.tags.length > 0}
			<div class="flex flex-wrap justify-center gap-2">
				{#each data.caseStudy.meta.tags as tag}
					<span
						class="hover:bg-surface-750 inline-flex items-center gap-1 rounded-full border border-surface-600 bg-surface-800 px-4 py-2 text-xs font-medium text-surface-300 transition-all hover:border-primary-500/50"
					>
						<Tag size={14} class="text-primary-400" />
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<!-- Case study content -->
	<article
		class="prose prose-lg mb-12 max-w-none rounded-2xl border border-surface-600 bg-surface-800 p-8 prose-invert md:p-12"
	>
		{@html data.caseStudy.content}
	</article>

	<!-- Call to action -->
	<section
		class="mb-12 overflow-hidden rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 via-primary-600/5 to-transparent p-8 text-center md:p-12"
	>
		<div class="relative">
			<!-- Decorative elements -->
			<div
				class="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl"
			></div>
			<div
				class="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl"
			></div>

			<div class="relative">
				<div class="mb-6 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<Rocket size={48} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-4 text-3xl font-bold text-surface-50 md:text-4xl">
					Ready for <span class="text-primary-400">Similar Results</span>?
				</h2>
				<p class="mx-auto mb-8 max-w-2xl text-lg text-surface-200">
					Let's discuss how I can help transform your project with the same level of expertise and
					dedication. Whether you need performance optimization, a complete redesign, or technical
					leadership.
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="/contact"
						class="group inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 font-medium text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/40"
					>
						<Mail size={20} />
						<span>Start Your Project</span>
					</a>
				</div>

				<!-- Trust indicators -->
				<div
					class="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-surface-300"
				>
					<div class="flex items-center gap-2">
						<CheckCircle2 size={18} class="text-primary-400" />
						<span>24h Response Time</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckCircle2 size={18} class="text-primary-400" />
						<span>10+ Years Experience</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckCircle2 size={18} class="text-primary-400" />
						<span>Proven Results</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Related case studies -->
	{#if relatedCaseStudies.length > 0}
		<section class="mb-12">
			<div class="mb-8 text-center">
				<h2 class="mb-3 text-3xl font-bold text-surface-50">More Success Stories</h2>
				<p class="text-lg text-surface-300">
					Explore other projects showcasing similar expertise and results
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each relatedCaseStudies as relatedCase}
					<article
						class="group hover:bg-surface-750 rounded-2xl border border-surface-600 bg-surface-800 p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
					>
						<h3 class="mb-2 line-clamp-2 text-lg font-bold text-surface-50">
							<a
								href="/work/{relatedCase.meta.slug}"
								class="transition-colors hover:text-primary-400"
							>
								{relatedCase.meta.title}
							</a>
						</h3>
						<p class="mb-4 line-clamp-3 text-sm text-surface-300">
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
						{#if relatedCase.meta.tags && relatedCase.meta.tags.length > 0}
							<div class="mt-4 flex flex-wrap gap-1">
								{#each relatedCase.meta.tags.slice(0, 3) as tag}
									<span class="rounded-full bg-surface-700 px-2 py-1 text-xs text-surface-400">
										{tag}
									</span>
								{/each}
							</div>
						{/if}
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Back to work -->
	<div class="border-t border-surface-600 pt-8">
		<a
			href="/work"
			class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800 px-6 py-3 font-medium text-surface-300 transition-all duration-200 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
		>
			<ArrowLeft size={20} class="transition-transform duration-200 group-hover:-translate-x-1" />
			<span>Back to all work</span>
		</a>
	</div>
</div>
