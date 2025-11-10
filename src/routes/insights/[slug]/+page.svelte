<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getRelatedContent } from '$lib/utils/content';
	import { generateBlogPostingSchema } from '$lib/utils/structured-data';
	import type { ContentItem } from '$lib/data/content';
	import type { PageData } from './$types';
	import { Calendar, Clock, User, Tag, Share2, ArrowLeft } from '@lucide/svelte';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { data }: { data: PageData } = $props();
	let relatedPosts: ContentItem[] = $state([]);
	let readingProgress = $state(0);
	let readingProgressCard: HTMLElement;
	let articleContent: HTMLElement;

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		// Load related posts
		if (data.post) {
			getRelatedContent(data.post).then((posts) => {
				relatedPosts = posts;
			});
		}

		// Set up sticky reading progress card and reading progress tracking with GSAP
		if (readingProgressCard && articleContent) {
			// Pin the reading progress card
			ScrollTrigger.create({
				trigger: readingProgressCard,
				start: 'top top+=16px',
				end: () => `+=${document.body.scrollHeight}`,
				pin: true,
				pinSpacing: false,
				scrub: false,
				refreshPriority: -1
			});

			// Track reading progress based on article content
			ScrollTrigger.create({
				trigger: articleContent,
				start: 'top top',
				end: 'bottom bottom',
				onUpdate: (self) => {
					readingProgress = Math.min(self.progress * 100, 100);
				}
			});
		}
	});

	onDestroy(() => {
		// Clean up all ScrollTrigger instances to prevent memory leaks
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

<div class="mx-auto mt-4 max-w-6xl">
	<div class="grid gap-8 lg:grid-cols-12">
		<!-- Main Content Area -->
		<div bind:this={articleContent} class="lg:col-span-8">
			<!-- Article Header Card -->
			<div class="mb-8 overflow-hidden rounded-2xl border border-surface-600 bg-surface-800">
				{#if data.post.meta.image}
					<div class="aspect-[2/1] overflow-hidden bg-surface-700">
						<img
							src={data.post.meta.image}
							alt={data.post.meta.title}
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}

				<div class="p-8 md:p-12">
					<!-- Meta Information -->
					<div class="mb-6 flex flex-wrap items-center gap-4 text-sm text-surface-400">
						{#if data.post.meta.date}
							<div class="flex items-center gap-2">
								<Calendar size={16} class="text-primary-400" />
								<time datetime={data.post.meta.date}>
									{new Date(data.post.meta.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							</div>
						{/if}

						{#if data.post.meta.readingTime}
							<div class="flex items-center gap-2">
								<Clock size={16} class="text-primary-400" />
								<span>{data.post.meta.readingTime} min read</span>
							</div>
						{/if}

						{#if data.post.meta.author}
							<div class="flex items-center gap-2">
								<User size={16} class="text-primary-400" />
								<span>{data.post.meta.author}</span>
							</div>
						{/if}
					</div>

					<!-- Title -->
					<h1 class="mb-6 text-4xl leading-tight font-bold text-surface-50 md:text-5xl">
						{data.post.meta.title}
					</h1>

					<!-- Description -->
					{#if data.post.meta.description}
						<p class="mb-6 text-lg leading-relaxed text-surface-200">
							{data.post.meta.description}
						</p>
					{/if}

					<!-- Tags -->
					{#if data.post.meta.tags && data.post.meta.tags.length > 0}
						<div class="flex flex-wrap gap-2">
							{#each data.post.meta.tags as tag}
								<span
									class="inline-flex items-center gap-1.5 rounded-lg border border-primary-500/30 bg-primary-500/10 px-3 py-1.5 text-sm text-primary-300"
								>
									<Tag size={14} />
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Article Content Card -->
			<article class="mb-8 rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
				<div
					class="prose prose-lg max-w-none prose-invert prose-headings:font-bold prose-headings:text-surface-50 prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-3xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-2xl prose-p:mb-4 prose-p:leading-relaxed prose-p:text-surface-200 prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300 hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-surface-700/50 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:pl-4 prose-blockquote:text-surface-200 prose-blockquote:italic prose-strong:text-surface-100 prose-code:rounded prose-code:bg-surface-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary-300 prose-pre:rounded-lg prose-pre:border prose-pre:border-surface-600 prose-pre:bg-surface-900 prose-ol:my-4 prose-ol:text-surface-200 prose-ul:my-4 prose-ul:text-surface-200 prose-li:my-2 prose-img:rounded-lg prose-img:border prose-img:border-surface-600"
				>
					<data.post.component />
				</div>
			</article>

			<!-- Share Card -->
			<div class="mb-8 rounded-2xl border border-surface-600 bg-surface-800 p-6">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="mb-1 text-lg font-semibold text-surface-50">Enjoyed this article?</h3>
						<p class="text-sm text-surface-400">Share it with your network</p>
					</div>
					<button
						onclick={sharePost}
						class="group flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-700 px-6 py-3 text-sm font-medium text-surface-200 transition-all hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-300"
					>
						<Share2 size={16} class="transition-transform group-hover:scale-110" />
						Share
					</button>
				</div>
			</div>

			<!-- Related Posts Card -->
			{#if relatedPosts.length > 0}
				<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8">
					<h2 class="mb-6 text-2xl font-bold text-surface-50">Related Articles</h2>
					<div class="grid gap-6 md:grid-cols-2">
						{#each relatedPosts as relatedPost}
							<a
								href="/insights/{relatedPost.meta.slug}"
								class="group rounded-xl border border-surface-600 bg-surface-700/50 p-6 transition-all hover:border-primary-500/50 hover:bg-surface-700"
							>
								<h3
									class="mb-2 line-clamp-2 text-lg font-semibold text-surface-50 group-hover:text-primary-400"
								>
									{relatedPost.meta.title}
								</h3>
								<p class="mb-4 line-clamp-2 text-sm text-surface-300">
									{relatedPost.meta.description}
								</p>
								<div class="flex items-center gap-3 text-xs text-surface-400">
									<time datetime={relatedPost.meta.date}>
										{new Date(relatedPost.meta.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric'
										})}
									</time>
									{#if relatedPost.meta.readingTime}
										<span>•</span>
										<span>{relatedPost.meta.readingTime} min read</span>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Sidebar -->
		<aside class="lg:col-span-4">
			<div class="sidebar-sticky space-y-6" data-speed="0">
				<!-- Back Navigation Card -->
				<div class="rounded-2xl border border-surface-600 bg-surface-800">
					<a
						href="/insights"
						class="group flex items-center gap-2 p-4 text-sm text-surface-400 transition-colors hover:text-primary-400"
					>
						<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
						Back to Insights
					</a>
				</div>

				<!-- Quick Stats Card -->
				<div class="rounded-2xl border border-surface-600 bg-surface-800 p-6">
					<h3 class="mb-4 text-sm font-semibold tracking-wider text-surface-400 uppercase">
						Article Stats
					</h3>
					<div class="space-y-3">
						{#if data.post.meta.readingTime}
							<div class="flex items-center justify-between">
								<span class="text-sm text-surface-300">Reading Time</span>
								<span class="font-semibold text-primary-400">
									{data.post.meta.readingTime} min
								</span>
							</div>
						{/if}
						{#if data.post.meta.date}
							<div class="flex items-center justify-between">
								<span class="text-sm text-surface-300">Published</span>
								<span class="font-semibold text-surface-200">
									{new Date(data.post.meta.date).toLocaleDateString('en-US', {
										month: 'short',
										year: 'numeric'
									})}
								</span>
							</div>
						{/if}
						{#if data.post.meta.tags}
							<div class="flex items-center justify-between">
								<span class="text-sm text-surface-300">Topics</span>
								<span class="font-semibold text-surface-200">{data.post.meta.tags.length}</span>
							</div>
						{/if}
					</div>
				</div>

				<!-- CTA Card -->
				<div
					class="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-6"
				>
					<h3 class="mb-2 text-lg font-bold text-surface-50">Have a project in mind?</h3>
					<p class="mb-4 text-sm text-surface-300">
						Let's discuss how we can help bring your ideas to life.
					</p>
					<a
						href="/contact"
						class="block rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-500"
					>
						Get in Touch
					</a>
				</div>

				<!-- Reading Progress Card -->
				<div
					bind:this={readingProgressCard}
					class="rounded-2xl border border-surface-600 bg-surface-800 p-6"
				>
					<h3 class="mb-4 text-sm font-semibold tracking-wider text-surface-400 uppercase">
						Reading Progress
					</h3>
					<div class="flex flex-col items-center justify-center gap-4">
						<ProgressRing
							value={readingProgress}
							max={100}
							trackStroke="stroke-surface-700"
							meterStroke="stroke-primary-500"
							strokeLinecap="round"
							size="w-32 h-32"
							showLabel={false}
						>
							<span class="text-2xl font-bold text-surface-50">{Math.round(readingProgress)}%</span>
						</ProgressRing>
					</div>
				</div>
			</div>
		</aside>
	</div>
</div>

<style>
	:global(.prose > h1:first-child) {
		display: none;
	}
</style>
