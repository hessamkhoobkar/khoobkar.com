<script lang="ts">
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import {
		Code2,
		Palette,
		Zap,
		MessageSquare,
		CheckCircle2,
		ArrowRight,
		Users,
		Clock,
		Shield,
		Star,
		Settings,
		Layout,
		Smartphone,
		Globe,
		TrendingUp
	} from '@lucide/svelte';

	// Service offerings
	const services = [
		{
			icon: Code2,
			title: 'Custom Web Development',
			description:
				'Build modern, responsive websites and web applications tailored to your business needs. Using cutting-edge technologies like React, Svelte, and Next.js.',
			features: [
				'Responsive design for all devices',
				'Clean, maintainable code',
				'Cross-browser compatibility',
				'SEO optimization',
				'Performance optimization'
			],
			pricing: 'Starting at $5,000',
			duration: '4-8 weeks'
		},
		{
			icon: Palette,
			title: 'UI/UX Consultation',
			description:
				'Transform your design vision into reality with expert front-end implementation. Pixel-perfect conversions from Figma, Sketch, or Adobe XD to production code.',
			features: [
				'Design system implementation',
				'Component library development',
				'Animation and micro-interactions',
				'Accessibility compliance',
				'Design-to-code workflow'
			],
			pricing: 'Starting at $3,000',
			duration: '2-4 weeks'
		},
		{
			icon: Zap,
			title: 'Performance Optimization',
			description:
				'Speed up your existing website with performance audits and optimizations. Improve Core Web Vitals, reduce load times, and enhance user experience.',
			features: [
				'Performance auditing',
				'Code optimization',
				'Image and asset optimization',
				'Lazy loading implementation',
				'Caching strategies'
			],
			pricing: 'Starting at $2,500',
			duration: '1-2 weeks'
		},
		{
			icon: Settings,
			title: 'Frontend Architecture',
			description:
				'Design scalable, maintainable frontend architectures for your growing application. Set up best practices, tooling, and development workflows.',
			features: [
				'Project structure setup',
				'Build tool configuration',
				'Component architecture',
				'State management setup',
				'Testing framework integration'
			],
			pricing: 'Starting at $4,000',
			duration: '2-3 weeks'
		},
		{
			icon: Layout,
			title: 'E-commerce Solutions',
			description:
				'Create engaging online shopping experiences with custom e-commerce frontend development. Integration with popular platforms like Shopify, WooCommerce, or headless CMS.',
			features: [
				'Product catalog interfaces',
				'Shopping cart functionality',
				'Checkout flow optimization',
				'Payment gateway integration',
				'Mobile-first design'
			],
			pricing: 'Starting at $7,000',
			duration: '6-10 weeks'
		},
		{
			icon: Smartphone,
			title: 'Progressive Web Apps',
			description:
				'Build app-like experiences that work seamlessly across all devices. Offline functionality, push notifications, and native-like performance.',
			features: [
				'Service worker implementation',
				'Offline functionality',
				'Push notifications',
				'App manifest configuration',
				'Install prompts'
			],
			pricing: 'Starting at $6,000',
			duration: '5-8 weeks'
		}
	];

	// Process steps
	const process = [
		{
			step: '01',
			title: 'Discovery & Planning',
			description:
				'We start with understanding your business goals, target audience, and project requirements. This phase includes requirement gathering, technical assessment, and project scoping.'
		},
		{
			step: '02',
			title: 'Design & Prototyping',
			description:
				'Create wireframes and interactive prototypes to visualize the user experience. Review and refine the design direction before moving to development.'
		},
		{
			step: '03',
			title: 'Development',
			description:
				'Build your project using modern best practices and technologies. Regular check-ins and demos ensure we stay aligned with your vision.'
		},
		{
			step: '04',
			title: 'Testing & Refinement',
			description:
				'Comprehensive testing across devices and browsers. Performance optimization, accessibility checks, and quality assurance.'
		},
		{
			step: '05',
			title: 'Launch & Support',
			description:
				'Deploy your project to production with confidence. Post-launch support and monitoring ensure everything runs smoothly.'
		}
	];

	// Testimonials
	const testimonials = [
		{
			name: 'Sarah Johnson',
			role: 'CEO, TechStart Inc.',
			company: 'E-commerce Platform',
			content:
				'Working with Hessam was a game-changer for our business. He transformed our outdated website into a modern, fast-loading e-commerce platform. Sales increased by 45% in the first quarter!',
			rating: 5
		},
		{
			name: 'Michael Chen',
			role: 'Founder',
			company: 'HealthTrack App',
			content:
				'The attention to detail and code quality exceeded our expectations. Hessam delivered a pixel-perfect implementation of our designs and the app performs beautifully across all devices.',
			rating: 5
		},
		{
			name: 'Emily Rodriguez',
			role: 'Marketing Director',
			company: 'Creative Agency',
			content:
				'Reliable, communicative, and skilled. Hessam completed our project ahead of schedule and was always available to answer questions. Highly recommended for any web development needs.',
			rating: 5
		}
	];

	// Why choose us
	const benefits = [
		{
			icon: Clock,
			title: 'Timely Delivery',
			description:
				'Projects delivered on time, every time. Transparent timelines and regular updates.'
		},
		{
			icon: Shield,
			title: 'Quality Assured',
			description:
				'Clean, tested code following industry best practices. Comprehensive quality assurance process.'
		},
		{
			icon: MessageSquare,
			title: 'Clear Communication',
			description: 'Regular updates and transparent communication throughout the project lifecycle.'
		},
		{
			icon: Users,
			title: 'Client-Focused',
			description: 'Your success is our priority. Dedicated support and collaborative approach.'
		}
	];
</script>

<svelte:head>
	<title>Services - Freelance Web Development | Khoobkar</title>
	<meta
		name="description"
		content="Expert freelance front-end development services. Custom web development, UI/UX implementation, performance optimization, and more. Transparent pricing and proven results."
	/>
	<meta
		name="keywords"
		content="freelance web development, front-end services, custom website development, UI implementation, performance optimization, React developer, Svelte developer"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Services - Freelance Web Development | Khoobkar" />
	<meta
		property="og:description"
		content="Expert freelance front-end development services with transparent pricing and proven results."
	/>
	<meta property="og:url" content="https://khoobkar.com/services" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Services - Freelance Web Development | Khoobkar" />
	<meta
		name="twitter:description"
		content="Expert freelance front-end development services with transparent pricing and proven results."
	/>
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<header class="relative mb-8 h-80 w-full overflow-hidden rounded-2xl border border-surface-600">
		<Silk speed={5} scale={1} color="#ef5e03" noiseIntensity={1.5} rotation={0} />
		<div class="absolute inset-0 z-2 flex flex-col items-center justify-center px-4">
			<h1 class="mb-4 text-5xl font-bold text-surface-50">Services</h1>
			<p class="w-2xl text-center text-xl">Freelance Web Development Services for Your Business</p>
		</div>
	</header>

	<div class="mx-auto max-w-6xl space-y-8">
		<!-- Introduction Card -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center md:p-12">
			<h2 class="mb-4 text-3xl font-bold text-surface-50">
				Custom Web Solutions for Modern Businesses
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-surface-200">
				As an experienced freelance front-end developer, I help businesses build exceptional web
				experiences. From custom web applications to performance optimization, I deliver quality
				results with transparent pricing and clear communication.
			</p>
		</div>

		<!-- Services Grid -->
		<div class="space-y-6">
			<div class="mb-8">
				<h2 class="mb-4 text-3xl font-bold text-surface-50">What I Offer</h2>
				<p class="text-lg text-surface-300">
					Comprehensive front-end development services tailored to your needs
				</p>
			</div>

			{#each services as service}
				<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-10">
					<div class="grid gap-8 lg:grid-cols-3">
						<!-- Service Header -->
						<div class="lg:col-span-2">
							<div class="mb-4 flex items-start gap-4">
								<div class="rounded-lg bg-primary-500/20 p-3">
									<svelte:component this={service.icon} size={32} class="text-primary-400" />
								</div>
								<div>
									<h3 class="mb-2 text-2xl font-bold text-surface-50">{service.title}</h3>
									<p class="text-lg text-surface-200">{service.description}</p>
								</div>
							</div>

							<!-- Features List -->
							<div class="ml-16 space-y-2">
								{#each service.features as feature}
									<div class="flex items-start gap-2">
										<CheckCircle2 size={20} class="mt-0.5 flex-shrink-0 text-primary-400" />
										<span class="text-surface-300">{feature}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Pricing & Duration -->
						<div class="lg:col-span-1">
							<div class="rounded-xl border border-primary-500/30 bg-primary-500/5 p-6 text-center">
								<div class="mb-4">
									<div class="mb-1 text-sm font-medium text-surface-400 uppercase">
										Starting Price
									</div>
									<div class="text-3xl font-bold text-primary-400">{service.pricing}</div>
								</div>
								<div class="mb-6 border-t border-surface-600 pt-4">
									<div class="mb-1 text-sm font-medium text-surface-400 uppercase">
										Typical Duration
									</div>
									<div class="text-lg font-semibold text-surface-200">{service.duration}</div>
								</div>
								<a
									href="/contact"
									class="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-500"
								>
									Get Started
									<ArrowRight size={18} class="transition-transform group-hover:translate-x-1" />
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Process Section -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 text-center">
				<h2 class="mb-4 text-3xl font-bold text-surface-50">How We Work Together</h2>
				<p class="text-lg text-surface-300">
					A transparent, collaborative process from start to finish
				</p>
			</div>

			<div class="space-y-6">
				{#each process as item, index}
					<div class="relative">
						<div class="grid gap-6 md:grid-cols-12">
							<!-- Step Number -->
							<div class="md:col-span-2">
								<div
									class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-2xl font-bold text-white"
								>
									{item.step}
								</div>
							</div>

							<!-- Step Content -->
							<div class="md:col-span-10">
								<div class="rounded-xl border border-surface-600 bg-surface-700/50 p-6">
									<h3 class="mb-2 text-xl font-bold text-surface-50">{item.title}</h3>
									<p class="text-surface-200">{item.description}</p>
								</div>
							</div>
						</div>

						<!-- Connecting Line -->
						{#if index < process.length - 1}
							<div
								class="absolute top-20 left-10 h-6 w-0.5 bg-gradient-to-b from-primary-500 to-surface-700 md:h-full"
							></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Benefits Section -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 text-center">
				<h2 class="mb-4 text-3xl font-bold text-surface-50">Why Work With Me?</h2>
				<p class="text-lg text-surface-300">Reliable, professional service you can count on</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each benefits as benefit}
					<div class="rounded-xl border border-surface-600 bg-surface-700/50 p-6 text-center">
						<div class="mb-4 flex justify-center">
							<div class="rounded-full bg-primary-500/20 p-4">
								<svelte:component this={benefit.icon} size={32} class="text-primary-400" />
							</div>
						</div>
						<h3 class="mb-2 text-lg font-semibold text-surface-50">{benefit.title}</h3>
						<p class="text-sm text-surface-300">{benefit.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Testimonials Section -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 text-center">
				<h2 class="mb-4 text-3xl font-bold text-surface-50">What Clients Say</h2>
				<p class="text-lg text-surface-300">Real feedback from satisfied clients</p>
			</div>

			<div class="grid gap-6 md:grid-cols-3">
				{#each testimonials as testimonial}
					<div class="rounded-xl border border-surface-600 bg-surface-700/50 p-6">
						<!-- Rating -->
						<div class="mb-4 flex gap-1">
							{#each Array(testimonial.rating) as _}
								<Star size={20} class="fill-primary-400 text-primary-400" />
							{/each}
						</div>

						<!-- Testimonial Content -->
						<p class="mb-6 text-surface-200">{testimonial.content}</p>

						<!-- Author -->
						<div class="border-t border-surface-600 pt-4">
							<div class="font-semibold text-surface-50">{testimonial.name}</div>
							<div class="text-sm text-surface-400">{testimonial.role}</div>
							<div class="text-sm text-primary-400">{testimonial.company}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Pricing Note -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8">
			<div class="flex items-start gap-4">
				<div class="rounded-lg bg-primary-500/20 p-3">
					<TrendingUp size={24} class="text-primary-400" />
				</div>
				<div>
					<h3 class="mb-2 text-xl font-semibold text-surface-50">Custom Pricing</h3>
					<p class="mb-4 text-surface-200">
						Every project is unique. The pricing shown represents starting points for typical
						projects in each category. After our initial consultation, I'll provide a detailed
						proposal with exact pricing based on your specific requirements, timeline, and scope.
					</p>
					<div class="flex flex-wrap gap-4 text-sm text-surface-300">
						<div class="flex items-center gap-2">
							<CheckCircle2 size={16} class="text-primary-400" />
							<span>No hidden fees</span>
						</div>
						<div class="flex items-center gap-2">
							<CheckCircle2 size={16} class="text-primary-400" />
							<span>Flexible payment plans</span>
						</div>
						<div class="flex items-center gap-2">
							<CheckCircle2 size={16} class="text-primary-400" />
							<span>Money-back guarantee</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- CTA Section -->
		<div
			class="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-8 text-center md:p-12"
		>
			<h2 class="mb-4 text-3xl font-bold text-surface-50">Ready to Start Your Project?</h2>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-surface-200">
				Let's discuss your project requirements and how I can help bring your vision to life.
				Schedule a free consultation to get started.
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="/contact"
					class="rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-500"
				>
					Schedule Consultation
				</a>
				<a
					href="/work"
					class="rounded-lg border border-surface-600 px-8 py-3 font-medium text-surface-300 transition-colors hover:border-surface-500 hover:text-surface-200"
				>
					View Portfolio
				</a>
			</div>
		</div>

		<!-- FAQ Quick Links -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8">
			<h3 class="mb-4 text-xl font-semibold text-surface-50">Frequently Asked Questions</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-medium text-surface-200">Do you offer ongoing support?</h4>
					<p class="text-sm text-surface-400">
						Yes, I offer post-launch support packages to ensure your project runs smoothly.
					</p>
				</div>
				<div>
					<h4 class="mb-2 font-medium text-surface-200">What's your availability?</h4>
					<p class="text-sm text-surface-400">
						I typically have availability for new projects. Contact me to discuss current openings.
					</p>
				</div>
				<div>
					<h4 class="mb-2 font-medium text-surface-200">Do you work with agencies?</h4>
					<p class="text-sm text-surface-400">
						Absolutely! I partner with design agencies and development teams on various projects.
					</p>
				</div>
				<div>
					<h4 class="mb-2 font-medium text-surface-200">What technologies do you use?</h4>
					<p class="text-sm text-surface-400">
						React, Svelte, Next.js, TypeScript, Tailwind CSS, and modern web standards.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
