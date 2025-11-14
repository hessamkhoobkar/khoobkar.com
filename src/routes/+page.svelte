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

	const metrics = [
		{ value: '7+', label: 'Years of experience', sublabel: 'Building scalable systems' },
		{ value: '35%', label: 'Avg performance uplift', sublabel: 'Across all projects' },
		{ value: '30%', label: 'Engagement increase', sublabel: 'User metrics improvement' },
		{ value: '8', label: 'Developers mentored', sublabel: 'Into senior roles' },
		{ value: '13', label: 'Teams partnered', sublabel: 'International experience' },
		{ value: '100%', label: 'Remote success rate', sublabel: 'Across time zones' }
	];

	const techStack = [
		{
			label: 'Core Technologies',
			items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'TailwindCSS', 'SCSS/SASS']
		},
		{
			label: 'Frameworks & Libraries',
			items: ['SvelteKit', 'React/Next.js', 'Vue/Nuxt.js', 'Storybook']
		},
		{
			label: 'State & APIs',
			items: ['Zustand', 'Redux', 'Vuex/Pinia', 'GraphQL', 'REST APIs', 'WebSocket']
		},
		{
			label: 'Tools & Infrastructure',
			items: ['Vite', 'Webpack', 'Docker', 'GitHub Actions', 'CI/CD', 'Git']
		},
		{
			label: 'Performance & Quality',
			items: [
				'Core Web Vitals',
				'WCAG 2.2 Accessibility',
				'Performance Optimization',
				'Testing & QA'
			]
		}
	];

	const experiences = [
		{
			company: 'POMECHAIN · Dubai (Remote)',
			role: 'Senior Front-End Developer',
			period: 'July 2024 – Present',
			highlights: [
				'Architected reusable Vue.js/Nuxt.js component library with TypeScript, improving maintainability',
				'Led frontend development achieving 30% increase in user engagement metrics',
				'Introduced TailwindCSS, reducing UI development time by 20%'
			]
		},
		{
			company: 'Coinhaven · Berlin (Remote)',
			role: 'Lead Front-End Developer',
			period: 'December 2021 – January 2024',
			highlights: [
				'Led migration from React to SvelteKit, achieving 35% performance improvement',
				'Built real-time WebSocket data synchronization system',
				'Mentored team of 7 developers, elevating coding standards through code reviews'
			]
		},
		{
			company: 'Piller Iddaa · Istanbul (Remote)',
			role: 'Senior Front-End Developer',
			period: 'November 2019 – December 2021',
			highlights: [
				'Optimized Vue.js interfaces for high-traffic betting platform handling thousands of concurrent users',
				'Achieved 35% reduction in page load times through caching and code-splitting',
				'Improved accessibility and user retention across complex interactive UIs'
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
							Senior Front-End Developer
							<span class="inline-block"> Available for </span>
							<span class="inline-block">Full-Time & Freelance</span>
						</h1>
						<p class="mt-7 max-w-2xl text-base leading-relaxed text-white/80">
							I'm Hessam Khoobkar, a senior front-end developer with 7+ years of experience building
							high-performance web applications. I specialize in React, Svelte, Vue.js, and modern
							JavaScript frameworks, delivering measurable results through performance optimization,
							accessible code, and scalable architecture.
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
	<section
		class="relative border-t border-surface-800/60 bg-surface-950/70"
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
			<div
				class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
				use:reveal={{ childSelector: '[data-value-card]', stagger: 0.08 }}
			>
				{#each valuePropositions as value}
					{@const Icon = value.icon}
					<div
						data-value-card
						class="flex h-full flex-col gap-4 rounded-2xl border border-surface-700 bg-surface-900/70 p-6 transition hover:border-primary-500/40 hover:bg-surface-900/80"
						use:parallax={{ axis: 'x', from: -12, to: 12, scrub: 0.55 }}
					>
						<div class="flex items-center justify-between">
							<div class="rounded-xl bg-primary-500/15 p-3">
								<Icon size={18} class="text-primary-300" aria-hidden="true" />
							</div>
							<ArrowUpRight size={16} class="text-primary-400/70" aria-hidden="true" />
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

	<!-- Metrics Section -->
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
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 58%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-metrics-headline]', stagger: 0.1 }}
			>
				<span
					data-metrics-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Measurable impact
				</span>
				<h2 data-metrics-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Numbers that speak for themselves.
				</h2>
				<p data-metrics-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					Track record of delivering measurable improvements across performance, engagement, and
					team capabilities.
				</p>
			</div>
			<div
				class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
						<p class="mt-3 text-sm font-semibold tracking-[0.3em] text-surface-400 uppercase">
							{metric.label}
						</p>
						<p class="mt-2 text-xs text-surface-500">{metric.sublabel}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Skills Section -->
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
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 60%', scrub: 0.45 }}
		>
			<div class="space-y-4" use:reveal={{ childSelector: '[data-skills-headline]', stagger: 0.1 }}>
				<span
					data-skills-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
					Technical expertise
				</span>
				<h2 data-skills-headline class="text-3xl font-bold text-surface-50 md:text-4xl">
					Modern technologies for high-performance applications.
				</h2>
				<p data-skills-headline class="max-w-3xl text-sm leading-relaxed text-surface-300">
					Expert in modern JavaScript frameworks, TypeScript, and the tools that power scalable,
					maintainable front-end systems. I work with the latest technologies and best practices.
				</p>
			</div>
			<div
				class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
				use:reveal={{ childSelector: '[data-skill-card]', stagger: 0.06 }}
			>
				{#each techStack as group}
					<div
						data-skill-card
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
		</div>
	</section>

	<!-- Experience Section -->
	<section
		class="relative"
		use:scrollAtmosphere={{
			target: getMainSurface,
			from: 'rgba(9, 12, 22, 0.97)',
			to: 'rgba(7, 10, 16, 0.98)',
			scrub: 0.7
		}}
	>
		<div
			class="mx-auto max-w-6xl space-y-12 px-6 py-24"
			use:depthFade={{ start: 'top 88%', end: 'bottom 60%', scrub: 0.45 }}
		>
			<div
				class="space-y-4"
				use:reveal={{ childSelector: '[data-experience-headline]', stagger: 0.1 }}
			>
				<span
					data-experience-headline
					class="inline-flex w-fit items-center gap-2 rounded-full bg-primary-500/15 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary-300 uppercase"
				>
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
				use:reveal={{ childSelector: '[data-experience-card]', stagger: 0.08 }}
			>
				{#each experiences as experience, i}
					<div
						data-experience-card
						class="flex h-full flex-col gap-4 rounded-2xl border border-surface-700 bg-surface-900/70 p-6"
						use:parallax={{
							axis: 'x',
							from: i === 0 ? -14 : i === 1 ? 10 : -8,
							to: i === 0 ? 12 : i === 1 ? -12 : 10,
							scrub: 0.55
						}}
					>
						<div>
							<p class="text-xs tracking-[0.35em] text-primary-200 uppercase">
								{experience.company}
							</p>
							<h3 class="mt-2 text-lg font-semibold text-surface-50">{experience.role}</h3>
							<p class="mt-1 text-sm text-surface-400">{experience.period}</p>
						</div>
						<ul class="space-y-2 text-sm leading-relaxed text-surface-300">
							{#each experience.highlights as highlight}
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-400"></span>
									<span>{highlight}</span>
								</li>
							{/each}
						</ul>
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
						Let's work together
					</span>
					<h2 class="text-3xl font-bold text-surface-50 md:text-4xl">
						Available for full-time and freelance opportunities.
					</h2>
					<p class="text-sm leading-relaxed text-surface-300">
						Open to new remote positions and project-based work. I respond within one business day.
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
						<h3 class="text-2xl font-semibold text-white">Why work with me</h3>
						<ul class="mt-5 space-y-3 text-sm leading-relaxed text-white/85">
							<li class="relative border-b border-white/25 pb-3 pl-5">
								<span class="absolute top-2 left-0 h-2 w-2 rounded-full bg-white/80"></span>
								7+ years building scalable front-end systems with proven results.
							</li>
							<li class="relative border-b border-white/25 pb-3 pl-5">
								<span class="absolute top-2 left-0 h-2 w-2 rounded-full bg-white/80"></span>
								Expert in React, Svelte, Vue.js, TypeScript, and modern tooling.
							</li>
							<li class="relative pl-5">
								<span class="absolute top-2 left-0 h-2 w-2 rounded-full bg-white/80"></span>
								Remote-native with async-first communication across time zones.
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
