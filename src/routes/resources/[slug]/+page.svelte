<script lang="ts">
	import type { PageData } from './$types';
	import {
		ArrowLeft,
		Calendar,
		Clock,
		Tag,
		Lightbulb,
		BookOpen,
		Download,
		Share2,
		Heart
	} from '@lucide/svelte';

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

<div class="mx-auto max-w-5xl">
	<!-- Navigation breadcrumb -->
	<nav class="mb-8 flex items-center gap-2 text-sm text-surface-400">
		<a href="/" class="transition-colors hover:text-primary-400">Home</a>
		<span>→</span>
		<a href="/resources" class="transition-colors hover:text-primary-400">Resources</a>
		<span>→</span>
		<span class="text-surface-300">{data.resource.meta.title}</span>
	</nav>

	<!-- Resource header -->
	<header class="mb-12">
		{#if data.resource.meta.image}
			<div
				class="group relative mb-8 overflow-hidden rounded-2xl border border-surface-600 shadow-2xl"
			>
				<img
					src={data.resource.meta.image}
					alt={data.resource.meta.title}
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
				<Lightbulb size={18} />
				<span>Resource</span>
			</div>
		</div>

		<h1
			class="mb-6 text-center text-4xl leading-tight font-bold text-surface-50 md:text-5xl lg:text-6xl"
		>
			{data.resource.meta.title}
		</h1>

		{#if data.resource.meta.description}
			<p class="mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed text-surface-200">
				{data.resource.meta.description}
			</p>
		{/if}

		<!-- Meta information grid -->
		<div
			class="mx-auto mb-8 flex max-w-2xl flex-wrap items-center justify-center gap-6 rounded-xl border border-surface-600 bg-surface-800/50 p-6 text-sm backdrop-blur-sm"
		>
			{#if data.resource.meta.date}
				<div class="flex items-center gap-2 text-surface-300">
					<Calendar size={18} class="text-primary-400" />
					<span>
						{new Date(data.resource.meta.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</span>
				</div>
			{/if}

			{#if data.resource.meta.readingTime}
				<div class="flex items-center gap-2 text-surface-300">
					<Clock size={18} class="text-primary-400" />
					<span>{data.resource.meta.readingTime} min read</span>
				</div>
			{/if}

			{#if data.resource.meta.author}
				<div class="flex items-center gap-2 text-surface-300">
					<span class="font-medium">By {data.resource.meta.author}</span>
				</div>
			{/if}
		</div>

		{#if data.resource.meta.tags && data.resource.meta.tags.length > 0}
			<div class="flex flex-wrap justify-center gap-2">
				{#each data.resource.meta.tags as tag}
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

	<!-- Resource content -->
	<article
		class="prose prose-lg mb-12 max-w-none rounded-2xl border border-surface-600 bg-surface-800 p-8 prose-invert md:p-12"
	>
		{@html data.resource.content}
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
						<Heart size={48} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-4 text-3xl font-bold text-surface-50 md:text-4xl">
					Found This <span class="text-primary-400">Helpful</span>?
				</h2>
				<p class="mx-auto mb-8 max-w-2xl text-lg text-surface-200">
					I create free resources like this to help developers grow. Check out more resources, read
					my blog, or let's connect if you'd like to work together.
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="/resources"
						class="group inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 font-medium text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/40"
					>
						<BookOpen size={20} />
						<span>More Resources</span>
					</a>
					<a
						href="/insights"
						class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800/50 px-8 py-4 font-medium text-surface-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
					>
						<span>Read Blog</span>
					</a>
				</div>

				<!-- Value props -->
				<div
					class="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-surface-300"
				>
					<div class="flex items-center gap-2">
						<Heart size={18} class="text-primary-400" />
						<span>100% Free</span>
					</div>
					<div class="flex items-center gap-2">
						<Lightbulb size={18} class="text-primary-400" />
						<span>Battle-Tested</span>
					</div>
					<div class="flex items-center gap-2">
						<BookOpen size={18} class="text-primary-400" />
						<span>New Content Weekly</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Back to resources -->
	<div class="border-t border-surface-600 pt-8">
		<a
			href="/resources"
			class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800 px-6 py-3 font-medium text-surface-300 transition-all duration-200 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
		>
			<ArrowLeft size={20} class="transition-transform duration-200 group-hover:-translate-x-1" />
			<span>Back to all resources</span>
		</a>
	</div>
</div>
