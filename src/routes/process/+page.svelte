<script lang="ts">
	import { onMount } from 'svelte';
	import { loadContent } from '$lib/utils/content';
	import type { ContentItem } from '$lib/data/content';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import {
		Users,
		Sparkles,
		CheckCircle2,
		ArrowRight,
		Eye,
		BarChart3,
		FileText,
		Code
	} from '@lucide/svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let processContent: ContentItem[] = $state([]);

	onMount(async () => {
		try {
			const contentData = await loadContent('process');
			processContent = contentData;
		} catch (error) {
			console.error('Failed to load process content:', error);
		}
	});

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
<SilkHero
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
<section class="relative z-10 mx-auto max-w-7xl px-4 py-8">
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

<!-- All Process Content -->
<section class="py-20">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-bold text-surface-100 md:text-5xl">Process Content</h2>
			<p class="mx-auto max-w-3xl text-xl text-surface-400">
				Dev logs, case studies, and idea-to-product showcases - all in one place
			</p>
		</div>

		{#if processContent.length > 0}
			<div class="grid gap-8 py-8 md:grid-cols-2">
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

<!-- Footer CTA -->
<section class="mx-auto max-w-7xl px-4 py-20">
	<Footer />
</section>
