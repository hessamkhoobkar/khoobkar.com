<script lang="ts">
	import { socialLinks } from '$lib/data/navigation';
</script>

<svelte:head>
	<title>Contact - Hessam Khoobkar</title>
	<meta
		name="description"
		content="Get in touch with Hessam Khoobkar for web development, mobile applications, and digital strategy consulting."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl space-y-16">
	<!-- Hero Section -->
	<section class="py-16 text-center">
		<h1 class="mb-6 text-5xl font-bold text-surface-50">
			Let's <span class="text-primary-400">Connect</span>
		</h1>
		<p class="mx-auto mb-8 max-w-2xl text-xl text-surface-300">
			Ready to start your next project? Have a question? Just want to say hello? I'd love to hear
			from you.
		</p>
	</section>

	<!-- Main Contact Section -->
	<section class="rounded-lg bg-surface-800 p-12">
		<div class="grid gap-12 lg:grid-cols-2">
			<!-- Email Contact -->
			<div class="text-center lg:text-left">
				<div class="mb-6">
					<div class="mb-4 text-6xl">📧</div>
					<h2 class="mb-4 text-2xl font-bold text-surface-50">Send me an email</h2>
					<p class="mb-6 text-surface-300">
						The best way to reach me is through email. I typically respond within 24 hours.
					</p>
				</div>

				<a
					href="mailto:hello@khoobkar.com"
					class="inline-flex items-center gap-3 rounded-lg bg-primary-600 px-8 py-4 text-lg font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-primary-500"
				>
					<span>✉️</span>
					hello@khoobkar.com
				</a>
			</div>

			<!-- What to Expect -->
			<div class="space-y-6">
				<h3 class="text-xl font-semibold text-surface-50">What happens next?</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div
							class="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white"
						>
							1
						</div>
						<div>
							<h4 class="font-medium text-surface-50">I'll respond quickly</h4>
							<p class="text-sm text-surface-300">Usually within 24 hours, often much sooner</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div
							class="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white"
						>
							2
						</div>
						<div>
							<h4 class="font-medium text-surface-50">We'll discuss your needs</h4>
							<p class="text-sm text-surface-300">
								Understanding your project goals and requirements
							</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div
							class="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white"
						>
							3
						</div>
						<div>
							<h4 class="font-medium text-surface-50">Let's make it happen</h4>
							<p class="text-sm text-surface-300">
								From concept to launch, I'll be with you every step
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Types -->
	<section>
		<h2 class="mb-8 text-center text-3xl font-bold text-surface-50">What can I help you with?</h2>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-lg bg-surface-800 p-6 text-center">
				<div class="mb-4 text-4xl">🌐</div>
				<h3 class="mb-3 text-xl font-semibold text-surface-50">Web Development</h3>
				<p class="mb-4 text-surface-300">
					Modern, responsive websites and web applications built with cutting-edge technologies.
				</p>
				<a
					href="mailto:hello@khoobkar.com?subject=Web Development Project"
					class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
				>
					Let's discuss →
				</a>
			</div>

			<div class="rounded-lg bg-surface-800 p-6 text-center">
				<div class="mb-4 text-4xl">📱</div>
				<h3 class="mb-3 text-xl font-semibold text-surface-50">Mobile Applications</h3>
				<p class="mb-4 text-surface-300">
					Native and cross-platform mobile apps that provide seamless user experiences.
				</p>
				<a
					href="mailto:hello@khoobkar.com?subject=Mobile App Project"
					class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
				>
					Let's discuss →
				</a>
			</div>

			<div class="rounded-lg bg-surface-800 p-6 text-center">
				<div class="mb-4 text-4xl">💡</div>
				<h3 class="mb-3 text-xl font-semibold text-surface-50">Digital Strategy</h3>
				<p class="mb-4 text-surface-300">
					Comprehensive digital transformation consulting to help your business thrive.
				</p>
				<a
					href="mailto:hello@khoobkar.com?subject=Digital Strategy Consultation"
					class="inline-flex items-center gap-2 text-primary-400 transition-colors hover:text-primary-300"
				>
					Let's discuss →
				</a>
			</div>
		</div>
	</section>

	<!-- Social Links -->
	<section
		class="rounded-lg bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-12 text-center"
	>
		<h2 class="mb-4 text-2xl font-bold text-surface-50">Connect with me</h2>
		<p class="mb-8 text-surface-300">Follow my work and connect with me on social media</p>
		<div class="flex justify-center gap-4">
			{#each socialLinks as link}
				<a
					href={link.href}
					target={link.external ? '_blank' : '_self'}
					rel={link.external ? 'noopener noreferrer' : ''}
					class="flex items-center gap-2 rounded-lg border border-surface-600 px-6 py-3 text-surface-300 transition-all duration-200 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
				>
					<span class="text-lg">
						{#if link.label === 'Twitter'}
							🐦
						{:else if link.label === 'LinkedIn'}
							💼
						{:else if link.label === 'GitHub'}
							🐙
						{/if}
					</span>
					{link.label}
				</a>
			{/each}
		</div>
	</section>

	<!-- Additional Info -->
	<section class="rounded-lg bg-surface-800 p-8">
		<div class="grid gap-8 md:grid-cols-2">
			<div>
				<h3 class="mb-4 text-xl font-semibold text-surface-50">Response Time</h3>
				<p class="text-surface-300">
					I typically respond to emails within 24 hours, often much sooner. For urgent matters,
					please mention "URGENT" in your subject line.
				</p>
			</div>
			<div>
				<h3 class="mb-4 text-xl font-semibold text-surface-50">Project Timeline</h3>
				<p class="text-surface-300">
					Most projects can begin within 1-2 weeks of initial contact, depending on current workload
					and project complexity.
				</p>
			</div>
		</div>
	</section>
</div>

