<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import {
		BookOpen,
		Code2,
		Download,
		ExternalLink,
		Lightbulb,
		GraduationCap,
		Rocket,
		ArrowRight,
		Sparkles,
		Wrench,
		BookMarked,
		Zap,
		FileCode,
		Layout,
		Heart
	} from '@lucide/svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let resources: ContentItem[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			resources = await loadContent('resources');
		} catch (error) {
			console.error('Failed to load resources:', error);
		} finally {
			loading = false;
		}
	});

	// Resource categories for showcasing value
	const categories = [
		{
			icon: Wrench,
			title: 'Developer Tools',
			description: 'Hand-picked tools that boost productivity and code quality',
			color: 'primary',
			count: '15+'
		},
		{
			icon: Code2,
			title: 'Code Snippets',
			description: 'Production-ready code patterns and solutions',
			color: 'secondary',
			count: '25+'
		},
		{
			icon: BookMarked,
			title: 'Tutorials & Guides',
			description: 'Step-by-step guides for modern web development',
			color: 'primary',
			count: '10+'
		},
		{
			icon: Lightbulb,
			title: 'Best Practices',
			description: 'Industry standards and proven methodologies',
			color: 'secondary',
			count: '20+'
		}
	];
</script>

<svelte:head>
	<title>Resources - Free Tools & Guides | Hessam Khoobkar</title>
	<meta
		name="description"
		content="Free resources for web developers: curated tools, code snippets, guides, and tutorials. Learn from my experience building modern web applications with React, Svelte, and more."
	/>
	<meta
		name="keywords"
		content="web development resources, free developer tools, code snippets, programming guides, React resources, Svelte tutorials"
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Resources - Free Tools & Guides" />
	<meta
		property="og:description"
		content="Free resources for web developers: tools, code snippets, and guides."
	/>
	<meta property="og:url" content="https://khoobkar.com/resources" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Resources - Free Tools & Guides" />
	<meta
		name="twitter:description"
		content="Free resources for web developers: tools, code snippets, and guides."
	/>
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<header class="relative mb-8 h-96 w-full overflow-hidden rounded-2xl border border-surface-600">
		<Silk speed={5} scale={1} color="#ef5e03" noiseIntensity={1.5} rotation={0} />
		<div class="absolute inset-0 z-2 flex flex-col items-center justify-center px-4">
			<div class="mb-4 flex items-center gap-2 text-primary-400">
				<Lightbulb size={40} class="animate-pulse" />
			</div>
			<h1 class="mb-4 text-center text-5xl font-bold text-surface-50 md:text-6xl">
				Developer <span class="text-primary-400">Resources</span>
			</h1>
			<p class="max-w-2xl text-center text-xl text-surface-100 md:text-2xl">
				Free tools, guides, and knowledge to accelerate your development journey
			</p>
		</div>
	</header>

	<div class="mx-auto max-w-6xl space-y-12">
		<!-- Value Proposition -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center md:p-12">
			<div class="mb-6 flex justify-center">
				<div class="rounded-full bg-primary-500/20 p-4">
					<GraduationCap size={48} class="text-primary-400" />
				</div>
			</div>
			<h2 class="mb-4 text-3xl font-bold text-surface-50 md:text-4xl">
				Empowering the <span class="text-primary-400">Developer Community</span>
			</h2>
			<p class="mx-auto mb-8 max-w-3xl text-lg text-surface-200 md:text-xl">
				After 10+ years in web development, I've learned what works and what doesn't. Here I share
				the tools, techniques, and insights that have made me a better developer. All free, no
				strings attached.
			</p>
			<div class="flex flex-wrap items-center justify-center gap-4 text-sm text-surface-300">
				<div class="flex items-center gap-2">
					<Heart size={20} class="text-primary-400" />
					<span>Curated with care</span>
				</div>
				<div class="flex items-center gap-2">
					<Sparkles size={20} class="text-primary-400" />
					<span>Battle-tested in production</span>
				</div>
				<div class="flex items-center gap-2">
					<Zap size={20} class="text-primary-400" />
					<span>Regularly updated</span>
				</div>
			</div>
		</section>

		<!-- Resource Categories Grid -->
		<section>
			<div class="mb-8 text-center">
				<h2 class="mb-3 text-3xl font-bold text-surface-50">What You'll Find Here</h2>
				<p class="text-lg text-surface-300">
					Practical resources organized by category for easy discovery
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each categories as category}
					{@const Icon = category.icon}
					<div
						class="group hover:bg-surface-750 rounded-2xl border border-surface-600 bg-surface-800 p-6 text-center transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
					>
						<div class="mb-4 flex justify-center">
							<div
								class="rounded-xl bg-primary-500/20 p-4 transition-all group-hover:scale-110 group-hover:bg-primary-500/30"
							>
								<Icon size={32} class="text-primary-400" />
							</div>
						</div>
						<div class="mb-2 text-2xl font-bold text-primary-400">{category.count}</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">{category.title}</h3>
						<p class="text-sm text-surface-300">{category.description}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Featured Resources Header -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center">
			<div class="mb-4 flex justify-center">
				<div class="rounded-full bg-primary-500/20 p-4">
					<BookOpen size={40} class="text-primary-400" />
				</div>
			</div>
			<h2 class="mb-4 text-3xl font-bold text-surface-50">Featured Resources</h2>
			<p class="mx-auto max-w-2xl text-lg text-surface-300">
				In-depth guides, tools, and best practices from the trenches of web development
			</p>
		</section>

		{#if loading}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _}
					<div class="animate-pulse rounded-2xl bg-surface-800 p-6">
						<div class="mb-4 h-4 rounded bg-surface-700"></div>
						<div class="mb-2 h-3 rounded bg-surface-700"></div>
						<div class="h-3 w-2/3 rounded bg-surface-700"></div>
					</div>
				{/each}
			</div>
		{:else if resources.length === 0}
			<!-- Empty State with Resource Categories -->
			<div class="space-y-8">
				<div class="rounded-2xl border border-surface-600 bg-surface-800 p-12 text-center">
					<div class="mb-6 flex justify-center">
						<div class="rounded-full bg-primary-500/20 p-6">
							<BookOpen size={48} class="text-primary-400" />
						</div>
					</div>
					<h2 class="mb-4 text-2xl font-semibold text-surface-50">More Resources Coming Soon</h2>
					<p class="mx-auto mb-8 max-w-2xl text-surface-300">
						I'm actively building out this section with valuable tools and guides. Here's what you
						can expect:
					</p>
				</div>

				<!-- Resource Categories Preview -->
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">🛠️</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Development Tools</h3>
						<p class="mb-4 text-sm text-surface-300">
							Curated list of essential tools for modern web development, from code editors to
							browser extensions.
						</p>
						<div class="text-xs text-surface-400">Coming soon</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">📦</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Code Snippets</h3>
						<p class="mb-4 text-sm text-surface-300">
							Reusable code snippets for common patterns in React, Svelte, and vanilla JavaScript.
						</p>
						<div class="text-xs text-surface-400">Coming soon</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">📚</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Learning Resources</h3>
						<p class="mb-4 text-sm text-surface-300">
							Tutorials, courses, and guides that have helped me grow as a developer over the years.
						</p>
						<div class="text-xs text-surface-400">Coming soon</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">🎨</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Design Resources</h3>
						<p class="mb-4 text-sm text-surface-300">
							UI kits, icon libraries, color palettes, and design inspiration for developers.
						</p>
						<div class="text-xs text-surface-400">Coming soon</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">⚡</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Performance Tips</h3>
						<p class="mb-4 text-sm text-surface-300">
							Guides and best practices for optimizing web performance and achieving perfect
							Lighthouse scores.
						</p>
						<div class="text-xs text-surface-400">Coming soon</div>
					</div>

					<div class="rounded-xl border border-surface-600 bg-surface-800 p-6">
						<div class="mb-4 text-4xl">📖</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">Cheat Sheets</h3>
						<p class="mb-4 text-sm text-surface-300">
							Quick reference guides for Git, CSS, JavaScript, and essential web development
							concepts.
						</p>
						<div class="text-xs text-surface-400">Coming soon</div>
					</div>
				</div>

				<!-- Temporary CTA to Blog -->
				<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center">
					<h3 class="mb-4 text-xl font-semibold text-surface-50">
						In the meantime, check out my blog
					</h3>
					<p class="mb-6 text-surface-300">
						I regularly share insights, tutorials, and tips on web development in my blog.
					</p>
					<a
						href="/insights"
						class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-500"
					>
						<BookOpen size={18} />
						Read Blog Posts
					</a>
				</div>
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each resources as resource}
					<ArticleCard
						post={resource}
						basePath="/resources"
						contentTypeIcon={BookOpen}
						contentTypeLabel="Resource"
						buttonText="View resource"
					/>
				{/each}
			</div>

			<!-- CTA Section -->
			<Footer />
		{/if}
	</div>
</div>
