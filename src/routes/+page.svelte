<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { gsap } from 'gsap';
	import GradientButton from '$lib/components/ui/GradientButton.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { parallax, scrollAtmosphere, depthFade } from '$lib/actions/motion';
	import Footer from '$lib/components/layout/Footer.svelte';
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
	import logo from '$lib/assets/logo.png';

	const heroHighlights = [
		{
			label: '7+ years',
			caption: 'Leading front-end programs across Svelte, Vue, React, and design systems.'
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
			title: 'Support your squads',
			description:
				'Embed as a senior front-end lead who unblocks product, design, and engineering with calm, structured delivery.'
		},
		{
			icon: Gauge,
			title: 'Maximize product growth',
			description:
				'Instrument performance, accessibility, and conversion so every release moves the metrics that matter.'
		},
		{
			icon: Workflow,
			title: 'Automate delivery',
			description:
				'Codify design tokens, CI/CD, and code standards so your team ships faster without sacrificing craft.'
		},
		{
			icon: Heart,
			title: 'Delight customers',
			description:
				'Craft immersive surfaces that feel inclusive, polished, and unmistakably on brand across devices.'
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
		'SvelteKit, Vue/Nuxt, React/Next.js, and bespoke component-library ecosystems.',
		'TypeScript-first workflows with Storybook, Vitest, Playwright, and Cypress.',
		'CI/CD across GitHub Actions, GitLab, CircleCI, Vercel, and containerized deployments.',
		'Design collaboration in Figma with design tokens, theming, and WCAG 2.2 accessibility baked in.'
	];

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

	let heroSection: HTMLElement;
	let heroRipple: HTMLDivElement;
	let heroIntensity: HTMLDivElement;
	let heroTexture: HTMLDivElement;
	let heroBreathTimeline: gsap.core.Timeline | null = null;
	let heroTextureTween: gsap.core.Tween | null = null;

const getMainSurface = () =>
	typeof document === 'undefined' ? null : (document.querySelector('main') as HTMLElement | null);

	onMount(() => {
		if (heroSection && heroRipple && heroIntensity) {
			gsap.set(heroSection, {
				'--gradient-pos-x': '20%',
				'--gradient-pos-y': '80%',
				'--gradient-size': '122%',
				'--sheen-opacity': 0.24
			});

			gsap.set(heroRipple, {
				transformOrigin: 'bottom left',
				opacity: 0,
				scale: 0.78,
				xPercent: -10,
				yPercent: 10
			});

			gsap.set(heroIntensity, {
				transformOrigin: 'top right',
				opacity: 0.2,
				scale: 1.05,
				xPercent: 18,
				yPercent: -18,
				filter: 'blur(28px)'
			});

			heroBreathTimeline = gsap
				.timeline({
					repeat: -1,
					repeatDelay: 0.35,
					defaults: { ease: 'sine.inOut' }
				})
				.addLabel('inhale', 0)
				.to(
					heroSection,
					{
						duration: 1.8,
						'--gradient-pos-x': '60%',
						'--gradient-pos-y': '38%',
						'--gradient-size': '110%',
						'--sheen-opacity': 0.34,
						ease: 'power1.out'
					},
					'inhale'
				)
				.to(
					heroRipple,
					{
						duration: 1.6,
						opacity: 0.45,
						scale: 1.06,
						xPercent: 4,
						yPercent: -4,
						ease: 'power2.out'
					},
					'inhale'
				)
				.to(
					heroIntensity,
					{
						duration: 1.6,
						opacity: 0.48,
						scale: 1.18,
						xPercent: 10,
						yPercent: -10,
						ease: 'power1.out'
					},
					'inhale'
				)
				.addLabel('hold')
				.to(
					heroSection,
					{
						duration: 1.35,
						'--gradient-pos-x': '34%',
						'--gradient-pos-y': '66%',
						'--gradient-size': '126%',
						'--sheen-opacity': 0.28
					},
					'hold'
				)
				.to(
					heroRipple,
					{
						duration: 1.35,
						opacity: 0.2,
						scale: 1.18,
						xPercent: 16,
						yPercent: -18
					},
					'hold'
				)
				.to(
					heroIntensity,
					{
						duration: 1.35,
						opacity: 0.3,
						scale: 1.22,
						xPercent: 18,
						yPercent: -16
					},
					'hold'
				)
				.addLabel('exhale')
				.to(
					heroSection,
					{
						duration: 1.1,
						'--gradient-pos-x': '20%',
						'--gradient-pos-y': '80%',
						'--gradient-size': '122%',
						'--sheen-opacity': 0.24,
						ease: 'power1.in'
					},
					'exhale'
				)
				.to(
					heroRipple,
					{
						duration: 1.1,
						opacity: 0,
						scale: 0.78,
						xPercent: -10,
						yPercent: 10,
						ease: 'sine.in'
					},
					'exhale'
				)
				.to(
					heroIntensity,
					{
						duration: 1.1,
						opacity: 0.2,
						scale: 1.05,
						xPercent: 18,
						yPercent: -18,
						ease: 'sine.in'
					},
					'exhale'
				);
		}

		if (heroTexture) {
			gsap.set(heroTexture, {
				backgroundPosition: '0% 0%, 38% 62%, 78% 24%',
				opacity: 0.14
			});

			heroTextureTween = gsap.to(heroTexture, {
				backgroundPosition: '120% 90%, 68% 18%, 6% 72%',
				duration: 9,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});
		}
	});

	onDestroy(() => {
		heroBreathTimeline?.kill();
		heroBreathTimeline = null;
		heroTextureTween?.kill();
		heroTextureTween = null;
	});
</script>

<svelte:head>
	<title>Hessam Khoobkar | Artful Front-End Systems</title>
	<meta
		name="description"
		content="Hessam Khoobkar crafts immersive, high-performance front-end systems for ambitious teams. Explore services, outcomes, process, and ways to collaborate on one dark, gradient-rich landing page."
	/>
	<meta property="og:title" content="Hessam Khoobkar | Artful Front-End Systems" />
	<meta
		property="og:description"
		content="Partner with Hessam Khoobkar to design, build, and scale front-end experiences that blend craft, performance, and measurable outcomes."
	/>
</svelte:head>

<main class="relative overflow-hidden">
	<section
		id="hero"
		bind:this={heroSection}
		class="hero-gradient relative min-h-screen w-screen"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(10, 6, 18, 0.96)',
			to: 'rgba(18, 12, 26, 0.98)',
			ease: 'power2.out',
			scrub: 0.9
		}}
	>
		<div
			class="hero-gradient__overlay hero-gradient__ripple"
			bind:this={heroRipple}
			use:parallax={{ speed: 1.15, from: -60, to: 42, scrub: 0.6 }}
		></div>
		<div
			class="hero-gradient__overlay hero-gradient__intensity"
			bind:this={heroIntensity}
			use:parallax={{ speed: 0.7, from: -32, to: 20, scrub: 0.6 }}
		></div>
		<div
			class="hero-gradient__overlay hero-gradient__texture"
			bind:this={heroTexture}
			use:parallax={{ speed: 0.4, from: -18, to: 12, scrub: 0.4 }}
		></div>
		<div class="hero-gradient__overlay hero-gradient__sheen"></div>

		<div class="relative z-10 flex h-full items-center">
			<div
				class="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-24 md:py-32"
				use:reveal={{ childSelector: '[data-hero-item]', stagger: 0.2, delay: 0.1 }}
			>
				<div class="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
					<div data-hero-item class="space-y-7">
						<div class="flex items-center gap-3">
							<span
								class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur"
							>
								<img src={logo} alt="Hessam Khoobkar monogram" class="h-8 w-8" />
							</span>
							<span
								class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70"
							>
								<Sparkles size={14} aria-hidden="true" />
								Senior front-end lead
							</span>
						</div>
						<h1 class="max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
							Artful front-end systems for teams that refuse to ship ordinary.
						</h1>
						<p class="max-w-2xl text-base leading-relaxed text-white/80">
							I’m Hessam Khoobkar, a senior front-end developer blending design sensibility with type-safe
							engineering. From SvelteKit migrations to design-system rollouts, I help founders and product
							teams launch faster without compromising craft.
						</p>
						<div class="flex flex-wrap items-center gap-3">
							<GradientButton href="tel:+989196230597" title="Call Hessam" class="w-auto px-6 py-2.5">
								<span class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
									<Phone size={18} aria-hidden="true" />
									Call me
								</span>
							</GradientButton>
							<a
								href="/hessam_khoobkar_resume.pdf"
								class="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white hover:bg-white hover:text-surface-900"
							>
								<Download size={18} aria-hidden="true" />
								Resume
							</a>
							<a
								href="mailto:amirhessam.dev@gmail.com"
								class="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.28em] text-white/70 transition hover:text-white"
							>
								<span>Start a project</span>
								<ArrowUpRight size={16} aria-hidden="true" />
							</a>
						</div>
						<div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
							<div class="inline-flex items-center gap-2">
								<Layers size={16} aria-hidden="true" />
								Svelte · Vue · React
							</div>
							<div class="inline-flex items-center gap-2">
								<Briefcase size={16} aria-hidden="true" />
								Remote worldwide
							</div>
						</div>
					</div>
					<div data-hero-item>
						<div
							class="flex h-full flex-col gap-6 rounded-3xl border border-white/15 bg-white/[0.08] p-6 text-white shadow-[0_30px_120px_-60px_rgba(239,94,3,0.8)] backdrop-blur-xl"
						>
							<div>
								<p class="text-xs uppercase tracking-[0.4em] text-white/70">Currently partnering</p>
								<h2 class="mt-3 text-2xl font-semibold leading-snug">
									Scaling digital products with design system precision and measurable outcomes.
								</h2>
							</div>
							<ul class="space-y-3 text-sm leading-relaxed text-white/90">
								<li class="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-3">
									<div class="rounded-lg bg-white/10 p-2">
										<Gauge size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs uppercase tracking-[0.35em] text-white/60">Focus</p>
										<p>High-impact migrations, design systems, and performance roadmaps.</p>
									</div>
								</li>
								<li class="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-3">
									<div class="rounded-lg bg-white/10 p-2">
										<Sparkles size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs uppercase tracking-[0.35em] text-white/60">Promise</p>
										<p>Ship immersive, accessible experiences while coaching in-house teams.</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div data-hero-item class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each heroHighlights as fact}
						<div class="rounded-2xl border border-white/15 bg-white/5 px-5 py-6 text-white shadow-[0_20px_80px_-50px_rgba(255,255,255,0.6)] backdrop-blur-xl">
							<p class="text-xl font-semibold">{fact.label}</p>
							<p class="mt-2 text-sm text-white/75">{fact.caption}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section
		class="relative border-t border-surface-800/60 bg-surface-950/70"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(18, 12, 26, 0.98)',
			to: 'rgba(12, 16, 26, 0.97)',
			scrub: 0.8
		}}
	>
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
						class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-300"
					>
						<Sparkles size={14} aria-hidden="true" />
						A new way to launch
					</span>
					<h2 class="text-3xl font-bold text-surface-50 md:text-4xl">
						Partner with an engineering lead who feels in-house from day one.
					</h2>
					<p class="max-w-2xl text-sm leading-relaxed text-surface-300">
						I combine product intuition with technical stewardship to help teams ship ambitious experiences.
						Whether we’re modernizing a platform or building a new surface, you get deep collaboration,
						documentation, and measurable results.
					</p>
					<p class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-primary-200">
						<ArrowUpRight size={16} aria-hidden="true" />
						Remote-first · async friendly · outcome driven
					</p>
				</div>
				<div data-pillars class="grid gap-4 sm:grid-cols-2">
					{#each solutionPillars as pillar}
						{@const Icon = pillar.icon}
						<div
							class="rounded-2xl border border-surface-700 bg-surface-900/70 p-6 transition hover:-translate-y-1 hover:border-primary-500/40 hover:bg-surface-900/80"
						>
							<div class="flex items-center justify-between">
								<div class="rounded-xl bg-primary-500/15 p-3">
									<Icon size={18} class="text-primary-300" aria-hidden="true" />
								</div>
								<ArrowUpRight size={16} class="text-primary-400/70" aria-hidden="true" />
							</div>
							<h3 class="mt-4 text-lg font-semibold text-surface-50">{pillar.title}</h3>
							<p class="mt-3 text-sm leading-relaxed text-surface-300">{pillar.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

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
			<div class="space-y-4" use:reveal={{ childSelector: '[data-automation-headline]', stagger: 0.1 }}>
				<span
					data-automation-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-300"
				>
					Automation-ready delivery
				</span>
				<h2
					data-automation-headline
					class="text-3xl font-bold text-surface-50 md:text-4xl"
				>
					Automate the routine, focus on the work that moves the needle.
				</h2>
				<p data-automation-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					From migration playbooks to experiment frameworks, I build the systems that keep your teams confident
					and your releases predictable. Pick the tracks you need and we’ll modularize the rest.
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
				<div data-integrations class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.35em] text-primary-300">Stack alignment</p>
						<h2 class="mt-2 text-2xl font-semibold text-surface-50">
							Connects with your existing systems—no matter how bespoke.
						</h2>
					</div>
					<span
						class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70"
					>
						<Layers size={16} aria-hidden="true" />
						Design ↔ Engineering
					</span>
				</div>
				<ul data-integrations class="mt-8 grid gap-4 md:grid-cols-2">
					{#each integrationPoints as point}
						<li class="flex items-start gap-3 rounded-2xl border border-surface-700 bg-surface-900/70 p-4 text-sm leading-relaxed text-surface-300">
							<span class="mt-1 h-2 w-2 rounded-full bg-primary-400"></span>
							{point}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

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
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-300"
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
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" use:reveal={{ childSelector: '[data-metric]', stagger: 0.08 }}>
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
						<p class="mt-3 text-sm uppercase tracking-[0.3em] text-surface-400">{metric.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

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
			<div class="space-y-4" use:reveal={{ childSelector: '[data-process-headline]', stagger: 0.1 }}>
				<span
					data-process-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-300"
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
						<span class="text-sm font-semibold uppercase tracking-[0.4em] text-primary-200">{step.step}</span>
						<h3 class="text-xl font-semibold text-surface-50">{step.title}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{step.description}</p>
						<div class="mt-auto rounded-2xl border border-primary-500/20 bg-primary-500/10 px-4 py-3 text-xs text-primary-100">
							<strong class="block text-[0.68rem] uppercase tracking-[0.35em] text-primary-200"
								>Outcome</strong
							>
							<span>{step.outcome}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

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
			<div class="space-y-4" use:reveal={{ childSelector: '[data-outcome-headline]', stagger: 0.1 }}>
				<span
					data-outcome-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-300"
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
						<p class="text-xs uppercase tracking-[0.35em] text-primary-200">{snapshot.company}</p>
						<h3 class="text-lg font-semibold text-surface-50">{snapshot.headline}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{snapshot.description}</p>
						<div class="mt-auto rounded-xl border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-100">
							{snapshot.result}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

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
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-300"
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
						<summary class="flex cursor-pointer items-center justify-between text-left text-sm font-semibold uppercase tracking-[0.3em] text-surface-200 transition group-open:text-primary-200">
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
						class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-300"
					>
						Let’s build together
					</span>
					<h2 class="text-3xl font-bold text-surface-50 md:text-4xl">
						Ready to ship something bold, fast, and on-brand?
					</h2>
					<p class="text-sm leading-relaxed text-surface-300">
						Reach out for full-time leadership, high-impact project sprints, or audits that unlock your next
						wave of growth. I respond within one business day.
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
										<p class="text-xs uppercase tracking-[0.35em] text-primary-300">
											{channel.label}
										</p>
										<p class="text-sm font-semibold">{channel.value}</p>
									</div>
								</a>
							{:else}
								<div class="flex items-center gap-4 rounded-2xl border border-surface-700 bg-surface-900/65 px-5 py-4 text-sm text-surface-200">
									<div class="rounded-xl bg-primary-500/10 p-3">
										<Icon size={18} class="text-primary-300" aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs uppercase tracking-[0.35em] text-primary-300">
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
								class="inline-flex items-center gap-2 rounded-full border border-surface-700/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-surface-200 transition hover:border-primary-500/40 hover:text-primary-200"
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
							<span class="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide">
								<Mail size={18} aria-hidden="true" />
								Send an email
							</span>
						</GradientButton>
					</div>
				</div>
			</div>
		</div>
	</section>

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

	.hero-gradient__overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.hero-gradient__ripple {
		background: radial-gradient(
			circle at bottom left,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0.18) 32%,
			transparent 70%
		);
		filter: blur(42px);
		mix-blend-mode: screen;
	}

	.hero-gradient__intensity {
		background: radial-gradient(
			circle at top right,
			rgba(255, 76, 32, 0.58) 0%,
			rgba(246, 46, 4, 0.42) 26%,
			rgba(168, 20, 12, 0.24) 56%,
			rgba(104, 8, 6, 0.12) 72%,
			transparent 85%
		);
		mix-blend-mode: screen;
		filter: blur(26px);
	}

	.hero-gradient__texture {
		background-image:
			radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.06) 0%, transparent 55%),
			radial-gradient(circle at 70% 42%, rgba(239, 94, 3, 0.08) 0%, transparent 60%),
			radial-gradient(circle at 32% 78%, rgba(255, 157, 43, 0.05) 0%, transparent 58%);
		background-size:
			30% 30%,
			36% 36%,
			42% 42%;
		mix-blend-mode: color-dodge;
		opacity: 0.12;
	}

	.hero-gradient__sheen {
		background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.3), transparent 65%);
		mix-blend-mode: screen;
		opacity: var(--sheen-opacity);
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

