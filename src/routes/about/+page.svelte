<script lang="ts">
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import {
		User,
		Code2,
		Briefcase,
		GraduationCap,
		Award,
		Heart,
		Target,
		Zap,
		MapPin,
		Mail,
		Linkedin,
		Github,
		TrendingUp,
		Users,
		Rocket,
		CheckCircle2,
		Sparkles,
		Globe,
		Coffee,
		Clock,
		Shield,
		MessageSquare,
		Star
	} from '@lucide/svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	// Skills data organized by category (from resume)
	const skillCategories = [
		{
			title: 'Core Technologies',
			icon: Code2,
			skills: [
				'JavaScript (ES6+)',
				'TypeScript',
				'HTML5',
				'CSS3',
				'GraphQL',
				'REST APIs',
				'WebSocket'
			],
			color: 'primary'
		},
		{
			title: 'Frameworks & Libraries',
			icon: Sparkles,
			skills: ['React.js', 'Next.js', 'Svelte', 'SvelteKit', 'Vue.js', 'Nuxt.js'],
			color: 'primary'
		},
		{
			title: 'Styling & Design',
			icon: Target,
			skills: [
				'TailwindCSS',
				'SCSS/SASS',
				'CSS Modules',
				'Styled Components',
				'Responsive Design',
				'WCAG Accessibility'
			],
			color: 'primary'
		},
		{
			title: 'State & Data',
			icon: Zap,
			skills: ['Zustand', 'Pinia', 'Context API', 'Vuex', 'Redux', 'TanStack Query'],
			color: 'primary'
		},
		{
			title: 'Tools & DevOps',
			icon: Briefcase,
			skills: ['Git', 'Vite', 'Webpack', 'Docker', 'CI/CD', 'Agile/Scrum'],
			color: 'primary'
		},
		{
			title: 'Expertise',
			icon: Award,
			skills: [
				'Performance Optimization',
				'Code Reviews',
				'Team Leadership',
				'TDD',
				'Cross-Browser Compatibility'
			],
			color: 'primary'
		}
	];

	// Real experience from resume
	const experience = [
		{
			title: 'Senior Front-End Developer',
			company: 'POMECHAIN',
			location: 'Dubai, UAE - Remote',
			period: 'July 2024 - Present',
			highlights: [
				'Architected high-performance Vue.js/Nuxt.js component library with TypeScript',
				'Led frontend development achieving 30% increase in user engagement metrics',
				'Championed TailwindCSS adoption, reducing UI development time by 20%'
			]
		},
		{
			title: 'Lead Front-End Developer',
			company: 'Coinhaven',
			location: 'Berlin, Germany - Remote',
			period: 'December 2021 - January 2024',
			highlights: [
				'Spearheaded React to SvelteKit migration, achieving 30% performance improvement',
				'Defined frontend architectural standards for scalability and UX consistency',
				'Built real-time WebSocket data sync for low-latency trading features',
				'Mentored team of 7 developers, elevating coding standards through rigorous reviews'
			]
		},
		{
			title: 'Senior Front-End Developer',
			company: 'Piller Iddaa',
			location: 'Istanbul, Turkey - Remote',
			period: 'November 2019 - December 2021',
			highlights: [
				'Developed complex interactive UIs for high-traffic betting platform (1000s concurrent users)',
				'Achieved 35% reduction in page load times through advanced optimization',
				'Translated UI/UX prototypes into pixel-perfect responsive applications'
			]
		},
		{
			title: 'Front-end Developer & UI Designer',
			company: 'Shabakeh Gostar Kayer',
			location: 'Tehran, Iran',
			period: 'August 2017 - September 2019',
			highlights: [
				'Built modular, maintainable frontend components with HTML, SCSS, and JavaScript',
				'Designed responsive, cross-browser compatible interfaces for enterprise software'
			]
		}
	];

	// Core values
	const values = [
		{
			icon: Target,
			title: 'Precision & Quality',
			description: 'Pixel-perfect implementations, clean code, and meticulous attention to detail'
		},
		{
			icon: TrendingUp,
			title: 'Measurable Results',
			description: 'Data-driven decisions delivering 30-60% performance improvements'
		},
		{
			icon: Users,
			title: 'Team Leadership',
			description: 'Mentoring developers, fostering growth, and building high-performing teams'
		},
		{
			icon: Rocket,
			title: 'Innovation',
			description: 'Staying ahead with cutting-edge technologies and modern best practices'
		}
	];

	// Achievement stats
	const achievements = [
		{ value: '6+', label: 'Years Experience', icon: Briefcase },
		{ value: '50+', label: 'Projects Delivered', icon: Rocket },
		{ value: '30+', label: 'Happy Clients', icon: Users },
		{ value: '7', label: 'Developers Mentored', icon: Heart }
	];

	// Contact info
	const contactInfo = [
		{ icon: MapPin, label: 'Based in', value: 'Tallinn, Estonia' },
		{
			icon: Mail,
			label: 'Email',
			value: 'amirhessam.dev@gmail.com',
			link: 'mailto:amirhessam.dev@gmail.com'
		},
		{
			icon: Linkedin,
			label: 'LinkedIn',
			value: 'linkedin.com/in/hessam-khoobkar',
			link: 'https://linkedin.com/in/hessam-khoobkar'
		},
		{
			icon: Github,
			label: 'GitHub',
			value: 'github.com/hessamkhoobkar',
			link: 'https://github.com/hessamkhoobkar'
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
	<title>About - Hessam Khoobkar | Senior Front-End Developer</title>
	<meta
		name="description"
		content="Senior Front-End Developer with 6+ years building high-performance web applications. Expert in React, Svelte, Vue, TypeScript. Based in Tallinn, Estonia. Available for full-time and freelance work."
	/>
	<meta
		name="keywords"
		content="front-end developer, senior developer, React, Svelte, JavaScript, web development, responsive design"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="About - Hessam Khoobkar | Senior Front-End Developer" />
	<meta
		property="og:description"
		content="Learn about Hessam Khoobkar, a senior front-end developer with 10+ years of experience crafting pixel-perfect web applications."
	/>
	<meta property="og:url" content="https://khoobkar.com/about" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About - Hessam Khoobkar | Senior Front-End Developer" />
	<meta
		name="twitter:description"
		content="Learn about Hessam Khoobkar, a senior front-end developer with 10+ years of experience."
	/>
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<SilkHero
		icon={User}
		title="About Hessam Khoobkar"
		subtitle="Senior Front-End Developer | Building Excellence Through Code"
		silkColor="#ef5e03"
		silkSpeed={5}
		silkScale={1}
		silkNoiseIntensity={1.5}
		silkRotation={0}
	/>

	<div class="mx-auto max-w-8xl py-8">
		<!-- Quick Stats Bar -->
		<section
			class="grid gap-4 rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-transparent p-6 md:grid-cols-4 md:p-8"
		>
			{#each achievements as achievement}
				{@const Icon = achievement.icon}
				<div class="group text-center transition-transform hover:scale-110">
					<div class="mb-3 flex justify-center">
						<div
							class="rounded-xl bg-primary-500/20 p-3 transition-all group-hover:bg-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-500/30"
						>
							<Icon size={28} class="text-primary-400" />
						</div>
					</div>
					<div
						class="mb-1 text-3xl font-bold text-surface-50 transition-all group-hover:text-primary-300 md:text-4xl"
					>
						{achievement.value}
					</div>
					<div class="text-sm text-surface-300">{achievement.label}</div>
				</div>
			{/each}
		</section>

		<!-- Introduction Card with Contact Info -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="grid gap-8 md:grid-cols-3">
				<!-- Profile Avatar -->
				<div class="md:col-span-1">
					<div
						class="group mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-2xl shadow-primary-500/30 transition-all hover:scale-105 hover:shadow-primary-500/50"
					>
						<span class="text-7xl font-bold text-white">HK</span>
					</div>
					<!-- Contact Quick Links -->
					<div class="mt-6 space-y-3">
						{#each contactInfo as contact}
							{@const Icon = contact.icon}
							<div class="flex items-center gap-3 text-sm">
								<Icon size={18} class="flex-shrink-0 text-primary-400" />
								{#if contact.link}
									<a
										href={contact.link}
										target={contact.link.startsWith('http') ? '_blank' : '_self'}
										rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
										class="truncate text-surface-300 transition-colors hover:text-primary-400"
									>
										{contact.value}
									</a>
								{:else}
									<span class="text-surface-300">{contact.value}</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Bio Content -->
				<div class="md:col-span-2">
					<div class="mb-6">
						<h2 class="mb-2 text-4xl font-bold text-surface-50">Hessam Khoobkar</h2>
						<h3 class="mb-4 text-xl text-primary-400">Senior Front-End Developer</h3>
						<div class="flex flex-wrap items-center gap-4 text-sm text-surface-400">
							<div class="flex items-center gap-2">
								<MapPin size={16} class="text-primary-400" />
								<span>Tallinn, Estonia</span>
							</div>
							<div class="flex items-center gap-2">
								<Globe size={16} class="text-primary-400" />
								<span>Available Globally (Remote)</span>
							</div>
							<div class="flex items-center gap-2">
								<Coffee size={16} class="text-primary-400" />
								<span>Open to Full-Time & Freelance</span>
							</div>
						</div>
					</div>

					<div class="space-y-4 text-lg leading-relaxed text-surface-200">
						<p>
							Results-driven Senior Frontend Developer with <strong class="text-primary-400"
								>6+ years</strong
							>
							of experience designing, building, and optimizing
							<strong class="text-surface-50">high-performance</strong>, user-focused web
							applications for global companies across Dubai, Berlin, Istanbul, and Tehran.
						</p>
						<p>
							I don't just write code—I solve business problems. My work has delivered
							<strong class="text-primary-400">30-60% performance improvements</strong>,
							<strong class="text-primary-400">35% faster load times</strong>, and
							<strong class="text-primary-400">20% reduced development cycles</strong>
							for companies ranging from startups to enterprises.
						</p>
						<p>
							As a <strong class="text-surface-50">technical leader</strong>, I've mentored teams,
							established best practices, and built scalable architectures that support rapid
							growth. I believe in writing clean, maintainable code and creating seamless user
							interfaces that users love.
						</p>
					</div>

					<!-- Key Strengths Badges -->
					<div class="mt-6 flex flex-wrap gap-3">
						<div
							class="inline-flex items-center gap-2 rounded-lg border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300"
						>
							<CheckCircle2 size={16} />
							<span>Performance Expert</span>
						</div>
						<div
							class="inline-flex items-center gap-2 rounded-lg border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300"
						>
							<CheckCircle2 size={16} />
							<span>Team Leader</span>
						</div>
						<div
							class="inline-flex items-center gap-2 rounded-lg border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300"
						>
							<CheckCircle2 size={16} />
							<span>Agile/Scrum</span>
						</div>
						<div
							class="inline-flex items-center gap-2 rounded-lg border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300"
						>
							<CheckCircle2 size={16} />
							<span>WCAG Accessibility</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills Section -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 text-center">
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<Code2 size={40} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-3 text-3xl font-bold text-surface-50 md:text-4xl">Technical Arsenal</h2>
				<p class="text-lg text-surface-300">
					Modern stack, proven in production, optimized for performance
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each skillCategories as category}
					{@const Icon = category.icon}
					<div
						class="group hover:bg-surface-750 rounded-2xl border border-surface-600 bg-surface-700/50 p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
					>
						<div class="mb-4 flex items-center gap-3">
							<div
								class="rounded-lg bg-primary-500/20 p-2 transition-all group-hover:scale-110 group-hover:bg-primary-500/30"
							>
								<Icon size={24} class="text-primary-400" />
							</div>
							<h3 class="text-xl font-semibold text-surface-50">{category.title}</h3>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each category.skills as skill}
								<span
									class="rounded-lg border border-primary-500/20 bg-primary-500/5 px-3 py-1.5 text-sm text-surface-300 transition-all hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-primary-300"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Experience Timeline -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-12 text-center">
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<Briefcase size={40} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-3 text-3xl font-bold text-surface-50 md:text-4xl">Professional Journey</h2>
				<p class="text-lg text-surface-300">
					6+ years of delivering impactful solutions for global companies
				</p>
			</div>

			<div class="relative space-y-8">
				<!-- Timeline line for desktop -->
				<div
					class="absolute top-8 left-8 hidden h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-primary-500 via-primary-500/50 to-transparent md:block"
				></div>

				{#each experience as exp, index}
					<div class="group relative flex gap-6 md:gap-8">
						<!-- Timeline dot -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:scale-110"
							>
								<Briefcase size={28} class="text-white" />
							</div>
						</div>

						<!-- Content Card -->
						<div
							class="flex-1 rounded-2xl border border-surface-600 bg-surface-700/50 p-6 transition-all duration-300 group-hover:border-primary-500/50 group-hover:bg-surface-700 group-hover:shadow-lg group-hover:shadow-primary-500/10 md:p-8"
						>
							<div class="mb-4 flex flex-wrap items-start justify-between gap-4">
								<div class="flex-1">
									<h3 class="mb-1 text-2xl font-bold text-surface-50">{exp.title}</h3>
									<p class="mb-2 text-lg text-primary-400">{exp.company}</p>
									<div class="flex flex-wrap items-center gap-3 text-sm text-surface-400">
										<div class="flex items-center gap-1">
											<MapPin size={14} />
											<span>{exp.location}</span>
										</div>
										<span>•</span>
										<div class="flex items-center gap-1">
											<Briefcase size={14} />
											<span>{exp.period}</span>
										</div>
									</div>
								</div>
								{#if index === 0}
									<span
										class="inline-flex items-center gap-1 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-300"
									>
										<Sparkles size={14} />
										<span>Current</span>
									</span>
								{/if}
							</div>

							<ul class="space-y-2">
								{#each exp.highlights as highlight}
									<li class="flex items-start gap-3 text-surface-200">
										<CheckCircle2 size={18} class="mt-0.5 flex-shrink-0 text-primary-400" />
										<span>{highlight}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Core Values -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-12 text-center">
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<Heart size={40} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-3 text-3xl font-bold text-surface-50 md:text-4xl">My Approach & Values</h2>
				<p class="text-lg text-surface-300">What drives me to deliver exceptional results</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each values as value}
					{@const Icon = value.icon}
					<div
						class="group hover:bg-surface-750 rounded-2xl border border-surface-600 bg-surface-700/50 p-6 text-center transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
					>
						<div class="mb-4 flex justify-center">
							<div
								class="rounded-xl bg-primary-500/20 p-4 transition-all group-hover:scale-110 group-hover:bg-primary-500/30"
							>
								<Icon size={32} class="text-primary-400" />
							</div>
						</div>
						<h3 class="mb-3 text-lg font-bold text-surface-50">{value.title}</h3>
						<p class="text-sm leading-relaxed text-surface-300">{value.description}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Education -->
		<section class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 text-center">
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-primary-500/20 p-4">
						<GraduationCap size={40} class="text-primary-400" />
					</div>
				</div>
				<h2 class="mb-3 text-3xl font-bold text-surface-50 md:text-4xl">Education</h2>
				<p class="text-lg text-surface-300">Academic foundation in software engineering</p>
			</div>

			<div
				class="group mx-auto max-w-3xl rounded-2xl border border-surface-600 bg-surface-700/50 p-8 transition-all duration-300 hover:border-primary-500/50 hover:bg-surface-700 hover:shadow-lg hover:shadow-primary-500/10"
			>
				<div class="mb-4 flex items-start gap-4">
					<div
						class="rounded-lg bg-primary-500/20 p-3 transition-all group-hover:scale-110 group-hover:bg-primary-500/30"
					>
						<GraduationCap size={32} class="text-primary-400" />
					</div>
					<div class="flex-1">
						<h3 class="mb-2 text-2xl font-bold text-surface-50">
							Bachelor of Science in Software Engineering
						</h3>
						<p class="mb-2 text-lg text-primary-400">Payame Noor University</p>
						<div class="flex items-center gap-3 text-sm text-surface-400">
							<MapPin size={14} />
							<span>Tehran, Iran</span>
						</div>
					</div>
				</div>
				<p class="text-surface-300">
					Comprehensive foundation in software development principles, algorithms, data structures,
					and system design. Specialized coursework in web technologies and user interface design.
				</p>
			</div>
		</section>

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

		<!-- CTA Section -->
		<Footer />
	</div>
</div>
