<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	// import { initScrollAnimations, cleanupScrollAnimations } from '$lib/utils/scroll-animations';

	// Register the plugins
	gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

	let scrollContainer: HTMLElement;
	let scrollContent: HTMLElement;

	// Props for customization
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

	// Check if device is mobile

	onMount(() => {
		if (scrollContainer && scrollContent) {
			// Initialize ScrollSmoother with mobile-optimized settings
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

			// Add some nice easing for better UX
			gsap.defaults({
				ease: 'power2.out',
				duration: 0.8
			});

			// Initialize scroll animations for enhanced effects
			// if (!isMobile) {
			// 	// Initialize all scroll animations
			// 	initScrollAnimations();

			// 	// Legacy support for animate-on-scroll class
			// 	gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
			// 		gsap.fromTo(
			// 			element,
			// 			{
			// 				opacity: 0,
			// 				y: 50
			// 			},
			// 			{
			// 				opacity: 1,
			// 				y: 0,
			// 				duration: 1,
			// 				ease: 'power2.out',
			// 				scrollTrigger: {
			// 					trigger: element,
			// 					start: 'top 80%',
			// 					end: 'bottom 20%',
			// 					toggleActions: 'play none none reverse'
			// 				}
			// 			}
			// 		);
			// 	});

			// 	// Parallax effect for hero sections
			// 	gsap.utils.toArray('.parallax-element').forEach((element: any) => {
			// 		gsap.to(element, {
			// 			yPercent: -50,
			// 			ease: 'none',
			// 			scrollTrigger: {
			// 				trigger: element,
			// 				start: 'top bottom',
			// 				end: 'bottom top',
			// 				scrub: true
			// 			}
			// 		});
			// 	});
			// }
		}
	});

	onDestroy(() => {
		if (smoother) {
			smoother.kill();
		}
	});

	// Expose smoother instance for external use
	export { smoother };
</script>

<div bind:this={scrollContainer}>
	<main bind:this={scrollContent} class="min-h-screen bg-surface-950 px-4 lg:ps-96 lg:pe-4">
		{@render children?.()}
	</main>
</div>

<style>
</style>
