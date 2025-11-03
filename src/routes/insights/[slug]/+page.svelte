<script lang="ts">
	import { onMount } from 'svelte';
	import { getRelatedContent } from '$lib/utils/content';
	import { generateBlogPostingSchema } from '$lib/utils/structured-data';
	import type { ContentItem } from '$lib/data/content';
	import type { PageData } from './$types';
	import { Calendar, Clock, User, Tag, Share2, ArrowLeft } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
	let relatedPosts: ContentItem[] = $state([]);

	onMount(() => {
		// Load related posts
		if (data.post) {
			getRelatedContent(data.post).then((posts) => {
				relatedPosts = posts;
			});
		}
	});

	function sharePost() {
		if (navigator.share) {
			navigator.share({
				title: data.post.meta.title,
				text: data.post.meta.description,
				url: window.location.href
			});
		}
	}

	// Generate JSON-LD structured data for SEO
	const structuredData = $derived(generateBlogPostingSchema(data.post));
</script>

<svelte:head>
	<title>{data.post.meta.title} - Khoobkar</title>
	<meta name="description" content={data.post.meta.description} />
	<meta name="author" content={data.post.meta.author || 'Khoobkar Team'} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.meta.title} />
	<meta property="og:description" content={data.post.meta.description} />
	<meta property="og:url" content={`https://khoobkar.com/insights/${data.post.meta.slug}`} />
	{#if data.post.meta.image}
		<meta property="og:image" content={data.post.meta.image} />
	{/if}
	<meta property="article:published_time" content={data.post.meta.date} />
	{#if data.post.meta.author}
		<meta property="article:author" content={data.post.meta.author} />
	{/if}
	{#if data.post.meta.tags}
		{#each data.post.meta.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.post.meta.title} />
	<meta name="twitter:description" content={data.post.meta.description} />
	{#if data.post.meta.image}
		<meta name="twitter:image" content={data.post.meta.image} />
	{/if}

	<!-- Keywords -->
	{#if data.post.meta.tags}
		<meta name="keywords" content={data.post.meta.tags.join(', ')} />
	{/if}

	<!-- JSON-LD Structured Data for SEO -->
	{@html '<script type="application/ld+json">' + JSON.stringify(structuredData) + '</script>'}
</svelte:head>

<div class="mx-auto mt-4 max-w-8xl">
	<!-- Navigation breadcrumb -->
	<nav class="mb-8 flex items-center gap-2 text-sm text-surface-400">
		<a href="/" class="transition-colors hover:text-primary-400">Home</a>
		<span>→</span>
		<a href="/insights" class="transition-colors hover:text-primary-400">Insights</a>
		<span>→</span>
		<span class="text-surface-300">{data.post.meta.title}</span>
	</nav>

	<!-- Article header -->
	<header class="mb-12">
		{#if data.post.meta.image}
			<div
				class="group relative mb-8 overflow-hidden rounded-2xl border border-surface-600 shadow-2xl"
			>
				<img
					src={data.post.meta.image}
					alt={data.post.meta.title}
					class="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
				<span>📝</span>
				<span>Article</span>
			</div>
		</div>

		<h1
			class="mb-6 text-center text-4xl leading-tight font-bold text-surface-50 md:text-5xl lg:text-6xl"
		>
			{data.post.meta.title}
		</h1>

		{#if data.post.meta.description}
			<p class="mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed text-surface-200">
				{data.post.meta.description}
			</p>
		{/if}

		<!-- Meta information grid -->
		<div
			class="mx-auto mb-8 flex max-w-2xl flex-wrap items-center justify-center gap-6 rounded-xl border border-surface-600 bg-surface-800/50 p-6 text-sm backdrop-blur-sm"
		>
			{#if data.post.meta.date}
				<div class="flex items-center gap-2 text-surface-300">
					<Calendar size={18} class="text-primary-400" />
					<span>
						{new Date(data.post.meta.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</span>
				</div>
			{/if}

			{#if data.post.meta.readingTime}
				<div class="flex items-center gap-2 text-surface-300">
					<Clock size={18} class="text-primary-400" />
					<span>{data.post.meta.readingTime} min read</span>
				</div>
			{/if}

			{#if data.post.meta.author}
				<div class="flex items-center gap-2 text-surface-300">
					<User size={18} class="text-primary-400" />
					<span class="font-medium">By {data.post.meta.author}</span>
				</div>
			{/if}
		</div>

		{#if data.post.meta.tags && data.post.meta.tags.length > 0}
			<div class="flex flex-wrap justify-center gap-2">
				{#each data.post.meta.tags as tag}
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

	<!-- Article content -->
	<article
		class="prose prose-lg mb-12 max-w-none rounded-2xl border border-surface-600 bg-surface-800 p-8 prose-invert md:p-12"
	>
		{@html data.post.content}
	</article>

	<!-- CTA Section -->
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
						<Share2 size={48} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-4 text-3xl font-bold text-surface-50 md:text-4xl">
					Enjoyed This <span class="text-primary-400">Article</span>?
				</h2>
				<p class="mx-auto mb-8 max-w-2xl text-lg text-surface-200">
					Share it with your network or explore more insights.
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<button
						onclick={sharePost}
						class="group inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 font-medium text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/40"
					>
						<Share2 size={20} />
						<span>Share Article</span>
					</button>
					<a
						href="/insights"
						class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800/50 px-8 py-4 font-medium text-surface-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
					>
						<span>More Insights</span>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Related Posts -->
	{#if relatedPosts.length > 0}
		<section class="mb-12">
			<div class="mb-8 text-center">
				<h2 class="mb-3 text-3xl font-bold text-surface-50">Related Articles</h2>
				<p class="text-lg text-surface-300">Explore more insights and articles</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each relatedPosts as relatedPost}
					<article
						class="group hover:bg-surface-750 rounded-2xl border border-surface-600 bg-surface-800 p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
					>
						<h3 class="mb-2 line-clamp-2 text-lg font-bold text-surface-50">
							<a
								href="/insights/{relatedPost.meta.slug}"
								class="transition-colors hover:text-primary-400"
							>
								{relatedPost.meta.title}
							</a>
						</h3>
						<p class="mb-4 line-clamp-3 text-sm text-surface-300">
							{relatedPost.meta.description}
						</p>
						<div class="flex items-center justify-between text-xs text-surface-400">
							<time datetime={relatedPost.meta.date}>
								{new Date(relatedPost.meta.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
							{#if relatedPost.meta.readingTime}
								<span>{relatedPost.meta.readingTime} min read</span>
							{/if}
						</div>
						{#if relatedPost.meta.tags && relatedPost.meta.tags.length > 0}
							<div class="mt-4 flex flex-wrap gap-1">
								{#each relatedPost.meta.tags.slice(0, 3) as tag}
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

	<!-- Back to insights -->
	<div class="border-t border-surface-600 pt-8">
		<a
			href="/insights"
			class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800 px-6 py-3 font-medium text-surface-300 transition-all duration-200 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
		>
			<ArrowLeft size={20} class="transition-transform duration-200 group-hover:-translate-x-1" />
			<span>Back to all insights</span>
		</a>
	</div>
</div>
