<script lang="ts">
	import { Rocket, Mail, ArrowRight, BookOpen } from '@lucide/svelte';
</script>

<footer
	class="relative overflow-hidden rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 via-primary-600/5 to-transparent p-8 text-center md:p-12"
>
	<!-- Decorative elements -->
	<div class="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl"></div>
	<div
		class="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl"
	></div>

	<div class="relative">
		<div class="mb-6 flex justify-center">
			<div class="rounded-full bg-primary-500/20 p-4">
				<Rocket size={48} class="text-primary-400" />
			</div>
		</div>
		<h2 class="mb-4 text-3xl font-bold text-surface-50 md:text-4xl">
			Let's Create Something <span class="text-primary-400">Extraordinary</span>
		</h2>
		<p class="mx-auto mb-8 max-w-2xl text-lg text-surface-200">
			Whether you're hiring for your team, need an expert for your next project, or want to discuss
			web development, I'd love to connect. I respond within 24 hours and am ready to dive into
			challenging projects.
		</p>

		<div class="flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="group inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 font-medium text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/40"
			>
				<Mail size={20} />
				<span>Get in Touch</span>
			</a>
			<a
				href="/work"
				class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800/50 px-8 py-4 font-medium text-surface-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
			>
				<span>View Portfolio</span>
				<ArrowRight size={20} class="transition-transform duration-200 group-hover:translate-x-1" />
			</a>
			<a
				href="/insights"
				class="group inline-flex items-center gap-2 rounded-lg border border-surface-600 bg-surface-800/50 px-8 py-4 font-medium text-surface-300 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
			>
				<BookOpen size={20} />
				<span>Read My Insights</span>
			</a>
		</div>

		<!-- Availability status -->
		<div
			class="mt-12 inline-flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-6 py-3"
		>
			<div class="relative flex h-3 w-3">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"
				></span>
				<span class="relative inline-flex h-3 w-3 rounded-full bg-primary-500"></span>
			</div>
			<span class="font-medium text-primary-300">Available for New Projects</span>
		</div>
	</div>
</footer>
