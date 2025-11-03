<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import ContactCard from '$lib/components/ui/ContactCard.svelte';
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import {
		Mail,
		MessageSquare,
		CircleCheck,
		Calendar,
		Linkedin,
		BriefcaseBusiness,
		Rocket,
		Coffee,
		Zap,
		FileText,
		Sparkles,
		Copy,
		Check
	} from '@lucide/svelte';

	const emailAddress = 'amirhessam.dev@gmail.com';
	let emailCopied = $state(false);

	// Reactive email actions based on copy state
	const emailActions = $derived([
		{
			label: emailCopied ? 'Copied!' : 'Copy Email Address',
			onClick: copyEmailToClipboard,
			icon: emailCopied ? Check : Copy,
			ariaLabel: 'Copy email address to clipboard'
		},
		{
			label: 'Open Email Client',
			href: `mailto:${emailAddress}`,
			icon: Mail,
			ariaLabel: `Send email to ${emailAddress}`
		}
	]);

	async function copyEmailToClipboard() {
		const resetCopied = () => {
			setTimeout(() => (emailCopied = false), 2000);
		};

		try {
			await navigator.clipboard.writeText(emailAddress);
			emailCopied = true;
			resetCopied();
		} catch {
			// Fallback for older browsers
			const textArea = Object.assign(document.createElement('textarea'), {
				value: emailAddress,
				style: 'position:fixed;opacity:0'
			});
			document.body.appendChild(textArea);
			textArea.select();
			try {
				if (document.execCommand('copy')) {
					emailCopied = true;
					resetCopied();
				}
			} catch {
				console.error('Failed to copy email');
			}
			document.body.removeChild(textArea);
		}
	}
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

	<!-- Structured Data -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ContactPage",
			"name": "Contact - Hessam Khoobkar",
			"description": "Get in touch with Hessam Khoobkar for web development services, freelance projects, or full-time opportunities",
			"mainEntity": {
				"@type": "Organization",
				"name": "Hessam Khoobkar",
				"email": "amirhessam.dev@gmail.com",
				"url": "https://khoobkar.com"
			}
		}
	</script>
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

	<div class="mx-auto max-w-8xl space-y-6">
		<!-- Contact Types Card -->
		<section class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 shadow-lg md:p-8">
			<div class="mb-6">
				<h3 class="mb-2 text-lg font-bold text-surface-50 md:text-xl">How Can I Help?</h3>
				<p class="text-sm text-surface-400">Ways I can assist with your project</p>
			</div>
			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				<div
					class="group relative w-full overflow-hidden rounded-lg border border-surface-700 bg-surface-700/30 p-4 md:p-5"
				>
					<div class="relative z-10 flex items-start gap-3">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500/20 md:h-12 md:w-12"
						>
							<BriefcaseBusiness size={18} class="text-primary-400 md:size-5" aria-hidden="true" />
						</div>
						<div class="min-w-0 flex-1">
							<h4 class="mb-1 font-semibold text-surface-50 md:text-base">Full-Time Opportunity</h4>
							<p class="text-xs text-surface-400 md:text-sm">
								Recruiting for your team? Let's discuss how I can contribute.
							</p>
						</div>
					</div>
				</div>

				<div
					class="group relative w-full overflow-hidden rounded-lg border border-surface-700 bg-surface-700/30 p-4 md:p-5"
				>
					<div class="relative z-10 flex items-start gap-3">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500/20 md:h-12 md:w-12"
						>
							<Rocket size={18} class="text-primary-400 md:size-5" aria-hidden="true" />
						</div>
						<div class="min-w-0 flex-1">
							<h4 class="mb-1 font-semibold text-surface-50 md:text-base">Freelance Project</h4>
							<p class="text-xs text-surface-400 md:text-sm">
								Have a project in mind? I'm available for freelance work.
							</p>
						</div>
					</div>
				</div>

				<div
					class="group relative w-full overflow-hidden rounded-lg border border-surface-700 bg-surface-700/30 p-4 sm:col-span-2 md:p-5 xl:col-span-1"
				>
					<div class="relative z-10 flex items-start gap-3">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500/20 md:h-12 md:w-12"
						>
							<Coffee size={18} class="text-primary-400 md:size-5" aria-hidden="true" />
						</div>
						<div class="min-w-0 flex-1">
							<h4 class="mb-1 font-semibold text-surface-50 md:text-base">
								Networking & Collaboration
							</h4>
							<p class="text-xs text-surface-400 md:text-sm">
								Want to chat about tech, share ideas, or explore collaborations?
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Main Content Grid -->
		<div class="grid items-stretch gap-6 xl:grid-cols-5">
			<!-- Contact Form Card -->
			<section
				id="contact-form"
				class="mb-6 flex h-full flex-col rounded-xl border border-surface-700 bg-surface-800/50 p-6 shadow-lg md:p-8 xl:col-span-3 xl:mb-0"
			>
				<div class="mb-6 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600/20">
						<MessageSquare size={20} class="text-primary-400" aria-hidden="true" />
					</div>
					<div>
						<h2 class="text-xl font-bold text-surface-50">Send a Message</h2>
						<p class="text-sm text-surface-400">Fill out the form below to get in touch</p>
					</div>
				</div>
				<div class="flex-1">
					<ContactForm />
				</div>
			</section>

			<!-- Right Sidebar (2 columns) -->
			<div class="space-y-6 xl:col-span-2">
				<!-- Email Card -->
				<ContactCard
					icon={Mail}
					title="Email Direct"
					subtitle="Direct communication"
					description="Preferred for detailed inquiries and project discussions."
					actions={emailActions}
				/>

				<!-- Calendly Card -->
				<ContactCard
					icon={Calendar}
					title="Schedule Meeting"
					subtitle="Book a discovery call"
					description="Book a 30-minute discovery call at your convenience."
					actions={[
						{
							label: 'Book a Call',
							href: 'https://calendly.com/khoobkar',
							icon: Calendar,
							external: true,
							ariaLabel: 'Schedule a meeting on Calendly (opens in new tab)'
						}
					]}
				/>

				<!-- LinkedIn Card -->
				<ContactCard
					icon={Linkedin}
					title="LinkedIn"
					subtitle="Professional networking"
					description="Reach out on LinkedIn to connect and discuss opportunities."
					actions={[
						{
							label: 'Connect on LinkedIn',
							href: 'https://linkedin.com/in/hessam-khoobkar',
							icon: Linkedin,
							external: true,
							ariaLabel: 'Connect on LinkedIn (opens in new tab)'
						}
					]}
				/>
			</div>
		</div>

		<!-- What to Expect - Timeline (Full Width) -->
		<section
			class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 shadow-lg md:p-8 xl:p-10"
		>
			<div class="mb-8">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600/20">
						<Sparkles size={20} class="text-primary-400" aria-hidden="true" />
					</div>
					<h2 class="text-2xl font-bold text-surface-50">What Happens Next?</h2>
				</div>
				<p class="ml-[3.25rem] text-sm text-surface-400">
					A simple, transparent process from first contact to launch
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 2xl:grid-cols-4">
				<!-- Step 1 -->
				<div
					class="group relative rounded-xl border border-surface-700 bg-surface-700/30 p-6 transition-all hover:border-primary-500/50 hover:bg-surface-700 hover:shadow-lg hover:shadow-primary-500/10"
				>
					<div class="mb-4 flex items-center gap-3">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-110"
						>
							<Zap size={24} class="text-white" strokeWidth={2.5} aria-hidden="true" />
						</div>
						<div>
							<span
								class="inline-flex items-center rounded-full bg-primary-500/20 px-2 py-0.5 text-xs font-bold tracking-wider text-primary-400 uppercase"
							>
								Step 1
							</span>
							<p class="text-xs text-surface-500">Immediate</p>
						</div>
					</div>
					<h3 class="mb-2 text-lg font-bold text-surface-50">Quick Response</h3>
					<p class="text-sm leading-relaxed text-surface-300">
						I'll respond within 24 hours, usually much sooner during business hours (EST). Every
						message gets my personal attention.
					</p>
				</div>

				<!-- Step 2 -->
				<div
					class="group relative rounded-xl border border-surface-700 bg-surface-700/30 p-6 transition-all hover:border-primary-500/50 hover:bg-surface-700 hover:shadow-lg hover:shadow-primary-500/10"
				>
					<div class="mb-4 flex items-center gap-3">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-110"
						>
							<MessageSquare size={24} class="text-white" strokeWidth={2.5} aria-hidden="true" />
						</div>
						<div>
							<span
								class="inline-flex items-center rounded-full bg-primary-500/20 px-2 py-0.5 text-xs font-bold tracking-wider text-primary-400 uppercase"
							>
								Step 2
							</span>
							<p class="text-xs text-surface-500">30 min call</p>
						</div>
					</div>
					<h3 class="mb-2 text-lg font-bold text-surface-50">Discovery Call</h3>
					<p class="text-sm leading-relaxed text-surface-300">
						We'll schedule a call or video chat to discuss your project needs, goals, timeline, and
						any specific requirements you have.
					</p>
				</div>

				<!-- Step 3 -->
				<div
					class="group relative rounded-xl border border-surface-700 bg-surface-700/30 p-6 transition-all hover:border-primary-500/50 hover:bg-surface-700 hover:shadow-lg hover:shadow-primary-500/10"
				>
					<div class="mb-4 flex items-center gap-3">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-110"
						>
							<FileText size={24} class="text-white" strokeWidth={2.5} aria-hidden="true" />
						</div>
						<div>
							<span
								class="inline-flex items-center rounded-full bg-primary-500/20 px-2 py-0.5 text-xs font-bold tracking-wider text-primary-400 uppercase"
							>
								Step 3
							</span>
							<p class="text-xs text-surface-500">Within 48 hours</p>
						</div>
					</div>
					<h3 class="mb-2 text-lg font-bold text-surface-50">Tailored Proposal</h3>
					<p class="text-sm leading-relaxed text-surface-300">
						Receive a comprehensive proposal with detailed timeline, project scope, milestones, and
						transparent pricing. No hidden fees.
					</p>
				</div>

				<!-- Step 4 -->
				<div
					class="group relative rounded-xl border border-surface-700 bg-surface-700/30 p-6 transition-all hover:border-primary-500/50 hover:bg-surface-700 hover:shadow-lg hover:shadow-primary-500/10"
				>
					<div class="mb-4 flex items-center gap-3">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-110"
						>
							<Sparkles size={24} class="text-white" strokeWidth={2.5} aria-hidden="true" />
						</div>
						<div>
							<span
								class="inline-flex items-center rounded-full bg-primary-500/20 px-2 py-0.5 text-xs font-bold tracking-wider text-primary-400 uppercase"
							>
								Step 4
							</span>
							<p class="text-xs text-surface-500">Let's go! 🚀</p>
						</div>
					</div>
					<h3 class="mb-2 text-lg font-bold text-surface-50">Let's Build Together!</h3>
					<p class="text-sm leading-relaxed text-surface-300">
						Once approved, we'll kick off the project with a clear roadmap and regular updates. Your
						vision becomes reality!
					</p>
				</div>
			</div>

			<!-- Success Message Card (Full Width) -->
			<div
				class="mt-6 rounded-xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-transparent p-6 shadow-lg transition-all hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 md:p-8"
			>
				<div class="flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border-2 border-primary-500/50 bg-gradient-to-br from-primary-500/20 to-primary-600/20 shadow-lg shadow-primary-500/20 backdrop-blur-sm"
					>
						<CircleCheck size={24} class="text-primary-400" strokeWidth={2.5} aria-hidden="true" />
					</div>
					<div>
						<h3 class="mb-2 text-xl font-bold text-primary-400">Your Project Comes to Life! 🎉</h3>
						<p class="leading-relaxed text-surface-300">
							From concept to completion, I'll be with you every step of the way. Let's create
							something exceptional together.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<Footer />
	</div>
</div>
