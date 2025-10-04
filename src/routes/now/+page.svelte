<script lang="ts">
	import Silk from '$lib/components/layout/hero/Silk.svelte';
	import {
		Calendar,
		Code2,
		BookOpen,
		Target,
		Zap,
		TrendingUp,
		Coffee,
		Users
	} from '@lucide/svelte';

	// Current date
	const lastUpdated = 'October 2025';

	// Current focus areas
	const focusAreas = [
		{
			icon: Code2,
			title: 'Active Projects',
			description:
				'Building modern web applications with Svelte and React. Currently working on several e-commerce platforms and SaaS products.',
			status: 'In Progress'
		},
		{
			icon: BookOpen,
			title: 'Learning & Growth',
			description:
				'Diving deep into advanced animation techniques with GSAP and exploring the latest features in SvelteKit 2.0.',
			status: 'Ongoing'
		},
		{
			icon: Users,
			title: 'Availability',
			description:
				'Open to full-time opportunities and selective freelance projects. Currently evaluating interesting projects and teams.',
			status: 'Available'
		}
	];

	// Currently working with
	const techStack = [
		'Svelte & SvelteKit',
		'React & Next.js',
		'TypeScript',
		'Tailwind CSS',
		'GSAP Animations',
		'Vite',
		'Node.js',
		'PostgreSQL'
	];

	// Recent achievements
	const achievements = [
		{
			month: 'September 2025',
			title: 'Performance Optimization',
			description: 'Achieved perfect Lighthouse scores (100/100) on 3 production applications'
		},
		{
			month: 'August 2025',
			title: 'New Client Project',
			description: 'Started work on a large-scale e-commerce platform redesign'
		},
		{
			month: 'July 2025',
			title: 'Community Contribution',
			description: 'Published 5 technical blog posts reaching 10K+ readers'
		}
	];

	// Current interests
	const interests = [
		{ icon: '🎮', text: 'Game development with web technologies' },
		{ icon: '🎨', text: 'Advanced CSS animations and micro-interactions' },
		{ icon: '⚡', text: 'Web performance optimization techniques' },
		{ icon: '♿', text: 'Accessibility best practices and WCAG compliance' }
	];
</script>

<svelte:head>
	<title>Now - What I'm Working On | Hessam Khoobkar</title>
	<meta
		name="description"
		content="See what I'm currently working on, learning, and focusing on. Updated regularly with my latest projects, tech stack, and professional goals."
	/>
	<meta
		name="keywords"
		content="current projects, web developer status, availability, tech stack, professional focus"
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Now - What I'm Working On" />
	<meta
		property="og:description"
		content="See what I'm currently working on and learning. Updated {lastUpdated}."
	/>
	<meta property="og:url" content="https://khoobkar.com/now" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Now - What I'm Working On" />
	<meta name="twitter:description" content="See what I'm currently working on and learning." />
</svelte:head>

<div class="mt-4">
	<!-- Hero Section with Silk Animation -->
	<header class="relative mb-8 h-80 w-full overflow-hidden rounded-2xl border border-surface-600">
		<Silk speed={5} scale={1} color="#ef5e03" noiseIntensity={1.5} rotation={0} />
		<div class="absolute inset-0 z-2 flex flex-col items-center justify-center px-4">
			<div class="mb-4 flex items-center gap-2 text-primary-400">
				<Calendar size={32} />
			</div>
			<h1 class="mb-4 text-5xl font-bold text-surface-50">Now</h1>
			<p class="w-2xl text-center text-xl">
				What I'm working on, learning, and focusing on right now.
			</p>
			<p class="mt-4 text-sm text-surface-400">Last updated: {lastUpdated}</p>
		</div>
	</header>

	<div class="mx-auto max-w-6xl space-y-8">
		<!-- Introduction -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center md:p-12">
			<p class="mx-auto max-w-3xl text-lg text-surface-200">
				This page is inspired by Derek Sivers'
				<a
					href="https://nownownow.com/about"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary-400 transition-colors hover:text-primary-300 hover:underline"
				>
					Now Page Movement
				</a>. It's a snapshot of what has my attention right now – professionally, technically, and
				creatively. I update this regularly to keep it current.
			</p>
		</div>

		<!-- Current Focus -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 flex items-center gap-3">
				<Target size={32} class="text-primary-400" />
				<h2 class="text-3xl font-bold text-surface-50">Current Focus</h2>
			</div>

			<div class="grid gap-6 md:grid-cols-3">
				{#each focusAreas as area}
					<div class="rounded-xl border border-surface-600 bg-surface-700/50 p-6">
						<div class="mb-4 flex items-center gap-3">
							<div class="rounded-lg bg-primary-500/20 p-2">
								<svelte:component this={area.icon} size={24} class="text-primary-400" />
							</div>
							<div>
								<h3 class="text-lg font-semibold text-surface-50">{area.title}</h3>
								<span
									class="inline-block rounded-full bg-primary-500/20 px-2 py-0.5 text-xs text-primary-300"
								>
									{area.status}
								</span>
							</div>
						</div>
						<p class="text-surface-300">{area.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Current Tech Stack -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 flex items-center gap-3">
				<Zap size={32} class="text-primary-400" />
				<h2 class="text-3xl font-bold text-surface-50">Currently Working With</h2>
			</div>

			<p class="mb-6 text-lg text-surface-300">
				These are the technologies and tools I'm actively using in my current projects:
			</p>

			<div class="flex flex-wrap gap-3">
				{#each techStack as tech}
					<span
						class="rounded-lg border border-primary-500/30 bg-primary-500/10 px-4 py-2 font-medium text-primary-300"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>

		<!-- Recent Achievements -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 flex items-center gap-3">
				<TrendingUp size={32} class="text-primary-400" />
				<h2 class="text-3xl font-bold text-surface-50">Recent Highlights</h2>
			</div>

			<div class="space-y-6">
				{#each achievements as achievement, index}
					<div class="relative pl-8 {index !== achievements.length - 1 ? 'pb-6' : ''}">
						<!-- Timeline line -->
						{#if index !== achievements.length - 1}
							<div
								class="absolute top-6 bottom-0 left-2 w-0.5 bg-gradient-to-b from-primary-500 to-surface-700"
							></div>
						{/if}

						<!-- Timeline dot -->
						<div
							class="absolute top-2 left-0 h-4 w-4 rounded-full border-2 border-primary-500 bg-surface-800"
						></div>

						<div class="rounded-xl border border-surface-600 bg-surface-700/50 p-6">
							<div class="mb-2 text-sm text-surface-400">{achievement.month}</div>
							<h3 class="mb-2 text-lg font-semibold text-surface-50">{achievement.title}</h3>
							<p class="text-surface-300">{achievement.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Current Interests -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 md:p-12">
			<div class="mb-8 flex items-center gap-3">
				<Coffee size={32} class="text-primary-400" />
				<h2 class="text-3xl font-bold text-surface-50">Current Interests</h2>
			</div>

			<p class="mb-6 text-lg text-surface-300">
				Beyond my day-to-day work, these are the areas I'm exploring and learning about:
			</p>

			<div class="grid gap-4 md:grid-cols-2">
				{#each interests as interest}
					<div
						class="flex items-center gap-4 rounded-lg border border-surface-600 bg-surface-700/50 p-4"
					>
						<span class="text-3xl">{interest.icon}</span>
						<span class="text-surface-200">{interest.text}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Side Projects Teaser -->
		<div
			class="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-8 md:p-12"
		>
			<h2 class="mb-4 text-2xl font-bold text-surface-50">Side Projects & Experiments</h2>
			<p class="mb-6 text-lg text-surface-200">
				I'm always tinkering with new ideas and technologies. Currently experimenting with:
			</p>

			<div class="grid gap-4 md:grid-cols-2">
				<div class="rounded-xl border border-surface-600 bg-surface-800/50 p-6">
					<div class="mb-2 text-2xl">🎮</div>
					<h3 class="mb-2 font-semibold text-surface-50">Web-Based Games</h3>
					<p class="text-sm text-surface-300">
						Exploring game development with Canvas and WebGL. Building simple dice games and
						strategy games.
					</p>
				</div>

				<div class="rounded-xl border border-surface-600 bg-surface-800/50 p-6">
					<div class="mb-2 text-2xl">🎨</div>
					<h3 class="mb-2 font-semibold text-surface-50">Animation Library</h3>
					<p class="text-sm text-surface-300">
						Creating a reusable library of smooth animations and transitions for web applications.
					</p>
				</div>
			</div>
		</div>

		<!-- CTA -->
		<div class="rounded-2xl border border-surface-600 bg-surface-800 p-8 text-center">
			<h3 class="mb-4 text-xl font-semibold text-surface-50">Want to Work Together?</h3>
			<p class="mx-auto mb-6 max-w-2xl text-surface-300">
				If any of my current focus areas align with your needs, or if you'd like to discuss
				potential collaboration, I'd love to hear from you.
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="/contact"
					class="rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-500"
				>
					Get in Touch
				</a>
				<a
					href="/about"
					class="rounded-lg border border-surface-600 px-8 py-3 font-medium text-surface-300 transition-colors hover:border-surface-500 hover:text-surface-200"
				>
					Learn More About Me
				</a>
			</div>
		</div>
	</div>
</div>
