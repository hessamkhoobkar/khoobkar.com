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

	<!-- Main content with enhanced styling -->
	<div
		class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-white mix-blend-difference"
	>
		<svelte:component this={icon} size={40} class="relative animate-pulse " />

		<!-- Title with enhanced typography and effects -->
		<h1 class="text-center text-5xl font-bold md:text-6xl">
			{title}
		</h1>

		<!-- Subtitle with enhanced styling -->
		<p class="max-w-2xl text-center text-base leading-relaxed">
			{subtitle}
		</p>
	</div>
</header>
