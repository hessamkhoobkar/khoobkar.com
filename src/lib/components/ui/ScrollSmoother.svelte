<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

	let scrollContainer: HTMLElement;
	let scrollContent: HTMLElement;

	let {
		smooth = 1.2,
		effects = true,
		smoothTouch = 0.1,
		normalizeScroll = true,
		ignoreMobileResize = true,
		autoResize = true,
		children,
		...rest
	} = $props();

	let smoother: ScrollSmoother | null = null;
	let isMobile = $state(false);

	function checkMobile() {
		isMobile = window.matchMedia('(max-width: 768px)').matches;
	}

	onMount(() => {
		checkMobile();

		smoother = ScrollSmoother.create({
			wrapper: scrollContainer,
			content: scrollContent,
			smooth: isMobile ? 0.5 : smooth,
			effects: !isMobile && effects,
			smoothTouch: isMobile ? 0.1 : smoothTouch,
			normalizeScroll,
			ignoreMobileResize,
			autoResize,
			...rest
		});

		gsap.defaults({
			ease: 'power2.out',
			duration: 0.8
		});
	});

	onDestroy(() => {
		smoother?.kill();
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	});

	export { smoother };
</script>

<div bind:this={scrollContainer}>
	<main bind:this={scrollContent} class="min-h-screen bg-surface-950 px-4 lg:ps-90">
		{@render children?.()}
	</main>
</div>
