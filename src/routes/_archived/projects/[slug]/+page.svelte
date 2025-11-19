<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { loadContentItem } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import {
		ArrowLeft,
		ExternalLink,
		Github,
		Calendar,
		Clock,
		User,
		Tag,
		TrendingUp,
		Users,
		Zap,
		Code2,
		Layers,
		BarChart3,
		CheckCircle2,
		Star,
		Download,
		Globe,
		Smartphone,
		Monitor
	} from '@lucide/svelte';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let project: ContentItem | null = $state(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	// Get slug from URL
	const slug = $derived($page.params.slug);

	// Load project data
	async function loadProject() {
		try {
			if (slug) {
				project = await loadContentItem('projects', slug);
			}
		} catch (err) {
			error = 'Project not found';
			console.error('Failed to load project:', err);
		} finally {
			loading = false;
		}
	}

	// Load project on mount
	$effect(() => {
		if (slug) {
			loadProject();
		}
	});

	// Mock project data for demonstration (used as fallback when project loading fails)
	// Note: This mock doesn't have a component, so it won't render content
	const mockProject: Pick<ContentItem, 'meta'> = {
		meta: {
			title: 'SaaS Analytics Platform',
			description:
				'A comprehensive analytics platform that helps businesses track user behavior and optimize conversion rates.',
			date: '2024-01-15',
			author: 'Hessam Khoobkar',
			tags: ['saas', 'analytics', 'react', 'typescript', 'nodejs'],
			featured: true,
			published: true,
			slug: 'saas-analytics-platform',
			category: 'projects' as const,
			readingTime: 8,
			image: '/images/projects/analytics-platform.jpg'
		}
	};

	// Use mock data if no real project loaded
	const displayProject = $derived(project || (mockProject as ContentItem));

	// Project metrics
	const metrics = [
		{ icon: Users, label: 'Active Users', value: '10,000+', color: 'primary' },
		{ icon: TrendingUp, label: 'Growth Rate', value: '150%', color: 'success' },
		{ icon: Zap, label: 'Performance', value: '99.9%', color: 'warning' },
		{ icon: BarChart3, label: 'Revenue', value: '$2M ARR', color: 'primary' }
	];

	// Tech stack items
	const techStack = [
		{ name: 'React 18', category: 'Frontend', icon: Code2 },
		{ name: 'TypeScript', category: 'Language', icon: Code2 },
		{ name: 'Node.js', category: 'Backend', icon: Layers },
		{ name: 'PostgreSQL', category: 'Database', icon: Layers },
		{ name: 'AWS', category: 'Infrastructure', icon: Globe },
		{ name: 'Redis', category: 'Caching', icon: Zap }
	];

	let readingProgress = $state(0);
	let readingProgressCard: HTMLElement | null = $state(null);
	let articleContent: HTMLElement | null = $state(null);

	$effect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		if (loading || error || !articleContent || !readingProgressCard) {
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		const pinTrigger = ScrollTrigger.create({
			trigger: readingProgressCard,
			start: 'top top+=16px',
			end: () => `+=${document.body.scrollHeight}`,
			pin: true,
			pinSpacing: false,
			scrub: false,
			refreshPriority: -1
		});

		const progressTrigger = ScrollTrigger.create({
			trigger: articleContent,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: (self) => {
				readingProgress = Math.min(self.progress * 100, 100);
			}
		});

		return () => {
			pinTrigger.kill();
			progressTrigger.kill();
		};
	});

	onDestroy(() => {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	});
</script>

<svelte:head>
	<title>{displayProject.meta.title} - Projects - Khoobkar</title>
	<meta name="description" content={displayProject.meta.description} />
</svelte:head>

{#if loading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-primary-500"></div>
	</div>
{:else if error}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<h1 class="mb-4 text-4xl font-bold text-surface-100">Project Not Found</h1>
			<p class="mb-8 text-surface-400">The project you're looking for doesn't exist.</p>
			<a
				href="/projects"
				class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-medium text-surface-900 transition-colors hover:bg-primary-400"
			>
				<ArrowLeft size={20} />
				<span>Back to Projects</span>
			</a>
		</div>
	</div>
{:else}
	<div class="mx-auto mt-4 max-w-6xl">
		<div class="grid gap-8 lg:grid-cols-12">
			<!-- Main Content Area -->
			<div class="lg:col-span-8" bind:this={articleContent}>
				<!-- Project Overview Card -->
				<article class="mb-8 overflow-hidden rounded-2xl border border-surface-600 bg-surface-800">
					{#if displayProject.meta.image}
						<div class="aspect-[2/1] overflow-hidden bg-surface-700">
							<img
								src={displayProject.meta.image}
								alt={displayProject.meta.title}
								class="h-full w-full object-cover"
							/>
						</div>
					{/if}

					<div class="p-8 md:p-12">
						<div
							class="mb-6 flex flex-wrap items-center gap-3 text-xs font-medium tracking-wide text-surface-400 uppercase"
						>
							{#if displayProject.meta.featured}
								<span
									class="inline-flex items-center gap-1 rounded-full bg-primary-500 px-3 py-1 text-surface-900"
								>
									<Star size={12} />
									Featured
								</span>
							{/if}
							{#if displayProject.meta.category}
								<span
									class="rounded-full border border-surface-600 bg-surface-700/70 px-3 py-1 text-surface-300"
								>
									{displayProject.meta.category}
								</span>
							{/if}
						</div>

						<h1 class="mb-6 text-4xl leading-tight font-bold text-surface-50 md:text-5xl">
							{displayProject.meta.title}
						</h1>

						{#if displayProject.meta.description}
							<p class="mb-6 text-lg leading-relaxed text-surface-200">
								{displayProject.meta.description}
							</p>
						{/if}

						<div class="flex flex-wrap items-center gap-4 text-sm text-surface-400">
							{#if displayProject.meta.date}
								<div class="flex items-center gap-2">
									<Calendar size={16} class="text-primary-400" />
									<time datetime={displayProject.meta.date}>
										{new Date(displayProject.meta.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</time>
								</div>
							{/if}

							{#if displayProject.meta.readingTime}
								<div class="flex items-center gap-2">
									<Clock size={16} class="text-primary-400" />
									<span>{displayProject.meta.readingTime} min read</span>
								</div>
							{/if}

							{#if displayProject.meta.author}
								<div class="flex items-center gap-2">
									<User size={16} class="text-primary-400" />
									<span>{displayProject.meta.author}</span>
								</div>
							{/if}
						</div>
					</div>
				</article>

				<!-- Project Narrative -->
				<div class="mb-8 rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
					<div
						class="prose prose-lg max-w-none prose-invert prose-headings:font-bold prose-headings:text-surface-50 prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-3xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-2xl prose-p:mb-4 prose-p:leading-relaxed prose-p:text-surface-200 prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300 hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-surface-700/50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:text-surface-200 prose-blockquote:italic prose-strong:text-surface-100 prose-code:rounded prose-code:bg-surface-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary-300 prose-pre:rounded-lg prose-pre:border prose-pre:border-surface-600 prose-pre:bg-surface-900 prose-ol:my-4 prose-ol:text-surface-200 prose-ul:my-4 prose-ul:text-surface-200 prose-li:my-2 prose-img:rounded-lg prose-img:border prose-img:border-surface-600"
					>
						{#if displayProject.component}
							<displayProject.component />
						{:else}
							<p>This project case study is coming soon. Check back later for detailed insights.</p>
						{/if}
					</div>
				</div>

				<!-- Project Metrics -->
				{#if metrics.length > 0}
					<div class="mb-8 rounded-2xl border border-surface-600 bg-surface-800 p-8">
						<h2 class="mb-6 text-2xl font-bold text-surface-50">Impact Metrics</h2>
						<div class="grid gap-4 sm:grid-cols-2">
							{#each metrics as metric}
								{@const Icon = metric.icon}
								<div
									class="flex items-center gap-4 rounded-xl border border-surface-600 bg-surface-700/40 p-4"
								>
									<div
										class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-400"
									>
										<Icon size={24} />
									</div>
									<div>
										<div class="text-xl font-semibold text-surface-100">{metric.value}</div>
										<div class="text-sm text-surface-400">{metric.label}</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Tech Stack -->
				{#if techStack.length > 0}
					<div class="mb-8 rounded-2xl border border-surface-600 bg-surface-800 p-8">
						<h2 class="mb-6 text-2xl font-bold text-surface-50">Technical Stack</h2>
						<div class="grid gap-4 sm:grid-cols-2">
							{#each techStack as tech}
								{@const Icon = tech.icon}
								<div
									class="flex items-center gap-3 rounded-xl border border-surface-600 bg-surface-700/40 p-4"
								>
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10 text-primary-400"
									>
										<Icon size={22} />
									</div>
									<div>
										<div class="font-semibold text-surface-100">{tech.name}</div>
										<div class="text-sm text-surface-400">{tech.category}</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Tags -->
				{#if displayProject.meta.tags && displayProject.meta.tags.length > 0}
					<div class="mb-8 rounded-2xl border border-surface-600 bg-surface-800 p-8">
						<h2 class="mb-6 text-2xl font-bold text-surface-50">Technologies Used</h2>
						<div class="flex flex-wrap gap-2">
							{#each displayProject.meta.tags as tag}
								<span
									class="inline-flex items-center gap-1 rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300"
								>
									<Tag size={14} />
									{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- CTA Card -->
				<div
					class="rounded-2xl border border-primary-500/30 bg-gradient-to-r from-primary-500/10 to-primary-600/10 p-10 text-center"
				>
					<h2 class="mb-4 text-3xl font-bold text-surface-50">Interested in Similar Solutions?</h2>
					<p class="mb-6 text-lg text-surface-200">
						Let's discuss how we can help you build innovative solutions that drive real business
						results.
					</p>
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-surface-900 transition-all hover:bg-primary-400"
					>
						<span>Start a Project</span>
						<ExternalLink size={18} />
					</a>
				</div>
			</div>

			<!-- Sidebar -->
			<aside class="lg:col-span-4">
				<div class="sidebar-sticky space-y-6" data-speed="0">
					<!-- Back Navigation Card -->
					<div class="rounded-2xl border border-surface-600 bg-surface-800">
						<a
							href="/projects"
							class="group flex items-center gap-2 p-4 text-sm text-surface-400 transition-colors hover:text-primary-400"
						>
							<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
							Back to Projects
						</a>
					</div>

					<!-- Quick Stats Card -->
					<div class="rounded-2xl border border-surface-600 bg-surface-800 p-6">
						<h3 class="mb-4 text-sm font-semibold tracking-wider text-surface-400 uppercase">
							Project Snapshot
						</h3>
						<div class="space-y-4 text-sm">
							{#if displayProject.meta.date}
								<div class="flex items-center justify-between">
									<span class="text-surface-300">Launched</span>
									<span class="font-semibold text-surface-100">
										{new Date(displayProject.meta.date).toLocaleDateString('en-US', {
											month: 'short',
											year: 'numeric'
										})}
									</span>
								</div>
							{/if}
							{#if displayProject.meta.readingTime}
								<div class="flex items-center justify-between">
									<span class="text-surface-300">Case Study</span>
									<span class="font-semibold text-surface-100">
										{displayProject.meta.readingTime} min read
									</span>
								</div>
							{/if}
							{#if displayProject.meta.tags}
								<div class="flex items-center justify-between">
									<span class="text-surface-300">Technologies</span>
									<span class="font-semibold text-surface-100"
										>{displayProject.meta.tags.length}</span
									>
								</div>
							{/if}
						</div>
					</div>

					<!-- Deliverables Card -->
					<div class="rounded-2xl border border-surface-600 bg-surface-800 p-6">
						<h3 class="mb-4 text-sm font-semibold tracking-wider text-surface-400 uppercase">
							Key Deliverables
						</h3>
						<ul class="space-y-2 text-sm text-surface-300">
							<li>• Strategy & product roadmap</li>
							<li>• End-to-end design & development</li>
							<li>• Performance optimization</li>
						</ul>
					</div>

					<!-- CTA Card -->
					<div
						class="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-6"
					>
						<h3 class="mb-2 text-lg font-bold text-surface-50">Have a similar project?</h3>
						<p class="mb-4 text-sm text-surface-300">
							Let's shape the right solution for your business goals.
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
								<span class="text-2xl font-bold text-surface-50">
									{Math.round(readingProgress)}%
								</span>
							</ProgressRing>
						</div>
					</div>
				</div>
			</aside>
		</div>
	</div>
{/if}

<style>
	:global(.prose) {
		color: oklch(85% 0.005 264);
	}

	:global(.prose h1),
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4),
	:global(.prose h5),
	:global(.prose h6) {
		color: oklch(95% 0.005 264);
	}

	:global(.prose a) {
		color: oklch(68% 0.21 45);
		text-decoration: none;
	}

	:global(.prose a:hover) {
		color: oklch(70% 0.23 45);
		text-decoration: underline;
	}

	:global(.prose code) {
		background: oklch(20% 0.005 264);
		color: oklch(68% 0.21 45);
		padding: 0.2em 0.4em;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	:global(.prose pre) {
		background: oklch(15% 0.005 264);
		border: 1px solid oklch(30% 0.005 264);
	}

	:global(.prose blockquote) {
		border-left: 4px solid oklch(68% 0.21 45);
		background: oklch(25% 0.005 264);
	}

	:global(.prose > h1:first-child) {
		display: none;
	}
</style>
