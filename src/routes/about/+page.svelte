<script lang="ts">
	import SilkHero from '$lib/components/layout/hero/SilkHero.svelte';
	import {
		User,
		Code,
		Briefcase,
		Heart,
		Target,
		Zap,
		MapPin,
		Mail,
		Linkedin,
		Github,
		TrendingUp,
		Users,
		Sparkles,
		Globe,
		Coffee,
		ArrowRight,
		CircleCheck,
		Copy,
		Check
	} from '@lucide/svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	// Achievement stats
	const achievements = [
		{ value: '7+', label: 'Years Experience', icon: Briefcase, color: 'text-primary-400' },
		{ value: '8', label: 'Developers Mentored', icon: Heart, color: 'text-red-400' },
		{ value: '35%', label: 'Avg Performance Gain', icon: TrendingUp, color: 'text-green-400' },
		{ value: '13', label: 'Companies Worked With', icon: Users, color: 'text-blue-400' }
	];

	// Email address (hidden to prevent spam)
	const emailAddress = 'amirhessam.dev@gmail.com';

	// Contact info
	const contactInfo = [
		{
			icon: Mail,
			label: 'Email',
			value: 'Click to copy email',
			isEmail: true
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

	// Copy to clipboard state
	let emailCopied = false;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(emailAddress);
			emailCopied = true;
			setTimeout(() => {
				emailCopied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	}

	// Key skills/technologies
	const keySkills = [
		'TypeScript',
		'React',
		'Svelte',
		'Vue.js',
		'Next.js',
		'SvelteKit',
		'TailwindCSS',
		'Performance',
		'Architecture'
	];

	// Quick facts
	const quickFacts = [
		{ label: 'Timezone', value: 'EET (UTC+2)' },
		{ label: 'Response Time', value: 'Within 24h' },
		{ label: 'Languages', value: 'English, Persian, Turkish' }
	];

	// Values and interests
	const values = [
		{
			icon: Zap,
			title: 'Performance First',
			description:
				"I believe fast, responsive applications are not optional—they're fundamental to great user experiences."
		},
		{
			icon: Heart,
			title: 'Collaboration',
			description:
				'Some of my best work comes from mentoring others and learning from the perspectives of my teammates.'
		},
		{
			icon: Target,
			title: 'User-Centered',
			description:
				'Every technical decision should serve the people using the product, not just the codebase.'
		},
		{
			icon: Code,
			title: 'Clean Code',
			description:
				'I write code that my future self (and teammates) will thank me for—maintainable, readable, and thoughtful.'
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
		content="Learn about Hessam Khoobkar, a senior front-end developer with 6+ years of experience building high-performance web applications."
	/>
	<meta property="og:url" content="https://khoobkar.com/about" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About - Hessam Khoobkar | Senior Front-End Developer" />
	<meta
		name="twitter:description"
		content="Learn about Hessam Khoobkar, a senior front-end developer with 6+ years of experience."
	/>
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<SilkHero
		icon={User}
		title="About Hessam Khoobkar"
		subtitle="Senior Front-End Developer"
		silkColor="#ef5e03"
		silkSpeed={5}
		silkScale={1}
		silkNoiseIntensity={1.5}
		silkRotation={0}
	/>

	<!-- Dashboard Layout -->
	<div class="mx-auto max-w-8xl space-y-6">
		<!-- Stats Grid -->
		<div class="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
			{#each achievements as achievement}
				{@const Icon = achievement.icon}
				<div
					class="group relative overflow-hidden rounded-xl border border-surface-700 bg-surface-800/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/50 hover:bg-surface-800 hover:shadow-lg hover:shadow-primary-500/10"
				>
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<p class="mb-1 text-xs font-medium tracking-wider text-surface-400 uppercase">
								{achievement.label}
							</p>
							<p class="text-3xl font-bold text-surface-50 md:text-4xl">{achievement.value}</p>
						</div>
						<div
							class="rounded-lg bg-surface-700/50 p-3 transition-all group-hover:scale-110 group-hover:bg-primary-500/20"
						>
							<Icon size={24} class={achievement.color} />
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Main Content Grid -->
		<div class="grid gap-6 xl:grid-cols-3">
			<!-- Left Sidebar: Profile Card -->
			<aside class="space-y-6 xl:col-span-1">
				<div
					class="sticky top-6 space-y-6 rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm"
				>
					<!-- Profile Avatar -->
					<div class="flex flex-col items-center text-center">
						<div
							class="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
						>
							<span class="text-5xl font-bold text-white">HK</span>
						</div>
						<h2 class="mb-1 text-2xl font-bold text-surface-50">Hessam Khoobkar</h2>
						<p class="mb-4 text-sm text-primary-400">Senior Front-End Developer</p>

						<!-- Status Badge -->
						<div
							class="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-400"
						>
							<div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
							<span>Available for work</span>
						</div>
					</div>

					<!-- Quick Info -->
					<div class="space-y-3 border-t border-surface-700 pt-6">
						<div class="flex items-center gap-3 text-sm">
							<MapPin size={16} class="flex-shrink-0 text-primary-400" />
							<span class="text-surface-300">Tallinn, Estonia</span>
						</div>
						<div class="flex items-center gap-3 text-sm">
							<Globe size={16} class="flex-shrink-0 text-primary-400" />
							<span class="text-surface-300">Available Globally (Remote)</span>
						</div>
						<div class="flex items-center gap-3 text-sm">
							<Coffee size={16} class="flex-shrink-0 text-primary-400" />
							<span class="text-surface-300">Full-Time & Freelance</span>
						</div>
					</div>

					<!-- Key Skills -->
					<div class="border-t border-surface-700 pt-6">
						<p class="mb-3 text-xs font-semibold tracking-wider text-surface-400 uppercase">
							Key Skills
						</p>
						<div class="flex flex-wrap gap-2">
							{#each keySkills as skill}
								<span
									class="inline-flex items-center gap-1.5 rounded-lg border border-primary-500/30 bg-primary-500/10 px-3 py-1.5 text-xs font-medium text-primary-300 transition-all hover:border-primary-500/50 hover:bg-primary-500/20"
								>
									<CircleCheck size={12} />
									<span>{skill}</span>
								</span>
							{/each}
						</div>
					</div>

					<!-- Contact Links -->
					<div class="border-t border-surface-700 pt-6">
						<p class="mb-3 text-xs font-semibold tracking-wider text-surface-400 uppercase">
							Get in Touch
						</p>
						<div class="space-y-2">
							{#each contactInfo as contact}
								{@const Icon = contact.icon}
								{#if contact.isEmail}
									<button
										on:click={copyEmail}
										type="button"
										class="group flex w-full items-center gap-3 rounded-lg border border-surface-700 bg-surface-700/30 p-3 text-left text-sm transition-all hover:border-primary-500/50 hover:bg-primary-500/10"
									>
										<Icon size={18} class="flex-shrink-0 text-primary-400" />
										<span class="flex-1 truncate text-surface-300 group-hover:text-primary-300">
											{emailCopied ? 'Email copied!' : contact.value}
										</span>
										{#if emailCopied}
											<Check size={14} class="text-green-400" />
										{:else}
											<Copy
												size={14}
												class="text-primary-400 opacity-0 transition-opacity group-hover:opacity-100"
											/>
										{/if}
									</button>
								{:else if contact.link}
									<a
										href={contact.link}
										target={contact.link.startsWith('http') ? '_blank' : '_self'}
										rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
										class="group flex items-center gap-3 rounded-lg border border-surface-700 bg-surface-700/30 p-3 text-sm transition-all hover:border-primary-500/50 hover:bg-primary-500/10"
									>
										<Icon size={18} class="flex-shrink-0 text-primary-400" />
										<span class="flex-1 truncate text-surface-300 group-hover:text-primary-300">
											{contact.value}
										</span>
										<ArrowRight
											size={14}
											class="opacity-0 transition-opacity group-hover:opacity-100"
										/>
									</a>
								{:else}
									<div
										class="flex items-center gap-3 rounded-lg border border-surface-700 bg-surface-700/30 p-3 text-sm"
									>
										<Icon size={18} class="flex-shrink-0 text-primary-400" />
										<span class="text-surface-300">{contact.value}</span>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				</div>

				<!-- Quick Facts Card -->
				<div
					class="sticky top-6 space-y-4 rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm"
				>
					<div class="flex items-center gap-2">
						<div class="rounded-lg bg-primary-500/20 p-1.5">
							<Sparkles size={16} class="text-primary-400" />
						</div>
						<h3 class="text-sm font-semibold tracking-wider text-surface-50 uppercase">
							Quick Facts
						</h3>
					</div>
					<div class="space-y-3">
						{#each quickFacts as fact}
							<div
								class="flex items-start justify-between gap-3 border-b border-surface-700/50 pb-3 last:border-0 last:pb-0"
							>
								<span class="text-xs font-medium tracking-wider text-surface-400 uppercase">
									{fact.label}
								</span>
								<span class="text-right text-sm font-medium text-surface-200">{fact.value}</span>
							</div>
						{/each}
					</div>
				</div>
			</aside>

			<!-- Main Content Area -->
			<div class="space-y-6 xl:col-span-2">
				<!-- About Section -->
				<section
					class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm"
				>
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-primary-500/20 p-2">
							<User size={20} class="text-primary-400" />
						</div>
						<h2 class="text-xl font-bold text-surface-50">About</h2>
					</div>
					<div class="space-y-4 text-base leading-relaxed text-surface-300">
						<p>
							I'm a Senior Frontend Developer with <strong class="text-primary-400">6+ years</strong
							> of experience building high-performance web applications. I've worked with teams across
							Dubai, Berlin, Istanbul, and Tehran, helping them deliver better user experiences.
						</p>
						<p>
							My focus is on modern frontend frameworks and delivering measurable results. I've
							achieved
							<strong class="text-primary-400">30-35% performance improvements</strong> through optimization
							and architectural decisions, and I'm passionate about building scalable systems that teams
							can maintain and extend.
						</p>
						<p>
							Beyond coding, I enjoy mentoring developers and establishing standards that make teams
							more productive. I believe in clean code, thoughtful architecture, and creating
							interfaces that users actually want to use.
						</p>
					</div>
				</section>

				<!-- What I Value Section -->
				<section
					class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm"
				>
					<div class="mb-6 flex items-center gap-3">
						<div class="rounded-lg bg-primary-500/20 p-2">
							<Sparkles size={20} class="text-primary-400" />
						</div>
						<h2 class="text-xl font-bold text-surface-50">What I Value</h2>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						{#each values as value}
							{@const Icon = value.icon}
							<div
								class="group rounded-lg border border-surface-700 bg-surface-700/30 p-5 transition-all hover:border-primary-500/50 hover:bg-surface-700/50"
							>
								<div class="mb-3 flex items-center gap-3">
									<div
										class="rounded-lg bg-primary-500/20 p-2 transition-all group-hover:scale-110"
									>
										<Icon size={18} class="text-primary-400" />
									</div>
									<h3 class="text-base font-semibold text-surface-50">{value.title}</h3>
								</div>
								<p class="text-sm leading-relaxed text-surface-300">{value.description}</p>
							</div>
						{/each}
					</div>
				</section>

				<!-- What I Work With Section -->
				<section
					class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 backdrop-blur-sm"
				>
					<div class="mb-6 flex items-center gap-3">
						<div class="rounded-lg bg-primary-500/20 p-2">
							<Code size={20} class="text-primary-400" />
						</div>
						<h2 class="text-xl font-bold text-surface-50">What I Work With</h2>
					</div>
					<div class="space-y-4 text-base leading-relaxed text-surface-300">
						<p>
							I work primarily with modern JavaScript frameworks like <strong
								class="text-primary-400">React</strong
							>,
							<strong class="text-primary-400">Svelte</strong>, and
							<strong class="text-primary-400">Vue.js</strong>, and I'm always excited to explore
							new tools that can help build better experiences.
							<strong class="text-primary-400">TypeScript</strong> has become an essential part of my
							workflow—I love the confidence it gives me when refactoring and building complex features.
						</p>
						<p>
							On the styling side, I'm comfortable with <strong class="text-primary-400"
								>TailwindCSS</strong
							>, SCSS, and CSS Modules. I'm particularly passionate about building accessible,
							responsive interfaces that work well across all devices and for all users.
						</p>
						<p>
							When it comes to architecture, I focus on building systems that are maintainable and
							scalable. I've worked with various state management solutions (Zustand, Pinia, Redux)
							and enjoy finding the right tool for each project. Performance optimization is always
							on my mind—whether that's code splitting, lazy loading, or optimizing bundle sizes.
						</p>
					</div>
				</section>
			</div>
		</div>

		<!-- Footer -->
		<Footer />
	</div>
</div>
