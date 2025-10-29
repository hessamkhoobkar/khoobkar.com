<script lang="ts">
	import { socialLinks } from '$lib/data/navigation';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
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

			<div class="mx-auto max-w-6xl">
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

		<!-- Footer -->
		<Footer />
	</div>
</div>
