<script lang="ts">
	import { page } from '$app/stores';
	import { Mail, ArrowRight, BookOpen, Briefcase, CheckCircle2, Clock } from '@lucide/svelte';

	const currentPath = $derived($page.url.pathname);

	// Check if we're on a specific page
	const isOnContact = $derived(currentPath === '/contact');
	const isOnInsights = $derived(
		currentPath === '/insights' || currentPath.startsWith('/insights/')
	);
	const isOnWork = $derived(currentPath === '/work' || currentPath.startsWith('/work/'));

	// Get context-aware headline based on current page
	const headline = $derived.by(() => {
		if (isOnContact) {
			return 'Ready to get started?';
		}
		if (isOnInsights) {
			return 'Want to discuss your project?';
		}
		if (isOnWork) {
			return 'Ready to work together?';
		}
		return "Let's work together";
	});

	// Get context-aware subheadline
	const subheadline = $derived.by(() => {
		if (isOnContact) {
			return 'I respond within 24 hours and we can discuss your vision.';
		}
		if (isOnInsights) {
			return "Let's explore how I can help bring your ideas to life.";
		}
		if (isOnWork) {
			return "Let's discuss how I can help elevate your project.";
		}
		return "Whether you're looking for a developer or have a project in mind, I'd love to hear from you.";
	});
</script>

<footer
	class="group relative overflow-hidden rounded-2xl border border-primary-500/20 bg-surface-800/60 p-10 text-center backdrop-blur-sm md:p-12"
>
	<!-- Subtle background elements -->
	<div class="absolute inset-0">
		<div
			class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/8 via-transparent to-primary-600/8"
		></div>
		<div
			class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary-500/5 blur-2xl transition-all duration-700 group-hover:scale-150"
		></div>
		<div
			class="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary-600/5 blur-2xl transition-all delay-300 duration-700 group-hover:scale-150"
		></div>
	</div>

	<div class="relative z-10">
		<!-- Headline -->
		<h2 class="mb-4 text-3xl font-bold text-surface-50 md:text-4xl">{headline}</h2>

		<!-- Subheadline -->
		<p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-surface-300">
			{subheadline}
		</p>

		<!-- CTA Buttons -->
		<div class="mb-10 flex flex-wrap justify-center gap-4">
			{#if !isOnContact}
				<a
					href="/contact"
					class="group relative inline-flex items-center gap-2.5 rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/20 transition-all duration-300 hover:scale-105 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30"
				>
					<Mail size={20} class="transition-transform duration-300 group-hover:scale-110" />
					<span>Get in Touch</span>
				</a>
			{/if}

			{#if !isOnWork}
				<a
					href="/work"
					class="group inline-flex items-center gap-2.5 rounded-xl border border-surface-600 bg-surface-800/70 px-8 py-3.5 text-base font-semibold text-surface-200 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary-500 hover:bg-primary-600/15 hover:text-primary-300 hover:shadow-lg hover:shadow-primary-500/10"
				>
					<Briefcase size={20} />
					<span>View Portfolio</span>
					<ArrowRight
						size={18}
						class="transition-transform duration-300 group-hover:translate-x-1"
					/>
				</a>
			{/if}

			{#if !isOnInsights}
				<a
					href="/insights"
					class="group inline-flex items-center gap-2.5 rounded-xl border border-surface-600 bg-surface-800/70 px-8 py-3.5 text-base font-semibold text-surface-200 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary-500 hover:bg-primary-600/15 hover:text-primary-300 hover:shadow-lg hover:shadow-primary-500/10"
				>
					<BookOpen size={20} />
					<span>Read Insights</span>
					<ArrowRight
						size={18}
						class="transition-transform duration-300 group-hover:translate-x-1"
					/>
				</a>
			{/if}
		</div>

		<!-- Trust Indicators -->
		<div class="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm">
			<div class="flex items-center gap-2">
				<div class="rounded-lg bg-primary-500/10 p-1.5">
					<Clock size={16} class="text-primary-400" />
				</div>
				<span class="text-surface-300">24h Response Time</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="rounded-lg bg-primary-500/10 p-1.5">
					<CheckCircle2 size={16} class="text-primary-400" />
				</div>
				<span class="text-surface-300">50+ Projects Delivered</span>
			</div>
		</div>

		<!-- Availability Status -->
		<div
			class="inline-flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-5 py-3 backdrop-blur-sm"
		>
			<div class="relative flex h-2.5 w-2.5">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"
				></span>
				<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-500"></span>
			</div>
			<span class="text-sm font-semibold text-primary-300">Available for new projects</span>
		</div>
	</div>
</footer>
