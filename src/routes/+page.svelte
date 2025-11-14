<script lang="ts">
	import GradientButton from '$lib/components/ui/GradientButton.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { parallax, scrollAtmosphere, depthFade } from '$lib/actions/motion';
	import Footer from '$lib/components/layout/Footer.svelte';
	import ogImageAsset from '$lib/assets/logo.png';
	import { normalizeImageUrl, siteConfig } from '$lib/utils/structured-data';
	import {
		Sparkles,
		ArrowUpRight,
		Download,
		Mail,
		Phone,
		MapPin,
		Globe,
		Users,
		Workflow,
		Gauge,
		Rocket,
		ShieldCheck,
		LineChart,
		Layers,
		Code2,
		Heart,
		Briefcase,
		Github,
		Linkedin,
		Instagram,
		Dribbble
	} from '@lucide/svelte';

	const heroHighlights = [
		{
			label: '7+ years',
			caption: 'Leading front-end programs across React, Svelte, Vue, and design systems.'
		},
		{
			label: '35% avg uplift',
			caption: 'Performance gains measured across fintech, health, and SaaS platforms.'
		},
		{
			label: '13 product teams',
			caption: 'Partnered with founders from Dubai, Berlin, Istanbul, Tallinn, and beyond.'
		}
	];

	const solutionPillars = [
		{
			icon: Users,
			badge: 'Integrated support',
			title: 'Embed with your team',
			description:
				'Plug into rituals, facilitate alignment, and keep product, design, and engineering moving with calm delivery.'
		},
		{
			icon: Workflow,
			badge: 'Coaching & clarity',
			title: 'Coach in-house talent',
			description:
				'Pair with engineers, document decisions, and raise the bar on code reviews so best practices become habits.'
		},
		{
			icon: Gauge,
			badge: 'Quality & metrics',
			title: 'Make progress visible',
			description:
				'Map product goals to measurable outcomes, surface risks early, and report momentum stakeholders can trust.'
		},
		{
			icon: Heart,
			badge: 'Product polish',
			title: 'Ship experiences users feel',
			description:
				'Build design systems, accessibility guardrails, and thoughtful interactions that strengthen your brand.'
		}
	];

	const automationTracks = [
		{
			title: 'Design systems & tokens',
			description:
				'Translate brand foundations into scalable component libraries backed by Storybook, Tailwind, and TypeScript.'
		},
		{
			title: 'Performance & accessibility audits',
			description:
				'Baseline Core Web Vitals and WCAG compliance, prioritize fixes, and bake guardrails into your pipeline.'
		},
		{
			title: 'Migration & modernization sprints',
			description:
				'Move safely to SvelteKit, Nuxt, or Next.js while maintaining roadmap momentum and stakeholder confidence.'
		},
		{
			title: 'Experimentation & analytics',
			description:
				'Wire up measurement, A/B testing, and product analytics so insights land where your teams make decisions.'
		},
		{
			title: 'Onboarding & documentation',
			description:
				'Ship contribution guides, ADRs, and architecture playbooks that make onboarding new engineers effortless.'
		},
		{
			title: 'Mentorship & coaching',
			description:
				'Level up in-house developers through pair-programming, code reviews, and architecture clinics.'
		}
	];

	const integrationPoints = [
		'React/Next.js, Svelte/SvelteKit, Vue/Nuxt, and bespoke component-library ecosystems.',
		'TypeScript-first workflows with Storybook, Vitest, Playwright, and Cypress.',
		'CI/CD across GitHub Actions, GitLab, CircleCI, Vercel, and containerized deployments.',
		'Design collaboration in Figma with design tokens, theming, and WCAG 2.2 accessibility baked in.'
	];

	const capabilityGroups = [
		{
			label: 'Languages',
			items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3']
		},
		{
			label: 'Frameworks & Libraries',
			items: ['SvelteKit', 'React/Next.js', 'Vue/Nuxt.js', 'Storybook']
		},
		{
			label: 'State & Data',
			items: ['Zustand', 'Redux', 'Vuex/Pinia', 'GraphQL & REST']
		},
		{
			label: 'Tooling & Ops',
			items: ['Vite & Webpack', 'Docker', 'GitHub Actions', 'CI/CD pipelines']
		},
		{
			label: 'Performance & UX',
			items: [
				'Web Vitals Optimization',
				'Accessibility (WCAG 2.2)',
				'Experimentation & Analytics',
				'WebSocket integrations'
			]
		},
		{
			label: 'Collaboration',
			items: [
				'Agile leadership',
				'Mentorship & code review',
				'Async-first documentation',
				'Cross-functional alignment'
			]
		}
	];

	const educationDetails = {
		degree: 'Bachelor of Science in Software Engineering',
		institution: 'Payame Noor University · Tehran, Iran',
		outcome:
			'Grounded in software fundamentals that inform scalable, user-centric product delivery.'
	};

	const proofPoints = [
		{
			icon: ShieldCheck,
			title: 'Production-grade delivery',
			description:
				'Every engagement lands with hardened pipelines, testing, and observability built for scale.'
		},
		{
			icon: Sparkles,
			title: 'Brand-aligned storytelling',
			description:
				'Translate your brand voice into motion, microcopy, and states that feel bespoke—not templated.'
		},
		{
			icon: Rocket,
			title: 'Momentum from day one',
			description:
				'Plug into your rituals, unblock designers and PMs, and ship meaningful increments in the first sprint.'
		},
		{
			icon: Globe,
			title: 'Remote-native partnership',
			description:
				'Operate async across time zones with proactive updates, Loom walkthroughs, and living documentation.'
		},
		{
			icon: LineChart,
			title: 'Outcome-obsessed metrics',
			description:
				'Tie front-end decisions to KPIs—conversion, retention, satisfaction—and report back with clarity.'
		},
		{
			icon: Code2,
			title: 'Technical stewardship',
			description:
				'Coach teams on architecture patterns, debt management, and accessibility so wins stick post hand-off.'
		}
	];

	const metrics = [
		{ value: '7+', label: 'Years shipping front-end systems' },
		{ value: '35%', label: 'Average performance uplift delivered' },
		{ value: '13', label: 'Product teams partnered worldwide' },
		{ value: '8', label: 'Developers mentored into senior roles' }
	];

	const processSteps = [
		{
			step: '01',
			title: 'Discover & align',
			description:
				'Clarify success metrics, user journeys, and constraints with founders, product, and design leads.',
			outcome: 'Shared vision, prioritized roadmap, and a playbook for measurable impact.'
		},
		{
			step: '02',
			title: 'Design systems-first',
			description:
				'Translate strategy into interactive prototypes, tokens, and component specs ready for engineering.',
			outcome: 'Cohesive visual direction, reusable primitives, and confident teams.'
		},
		{
			step: '03',
			title: 'Build, measure, refine',
			description:
				'Ship production-quality code, observe performance, and iterate collaboratively with stakeholders.',
			outcome: 'Launch-ready experiences tracked against KPIs and built to adapt.'
		}
	];

	const outcomeSnapshots = [
		{
			company: 'POMECHAIN · Dubai (Remote)',
			headline: 'Reusable Vue/Nuxt library accelerated shipping',
			result: '30% engagement lift',
			description:
				'Architected a TypeScript component system with Tailwind tokens, reducing UI build time by 20% while unlocking measurable engagement growth.'
		},
		{
			company: 'Coinhaven · Berlin (Remote)',
			headline: 'SvelteKit migration modernized trading surfaces',
			result: '35% faster platform',
			description:
				'Led the migration from React, introduced real-time data layers, and cut release cycles by 25% with automated testing and CI.'
		},
		{
			company: 'Piller Iddaa · Istanbul (Remote)',
			headline: 'High-traffic sportsbook kept latency low',
			result: 'Sub-2s median loads',
			description:
				'Implemented caching, code-splitting, and accessibility improvements across Vue interfaces serving thousands of parallel bettors.'
		}
	];

	const faqs = [
		{
			question: 'How quickly can you ramp onto a new roadmap?',
			answer:
				'Most collaborations kick off in 5–10 days. I audit your stack, align on metrics, and define a 30-60-90 plan so we start shipping in the first sprint.'
		},
		{
			question: 'Can you work within our existing design system or help build one?',
			answer:
				'Yes. I often evolve incomplete systems into token-driven libraries, or build them from scratch alongside design partners using Storybook and automation.'
		},
		{
			question: 'Do you offer short engagements or only long-term roles?',
			answer:
				'Both. I support focused outcome sprints (4–8 weeks) and longer-term leadership engagements embedded with your team.'
		},
		{
			question: 'What time zones do you support?',
			answer:
				'I am based in Tallinn (UTC+2) and collaborate across EMEA, North America, and APAC with async-first communication and overlap where needed.'
		},
		{
			question: 'What does success look like when we work together?',
			answer:
				'Success is measurable: faster load times, higher conversion, happier teams. We set the KPIs together and report progress every sprint.'
		}
	];

	const contactChannels = [
		{
			icon: Mail,
			label: 'Email',
			value: 'amirhessam.dev@gmail.com',
			href: 'mailto:amirhessam.dev@gmail.com'
		},
		{
			icon: Phone,
			label: 'Phone',
			value: '+98 919 623 0597',
			href: 'tel:+989196230597'
		},
		{
			icon: MapPin,
			label: 'Base',
			value: 'Tallinn, Estonia',
			href: null
		},
		{
			icon: Globe,
			label: 'Availability',
			value: 'Remote · Full-time & freelance',
			href: null
		}
	];

	const socialLinks = [
		{ icon: Github, label: 'GitHub', href: 'https://github.com/hessamkhoobkar' },
		{ icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/hessam-khoobkar/' },
		{ icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/hessam_khoobkar/' },
		{ icon: Dribbble, label: 'Dribbble', href: 'https://dribbble.com/hessam_khoobkar' }
	];

	const canonicalUrl = `${siteConfig.url}/`;
	const metaTitle = 'Hessam Khoobkar | Artful Front-End Systems';
	const metaDescription =
		'Hessam Khoobkar crafts immersive, high-performance front-end systems for ambitious teams. Explore services, outcomes, process, and ways to collaborate on one dark, gradient-rich landing page.';
	const metaKeywords = [
		'Hessam Khoobkar',
		'Svelte consultant',
		'front-end systems',
		'design systems',
		'performance engineering',
		'web accessibility',
		'product leadership',
		'UI engineering',
		'async collaboration'
	].join(', ');
	const socialProfiles = ['https://twitter.com/khoobkar', ...socialLinks.map((link) => link.href)];
	const ogImageUrl = normalizeImageUrl(ogImageAsset);
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${canonicalUrl}#website`,
				url: canonicalUrl,
				name: metaTitle,
				description: metaDescription,
				inLanguage: 'en-US',
				publisher: {
					'@id': `${canonicalUrl}#organization`
				}
			},
			{
				'@type': 'Organization',
				'@id': `${canonicalUrl}#organization`,
				name: siteConfig.name,
				url: canonicalUrl,
				logo: {
					'@type': 'ImageObject',
					url: ogImageUrl
				},
				founder: {
					'@id': `${canonicalUrl}#person`
				},
				sameAs: socialProfiles
			},
			{
				'@type': 'Person',
				'@id': `${canonicalUrl}#person`,
				name: 'Hessam Khoobkar',
				url: canonicalUrl,
				image: ogImageUrl,
				jobTitle: 'Senior Front-End Lead',
				worksFor: {
					'@id': `${canonicalUrl}#organization`
				},
				sameAs: socialProfiles,
				knowsAbout: [
					'Front-end architecture',
					'Design systems',
					'Svelte',
					'Web performance',
					'Accessibility'
				]
			}
		]
	};

	const getMainSurface = () =>
		typeof document === 'undefined' ? null : (document.querySelector('main') as HTMLElement | null);
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<link rel="canonical" href={canonicalUrl} />
	<meta name="description" content={metaDescription} />
	<meta name="keywords" content={metaKeywords} />
	<meta name="author" content="Hessam Khoobkar" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#0f172a" />
	<meta property="og:title" content={metaTitle} />
	<meta
		property="og:description"
		content="Partner with Hessam Khoobkar to design, build, and scale front-end experiences that blend craft, performance, and measurable outcomes."
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={ogImageUrl} />
	<meta
		property="og:image:alt"
		content="Portrait of Hessam Khoobkar, senior front-end lead and systems engineer"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={ogImageUrl} />
	<meta
		name="twitter:image:alt"
		content="Portrait of Hessam Khoobkar, senior front-end lead and systems engineer"
	/>
	<meta name="twitter:site" content="@khoobkar" />
	<meta name="twitter:creator" content="@khoobkar" />
	<script type="application/ld+json">
		{JSON.stringify(structuredData)}
	</script>
</svelte:head>

<main class="relative overflow-hidden">
	<!-- Hero Section -->
	<section id="hero" class="hero-gradient relative min-h-screen w-screen">
		<div class="relative z-10 flex h-full items-center">
			<div
				class="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-24 md:py-32"
				use:reveal={{ childSelector: '[data-hero-item]', stagger: 0.2, delay: 0.1 }}
			>
				<div class="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
					<div data-hero-item>
						<div class="flex items-center gap-3">
							<span
								class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-white/70 uppercase"
							>
								<Sparkles size={14} aria-hidden="true" />
								Senior front-end lead
							</span>
						</div>
						<h1
							class="mt-5 max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-5xl"
							use:reveal={{
								childSelector: 'span',
								delay: 0.05,
								stagger: 0.22,
								from: { opacity: 0, yPercent: 120, filter: 'blur(6px)' },
								to: {
									opacity: 1,
									yPercent: 0,
									filter: 'blur(0px)',
									duration: 1,
									ease: 'power3.out'
								}
							}}
						>
							Remote Front-End Leadership That Delivers
							<span class="inline-block"> Performance, </span>
							<span class="inline-block">Polish,</span>
							<span class="inline-block">and</span>
							<span class="inline-block">Measurable Momentum.</span>
						</h1>
						<p class="mt-7 max-w-2xl text-base leading-relaxed text-white/80">
							I’m Hessam Khoobkar, a senior front-end developer blending design sensibility with
							type-safe engineering. I partner with founders and product leaders to build and refine
							their vision, whether that means architecting a project from the ground up or stepping
							in to accelerate and polish an existing one.
						</p>
						<div class="mt-7 flex flex-wrap items-center gap-3">
							<a
								href="/hessam_khoobkar_resume.pdf"
								class="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-2 text-sm font-semibold tracking-[0.28em] text-white uppercase transition hover:border-white hover:bg-white hover:text-surface-900"
							>
								<Download size={18} aria-hidden="true" />
								Resume
							</a>
						</div>
						<div
							class="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.3em] text-white/60 uppercase"
						>
							<div class="inline-flex items-center gap-2">
								<Globe size={16} aria-hidden="true" />
								Tallinn, Estonia
							</div>
							<div>·</div>
							<div class="inline-flex items-center gap-2">
								<Briefcase size={16} aria-hidden="true" />
								Remote worldwide
							</div>
						</div>
					</div>
					<div data-hero-item>
						<div
							class="flex h-full flex-col gap-6 rounded-3xl border border-primary-900/20 bg-primary-900/20 p-6 text-white shadow-[0_30px_120px_-60px_rgba(72,12,3,0.8)] backdrop-blur-xl"
						>
							<div>
								<p class="text-xs tracking-[0.4em] text-white/70 uppercase">Currently partnering</p>
								<h2 class="mt-3 text-2xl leading-snug font-semibold">
									Scaling digital products with design system precision and measurable outcomes.
								</h2>
							</div>
							<ul class="space-y-3 text-sm leading-relaxed text-white/90">
								<li
									class="flex gap-3 rounded-2xl border border-primary-900/20 bg-primary-900/20 p-3"
								>
									<div class="rounded-lg bg-white/10 p-2">
										<Gauge size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-white/60 uppercase">Focus</p>
										<p>High-impact migrations, design systems, and performance roadmaps.</p>
									</div>
								</li>
								<li
									class="flex gap-3 rounded-2xl border border-primary-900/20 bg-primary-900/20 p-3"
								>
									<div class="rounded-lg bg-white/10 p-2">
										<Sparkles size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-white/60 uppercase">Promise</p>
										<p>Ship immersive, accessible experiences while coaching in-house teams.</p>
									</div>
								</li>
								<li
									class="flex gap-3 rounded-2xl border border-primary-900/20 bg-primary-900/20 p-3"
								>
									<div class="rounded-lg bg-white/10 p-2">
										<Users size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-white/60 uppercase">Fit</p>
										<p>
											Founder-led teams shipping complex interfaces who value async, high-trust
											collaboration.
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div data-hero-item class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each heroHighlights as fact}
						<div
							class="rounded-2xl border border-primary-900/20 bg-primary-900/20 px-5 py-6 text-white shadow-[0_20px_80px_-50px_rgba(72,12,3,0.6)] backdrop-blur-xl"
						>
							<p class="text-xl font-semibold">{fact.label}</p>
							<p class="mt-2 text-sm text-white/75">{fact.caption}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Partnership Section -->
	<section class="relative border-t border-surface-800/60 bg-surface-950/70 py-24">
		<div
			class="mx-auto max-w-6xl space-y-16 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 60%', scrub: 0.5 }}
		>
			<div
				class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
				use:reveal={{ childSelector: '[data-pillars]', stagger: 0.16 }}
			>
				<div data-pillars class="space-y-6">
					<span
						class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
					>
						<Sparkles size={14} aria-hidden="true" />
						Embedded partnership
					</span>
					<h2 class="text-3xl font-bold text-surface-50 md:text-4xl">
						Work with a front-end lead who lifts your team’s pace and quality.
					</h2>
					<p class="max-w-2xl text-sm leading-relaxed text-surface-300">
						For the last 7+ years I’ve embedded inside founder-led squads to align product, design,
						and engineering. Expect structured delivery, transparent communication, and mentorship
						that helps every function ship with confidence.
					</p>
					<p
						class="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.35em] text-primary-200 uppercase"
					>
						<Users size={16} aria-hidden="true" />
						Shared ownership · async clarity · measurable progress
					</p>
				</div>
				<div data-pillars class="grid gap-4 sm:grid-cols-2">
					{#each solutionPillars as pillar}
						{@const Icon = pillar.icon}
						<div
							class="rounded-2xl border border-surface-700 bg-surface-900/70 p-6 transition hover:-translate-y-1 hover:border-primary-500/40 hover:bg-surface-900/80"
						>
							<div class="flex items-center gap-3">
								<div class="rounded-xl bg-primary-500/15 p-3">
									<Icon size={18} class="text-primary-300" aria-hidden="true" />
								</div>
								{#if pillar.badge}
									<span class="text-xs font-semibold tracking-[0.3em] text-primary-200 uppercase">
										{pillar.badge}
									</span>
								{/if}
							</div>
							<h3 class="mt-4 text-lg font-semibold text-surface-50">{pillar.title}</h3>
							<p class="mt-3 text-sm leading-relaxed text-surface-300">{pillar.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Automation Section -->
	<section
		class="relative"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(12, 16, 26, 0.97)',
			to: 'rgba(9, 12, 22, 0.97)',
			scrub: 0.7
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 60%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-automation-headline]', stagger: 0.1 }}
			>
				<span
					data-automation-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Automation-ready delivery
				</span>
				<h2 data-automation-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Automate the routine, focus on the work that moves the needle.
				</h2>
				<p data-automation-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					From migration playbooks to experiment frameworks, I build the systems that keep your
					teams confident and your releases predictable. Pick the tracks you need and we’ll
					modularize the rest.
				</p>
			</div>

			<div
				class="grid gap-6 md:grid-cols-2"
				use:reveal={{ childSelector: '[data-automation-card]', stagger: 0.06 }}
			>
				{#each automationTracks as item}
					<div
						data-automation-card
						class="flex h-full flex-col gap-3 rounded-2xl border border-surface-700 bg-surface-900/70 p-5 transition hover:border-primary-500/40 hover:bg-surface-900/80"
						use:parallax={{ axis: 'x', from: -14, to: 14, scrub: 0.6 }}
					>
						<h3 class="text-lg font-semibold text-surface-50">{item.title}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Integrations Section -->
	<section
		class="relative"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(9, 12, 22, 0.97)',
			to: 'rgba(8, 11, 18, 0.97)',
			scrub: 0.7
		}}
	>
		<div
			class="mx-auto max-w-6xl px-6 pb-24"
			use:depthFade={{ start: 'top 90%', end: 'bottom 65%', scrub: 0.45 }}
		>
			<div
				class="overflow-hidden rounded-3xl border border-surface-700/70 bg-gradient-to-br from-surface-900 via-surface-900/80 to-surface-900/60 p-10"
				use:reveal={{ childSelector: '[data-integrations]', stagger: 0.12 }}
			>
				<div
					data-integrations
					class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
				>
					<div>
						<p class="text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase">
							Stack alignment
						</p>
						<h2 class="mt-2 text-2xl font-semibold text-surface-50">
							Connects with your existing systems—no matter how bespoke.
						</h2>
					</div>
					<span
						class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.35em] text-white/70 uppercase"
					>
						<Layers size={16} aria-hidden="true" />
						Design ↔ Engineering
					</span>
				</div>
				<ul data-integrations class="mt-8 grid gap-4 md:grid-cols-2">
					{#each integrationPoints as point}
						<li
							class="flex items-start gap-3 rounded-2xl border border-surface-700 bg-surface-900/70 p-4 text-sm leading-relaxed text-surface-300"
						>
							<span class="mt-1 h-2 w-2 rounded-full bg-primary-400"></span>
							{point}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<!-- Capabilities Section -->
	<section
		class="relative border-t border-surface-800/60 bg-surface-950/70"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(8, 11, 18, 0.97)',
			to: 'rgba(7, 9, 15, 0.98)',
			scrub: 0.7
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-14 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 60%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-capabilities-headline]', stagger: 0.1 }}
			>
				<span
					data-capabilities-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Capabilities & stack
				</span>
				<h2 data-capabilities-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Tooling depth that keeps multi-team roadmaps moving.
				</h2>
				<p data-capabilities-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					I bring a pragmatic blend of languages, frameworks, state management, and delivery tooling
					so your squads can focus on outcomes. From Dockerized CI/CD pipelines to real-time
					WebSocket layers, the foundations stay future-ready.
				</p>
			</div>
			<div
				class="grid gap-6 md:grid-cols-2"
				use:reveal={{ childSelector: '[data-capability-card]', stagger: 0.06 }}
			>
				{#each capabilityGroups as group}
					<div
						data-capability-card
						class="flex h-full flex-col gap-3 rounded-2xl border border-surface-700 bg-surface-900/70 p-6 text-surface-200 transition hover:border-primary-500/35 hover:bg-surface-900/80"
						use:parallax={{ axis: 'x', from: -12, to: 12, scrub: 0.55 }}
					>
						<p class="text-xs font-semibold tracking-[0.35em] text-primary-200 uppercase">
							{group.label}
						</p>
						<ul class="space-y-2 text-sm leading-relaxed text-surface-300">
							{#each group.items as item}
								<li class="flex items-start gap-2">
									<span class="mt-1 h-1.5 w-1.5 rounded-full bg-primary-400"></span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
			<div
				class="rounded-3xl border border-primary-500/20 bg-primary-500/10 p-6 text-primary-100"
				use:reveal={{ childSelector: '[data-education]', stagger: 0.1 }}
			>
				<div
					data-education
					class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
				>
					<div>
						<p class="text-xs tracking-[0.35em] text-primary-200 uppercase">Education</p>
						<h3 class="text-lg font-semibold text-white">{educationDetails.degree}</h3>
						<p class="text-sm text-primary-100/80">{educationDetails.institution}</p>
					</div>
					<p class="max-w-xl text-sm leading-relaxed text-primary-100/85">
						{educationDetails.outcome}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Proof Section -->
	<section
		class="relative border-t border-surface-800/60 bg-surface-950/70"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(8, 11, 18, 0.97)',
			to: 'rgba(7, 10, 16, 0.98)',
			scrub: 0.75
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-16 px-6 py-24"
			use:depthFade={{ start: 'top 90%', end: 'bottom 60%', scrub: 0.5 }}
		>
			<div class="space-y-4" use:reveal={{ childSelector: '[data-proof-headline]', stagger: 0.1 }}>
				<span
					data-proof-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Why teams choose Hessam
				</span>
				<h2 data-proof-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Front-end leadership that delivers trust, speed, and polish.
				</h2>
			</div>
			<div
				class="grid gap-6 md:grid-cols-3"
				use:reveal={{ childSelector: '[data-proof-card]', stagger: 0.08 }}
			>
				{#each proofPoints as proof}
					{@const Icon = proof.icon}
					<div
						data-proof-card
						class="flex h-full flex-col gap-3 rounded-2xl border border-surface-700 bg-surface-900/70 p-6"
						use:parallax={{ axis: 'x', from: -12, to: 12, scrub: 0.55 }}
					>
						<div class="flex items-center justify-between">
							<div class="rounded-xl bg-primary-500/15 p-3">
								<Icon size={18} class="text-primary-300" aria-hidden="true" />
							</div>
							<ArrowUpRight size={16} class="text-primary-400/70" aria-hidden="true" />
						</div>
						<h3 class="text-lg font-semibold text-surface-50">{proof.title}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{proof.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Metrics Section -->
	<section
		class="relative"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(7, 10, 16, 0.98)',
			to: 'rgba(6, 9, 14, 0.98)',
			scrub: 0.7
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 58%', scrub: 0.45 }}
		>
			<div
				class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
				use:reveal={{ childSelector: '[data-metric]', stagger: 0.08 }}
			>
				{#each metrics as metric, i}
					<div
						data-metric
						class="rounded-2xl border border-surface-700 bg-surface-900/70 px-6 py-8 text-center text-surface-200"
						use:parallax={{
							axis: 'x',
							from: i % 2 === 0 ? -10 : 10,
							to: i % 2 === 0 ? 12 : -12,
							scrub: 0.6
						}}
					>
						<p class="text-4xl font-bold text-primary-200">{metric.value}</p>
						<p class="mt-3 text-sm tracking-[0.3em] text-surface-400 uppercase">{metric.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section
		class="relative border-t border-surface-800/60 bg-surface-950/70"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(6, 9, 14, 0.98)',
			to: 'rgba(7, 9, 13, 0.98)',
			scrub: 0.65
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 60%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-process-headline]', stagger: 0.1 }}
			>
				<span
					data-process-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Process
				</span>
				<h2 data-process-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Go live in weeks, not months, with a playbook built for outcomes.
				</h2>
			</div>
			<div
				class="grid gap-6 md:grid-cols-3"
				use:reveal={{ childSelector: '[data-process-card]', stagger: 0.08 }}
			>
				{#each processSteps as step, i}
					<div
						data-process-card
						class="flex h-full flex-col gap-4 rounded-3xl border border-surface-700 bg-gradient-to-br from-surface-900/80 via-surface-900/70 to-surface-900/60 p-6"
						use:parallax={{
							axis: 'x',
							from: i === 1 ? -10 : i === 2 ? 8 : -16,
							to: i === 1 ? 12 : i === 2 ? -10 : 14,
							scrub: 0.6
						}}
					>
						<span class="text-sm font-semibold tracking-[0.4em] text-primary-200 uppercase"
							>{step.step}</span
						>
						<h3 class="text-xl font-semibold text-surface-50">{step.title}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{step.description}</p>
						<div
							class="mt-auto rounded-2xl border border-primary-500/20 bg-primary-500/10 px-4 py-3 text-xs text-primary-100"
						>
							<strong class="block text-[0.68rem] tracking-[0.35em] text-primary-200 uppercase"
								>Outcome</strong
							>
							<span>{step.outcome}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Outcome Section -->
	<section
		class="relative"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(7, 9, 13, 0.98)',
			to: 'rgba(9, 8, 12, 0.98)',
			scrub: 0.65
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 86%', end: 'bottom 58%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-outcome-headline]', stagger: 0.1 }}
			>
				<span
					data-outcome-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Outcome snapshots
				</span>
				<h2 data-outcome-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Proof of impact across industries and stages.
				</h2>
			</div>
			<div
				class="grid gap-6 md:grid-cols-3"
				use:reveal={{ childSelector: '[data-outcome-card]', stagger: 0.08 }}
			>
				{#each outcomeSnapshots as snapshot, i}
					<div
						data-outcome-card
						class="flex h-full flex-col gap-4 rounded-2xl border border-surface-700 bg-surface-900/70 p-6"
						use:parallax={{
							axis: 'x',
							from: i === 0 ? -14 : i === 1 ? 10 : -8,
							to: i === 0 ? 12 : i === 1 ? -12 : 10,
							scrub: 0.55
						}}
					>
						<p class="text-xs tracking-[0.35em] text-primary-200 uppercase">{snapshot.company}</p>
						<h3 class="text-lg font-semibold text-surface-50">{snapshot.headline}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{snapshot.description}</p>
						<div
							class="mt-auto rounded-xl border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-100"
						>
							{snapshot.result}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section
		class="relative border-t border-surface-800/60 bg-surface-950/70"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(9, 8, 12, 0.98)',
			to: 'rgba(12, 9, 14, 0.98)',
			scrub: 0.7
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 60%', scrub: 0.45 }}
		>
			<div class="space-y-4" use:reveal={{ childSelector: '[data-faq-headline]', stagger: 0.1 }}>
				<span
					data-faq-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					FAQs
				</span>
				<h2 data-faq-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Your questions, answered before we start.
				</h2>
			</div>
			<div class="space-y-4" use:reveal={{ childSelector: 'details', stagger: 0.08 }}>
				{#each faqs as item}
					<details class="group rounded-2xl border border-surface-700 bg-surface-900/70 p-5">
						<summary
							class="flex cursor-pointer items-center justify-between text-left text-sm font-semibold tracking-[0.3em] text-surface-200 uppercase transition group-open:text-primary-200"
						>
							<span class="flex-1">{item.question}</span>
							<ArrowUpRight
								size={16}
								class="ml-4 transition-transform group-open:rotate-45"
								aria-hidden="true"
							/>
						</summary>
						<p class="mt-4 text-sm leading-relaxed text-surface-300">{item.answer}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section
		class="relative"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(12, 9, 14, 0.98)',
			to: 'rgba(16, 11, 18, 0.98)',
			scrub: 0.75
		}}
	>
		<div
			class="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-surface-700/70 bg-gradient-to-br from-surface-900/85 via-surface-900/70 to-surface-900/50 px-6 py-20 shadow-[0_40px_140px_-60px_rgba(0,0,0,0.75)]"
			use:reveal={{ childSelector: '[data-contact]', stagger: 0.12 }}
			use:depthFade={{ start: 'top 86%', end: 'bottom 58%', scrub: 0.5 }}
		>
			<div class="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
				<div
					data-contact
					class="space-y-6"
					use:parallax={{ axis: 'x', from: -18, to: 18, scrub: 0.6 }}
				>
					<span
						class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
					>
						Let’s build together
					</span>
					<h2 class="text-3xl font-bold text-surface-50 md:text-4xl">
						Ready to ship something bold, fast, and on-brand?
					</h2>
					<p class="text-sm leading-relaxed text-surface-300">
						Reach out for full-time leadership, high-impact project sprints, or audits that unlock
						your next wave of growth. I respond within one business day.
					</p>
					<div class="grid gap-4">
						{#each contactChannels as channel}
							{@const Icon = channel.icon}
							{#if channel.href}
								<a
									href={channel.href}
									class="flex items-center gap-4 rounded-2xl border border-surface-700 bg-surface-900/65 px-5 py-4 text-sm text-surface-200 transition hover:border-primary-500/40 hover:text-primary-200"
								>
									<div class="rounded-xl bg-primary-500/10 p-3">
										<Icon size={18} class="text-primary-300" aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-primary-300 uppercase">
											{channel.label}
										</p>
										<p class="text-sm font-semibold">{channel.value}</p>
									</div>
								</a>
							{:else}
								<div
									class="flex items-center gap-4 rounded-2xl border border-surface-700 bg-surface-900/65 px-5 py-4 text-sm text-surface-200"
								>
									<div class="rounded-xl bg-primary-500/10 p-3">
										<Icon size={18} class="text-primary-300" aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-primary-300 uppercase">
											{channel.label}
										</p>
										<p class="text-sm font-semibold">{channel.value}</p>
									</div>
								</div>
							{/if}
						{/each}
					</div>
					<div class="flex flex-wrap gap-3 pt-4">
						{#each socialLinks as social}
							{@const Icon = social.icon}
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full border border-surface-700/60 px-4 py-2 text-xs font-semibold tracking-[0.35em] text-surface-200 uppercase transition hover:border-primary-500/40 hover:text-primary-200"
							>
								<Icon size={16} aria-hidden="true" />
								{social.label}
							</a>
						{/each}
					</div>
				</div>
				<div
					data-contact
					class="gradient-background flex h-full flex-col justify-between rounded-2xl border border-white/15 p-6 text-white shadow-[0_30px_110px_-50px_rgba(239,94,3,0.85)]"
					use:parallax={{ axis: 'x', from: 16, to: -16, scrub: 0.6 }}
				>
					<div>
						<h3 class="text-2xl font-semibold text-white">What partnering feels like</h3>
						<ul class="mt-5 space-y-3 text-sm leading-relaxed text-white/85">
							<li class="relative border-b border-white/25 pb-3 pl-5">
								<span class="absolute top-2 left-0 h-2 w-2 rounded-full bg-white/80"></span>
								Discovery sprints that map goals, risks, and velocity from week one.
							</li>
							<li class="relative border-b border-white/25 pb-3 pl-5">
								<span class="absolute top-2 left-0 h-2 w-2 rounded-full bg-white/80"></span>
								Design system-led delivery translating brand nuance into reusable components.
							</li>
							<li class="relative pl-5">
								<span class="absolute top-2 left-0 h-2 w-2 rounded-full bg-white/80"></span>
								Type-safe, accessible code reviewed with your team and monitored after launch.
							</li>
						</ul>
					</div>
					<div class="mt-8">
						<GradientButton
							href="mailto:amirhessam.dev@gmail.com?subject=Let%E2%80%99s%20build%20something%20remarkable"
							title="Email Hessam Khoobkar"
							class="w-full"
						>
							<span
								class="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide uppercase"
							>
								<Mail size={18} aria-hidden="true" />
								Send an email
							</span>
						</GradientButton>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</main>

<style>
	.hero-gradient {
		--gradient-pos-x: 20%;
		--gradient-pos-y: 80%;
		--gradient-size: 122%;
		--sheen-opacity: 0.24;
		position: relative;
		overflow: hidden;
		filter: saturate(1.12) contrast(1.05);
		background-image:
			radial-gradient(circle at top right, var(--color-primary-900) 0%, transparent 62%),
			linear-gradient(
				to top right,
				var(--color-primary-100) 5%,
				var(--color-primary-200) 10%,
				var(--color-primary-300) 20%,
				var(--color-primary-400) 35%,
				var(--color-primary-500) 45%,
				var(--color-primary-600) 60%,
				var(--color-primary-700) 75%,
				var(--color-primary-800) 90%,
				var(--color-primary-900) 100%
			);
		background-position:
			100% 0%,
			var(--gradient-pos-x) var(--gradient-pos-y);
		background-size:
			148% 148%,
			var(--gradient-size) var(--gradient-size);
		background-repeat: no-repeat, no-repeat;
	}

	main {
		position: relative;
		min-height: 100vh;
		background-color: rgba(10, 6, 18, 0.96);
		background-image:
			radial-gradient(circle at 18% -12%, rgba(239, 94, 3, 0.12), transparent 58%),
			radial-gradient(circle at 78% 6%, rgba(84, 138, 255, 0.08), transparent 62%),
			radial-gradient(circle at top, rgba(15, 15, 18, 0.95), rgba(8, 8, 10, 0.98));
		background-repeat: no-repeat;
		background-size:
			140% 120%,
			160% 140%,
			100% 100%;
		transition: background-color 0.8s ease;
	}
</style>
