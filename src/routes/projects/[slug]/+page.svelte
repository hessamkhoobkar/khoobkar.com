<script lang="ts">
	import { page } from '$app/stores';
	import { loadContentItem } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import {
		ArrowLeft,
		ExternalLink,
		Github,
		Calendar,
		Clock,
		Tag,
		TrendingUp,
		Users,
		Zap,
		Code2,
		Layers,
		BarChart3,
		CheckCircle2,
		Star,
		Eye,
		Download,
		Globe,
		Smartphone,
		Monitor
	} from '@lucide/svelte';

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

	// Mock project data for demonstration
	const mockProject = {
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
		},
		content: `
# SaaS Analytics Platform

A comprehensive analytics platform that helps businesses track user behavior and optimize conversion rates.

## Project Overview

This SaaS application was built to solve the problem of fragmented analytics data across multiple business tools. The platform provides a unified dashboard that aggregates data from various sources and presents actionable insights.

## Key Features

- **Real-time Analytics**: Live data streaming with sub-second updates
- **Custom Dashboards**: Drag-and-drop interface for creating personalized views
- **Advanced Segmentation**: Powerful user segmentation tools
- **API Integration**: Connect with 50+ popular business tools
- **Mobile Responsive**: Optimized for all device sizes

## Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Redis caching
- **Infrastructure**: AWS (ECS, RDS, ElastiCache)
- **Monitoring**: DataDog, Sentry

## Results

- **40% increase** in user engagement
- **60% reduction** in time-to-insight
- **99.9% uptime** achieved
- **$2M ARR** generated within 12 months

## Challenges Solved

### Performance Optimization
The initial version was slow due to complex queries. I implemented:
- Database query optimization
- Redis caching layer
- CDN integration
- Lazy loading for large datasets

### Scalability
As user base grew, I addressed:
- Horizontal scaling with microservices
- Database sharding
- Load balancing
- Auto-scaling infrastructure

## Lessons Learned

1. **Start with performance in mind** - It's harder to optimize later
2. **User feedback is crucial** - Regular user interviews shaped the product
3. **Technical debt compounds** - Address it early and often
4. **Documentation saves time** - Well-documented APIs reduce support burden

## Future Enhancements

- Machine learning-powered insights
- Advanced reporting features
- White-label solutions
- Mobile app development
		`
	};

	// Use mock data if no real project loaded
	const displayProject = $derived(project || mockProject);

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
	<!-- Back Navigation -->
	<div class="container mx-auto px-4 py-8">
		<a
			href="/projects"
			class="inline-flex items-center gap-2 text-surface-400 transition-colors hover:text-surface-100"
		>
			<ArrowLeft size={20} />
			<span>Back to Projects</span>
		</a>
	</div>

	<!-- Hero Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<!-- Project Header -->
				<div class="mb-8">
					<div class="mb-4 flex items-center gap-2">
						{#if displayProject.meta.featured}
							<div
								class="flex items-center gap-1 rounded-full bg-primary-500 px-2 py-1 text-xs font-medium text-surface-900"
							>
								<Star size={12} />
								Featured
							</div>
						{/if}
						<span class="rounded-full bg-surface-700 px-2 py-1 text-xs text-surface-300">
							{displayProject.meta.category}
						</span>
					</div>

					<h1 class="mb-6 text-5xl font-bold text-surface-100 md:text-6xl">
						{displayProject.meta.title}
					</h1>

					<p class="mb-8 text-xl leading-relaxed text-surface-400">
						{displayProject.meta.description}
					</p>

					<!-- Project Meta -->
					<div class="mb-8 flex flex-wrap items-center gap-6 text-sm text-surface-400">
						<div class="flex items-center gap-2">
							<Calendar size={16} />
							<span>{new Date(displayProject.meta.date).toLocaleDateString()}</span>
						</div>
						<div class="flex items-center gap-2">
							<Clock size={16} />
							<span>{displayProject.meta.readingTime} min read</span>
						</div>
						<div class="flex items-center gap-2">
							<Tag size={16} />
							<span>{displayProject.meta.author}</span>
						</div>
					</div>
				</div>

				<!-- Project Image -->
				{#if displayProject.meta.image}
					<div
						class="mb-12 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20"
					>
						<img
							src={displayProject.meta.image}
							alt={displayProject.meta.title}
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}

				<!-- Project Metrics -->
				<div class="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
					{#each metrics as metric}
						<div
							class="rounded-2xl border border-surface-700 bg-gradient-to-br from-surface-800 to-surface-900 p-6 text-center"
						>
							<svelte:component
								this={metric.icon}
								size={32}
								class="mx-auto mb-3 text-primary-400"
							/>
							<div class="mb-1 text-2xl font-bold text-surface-100">{metric.value}</div>
							<div class="text-sm text-surface-400">{metric.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Content Section -->
	<section class="bg-surface-900 py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<div class="prose prose-lg max-w-none prose-invert">
					{@html displayProject.content}
				</div>
			</div>
		</div>
	</section>

	<!-- Tech Stack -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<h2 class="mb-8 text-3xl font-bold text-surface-100">Technical Stack</h2>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each techStack as tech}
						<div
							class="flex items-center gap-3 rounded-xl border border-surface-700 bg-surface-800 p-4"
						>
							<svelte:component this={tech.icon} size={24} class="text-primary-400" />
							<div>
								<div class="font-medium text-surface-100">{tech.name}</div>
								<div class="text-sm text-surface-400">{tech.category}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Tags -->
	{#if displayProject.meta.tags && displayProject.meta.tags.length > 0}
		<section class="bg-surface-900 py-20">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-4xl">
					<h2 class="mb-8 text-3xl font-bold text-surface-100">Technologies Used</h2>
					<div class="flex flex-wrap gap-3">
						{#each displayProject.meta.tags as tag}
							<span class="rounded-full bg-primary-500/20 px-4 py-2 font-medium text-primary-400">
								{tag}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- Call to Action -->
	<section class="py-20">
		<div class="container mx-auto px-4 text-center">
			<div class="mx-auto max-w-3xl">
				<h2 class="mb-6 text-4xl font-bold text-surface-100">Interested in Similar Solutions?</h2>
				<p class="mb-8 text-xl text-surface-400">
					Let's discuss how I can help you build innovative solutions that drive real business
					results
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 font-semibold text-surface-900 transition-colors hover:bg-primary-400"
					>
						<span>Start a Project</span>
						<ExternalLink size={20} />
					</a>
					<a
						href="/process"
						class="inline-flex items-center gap-2 rounded-full border border-surface-700 px-8 py-4 font-semibold text-surface-300 transition-colors hover:border-primary-500 hover:text-surface-100"
					>
						<span>View My Process</span>
						<Eye size={20} />
					</a>
				</div>
			</div>
		</div>
	</section>
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
</style>
