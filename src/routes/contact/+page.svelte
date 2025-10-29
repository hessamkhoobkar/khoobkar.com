<script lang="ts">
	import { socialLinks } from '$lib/data/navigation';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import {
		Mail,
		MessageSquare,
		Clock,
		CheckCircle2,
		Send,
		Calendar,
		Linkedin,
		BriefcaseBusiness,
		Rocket,
		Coffee,
		Shield,
		Zap,
		FileText,
		Sparkles
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Contact - Get in Touch | Hessam Khoobkar</title>
	<meta
		name="description"
		content="Ready to start your project? Contact Hessam Khoobkar for web development, freelance services, or full-time opportunities. Quick response guaranteed."
	/>
	<meta
		name="keywords"
		content="contact web developer, hire front-end developer, freelance inquiry, project consultation"
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Contact - Get in Touch" />
	<meta
		property="og:description"
		content="Ready to start your project? Contact Hessam Khoobkar for web development services."
	/>
	<meta property="og:url" content="https://khoobkar.com/contact" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Contact - Get in Touch" />
	<meta
		name="twitter:description"
		content="Ready to start your project? Contact Hessam Khoobkar for web development services."
	/>
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<SilkHero
		icon={Mail}
		title="Get in Touch"
		subtitle="Let's discuss your project and turn your ideas into reality."
		silkColor="#ef5e03"
		silkSpeed={5}
		silkScale={1}
		silkNoiseIntensity={1.5}
		silkRotation={0}
	/>

	<div class="mx-auto max-w-6xl space-y-12 px-4 py-8">
		<!-- Quick Intro -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center md:p-12">
			<h2 class="mb-4 text-3xl font-bold text-surface-50">
				Ready to Start <span class="text-primary-400">Something Great</span>?
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-surface-200">
				Whether you're looking for a full-time developer, need freelance help on a project, or just
				want to connect, I'd love to hear from you. I typically respond within 24 hours.
			</p>
		</div>

		<!-- Contact Methods -->
		<section class="grid gap-6 md:grid-cols-2">
			<!-- Email Contact -->
			<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-10">
				<div class="mb-6 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<Mail size={48} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-4 text-center text-2xl font-bold text-surface-50">Email Me</h2>
				<p class="mb-6 text-center text-surface-300">
					Preferred for detailed inquiries, project discussions, and formal communication.
				</p>
				<a
					href="mailto:amirhessam.dev@gmail.com"
					class="flex items-center justify-center gap-3 rounded-lg bg-primary-600 px-6 py-4 font-medium text-surface-950 transition-all duration-200 hover:scale-105 hover:bg-primary-500"
				>
					<Send size={20} />
					<span class="text-sm font-bold"> amirhessam.dev@gmail.com </span>
				</a>
			</div>

			<!-- Calendly Scheduling -->
			<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-10">
				<div class="mb-6 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<Calendar size={48} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-4 text-center text-2xl font-bold text-surface-50">Schedule a Meeting</h2>
				<p class="mb-6 text-center text-surface-300">
					Book a 30-minute discovery call to discuss your project or opportunity.
				</p>
				<a
					href="https://calendly.com/khoobkar"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-center gap-3 rounded-lg border border-primary-500 bg-primary-500/10 px-6 py-4 font-medium text-primary-300 transition-all duration-200 hover:scale-105 hover:bg-primary-500/20"
				>
					<Calendar size={20} />
					<span class="text-sm font-bold"> Book a Call </span>
				</a>
			</div>
		</section>

		<!-- Professional Network -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 text-center">
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<Linkedin size={40} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-4 text-2xl font-bold text-surface-50">Connect on LinkedIn</h2>
				<p class="mb-6 text-surface-300">
					Let's connect professionally. Great for networking, career opportunities, and staying
					updated.
				</p>
				<a
					href="https://linkedin.com/in/hessam-khoobkar"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg border border-surface-600 px-6 py-3 text-surface-300 transition-all duration-200 hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
				>
					<Linkedin size={20} />
					Connect on LinkedIn
				</a>
			</div>
		</section>

		<!-- Contact Types - Persona Focused -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<h2 class="mb-4 text-center text-3xl font-bold text-surface-50">How Can I Help You?</h2>
			<p class="mb-8 text-center text-lg text-surface-300">
				Choose the best way to reach out based on your needs
			</p>
			<div class="grid gap-6 md:grid-cols-3">
				<div
					class="group rounded-xl border border-surface-600 bg-surface-700/50 p-6 text-center transition-all hover:border-primary-500/50 hover:bg-surface-700"
				>
					<div class="mb-4 flex justify-center">
						<div
							class="rounded-full bg-primary-500/20 p-3 transition-transform group-hover:scale-110"
						>
							<BriefcaseBusiness size={32} class="text-primary-400" />
						</div>
					</div>
					<h3 class="mb-3 text-lg font-semibold text-surface-50">Full-Time Opportunity</h3>
					<p class="mb-4 text-sm text-surface-300">
						Recruiting for your team? Let's discuss how I can contribute as a senior front-end
						developer.
					</p>
				</div>

				<div
					class="group rounded-xl border border-surface-600 bg-surface-700/50 p-6 text-center transition-all hover:border-primary-500/50 hover:bg-surface-700"
				>
					<div class="mb-4 flex justify-center">
						<div
							class="rounded-full bg-primary-500/20 p-3 transition-transform group-hover:scale-110"
						>
							<Rocket size={32} class="text-primary-400" />
						</div>
					</div>
					<h3 class="mb-3 text-lg font-semibold text-surface-50">Freelance Project</h3>
					<p class="mb-4 text-sm text-surface-300">
						Have a project in mind? I'm available for freelance work with transparent pricing and
						timelines.
					</p>
				</div>

				<div
					class="group rounded-xl border border-surface-600 bg-surface-700/50 p-6 text-center transition-all hover:border-primary-500/50 hover:bg-surface-700"
				>
					<div class="mb-4 flex justify-center">
						<div
							class="rounded-full bg-primary-500/20 p-3 transition-transform group-hover:scale-110"
						>
							<Coffee size={32} class="text-primary-400" />
						</div>
					</div>
					<h3 class="mb-3 text-lg font-semibold text-surface-50">Networking & Collaboration</h3>
					<p class="mb-4 text-sm text-surface-300">
						Want to chat about tech, share ideas, or explore collaborations? Let's connect.
					</p>
				</div>
			</div>
		</section>

		<!-- What to Expect - Modern Flowing Timeline -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-12 text-center">
				<h2 class="mb-3 text-3xl font-bold text-surface-50">What Happens Next?</h2>
				<p class="text-lg text-surface-300">
					A simple, transparent process from first contact to launch
				</p>
			</div>

			<div class="mx-auto max-w-4xl">
				<div class="relative space-y-8 pb-12">
					<!-- Vertical Timeline Line -->
					<div
						class="absolute top-12 left-8 hidden h-[calc(100%-3rem)] w-0.5 bg-gradient-to-b from-primary-600 via-primary-500 to-transparent md:block"
					></div>

					<!-- Step 1 -->
					<div class="group relative flex gap-6 md:gap-8">
						<!-- Icon -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:scale-110"
							>
								<Zap size={32} class="text-white" strokeWidth={2.5} />
							</div>
						</div>

						<!-- Content Card -->
						<div
							class="flex-1 rounded-2xl border border-surface-600 bg-surface-700/50 p-6 transition-all duration-300 group-hover:border-primary-500/50 group-hover:bg-surface-700 group-hover:shadow-lg group-hover:shadow-primary-500/10 md:p-8"
						>
							<div class="mb-2 flex items-center gap-3">
								<span
									class="inline-flex items-center rounded-full bg-primary-500/20 px-3 py-1 text-xs font-bold tracking-wider text-primary-400 uppercase"
								>
									Step 1
								</span>
								<span class="text-xs text-surface-500">•</span>
								<span class="text-xs text-surface-400">Immediate</span>
							</div>
							<h3 class="mb-3 text-2xl font-bold text-surface-50">Quick Response</h3>
							<p class="leading-relaxed text-surface-300">
								I'll respond within 24 hours, usually much sooner during business hours. Every
								message gets my personal attention.
							</p>
						</div>
					</div>

					<!-- Step 2 -->
					<div class="group relative flex gap-6 md:gap-8">
						<!-- Icon -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:scale-110"
							>
								<MessageSquare size={32} class="text-white" strokeWidth={2.5} />
							</div>
						</div>

						<!-- Content Card -->
						<div
							class="flex-1 rounded-2xl border border-surface-600 bg-surface-700/50 p-6 transition-all duration-300 group-hover:border-primary-500/50 group-hover:bg-surface-700 group-hover:shadow-lg group-hover:shadow-primary-500/10 md:p-8"
						>
							<div class="mb-2 flex items-center gap-3">
								<span
									class="inline-flex items-center rounded-full bg-primary-500/20 px-3 py-1 text-xs font-bold tracking-wider text-primary-400 uppercase"
								>
									Step 2
								</span>
								<span class="text-xs text-surface-500">•</span>
								<span class="text-xs text-surface-400">30 min call</span>
							</div>
							<h3 class="mb-3 text-2xl font-bold text-surface-50">Discovery Call</h3>
							<p class="leading-relaxed text-surface-300">
								We'll schedule a call or video chat to discuss your project needs, goals, timeline,
								and any specific requirements you have.
							</p>
						</div>
					</div>

					<!-- Step 3 -->
					<div class="group relative flex gap-6 md:gap-8">
						<!-- Icon -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:scale-110"
							>
								<FileText size={32} class="text-white" strokeWidth={2.5} />
							</div>
						</div>

						<!-- Content Card -->
						<div
							class="flex-1 rounded-2xl border border-surface-600 bg-surface-700/50 p-6 transition-all duration-300 group-hover:border-primary-500/50 group-hover:bg-surface-700 group-hover:shadow-lg group-hover:shadow-primary-500/10 md:p-8"
						>
							<div class="mb-2 flex items-center gap-3">
								<span
									class="inline-flex items-center rounded-full bg-primary-500/20 px-3 py-1 text-xs font-bold tracking-wider text-primary-400 uppercase"
								>
									Step 3
								</span>
								<span class="text-xs text-surface-500">•</span>
								<span class="text-xs text-surface-400">Within 48 hours</span>
							</div>
							<h3 class="mb-3 text-2xl font-bold text-surface-50">Tailored Proposal</h3>
							<p class="leading-relaxed text-surface-300">
								Receive a comprehensive proposal with detailed timeline, project scope, milestones,
								and transparent pricing. No hidden fees.
							</p>
						</div>
					</div>

					<!-- Step 4 -->
					<div class="group relative flex gap-6 md:gap-8">
						<!-- Icon -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:scale-110"
							>
								<Sparkles size={32} class="text-white" strokeWidth={2.5} />
							</div>
						</div>

						<!-- Content Card -->
						<div
							class="flex-1 rounded-2xl border border-surface-600 bg-surface-700/50 p-6 transition-all duration-300 group-hover:border-primary-500/50 group-hover:bg-surface-700 group-hover:shadow-lg group-hover:shadow-primary-500/10 md:p-8"
						>
							<div class="mb-2 flex items-center gap-3">
								<span
									class="inline-flex items-center rounded-full bg-primary-500/20 px-3 py-1 text-xs font-bold tracking-wider text-primary-400 uppercase"
								>
									Step 4
								</span>
								<span class="text-xs text-surface-500">•</span>
								<span class="text-xs text-surface-400">Let's go! 🚀</span>
							</div>
							<h3 class="mb-3 text-2xl font-bold text-surface-50">Let's Build Together!</h3>
							<p class="leading-relaxed text-surface-300">
								Once approved, we'll kick off the project with a clear roadmap and regular updates.
								Your vision becomes reality!
							</p>
						</div>
					</div>

					<!-- Success Endpoint -->
					<div class="group relative hidden gap-6 md:flex md:gap-8">
						<!-- Success Icon -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary-500/50 bg-gradient-to-br from-primary-500/20 to-primary-600/20 shadow-lg shadow-primary-500/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary-400 group-hover:from-primary-500/30 group-hover:to-primary-600/30"
							>
								<CheckCircle2 size={32} class="text-primary-400" strokeWidth={2.5} />
							</div>
						</div>

						<!-- Success Message -->
						<div
							class="flex-1 rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-transparent p-6 transition-all duration-300 group-hover:border-primary-500/50 group-hover:shadow-lg group-hover:shadow-primary-500/10 md:p-8"
						>
							<h3 class="mb-2 text-xl font-bold text-primary-400">
								Your Project Comes to Life! 🎉
							</h3>
							<p class="leading-relaxed text-surface-300">
								From concept to completion, I'll be with you every step of the way. Let's create
								something exceptional together.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Privacy & Additional Info -->
		<section class="grid gap-6 md:grid-cols-2">
			<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8">
				<div class="mb-4 flex items-start gap-4">
					<div class="rounded-lg bg-primary-500/20 p-3">
						<Shield size={32} class="text-primary-400" />
					</div>
					<div>
						<h3 class="mb-2 text-xl font-semibold text-surface-50">Privacy-First Communication</h3>
						<p class="text-surface-300">
							I value your privacy and mine. All contact methods listed here are professional
							channels designed to protect personal information while maintaining effective
							communication.
						</p>
					</div>
				</div>
			</div>

			<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8">
				<div class="mb-4 flex items-start gap-4">
					<div class="rounded-lg bg-primary-500/20 p-3">
						<CheckCircle2 size={32} class="text-primary-400" />
					</div>
					<div>
						<h3 class="mb-2 text-xl font-semibold text-surface-50">Current Availability</h3>
						<p class="text-surface-300">
							I'm currently accepting both full-time opportunities and freelance projects. Response
							within 24 hours guaranteed. Most projects can start within 1-2 weeks.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Social Links -->
		<section
			class="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-600/10 via-primary-500/5 to-transparent p-8 text-center md:p-12"
		>
			<h2 class="mb-3 text-2xl font-bold text-surface-50">Follow My Work</h2>
			<p
				class="mb-8 text-base text-surface-100"
				style="text-shadow: 0 0 20px rgba(239, 94, 3, 0.3);"
			>
				Stay updated on my latest projects, insights, and web development resources
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				{#each socialLinks as link}
					<a
						href={link.href}
						target={link.external ? '_blank' : '_self'}
						rel={link.external ? 'noopener noreferrer' : ''}
						class="group flex items-center gap-2.5 rounded-lg border border-surface-500 bg-surface-800/50 px-6 py-3 font-medium text-surface-200 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary-400 hover:bg-primary-600/10 hover:text-primary-300 hover:shadow-md hover:shadow-primary-500/20"
					>
						{#if link.label === 'Twitter'}
							<svg
								class="h-5 w-5 transition-colors"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
								/>
							</svg>
						{:else if link.label === 'LinkedIn'}
							<svg
								class="h-5 w-5 transition-colors"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
						{:else if link.label === 'GitHub'}
							<svg
								class="h-5 w-5 transition-colors"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
						<span>{link.label}</span>
					</a>
				{/each}

				<!-- Dribbble Link -->
				<a
					href="https://www.dribbble.com/khoobkar/"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2.5 rounded-lg border border-surface-500 bg-surface-800/50 px-6 py-3 font-medium text-surface-200 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-primary-400 hover:bg-primary-600/10 hover:text-primary-300 hover:shadow-md hover:shadow-primary-500/20"
				>
					<svg
						class="h-5 w-5 transition-colors"
						fill="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.93 7.48c1.33 1.84 2.08 4.11 2.06 6.52-0.32-0.07-3.52-0.72-6.78-0.31 -0.07-0.17-0.14-0.35-0.22-0.53 -0.21-0.49-0.43-0.98-0.66-1.45 3.55-1.45 5.17-3.54 5.6-4.23zM12 2.03c2.7 0 5.17 1.01 7.04 2.66 -0.37 0.62-1.81 2.53-5.2 3.83C12.44 5.5 10.83 3.1 10.4 2.47 10.92 2.21 11.46 2.03 12 2.03zM8.23 3.16c0.42 0.62 2.02 3.02 3.43 6.04 -4.33 1.15-8.15 1.13-8.6 1.13C3.48 7.6 5.46 4.92 8.23 3.16zM2.03 12c0-0.09 0-0.18 0-0.27 0.44 0.01 5.35 0.07 10 -1.39 0.28 0.55 0.55 1.11 0.8 1.67 -0.13 0.04-0.25 0.08-0.38 0.12 -4.75 1.53-7.28 5.74-7.71 6.46C3.06 16.86 2.03 14.57 2.03 12zM12 21.97c-2.43 0-4.67-0.87-6.42-2.32 0.34-0.71 2.19-4.21 7.43-6.03 0.05-0.02 0.1-0.03 0.14-0.05 1.34 3.48 1.89 6.4 2.03 7.22C14.17 21.56 13.11 21.97 12 21.97zM17.22 20.14c-0.1-0.59-0.6-3.38-1.84-6.81 3.01-0.48 5.65 0.31 5.99 0.42C20.89 16.47 19.37 18.68 17.22 20.14z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Dribbble</span>
				</a>
			</div>
		</section>
	</div>
</div>
