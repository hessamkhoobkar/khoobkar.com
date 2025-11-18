<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { reveal } from '$lib/actions/reveal';
	import { depthFade } from '$lib/actions/motion';
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import ogImageAsset from '$lib/assets/logo.png';
	import { normalizeImageUrl, siteConfig } from '$lib/utils/structured-data';

	gsap.registerPlugin(ScrollTrigger);
	import {
		Sparkles,
		ArrowUpRight,
		Download,
		Mail,
		MapPin,
		Globe,
		Users,
		Gauge,
		Rocket,
		ShieldCheck,
		LineChart,
		Code2,
		Briefcase,
		Github,
		Linkedin,
		Instagram,
		Dribbble,
		MessageSquare,
		GitBranch,
		CheckCircle2,
		TrendingUp,
		Zap,
		Award,
		HelpCircle,
		ExternalLink
	} from '@lucide/svelte';

	const heroHighlights = [
		{
			label: '7+ years',
			caption: 'Shipping high-performance front-end systems across React, Svelte, Vue, and Next.js.'
		},
		{
			label: '35% avg uplift',
			caption: 'Measured performance gains delivered across fintech, trading, and SaaS platforms.'
		},
		{
			label: 'Available now',
			caption: 'Remote · Full-time & Freelance · Open to new opportunities worldwide.'
		}
	];

	const valuePropositions = [
		{
			icon: Rocket,
			title: 'Proven Performance Results',
			description:
				"Average 35% performance improvements across projects. I don't just build—I optimize for measurable business impact.",
			metrics: '35% avg performance uplift'
		},
		{
			icon: ShieldCheck,
			title: 'Production-Ready from Day One',
			description:
				"Code that's maintainable, scalable, and tested. I build systems that your team can own and extend long after I'm gone.",
			metrics: 'Zero technical debt'
		},
		{
			icon: Users,
			title: 'Team Multiplier',
			description:
				"I don't just code—I mentor, document, and elevate your team's capabilities. 8 developers mentored into senior roles.",
			metrics: '8 developers mentored'
		},
		{
			icon: Gauge,
			title: 'Fast Time-to-Value',
			description:
				'Ramp up in 5–10 days. I ship meaningful features in the first sprint, not after months of onboarding.',
			metrics: 'First sprint delivery'
		},
		{
			icon: Globe,
			title: 'Remote-Native Excellence',
			description:
				'Built for async collaboration across time zones. Proactive communication, clear documentation, transparent progress.',
			metrics: '100% remote success'
		},
		{
			icon: LineChart,
			title: 'Business-Minded Engineering',
			description:
				'I connect technical decisions to business outcomes. Every feature is built with metrics, accessibility, and user experience in mind.',
			metrics: '30% engagement lift'
		}
	];

	const workProcess = [
		{
			icon: MessageSquare,
			step: '01',
			title: 'Discovery & Alignment',
			description:
				'Deep dive into your goals, constraints, and vision. I ask the right questions to understand not just what you want, but why—ensuring we build the right solution from day one.'
		},
		{
			icon: GitBranch,
			step: '02',
			title: 'Rapid Prototyping',
			description:
				'Quick iterations with working code, not just mockups. I ship functional prototypes early so we can validate assumptions, gather feedback, and course-correct before investing in polish.'
		},
		{
			icon: Code2,
			step: '03',
			title: 'Production Development',
			description:
				'Build with performance, accessibility, and maintainability baked in. Every line of code is written for your team to own, extend, and scale long after I move on.'
		},
		{
			icon: CheckCircle2,
			step: '04',
			title: 'Quality & Handoff',
			description:
				'Comprehensive testing, documentation, and knowledge transfer. I ensure your team is equipped with everything needed to maintain and evolve the system independently.'
		}
	];

	const technologies = [
		'TypeScript',
		'React / Next.js',
		'Svelte / SvelteKit',
		'Vue.js / Nuxt.js',
		'TailwindCSS',
		'GraphQL',
		'WebSocket',
		'Docker',
		'CI/CD'
	];

	const experiences = [
		{
			company: 'POMECHAIN · Dubai (Remote)',
			role: 'Senior Front-End Developer',
			period: 'July 2024 – Present',
			icon: Rocket,
			metric: '56% faster',
			metricLabel: 'Load time reduction',
			highlights: [
				'Architected reusable Vue.js/Nuxt.js component library with TypeScript, improving maintainability',
				'Reduced load time from 16s to 7s through performance optimization and code-splitting',
				'Introduced TailwindCSS, reducing UI development time by 20%'
			]
		},
		{
			company: 'Coinhaven · Berlin (Remote)',
			role: 'Lead Front-End Developer',
			period: 'December 2021 – January 2024',
			icon: TrendingUp,
			metric: '33% faster',
			metricLabel: 'Performance improvement',
			highlights: [
				'Led migration from React to SvelteKit, achieving 33% performance improvement',
				'Built real-time WebSocket data synchronization system',
				'Mentored team of 7 developers, elevating coding standards through code reviews'
			]
		},
		{
			company: 'Piller Iddaa · Istanbul (Remote)',
			role: 'Senior Front-End Developer',
			period: 'November 2019 – December 2021',
			icon: Zap,
			metric: '42% retention',
			metricLabel: 'User retention increase',
			highlights: [
				'Optimized Vue.js interfaces for high-traffic betting platform handling thousands of concurrent users',
				'Improved user retention by 42% through enhanced UX and performance optimizations',
				'Reduced error rates and improved accessibility across complex interactive UIs'
			]
		}
	];

	const faqs = [
		{
			question: 'Are you available for full-time and freelance roles?',
			answer:
				"Yes. I'm open to both full-time remote positions and freelance/contract work. I'm based in Tallinn (UTC+2) and work effectively across time zones with async-first communication."
		},
		{
			question: 'What makes you different from other developers?',
			answer:
				"I don't just code—I deliver measurable business outcomes. Every project includes performance optimization (35% avg improvement), team mentorship (8 developers mentored), and scalable architecture that your team can own long after I'm gone."
		},
		{
			question: 'What technologies do you work with?',
			answer:
				"I specialize in React, Svelte, Vue.js, and their meta-frameworks (Next.js, SvelteKit, Nuxt.js). I'm TypeScript-first, work with modern build tools, and focus on performance, accessibility, and maintainable code."
		},
		{
			question: 'How quickly can you start and deliver value?',
			answer:
				'I can typically ramp up in 5–10 days and ship meaningful features in the first sprint. I quickly audit your codebase, align on goals, and start delivering measurable results immediately.'
		},
		{
			question: 'Can you work with our existing team and codebase?',
			answer:
				'Absolutely. I excel at embedding with teams, mentoring developers, and working with existing codebases. I document decisions, elevate code quality through reviews, and build systems that integrate seamlessly with your stack.'
		},
		{
			question: "What's your approach to remote collaboration?",
			answer:
				'Built for async-first collaboration across time zones. I provide proactive updates, clear documentation, transparent progress tracking, and overlap meetings when needed. 100% remote success rate across 13 international teams.'
		}
	];

	const socialLinks = [
		{ icon: Github, label: 'GitHub', href: 'https://github.com/hessamkhoobkar' },
		{ icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/hessam-khoobkar/' },
		{ icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/hessam_khoobkar/' },
		{ icon: Dribbble, label: 'Dribbble', href: 'https://dribbble.com/hessam_khoobkar' }
	];

	const canonicalUrl = `${siteConfig.url}/`;
	const metaTitle = 'Hessam Khoobkar | Senior Front-End Developer';
	const metaDescription =
		'Senior Front-End Developer available for full-time and freelance opportunities. 7+ years building high-performance web applications with React, Svelte, Vue.js, and TypeScript. Remote worldwide.';
	const metaKeywords = [
		'Hessam Khoobkar',
		'Senior Front-End Developer',
		'React developer',
		'Svelte developer',
		'Vue.js developer',
		'TypeScript developer',
		'remote developer',
		'freelance developer',
		'front-end engineer'
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
			},
			{
				'@type': 'FAQPage',
				'@id': `${canonicalUrl}#faq`,
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: faq.answer
					}
				}))
			}
		]
	};

	// Custom reveal with two-phase animation (slow fade/blur, then quick jump)
	let valueCardsContainer: HTMLElement;
	let silkBackgroundContainer: HTMLElement;
	let technologiesSection: HTMLElement;
	let faqCardsContainer: HTMLElement;
	onMount(() => {
		if (typeof window === 'undefined' || !valueCardsContainer) return;

		const cards = valueCardsContainer.querySelectorAll<HTMLElement>('[data-value-card]');

		// Set initial state
		gsap.set(cards, {
			opacity: 0,
			y: 25,
			filter: 'blur(6px)'
		});

		// Create intersection observer for reveal
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const card = entry.target as HTMLElement;
						const cardIndex = parseInt(card.dataset.cardIndex || '0');

						// Two-phase animation: slow fade/blur, then quick jump
						const tl = gsap.timeline({
							delay: cardIndex * 0.1
						});

						// Phase 1: Slow fade and blur removal (1.2s)
						tl.to(card, {
							opacity: 1,
							filter: 'blur(0px)',
							duration: 0.7,
							ease: 'power1.out'
						});

						// Phase 2: Quick jump to final position (0.3s)
						tl.to(
							card,
							{
								y: 0,
								duration: 0.3,
								ease: 'power2.out'
							},
							'-=0.1'
						); // Start slightly before phase 1 ends

						observer.unobserve(card);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		cards.forEach((card) => observer.observe(card));

		return () => {
			observer.disconnect();
		};
	});

	// Custom reveal animation for FAQ cards (same pattern as value cards)
	onMount(() => {
		if (typeof window === 'undefined' || !faqCardsContainer) return;

		const cards = faqCardsContainer.querySelectorAll<HTMLElement>('[data-faq-card]');

		// Set initial state
		gsap.set(cards, {
			opacity: 0,
			y: 25,
			filter: 'blur(6px)'
		});

		// Create intersection observer for reveal
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const card = entry.target as HTMLElement;
						const cardIndex = parseInt(card.dataset.cardIndex || '0');

						// Two-phase animation: slow fade/blur, then quick jump
						const tl = gsap.timeline({
							delay: cardIndex * 0.1
						});

						// Phase 1: Slow fade and blur removal (0.7s)
						tl.to(card, {
							opacity: 1,
							filter: 'blur(0px)',
							duration: 0.7,
							ease: 'power1.out'
						});

						// Phase 2: Quick jump to final position (0.3s)
						tl.to(
							card,
							{
								y: 0,
								duration: 0.3,
								ease: 'power2.out'
							},
							'-=0.1'
						); // Start slightly before phase 1 ends

						observer.unobserve(card);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		cards.forEach((card) => observer.observe(card));

		return () => {
			observer.disconnect();
		};
	});

	// Simple fade-in animation for contact section (works better for last section)
	let contactSection: HTMLElement;
	onMount(() => {
		if (typeof window === 'undefined' || !contactSection) return;

		// Set initial state
		gsap.set(contactSection, {
			opacity: 0,
			y: 40
		});

		// Use intersection observer with very low threshold for last section
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Simple fade-in animation
						gsap.to(contactSection, {
							opacity: 1,
							y: 0,
							duration: 1.2,
							ease: 'power2.out'
						});
						observer.unobserve(contactSection);
					}
				});
			},
			{
				threshold: 0.05, // Trigger when just 5% is visible
				rootMargin: '0px 0px 100px 0px' // Trigger slightly before it's fully visible
			}
		);

		observer.observe(contactSection);

		return () => {
			observer.disconnect();
		};
	});

	// Smooth fade-in/out for Silk background animation
	onMount(() => {
		if (typeof window === 'undefined' || !silkBackgroundContainer || !technologiesSection) return;

		// Set initial opacity
		gsap.set(silkBackgroundContainer, { opacity: 0 });

		// Create unified timeline animation for complete fade lifecycle
		// Spans from when section enters viewport to when it exits
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: technologiesSection,
				start: 'top 80%',
				end: 'bottom 20%',
				scrub: 0.8,
				invalidateOnRefresh: true
			}
		});

		// Fade in: 0 → 1 (first portion as section enters)
		tl.to(silkBackgroundContainer, {
			opacity: 1,
			ease: 'power2.out',
			duration: 0.3
		})
			// Maintain opacity at 1 (middle portion while section is in view)
			.to(silkBackgroundContainer, {
				opacity: 1,
				duration: 0.4
			})
			// Fade out: 1 → 0 (last portion as section exits)
			.to(silkBackgroundContainer, {
				opacity: 0,
				ease: 'power2.in',
				duration: 0.3
			});

		return () => {
			tl?.kill();
		};
	});
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
		content="Senior Front-End Developer available for full-time and freelance work. 7+ years building high-performance applications with React, Svelte, Vue.js, and TypeScript."
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

<div class="relative min-h-screen overflow-hidden">
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
								<p class="text-xs tracking-[0.4em] text-white/70 uppercase">What I do</p>
								<h2 class="mt-3 text-2xl leading-snug font-semibold">
									Build high-performance front-end systems that scale.
								</h2>
							</div>
							<ul class="space-y-3 text-sm leading-relaxed text-white/90">
								<li
									class="flex gap-3 rounded-2xl border border-primary-900/20 bg-primary-900/20 p-3"
								>
									<div class="rounded-lg bg-white/10 p-2">
										<Code2 size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-white/60 uppercase">Expertise</p>
										<p>React, Svelte, Vue.js, TypeScript, and modern build tools.</p>
									</div>
								</li>
								<li
									class="flex gap-3 rounded-2xl border border-primary-900/20 bg-primary-900/20 p-3"
								>
									<div class="rounded-lg bg-white/10 p-2">
										<Rocket size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-white/60 uppercase">Results</p>
										<p>35% average performance improvements and scalable architecture.</p>
									</div>
								</li>
								<li
									class="flex gap-3 rounded-2xl border border-primary-900/20 bg-primary-900/20 p-3"
								>
									<div class="rounded-lg bg-white/10 p-2">
										<Globe size={18} aria-hidden="true" />
									</div>
									<div>
										<p class="text-xs tracking-[0.35em] text-white/60 uppercase">Availability</p>
										<p>Remote worldwide, open to full-time and freelance opportunities.</p>
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

	<!-- Value Proposition Section -->
	<section class="relative bg-surface-950 py-24">
		<div
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 90%', end: 'top 60%', scrub: 0.45 }}
		>
			<div class="space-y-4" use:reveal={{ childSelector: '[data-value-headline]', stagger: 0.1 }}>
				<span
					data-value-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Why invest in me
				</span>
				<h2 data-value-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Proven value that delivers measurable results.
				</h2>
				<p data-value-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					I don't just write code—I deliver solutions that impact your bottom line. Performance
					gains, team growth, and business outcomes are what I measure success by.
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" bind:this={valueCardsContainer}>
				{#each valuePropositions as value, index}
					{@const Icon = value.icon}
					<div
						data-value-card
						data-card-index={index}
						class="flex h-full flex-col gap-4 rounded-2xl border border-surface-700 bg-surface-900/70 p-6 transition hover:border-primary-500/40 hover:bg-surface-900/80"
					>
						<div class="flex items-center justify-between">
							<div class="rounded-xl bg-primary-500/15 p-3">
								<Icon size={18} class="text-primary-300" aria-hidden="true" />
							</div>
						</div>
						<h3 class="text-lg font-semibold text-surface-50">{value.title}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{value.description}</p>
						<div
							class="mt-auto rounded-xl border border-primary-500/20 bg-primary-500/10 px-3 py-2 text-xs font-semibold text-primary-100"
						>
							{value.metrics}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- How I Work Section -->
	<section class="relative bg-surface-900 py-12">
		<div
			class="mx-auto max-w-6xl space-y-6 px-6 py-24"
			use:depthFade={{ start: 'top 90%', end: 'top 60%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-process-headline]', stagger: 0.1 }}
			>
				<span
					data-process-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					My approach
				</span>
				<h2 data-process-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					How I work with teams.
				</h2>
				<p data-process-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					A proven process that balances speed with quality, ensuring we deliver value quickly while
					building systems that stand the test of time.
				</p>
			</div>
			<div
				class="mt-6 grid gap-6 md:grid-cols-2"
				use:reveal={{ childSelector: '[data-process-step]', stagger: 0.1 }}
			>
				{#each workProcess as process, index}
					{@const Icon = process.icon}
					<div
						data-process-step
						class="group relative flex flex-col gap-4 rounded-2xl border border-surface-700 bg-surface-800/70 p-6 transition hover:border-primary-500/40 hover:bg-surface-800/90"
					>
						<div class="flex items-start justify-between gap-4">
							<div class="rounded-xl bg-primary-500/15 p-3">
								<Icon size={20} class="text-primary-300" aria-hidden="true" />
							</div>
							<span
								class="text-4xl leading-none font-bold text-surface-600 transition-colors group-hover:text-primary-500/30"
								aria-hidden="true"
							>
								{process.step}
							</span>
						</div>
						<div>
							<h3 class="text-lg font-semibold text-surface-50">{process.title}</h3>
							<p class="mt-2 text-sm leading-relaxed text-surface-300">
								{process.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
			<div
				class="rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-transparent p-8"
				use:reveal={{
					from: { opacity: 0, y: 48, rotateX: -8, filter: 'blur(6px)' },
					to: {
						opacity: 1,
						y: 0,
						rotateX: 0,
						filter: 'blur(0px)',
						duration: 1.1,
						ease: 'power3.out'
					},
					delay: 0.4
				}}
			>
				<div class="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
					<div>
						<h3 class="text-xl font-semibold text-surface-50">Ready to collaborate?</h3>
						<p class="mt-2 text-sm leading-relaxed text-surface-300">
							Let's discuss how I can help accelerate your project and deliver measurable results
							from day one.
						</p>
					</div>
					<div class="flex justify-end">
						<a
							href="mailto:amirhessam.dev@gmail.com?subject=Let's discuss a project"
							class="group inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-6 py-3 text-sm font-semibold tracking-[0.3em] text-primary-300 uppercase transition hover:border-primary-500 hover:bg-primary-500/20 hover:text-primary-200"
						>
							Start a conversation
							<ArrowUpRight
								size={16}
								class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								aria-hidden="true"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Technologies Section -->
	<section class="relative overflow-hidden bg-surface-900/50 py-24" bind:this={technologiesSection}>
		<!-- Silk Background Animation -->
		<div class="absolute inset-x-0 inset-y-1.5" bind:this={silkBackgroundContainer}>
			<Silk speed={3} scale={1} color="#ef5e03" noiseIntensity={1.2} rotation={0.3} />
		</div>
		<!-- Gradient overlays for smooth transitions -->
		<div
			class="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-surface-900 via-transparent to-surface-900"
		></div>
		<div
			class="relative z-10 mx-auto max-w-4xl space-y-16 px-6 py-32"
			use:depthFade={{ start: 'top 90%', end: 'top 60%', scrub: 0.45 }}
		>
			<div
				class="space-y-4 text-center"
				use:reveal={{ childSelector: '[data-tech-headline]', stagger: 0.1 }}
			>
				<span
					data-tech-headline
					class="inline-flex w-fit items-center gap-2 rounded-full border border-primary-400/30 bg-gradient-to-r from-primary-500/20 via-primary-400/25 to-primary-500/20 px-4 py-1.5 text-xs font-semibold tracking-[0.35em] text-primary-50 uppercase shadow-[0_0_20px_rgba(239,94,3,0.15),0_0_40px_rgba(239,94,3,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 hover:border-primary-400/50 hover:shadow-[0_0_30px_rgba(239,94,3,0.25),0_0_60px_rgba(239,94,3,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]"
				>
					<Code2 class="h-4 w-4 text-primary-300" />
					Technologies
				</span>
				<h2 data-tech-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Modern stack, proven results.
				</h2>
			</div>
			<div
				class="flex flex-wrap items-center justify-center gap-4"
				use:reveal={{ childSelector: '[data-tech-item]', stagger: 0.05 }}
			>
				{#each technologies as tech}
					<div
						data-tech-item
						class="group relative rounded-full border border-surface-50/20 bg-surface-50/10 px-6 py-3 text-sm font-medium text-surface-50 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-surface-50/40 hover:bg-surface-50/20 hover:shadow-[0_0_30px_rgba(239,94,3,0.25),0_0_60px_rgba(239,94,3,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]"
					>
						<span class="relative z-10 cursor-default">{tech}</span>
						<div
							class="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
						></div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Experience Section -->
	<section class="relative overflow-hidden bg-surface-900 py-12">
		<!-- Subtle background gradient -->
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent"
		></div>
		<div
			class="relative mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 90%', end: 'top 60%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-experience-headline]', stagger: 0.1 }}
			>
				<span
					data-experience-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					<Award size={14} aria-hidden="true" />
					Professional experience
				</span>
				<h2 data-experience-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Real projects, real results, real impact.
				</h2>
				<p data-experience-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					Track record of delivering measurable business outcomes across fintech, trading, and SaaS
					platforms. Every project includes performance gains, team growth, and scalable
					architecture.
				</p>
			</div>
			<div
				class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
				use:reveal={{ childSelector: '[data-experience-card]', stagger: 0.1 }}
			>
				{#each experiences as experience}
					{@const Icon = experience.icon}
					<div
						data-experience-card
						class="group relative flex h-full flex-col gap-5 rounded-2xl border border-surface-700/80 bg-gradient-to-br from-surface-900/90 via-surface-900/70 to-surface-900/90 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary-500/50"
					>
						<!-- Content wrapper -->
						<div class="relative z-10 flex h-full flex-col gap-5">
							<!-- Header with icon and company -->
							<div class="flex items-start justify-between gap-4">
								<div class="flex-1">
									<div class="mb-3 flex items-center gap-3">
										<div
											class="relative overflow-hidden rounded-xl border border-transparent bg-gradient-to-br from-primary-500/40 via-primary-500/35 to-primary-500/30 p-3 shadow-[0_4px_12px_rgba(239,94,3,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary-400/50 group-hover:shadow-[0_8px_32px_rgba(239,94,3,0.4),0_0_60px_rgba(239,94,3,0.2)]"
										>
											<!-- Animated gradient background -->
											<div
												class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400/20 via-primary-500/30 to-primary-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
											></div>

											<!-- Outer glow effect -->
											<div
												class="absolute -inset-1 rounded-xl bg-primary-500/40 opacity-0 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
											></div>

											<!-- Inner glow pulse -->
											<div
												class="absolute inset-0 rounded-xl bg-primary-400/30 opacity-0 blur-md transition-all duration-500 group-hover:animate-pulse group-hover:opacity-70"
											></div>

											<!-- Shimmer effect -->
											<div
												class="absolute inset-0 -translate-x-full rounded-xl bg-gradient-to-r from-transparent via-primary-300/30 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
											></div>

											<!-- Icon with complex animations -->
											<Icon
												size={20}
												class="relative z-10 text-primary-200 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(239,94,3,0.8)]"
												aria-hidden="true"
											/>
										</div>
									</div>
									<p class="text-xs tracking-[0.35em] text-primary-200/90 uppercase">
										{experience.company}
									</p>
									<h3
										class="mt-2 text-lg font-semibold text-surface-50 transition-colors group-hover:text-primary-100"
									>
										{experience.role}
									</h3>
									<p class="mt-1 text-sm text-surface-400">{experience.period}</p>
								</div>
							</div>

							<!-- Metric badge -->
							<div
								class="inline-flex w-fit items-center gap-2 rounded-xl border border-primary-500/30 bg-gradient-to-r from-primary-500/15 via-primary-500/10 to-primary-500/15 px-4 py-2.5 shadow-[0_0_20px_rgba(239,94,3,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 group-hover:border-primary-500/50 group-hover:shadow-[0_0_30px_rgba(239,94,3,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
							>
								<TrendingUp size={14} class="text-primary-300" aria-hidden="true" />
								<div class="flex flex-col">
									<span class="text-xs font-bold text-primary-200">{experience.metric}</span>
									<span class="text-[10px] tracking-[0.2em] text-primary-300/70 uppercase">
										{experience.metricLabel}
									</span>
								</div>
							</div>

							<!-- Highlights list -->
							<ul class="mt-auto space-y-3 text-sm leading-relaxed text-surface-300">
								{#each experience.highlights as highlight, j}
									<li
										class="flex items-start gap-3 transition-all duration-300 group-hover:text-surface-200"
										style="animation-delay: {j * 50}ms"
									>
										<div
											class="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500/30"
										>
											<CheckCircle2
												size={12}
												class="text-primary-300 transition-colors group-hover:text-primary-200"
												aria-hidden="true"
											/>
										</div>
										<span class="flex-1">{highlight}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="relative overflow-hidden bg-surface-950 py-12">
		<!-- Subtle background gradient -->
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent"
		></div>
		<div
			class="relative mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 90%', end: 'top 60%', scrub: 0.45 }}
		>
			<div class="space-y-4" use:reveal={{ childSelector: '[data-faq-headline]', stagger: 0.1 }}>
				<span
					data-faq-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					<HelpCircle size={14} aria-hidden="true" />
					Frequently asked
				</span>
				<h2 data-faq-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Answers to common questions about working together.
				</h2>
				<p data-faq-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					Everything you need to know about my approach, availability, and how I deliver value to
					your team.
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" bind:this={faqCardsContainer}>
				{#each faqs as faq, index}
					<div
						data-faq-card
						data-card-index={index}
						class="group relative flex h-full flex-col gap-5 rounded-2xl border border-surface-700/80 bg-gradient-to-br from-surface-900/90 via-surface-900/70 to-surface-900/90 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary-500/50 hover:shadow-[0_8px_32px_rgba(239,94,3,0.15)]"
					>
						<!-- Animated gradient background on hover -->
						<div
							class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
						></div>

						<!-- Outer glow effect -->
						<div
							class="absolute -inset-1 rounded-2xl bg-primary-500/0 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-20"
						></div>

						<!-- Content wrapper -->
						<div class="relative z-10 flex h-full flex-col gap-5">
							<!-- Question header with icon -->
							<div class="flex items-start gap-4">
								<div
									class="relative mt-0.5 shrink-0 overflow-hidden rounded-xl border border-transparent bg-gradient-to-br from-primary-500/40 via-primary-500/35 to-primary-500/30 p-3 shadow-[0_4px_12px_rgba(239,94,3,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary-400/50 group-hover:shadow-[0_8px_32px_rgba(239,94,3,0.4),0_0_60px_rgba(239,94,3,0.2)]"
								>
									<!-- Animated gradient background -->
									<div
										class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400/20 via-primary-500/30 to-primary-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
									></div>

									<!-- Outer glow effect -->
									<div
										class="absolute -inset-1 rounded-xl bg-primary-500/40 opacity-0 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
									></div>

									<!-- Inner glow pulse -->
									<div
										class="absolute inset-0 rounded-xl bg-primary-400/30 opacity-0 blur-md transition-all duration-500 group-hover:animate-pulse group-hover:opacity-70"
									></div>

									<!-- Shimmer effect -->
									<div
										class="absolute inset-0 -translate-x-full rounded-xl bg-gradient-to-r from-transparent via-primary-300/30 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
									></div>

									<!-- Icon -->
									<HelpCircle
										size={20}
										class="relative z-10 text-primary-200 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(239,94,3,0.8)]"
										aria-hidden="true"
									/>
								</div>
								<h3
									class="flex-1 text-base leading-snug font-semibold text-surface-50 transition-colors group-hover:text-primary-100"
								>
									{faq.question}
								</h3>
							</div>

							<!-- Answer -->
							<div class="relative mt-auto">
								<!-- Decorative line -->
								<div
									class="absolute top-0 left-0 h-full w-0.5 rounded-full bg-gradient-to-b from-primary-500/50 via-primary-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
								></div>
								<p
									class="pl-6 text-sm leading-relaxed text-surface-300 transition-colors group-hover:text-surface-200"
								>
									{faq.answer}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="relative overflow-hidden bg-surface-900 py-16" bind:this={contactSection}>
		<!-- Subtle background gradient -->
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent"
		></div>
		<div class="relative mx-auto max-w-6xl space-y-8 px-6">
			<!-- Header -->
			<div class="space-y-3 text-center">
				<span
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					<MessageSquare size={14} aria-hidden="true" />
					Let's work together
				</span>
				<h2 class="text-2xl font-bold text-surface-50 md:text-3xl">Ready to start your project?</h2>
				<p class="mx-auto max-w-2xl text-sm leading-relaxed text-surface-300">
					I'm available for full-time and freelance opportunities. Let's discuss how I can help
					bring your vision to life.
				</p>
			</div>

			<!-- Compact Contact Grid -->
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<!-- Email Contact -->
				<a
					href="mailto:amirhessam.dev@gmail.com?subject=Let's discuss a project"
					class="group relative flex flex-col gap-3 rounded-xl border border-surface-700/80 bg-gradient-to-br from-surface-900/90 via-surface-900/70 to-surface-900/90 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/50 hover:shadow-[0_8px_32px_rgba(239,94,3,0.15)]"
				>
					<div class="flex items-center gap-3">
						<div
							class="rounded-lg border border-transparent bg-gradient-to-br from-primary-500/40 via-primary-500/35 to-primary-500/30 p-2.5 shadow-[0_4px_12px_rgba(239,94,3,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
						>
							<Mail size={18} class="text-primary-200" aria-hidden="true" />
						</div>
						<div class="flex-1">
							<h3 class="text-sm font-semibold text-surface-50">Email</h3>
							<p class="text-xs text-surface-400">amirhessam.dev@gmail.com</p>
						</div>
						<ArrowUpRight
							size={14}
							class="text-surface-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-300"
							aria-hidden="true"
						/>
					</div>
				</a>

				<!-- Resume Download -->
				<a
					href="/hessam_khoobkar_resume.pdf"
					class="group relative flex flex-col gap-3 rounded-xl border border-surface-700/80 bg-gradient-to-br from-surface-900/90 via-surface-900/70 to-surface-900/90 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/50 hover:shadow-[0_8px_32px_rgba(239,94,3,0.15)]"
				>
					<div class="flex items-center gap-3">
						<div
							class="rounded-lg border border-transparent bg-gradient-to-br from-primary-500/40 via-primary-500/35 to-primary-500/30 p-2.5 shadow-[0_4px_12px_rgba(239,94,3,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
						>
							<Download size={18} class="text-primary-200" aria-hidden="true" />
						</div>
						<div class="flex-1">
							<h3 class="text-sm font-semibold text-surface-50">Resume</h3>
							<p class="text-xs text-surface-400">Download PDF</p>
						</div>
						<ArrowUpRight
							size={14}
							class="text-surface-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-300"
							aria-hidden="true"
						/>
					</div>
				</a>

				<!-- Location -->
				<div
					class="flex flex-col gap-3 rounded-xl border border-surface-700/80 bg-gradient-to-br from-surface-900/90 via-surface-900/70 to-surface-900/90 p-5"
				>
					<div class="flex items-center gap-3">
						<div
							class="rounded-lg border border-transparent bg-gradient-to-br from-primary-500/40 via-primary-500/35 to-primary-500/30 p-2.5 shadow-[0_4px_12px_rgba(239,94,3,0.2)]"
						>
							<MapPin size={18} class="text-primary-200" aria-hidden="true" />
						</div>
						<div class="flex-1">
							<h3 class="text-sm font-semibold text-surface-50">Location</h3>
							<p class="text-xs text-surface-400">Tallinn, Estonia</p>
						</div>
					</div>
				</div>

				<!-- Timezone -->
				<div
					class="flex flex-col gap-3 rounded-xl border border-surface-700/80 bg-gradient-to-br from-surface-900/90 via-surface-900/70 to-surface-900/90 p-5"
				>
					<div class="flex items-center gap-3">
						<div
							class="rounded-lg border border-transparent bg-gradient-to-br from-primary-500/40 via-primary-500/35 to-primary-500/30 p-2.5 shadow-[0_4px_12px_rgba(239,94,3,0.2)]"
						>
							<Globe size={18} class="text-primary-200" aria-hidden="true" />
						</div>
						<div class="flex-1">
							<h3 class="text-sm font-semibold text-surface-50">Timezone</h3>
							<p class="text-xs text-surface-400">UTC+2 (EET)</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Social Links -->
			<div
				class="rounded-xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-transparent p-6"
			>
				<div class="space-y-4">
					<div class="text-center">
						<h3 class="text-lg font-semibold text-surface-50">Connect with me</h3>
						<p class="mt-1 text-xs text-surface-400">
							Follow my work and connect on social platforms
						</p>
					</div>
					<div class="flex flex-wrap items-center justify-center gap-3">
						{#each socialLinks as social}
							{@const Icon = social.icon}
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								class="group inline-flex items-center gap-2 rounded-full border border-surface-700/60 bg-surface-800/50 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-surface-200 uppercase transition-all hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-primary-200"
								aria-label={`Visit ${social.label} profile (opens in new tab)`}
							>
								<Icon size={14} aria-hidden="true" />
								{social.label}
								<ExternalLink
									size={11}
									class="opacity-0 transition-opacity group-hover:opacity-100"
									aria-hidden="true"
								/>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Footer: Legal & Copyright -->
			<div class="border-t border-surface-700/50 pt-6">
				<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
					<div class="text-center md:text-left">
						<p class="text-xs text-surface-400">
							© {new Date().getFullYear()} Hessam Khoobkar. All rights reserved.
						</p>
					</div>
					<div class="flex items-center gap-4">
						<a
							href="mailto:amirhessam.dev@gmail.com?subject=Privacy Policy Inquiry"
							class="text-xs text-surface-400 transition-colors hover:text-primary-300"
						>
							Privacy
						</a>
						<span class="text-surface-600">·</span>
						<a
							href="mailto:amirhessam.dev@gmail.com?subject=Terms of Service Inquiry"
							class="text-xs text-surface-400 transition-colors hover:text-primary-300"
						>
							Terms
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.hero-gradient {
		--gradient-pos-x: 20%;
		--gradient-pos-y: 80%;
		--gradient-size: 122%;
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
</style>
