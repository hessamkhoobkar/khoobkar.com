<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import Hero from '$lib/components/ui/Hero.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import {
		Users,
		Target,
		Zap,
		Sparkles,
		CheckCircle2,
		ArrowRight,
		Eye,
		Clock,
		Star,
		BarChart3,
		Play,
		FileText,
		Lightbulb,
		Code,
		Wrench,
		Rocket,
		Calendar
	} from '@lucide/svelte';

	let processContent: ContentItem[] = $state([]);

	onMount(async () => {
		try {
			const contentData = await loadContent('process');
			processContent = contentData;
		} catch (error) {
			console.error('Failed to load process content:', error);
		}
	});

	// Process highlights
	const highlights = [
		{
			icon: Zap,
			title: 'Transparent Development',
			description:
				'Real-time insights into my development process, challenges faced, and solutions implemented',
			metrics: ['Weekly Updates', 'Code Reviews', 'Performance Metrics']
		},
		{
			icon: Target,
			title: 'Problem-Solving Focus',
			description:
				'Detailed case studies showing how I approach complex technical challenges and deliver results',
			metrics: ['Root Cause Analysis', 'Solution Architecture', 'Impact Measurement']
		},
		{
			icon: Lightbulb,
			title: 'Innovation Showcase',
			description:
				'Rebuilding previous projects with modern techniques to demonstrate continuous improvement',
			metrics: ['Before/After Comparisons', 'Technology Upgrades', 'Performance Gains']
		}
	];

	// Content type icons and labels
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
</script>

<svelte:head>
	<title>Process - Khoobkar</title>
	<meta
		name="description"
		content="Explore my development process through dev logs, case studies, and idea-to-product showcases. See how I solve complex problems and build innovative solutions."
	/>
</svelte:head>

<!-- Hero Section -->
<Hero
	icon={FileText}
	title="Development Process"
	subtitle="Transparent insights into how I build, solve problems, and create innovative solutions"
	silkColor="#ef5e03"
	silkSpeed={5}
	silkScale={1}
	silkNoiseIntensity={1.5}
	silkRotation={0}
/>

<!-- Stats Section -->
<section class="relative z-10 container mx-auto -mt-20 px-4">
	<div class="flex flex-wrap justify-center gap-4">
		<div
			class="flex items-center gap-2 rounded-full border border-surface-700 bg-surface-800/50 px-4 py-2 backdrop-blur-sm"
		>
			<FileText size={20} class="text-primary-400" />
			<span class="text-sm font-medium text-surface-200">{processContent.length}+</span>
			<span class="text-xs text-surface-400">Articles</span>
		</div>
		<div
			class="flex items-center gap-2 rounded-full border border-surface-700 bg-surface-800/50 px-4 py-2 backdrop-blur-sm"
		>
			<BarChart3 size={20} class="text-primary-400" />
			<span class="text-sm font-medium text-surface-200">50+</span>
			<span class="text-xs text-surface-400">Lessons</span>
		</div>
		<div
			class="flex items-center gap-2 rounded-full border border-surface-700 bg-surface-800/50 px-4 py-2 backdrop-blur-sm"
		>
			<Users size={20} class="text-primary-400" />
			<span class="text-sm font-medium text-surface-200">10K+</span>
			<span class="text-xs text-surface-400">Readers</span>
		</div>
	</div>
</section>

<!-- Process Highlights -->
<section class="bg-surface-900 py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">Process Excellence</h2>
			<p class="mx-auto max-w-3xl text-xl text-surface-400">
				From transparent development to innovative problem-solving, every aspect of my process is
				designed to deliver exceptional results
			</p>
		</div>

		<div class="mb-16 grid gap-8 md:grid-cols-3">
			{#each highlights as highlight}
				<div
					class="group relative overflow-hidden rounded-2xl border border-surface-700 bg-gradient-to-br from-surface-800 to-surface-900 p-8 transition-all duration-300 hover:border-primary-500/50"
				>
					<div
						class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<div class="relative z-10">
						<div class="mb-4 flex items-center gap-3">
							{#if highlight.icon}
								{@const IconComponent = highlight.icon}
								<IconComponent size={24} class="text-primary-400" />
							{/if}
							<h3 class="text-xl font-semibold text-surface-100">{highlight.title}</h3>
						</div>
						<p class="mb-6 text-surface-400">{highlight.description}</p>
						<div class="space-y-2">
							{#each highlight.metrics as metric}
								<div class="flex items-center gap-2 text-sm text-surface-300">
									<CheckCircle2 size={16} class="text-primary-400" />
									<span>{metric}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- All Process Content -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">Process Content</h2>
			<p class="mx-auto max-w-3xl text-xl text-surface-400">
				Dev logs, case studies, and idea-to-product showcases - all in one place
			</p>
		</div>

		{#if processContent.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each processContent as item}
					{@const typeInfo = getContentTypeInfo(item.meta.tags || [])}
					<ArticleCard
						post={item}
						basePath="/process"
						contentTypeIcon={typeInfo.icon}
						contentTypeLabel={typeInfo.label}
						buttonText="Read"
					/>
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center">
				<Code size={64} class="mx-auto mb-6 text-surface-600" />
				<h3 class="mb-4 text-2xl font-semibold text-surface-300">Content Coming Soon</h3>
				<p class="mb-8 text-surface-500">
					I'm working on documenting my development process. Check back soon for dev logs, case
					studies, and idea-to-product showcases.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-surface-900 transition-colors hover:bg-primary-400"
					>
						<span>Get Notified</span>
						<ArrowRight size={20} />
					</a>
					<a
						href="/projects"
						class="inline-flex items-center gap-2 rounded-full border border-surface-700 px-6 py-3 font-semibold text-surface-300 transition-colors hover:border-primary-500 hover:text-surface-100"
					>
						<span>View Projects</span>
						<Eye size={20} />
					</a>
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- Call to Action -->
<section class="bg-gradient-to-br from-primary-500/10 to-primary-600/10 py-20">
	<div class="container mx-auto px-4 text-center">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">
				Ready to See This Process in Action?
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
					href="/projects"
					class="inline-flex items-center gap-2 rounded-full border border-surface-700 px-8 py-4 font-semibold text-surface-300 transition-colors hover:border-primary-500 hover:text-surface-100"
				>
					<span>View My Projects</span>
					<Eye size={20} />
				</a>
			</div>
		</div>
	</div>
</section>
