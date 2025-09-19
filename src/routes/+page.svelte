<script lang="ts">
	import { onMount } from 'svelte';
	import { getFeaturedContent, getAllPublishedContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';

	let featuredContent: ContentItem[] = $state([]);
	let recentContent: ContentItem[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const [featured, all] = await Promise.all([getFeaturedContent(), getAllPublishedContent()]);

			featuredContent = featured;
			recentContent = all.slice(0, 6); // Get 6 most recent items
		} catch (error) {
			console.error('Failed to load content:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Khoobkar - Digital Excellence</title>
	<meta
		name="description"
		content="We create exceptional digital experiences that make a difference. Specializing in web development, mobile applications, and digital strategy."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-16">
	<!-- Hero Section -->
	<section class="py-16 text-center">
		<h1 class="mb-6 text-6xl font-bold text-surface-50">
			Digital <span class="text-primary-400">Excellence</span>
		</h1>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-surface-300">
			We create exceptional digital experiences that make a difference. From modern web applications
			to mobile solutions, we help businesses thrive in the digital age.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a
				href="/work"
				class="rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-500"
			>
				View Our Work
			</a>
			<a
				href="/about"
				class="rounded-lg border border-surface-600 px-8 py-3 font-medium text-surface-300 transition-colors hover:border-surface-500 hover:text-surface-200"
			>
				Learn More
			</a>
		</div>
	</section>

	<!-- Featured Content -->
	{#if loading}
		<section>
			<h2 class="mb-8 text-3xl font-bold text-surface-50">Featured Content</h2>
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(3) as _}
					<div class="animate-pulse rounded-lg bg-surface-800 p-6">
						<div class="mb-4 h-4 rounded bg-surface-700"></div>
						<div class="mb-2 h-3 rounded bg-surface-700"></div>
						<div class="h-3 w-2/3 rounded bg-surface-700"></div>
					</div>
				{/each}
			</div>
		</section>
	{:else if featuredContent.length > 0}
		<section>
			<h2 class="mb-8 text-3xl font-bold text-surface-50">Featured Content</h2>
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredContent as item}
					<article
						class="hover:bg-surface-750 overflow-hidden rounded-lg bg-surface-800 transition-all duration-300 hover:scale-[1.02]"
					>
						{#if item.meta.image}
							<div class="aspect-video bg-surface-700">
								<img
									src={item.meta.image}
									alt={item.meta.title}
									class="h-full w-full object-cover"
								/>
							</div>
						{/if}

						<div class="p-6">
							<div class="mb-3 flex items-center gap-2 text-sm text-surface-400">
								<span
									class="rounded bg-primary-500/20 px-2 py-1 text-xs text-primary-300 capitalize"
								>
									{item.meta.category === 'case-study' ? 'Case Study' : item.meta.category}
								</span>
								<time datetime={item.meta.date}>
									{new Date(item.meta.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}
								</time>
								{#if item.meta.readingTime}
									<span>•</span>
									<span>{item.meta.readingTime} min read</span>
								{/if}
							</div>

							<h3 class="mb-3 line-clamp-2 text-xl font-semibold text-surface-50">
								<a
									href="/{item.meta.category === 'blog'
										? 'insights'
										: item.meta.category === 'case-study'
											? 'work'
											: item.meta.category}/{item.meta.slug}"
									class="transition-colors hover:text-primary-400"
								>
									{item.meta.title}
								</a>
							</h3>

							<p class="mb-4 line-clamp-3 text-surface-300">
								{item.meta.description}
							</p>

							<a
								href="/{item.meta.category === 'blog'
									? 'insights'
									: item.meta.category === 'case-study'
										? 'work'
										: item.meta.category}/{item.meta.slug}"
								class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
							>
								Read more
								<span>→</span>
							</a>
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Services Overview -->
	<section class="rounded-lg bg-surface-800 p-12">
		<h2 class="mb-8 text-center text-3xl font-bold text-surface-50">What We Do</h2>
		<div class="grid gap-8 md:grid-cols-3">
			<div class="text-center">
				<div class="mb-4 text-4xl">🌐</div>
				<h3 class="mb-3 text-xl font-semibold text-surface-50">Web Development</h3>
				<p class="text-surface-300">
					Modern, responsive websites built with cutting-edge technologies like React, Svelte, and
					Next.js.
				</p>
			</div>
			<div class="text-center">
				<div class="mb-4 text-4xl">📱</div>
				<h3 class="mb-3 text-xl font-semibold text-surface-50">Mobile Applications</h3>
				<p class="text-surface-300">
					Native and cross-platform mobile apps that provide seamless user experiences across all
					devices.
				</p>
			</div>
			<div class="text-center">
				<div class="mb-4 text-4xl">💡</div>
				<h3 class="mb-3 text-xl font-semibold text-surface-50">Digital Strategy</h3>
				<p class="text-surface-300">
					Comprehensive digital transformation consulting to help your business thrive in the
					digital age.
				</p>
			</div>
		</div>
	</section>

	<!-- Recent Content -->
	{#if recentContent.length > 0}
		<section>
			<div class="mb-8 flex items-center justify-between">
				<h2 class="text-3xl font-bold text-surface-50">Latest Updates</h2>
				<a href="/insights" class="text-primary-400 transition-colors hover:text-primary-300">
					View all →
				</a>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each recentContent as item}
					<article class="hover:bg-surface-750 rounded-lg bg-surface-800 p-6 transition-colors">
						<div class="mb-3 flex items-center gap-2 text-sm text-surface-400">
							<span class="rounded bg-surface-700 px-2 py-1 text-xs text-surface-300 capitalize">
								{item.meta.category === 'case-study' ? 'Case Study' : item.meta.category}
							</span>
							<time datetime={item.meta.date}>
								{new Date(item.meta.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
						</div>

						<h3 class="mb-2 line-clamp-2 text-lg font-semibold text-surface-50">
							<a
								href="/{item.meta.category === 'blog'
									? 'insights'
									: item.meta.category === 'case-study'
										? 'work'
										: item.meta.category}/{item.meta.slug}"
								class="transition-colors hover:text-primary-400"
							>
								{item.meta.title}
							</a>
						</h3>

						<p class="line-clamp-2 text-sm text-surface-300">
							{item.meta.description}
						</p>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Call to Action -->
	<section
		class="rounded-lg bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-12 text-center"
	>
		<h2 class="mb-4 text-3xl font-bold text-surface-50">Ready to Start Your Project?</h2>
		<p class="mx-auto mb-8 max-w-2xl text-lg text-surface-200">
			Let's discuss how we can help transform your ideas into exceptional digital experiences.
		</p>
		<a
			href="/contact"
			class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-primary-500"
		>
			<span>💬</span>
			Get in Touch
		</a>
	</section>
</div>
