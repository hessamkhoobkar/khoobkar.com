<script lang="ts">
	import { fade } from 'svelte/transition';

	export let slideData: { src: string; alt: string }[] = [];
	export let interval: number = 4000;

	let currentSlide = 0;

	setInterval(() => {
		currentSlide = currentSlide === 2 ? 0 : currentSlide + 1;
	}, interval);
</script>

<div class="absolute w-full h-full">
	{#each slideData as { src, alt }, i}
		{#if currentSlide === i}
			<div transition:fade|global class="absolute w-full h-full rounded-2xl overflow-hidden">
				<img class="w-full h-full object-cover" {src} {alt} />
			</div>
		{/if}
	{/each}
</div>
