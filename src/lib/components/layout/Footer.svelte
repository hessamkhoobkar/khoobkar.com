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

<footer class="relative rounded-2xl border border-surface-700 bg-surface-800 p-8 md:p-10">
	<!-- Top Section: Headline & CTA -->
	<div class="mb-8 text-center">
		<!-- Headline -->
		<h2 class="mb-3 text-2xl font-bold text-surface-50 md:text-3xl">{headline}</h2>

		<!-- Subheadline -->
		<p class="mx-auto mb-8 max-w-xl text-base leading-relaxed text-surface-300 md:text-lg">
			{subheadline}
		</p>

		<!-- CTA Buttons -->
		<div class="flex flex-wrap justify-center gap-3">
			{#if !isOnContact}
				<a
					href="/contact"
					class="group inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-500"
				>
					<Mail size={18} />
					<span>Get in Touch</span>
				</a>
			{/if}

			{#if !isOnWork}
				<a
					href="/work"
					class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800 px-6 py-3 text-sm font-semibold text-surface-200 transition-colors duration-200 hover:border-primary-500 hover:text-primary-300"
				>
					<Briefcase size={18} />
					<span>View Portfolio</span>
					<ArrowRight
						size={16}
						class="transition-transform duration-200 group-hover:translate-x-0.5"
					/>
				</a>
			{/if}

			{#if !isOnInsights}
				<a
					href="/insights"
					class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800 px-6 py-3 text-sm font-semibold text-surface-200 transition-colors duration-200 hover:border-primary-500 hover:text-primary-300"
				>
					<BookOpen size={18} />
					<span>Read Insights</span>
					<ArrowRight
						size={16}
						class="transition-transform duration-200 group-hover:translate-x-0.5"
					/>
				</a>
			{/if}
		</div>
	</div>

	<!-- Bottom Section: Availability -->
	<div class="flex justify-center">
		<div
			class="flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-5 py-3"
		>
			<!-- Animated Status Indicator -->
			<div class="relative flex h-2.5 w-2.5 flex-shrink-0">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"
				></span>
				<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-500"></span>
			</div>

			<!-- Text Content -->
			<span class="mt-0.5 text-sm font-semibold text-primary-200">Available for new projects</span>
		</div>
	</div>
</footer>
