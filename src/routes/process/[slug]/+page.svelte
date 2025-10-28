<script lang="ts">
	import { page } from '$app/stores';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import {
		ArrowLeft,
		Calendar,
		Clock,
		User,
		Tag,
		Star,
		FileText,
		BarChart3,
		Sparkles,
		Code,
		Share2,
		Bookmark,
		ArrowRight
	} from '@lucide/svelte';

	let content: ContentItem | null = $state(null);
	let relatedContent: ContentItem[] = $state([]);
	let loading = $state(true);

	// Get content type info based on tags
	const getContentTypeInfo = (tags: string[]) => {
		if (tags.includes('dev-log') || tags.includes('saas')) {
			return { icon: FileText, label: 'Dev Log', color: 'primary' };
		}
		if (tags.includes('case-study') || tags.includes('optimization')) {
			return { icon: BarChart3, label: 'Case Study', color: 'success' };
		}
		if (tags.includes('idea-to-product') || tags.includes('rebuild')) {
			return { icon: Sparkles, label: 'Idea to Product', color: 'warning' };
		}
		return { icon: Code, label: 'Process', color: 'primary' };
	};

	// Load content based on slug
	$effect(() => {
		const slug = $page.params.slug;
		if (!slug) return;

		const loadContentData = async () => {
			try {
				loading = true;
				const allContent = await loadContent('process');
				const foundContent = allContent.find((item) => item.meta.slug === slug);

				if (foundContent) {
					content = foundContent;
					// Get related content (same category, different items)
					relatedContent = allContent
						.filter(
							(item) => item.meta.slug !== slug && item.meta.category === foundContent.meta.category
						)
						.slice(0, 3);
				}
			} catch (error) {
				console.error('Failed to load content:', error);
			} finally {
				loading = false;
			}
		};

		loadContentData();
	});
</script>

<svelte:head>
	{#if content}
		<title>{content.meta.title} - Process - Khoobkar</title>
		<meta name="description" content={content?.meta.description || ''} />
		<meta property="og:title" content={content?.meta.title || ''} />
		<meta property="og:description" content={content?.meta.description || ''} />
		<meta property="og:type" content="article" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={content?.meta.title || ''} />
		<meta name="twitter:description" content={content?.meta.description || ''} />
	{/if}
</svelte:head>

{#if loading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<div
				class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"
			></div>
			<p class="text-surface-400">Loading content...</p>
		</div>
	</div>
{:else if content}
	{@const typeInfo = getContentTypeInfo(content.meta.tags || [])}

	<!-- Hero Section -->
	<section class="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
		<Silk />
		<div class="relative z-10 container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<!-- Breadcrumb -->
				<nav class="mb-8 flex items-center justify-center gap-2 text-sm text-surface-400">
					<a href="/process" class="transition-colors hover:text-primary-400">Process</a>
					<span>/</span>
					<span class="text-surface-300">{typeInfo.label}</span>
				</nav>

				<!-- Content Type Badge -->
				<div class="mb-6 flex justify-center">
					<div
						class="flex items-center gap-2 rounded-full border border-surface-700 bg-surface-800/50 px-4 py-2 backdrop-blur-sm"
					>
						{#if typeInfo.icon}
							{@const IconComponent = typeInfo.icon}
							<IconComponent size={20} class="text-primary-400" />
						{/if}
						<span class="text-sm font-medium text-primary-400">{typeInfo.label}</span>
						{#if content.meta.featured}
							<Star size={16} class="text-primary-400" />
						{/if}
					</div>
				</div>

				<!-- Title -->
				<h1
					class="mb-6 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
				>
					{content.meta.title}
				</h1>

				<!-- Description -->
				<p class="mb-8 text-xl leading-relaxed text-surface-300 md:text-2xl">
					{content.meta.description}
				</p>

				<!-- Meta Information -->
				<div class="flex flex-wrap justify-center gap-6 text-sm text-surface-400">
					<div class="flex items-center gap-2">
						<Calendar size={16} />
						<span
							>{new Date(content.meta.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}</span
						>
					</div>
					<div class="flex items-center gap-2">
						<Clock size={16} />
						<span>{content.meta.readingTime || 5} min read</span>
					</div>
					{#if content.meta.author}
						<div class="flex items-center gap-2">
							<User size={16} />
							<span>{content.meta.author}</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Content Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<div class="grid gap-12 lg:grid-cols-4">
					<!-- Main Content -->
					<article class="lg:col-span-3">
						<div class="prose prose-lg max-w-none prose-invert">
							{@html content.content || '<p>Content coming soon...</p>'}
						</div>
					</article>

					<!-- Sidebar -->
					<aside class="lg:col-span-1">
						<div class="sticky top-8 space-y-8">
							<!-- Tags -->
							{#if content.meta.tags && content.meta.tags.length > 0}
								<div class="rounded-2xl border border-surface-700 bg-surface-800 p-6">
									<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-surface-100">
										<Tag size={20} class="text-primary-400" />
										Tags
									</h3>
									<div class="flex flex-wrap gap-2">
										{#each content.meta.tags as tag}
											<span class="rounded-full bg-surface-700 px-3 py-1 text-sm text-surface-300">
												{tag}
											</span>
										{/each}
									</div>
								</div>
							{/if}

							<!-- Share -->
							<div class="rounded-2xl border border-surface-700 bg-surface-800 p-6">
								<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-surface-100">
									<Share2 size={20} class="text-primary-400" />
									Share
								</h3>
								<div class="space-y-3">
									<button
										onclick={() =>
											navigator.share?.({
												title: content?.meta.title || '',
												text: content?.meta.description || '',
												url: window.location.href
											})}
										class="flex w-full items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-surface-900 transition-colors hover:bg-primary-400"
									>
										<Share2 size={16} />
										<span>Share Article</span>
									</button>
									<button
										onclick={() => navigator.clipboard.writeText(window.location.href)}
										class="flex w-full items-center gap-2 rounded-lg border border-surface-600 px-4 py-2 text-sm font-medium text-surface-300 transition-colors hover:border-primary-500 hover:text-surface-100"
									>
										<Bookmark size={16} />
										<span>Copy Link</span>
									</button>
								</div>
							</div>

							<!-- Back to Process -->
							<div class="rounded-2xl border border-surface-700 bg-surface-800 p-6">
								<a
									href="/process"
									class="flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
								>
									<ArrowLeft size={20} />
									<span>Back to Process</span>
								</a>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	</section>

	<!-- Related Content -->
	{#if relatedContent.length > 0}
		<section class="bg-surface-900 py-20">
			<div class="container mx-auto px-4">
				<div class="mb-16 text-center">
					<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">Related Content</h2>
					<p class="mx-auto max-w-3xl text-xl text-surface-400">
						More insights from my development process
					</p>
				</div>

				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each relatedContent as item}
						{@const itemTypeInfo = getContentTypeInfo(item.meta.tags || [])}
						<article
							class="group relative overflow-hidden rounded-2xl border border-surface-700 bg-gradient-to-br from-surface-800 to-surface-900 transition-all duration-300 hover:border-primary-500/50"
						>
							<div class="p-6">
								<div class="mb-4 flex items-center gap-2">
									{#if itemTypeInfo.icon}
										{@const ItemIconComponent = itemTypeInfo.icon}
										<ItemIconComponent size={20} class="text-primary-400" />
									{/if}
									<span class="text-sm font-medium text-primary-400">{itemTypeInfo.label}</span>
									{#if item.meta.featured}
										<Star size={16} class="text-primary-400" />
									{/if}
								</div>

								<h3
									class="mb-3 text-xl font-semibold text-surface-100 transition-colors group-hover:text-primary-400"
								>
									{item.meta.title}
								</h3>

								<p class="mb-4 line-clamp-3 text-surface-400">
									{item.meta.description}
								</p>

								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4 text-sm text-surface-400">
										<div class="flex items-center gap-1">
											<Clock size={14} />
											<span>{item.meta.readingTime || 5} min</span>
										</div>
									</div>
									<a
										href="/process/{item.meta.slug}"
										class="flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 font-medium text-surface-900 transition-colors hover:bg-primary-400"
									>
										<span>Read</span>
										<ArrowRight size={16} />
									</a>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Call to Action -->
	<section class="bg-gradient-to-br from-primary-500/10 to-primary-600/10 py-20">
		<div class="container mx-auto px-4 text-center">
			<div class="mx-auto max-w-3xl">
				<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">
					Interested in Working Together?
				</h2>
				<p class="mb-8 text-xl text-surface-400">
					Let's discuss how my transparent, results-driven approach can help you achieve your goals
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 font-semibold text-surface-900 transition-colors hover:bg-primary-400"
					>
						<span>Start a Project</span>
						<ArrowRight size={20} />
					</a>
					<a
						href="/process"
						class="inline-flex items-center gap-2 rounded-full border border-surface-700 px-8 py-4 font-semibold text-surface-300 transition-colors hover:border-primary-500 hover:text-surface-100"
					>
						<span>More Process Content</span>
						<ArrowLeft size={20} />
					</a>
				</div>
			</div>
		</div>
	</section>

	<style>
		.prose {
			color: rgb(226 232 240);
		}

		.prose h1,
		.prose h2,
		.prose h3,
		.prose h4,
		.prose h5,
		.prose h6 {
			color: rgb(241 245 249);
		}

		.prose a {
			color: rgb(239 94 3);
		}

		.prose a:hover {
			color: rgb(251 146 60);
		}

		.prose code {
			background-color: rgb(30 41 59);
			color: rgb(226 232 240);
			padding: 0.125rem 0.25rem;
			border-radius: 0.25rem;
		}

		.prose pre {
			background-color: rgb(15 23 42);
			border: 1px solid rgb(51 65 85);
		}

		.prose pre code {
			background-color: transparent;
			padding: 0;
		}

		.prose blockquote {
			border-left-color: rgb(239 94 3);
			color: rgb(203 213 225);
		}

		.line-clamp-3 {
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	</style>
{:else}
	<!-- 404 State -->
	<section class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<h1 class="mb-4 text-4xl font-bold text-surface-100">Content Not Found</h1>
			<p class="mb-8 text-surface-400">The process content you're looking for doesn't exist.</p>
			<a
				href="/process"
				class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-surface-900 transition-colors hover:bg-primary-400"
			>
				<ArrowLeft size={20} />
				<span>Back to Process</span>
			</a>
		</div>
	</section>
{/if}
