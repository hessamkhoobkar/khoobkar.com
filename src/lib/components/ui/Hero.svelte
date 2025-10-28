<script lang="ts">
	import Silk from '$lib/components/layout/hero/Silk.svelte';

	export let icon: any;
	export let title: string;
	export let subtitle: string;
	export let silkColor: string = '#ef5e03';
	export let silkSpeed: number = 5;
	export let silkScale: number = 1;
	export let silkNoiseIntensity: number = 1.5;
	export let silkRotation: number = 0;
</script>

<header class="relative mb-8 h-96 w-full overflow-hidden rounded-2xl border border-surface-600">
	<Silk
		speed={silkSpeed}
		scale={silkScale}
		color={silkColor}
		noiseIntensity={silkNoiseIntensity}
		rotation={silkRotation}
	/>

	<!-- Enhanced overlay with gradient and blur effects -->
	<div class="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
	<div class="absolute inset-0 backdrop-blur-[0.5px]"></div>

	<!-- Main content with enhanced styling -->
	<div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
		<!-- Icon with enhanced glow effect -->
		<div class="mb-6 flex items-center gap-2 text-white">
			<div class="relative">
				<!-- Glow effect behind icon -->
				<div class="absolute inset-0 scale-150 rounded-full bg-primary-400/30 blur-lg"></div>
				<svelte:component this={icon} size={40} class="relative animate-pulse drop-shadow-2xl" />
			</div>
		</div>

		<!-- Title with enhanced typography and effects -->
		<h1 class="mb-6 text-center text-5xl font-bold text-surface-50 md:text-6xl">
			<span
				class="bg-gradient-to-r from-white via-surface-100 to-white bg-clip-text text-transparent drop-shadow-lg"
			>
				{@html title.replace(/(\w+)/g, (match, word, index, string) => {
					// Add accent color to the last word or specific keywords
					if (
						word.toLowerCase() === 'stories' ||
						word.toLowerCase() === 'action' ||
						word.toLowerCase() === 'process' ||
						word.toLowerCase() === 'insights' ||
						word.toLowerCase() === 'khoobkar' ||
						word.toLowerCase() === 'touch'
					) {
						return `<span class="text-primary-400">${word}</span>`;
					}
					return word;
				})}
			</span>
		</h1>

		<!-- Subtitle with enhanced styling -->
		<p class="max-w-2xl text-center text-xl leading-relaxed text-surface-100 md:text-2xl">
			<span class="drop-shadow-md">
				{subtitle}
			</span>
		</p>

		<!-- Subtle animated elements -->
		<div class="absolute top-8 left-8 h-2 w-2 animate-ping rounded-full bg-primary-400/60"></div>
		<div
			class="absolute right-8 bottom-8 h-1 w-1 animate-pulse rounded-full bg-primary-300/40"
		></div>
		<div
			class="absolute top-1/2 right-12 h-1.5 w-1.5 animate-bounce rounded-full bg-primary-500/50"
		></div>
	</div>

	<!-- Enhanced border glow effect -->
	<div
		class="absolute inset-0 rounded-2xl border border-primary-500/20 shadow-2xl shadow-primary-500/10"
	></div>
</header>
