<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		class?: string;
		title?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let { href = '#', class: className = '', title = '', onclick, children }: Props = $props();

	let buttonElement: HTMLElement;
	let mouseX = $state(0);
	let mouseY = $state(0);
	let isHovering = $state(false);
	let isPressed = $state(false);
	let ripples = $state<Array<{ id: number; x: number; y: number }>>([]);
	let gradientAngle = $state(135);
	let pulseIntensity = $state(0);
	let borderGlow = $state(0);

	// Mouse move handler for gradient follow effect
	function handleMouseMove(e: MouseEvent) {
		if (!buttonElement) return;

		const rect = buttonElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Normalize coordinates to -1 to 1
		mouseX = (x / rect.width) * 2 - 1;
		mouseY = (y / rect.height) * 2 - 1;

		// Calculate gradient angle based on mouse position
		const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
		gradientAngle = angle + 90; // Offset to make it natural
	}

	function handleMouseEnter() {
		isHovering = true;
		animateBorderGlow();
	}

	function handleMouseLeave() {
		isHovering = false;
		mouseX = 0;
		mouseY = 0;
		gradientAngle = 135;
		borderGlow = 0;
	}

	function handleMouseDown() {
		isPressed = true;
	}

	function handleMouseUp(e: MouseEvent) {
		isPressed = false;

		// Create ripple effect
		if (buttonElement) {
			const rect = buttonElement.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const rippleId = Date.now();
			ripples = [...ripples, { id: rippleId, x, y }];

			// Remove ripple after animation
			setTimeout(() => {
				ripples = ripples.filter((r) => r.id !== rippleId);
			}, 800);
		}
	}

	function animateBorderGlow() {
		if (!isHovering) return;

		borderGlow = 1;
		pulseIntensity = 1;

		setTimeout(() => {
			if (isHovering) {
				pulseIntensity = 0.5;
				animateBorderGlow();
			}
		}, 1500);
	}

	// Continuous subtle animation when not interacting
	onMount(() => {
		let frame = 0;
		const animate = () => {
			if (!isHovering) {
				frame += 0.01;
				pulseIntensity = Math.sin(frame) * 0.15 + 0.85;
			}
			requestAnimationFrame(animate);
		};
		animate();
	});

	// Calculate dynamic gradient based on mouse position
	$effect(() => {
		if (buttonElement && isHovering) {
			// Create radial gradient that follows mouse
			const centerX = 50 + mouseX * 30;
			const centerY = 50 + mouseY * 30;
			buttonElement.style.setProperty('--mouse-x', `${centerX}%`);
			buttonElement.style.setProperty('--mouse-y', `${centerY}%`);
			buttonElement.style.setProperty('--gradient-angle', `${gradientAngle}deg`);
			buttonElement.style.setProperty('--pulse-intensity', `${pulseIntensity}`);
			buttonElement.style.setProperty('--border-glow', `${borderGlow}`);
		}
	});
</script>

<a
	bind:this={buttonElement}
	{href}
	{title}
	{onclick}
	class="gradient-button {className}"
	class:hovering={isHovering}
	class:pressed={isPressed}
	onmousemove={handleMouseMove}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	role="button"
	tabindex="0"
>
	<!-- Animated background layers -->
	<div class="gradient-button__bg-layer gradient-button__bg-layer--base"></div>
	<div class="gradient-button__bg-layer gradient-button__bg-layer--radial"></div>
	<div class="gradient-button__bg-layer gradient-button__bg-layer--shine"></div>

	<!-- Border glow effect -->
	<div class="gradient-button__border-glow"></div>

	<!-- Particle effects -->
	<div class="gradient-button__particles">
		{#each Array(12) as _, i}
			<div class="gradient-button__particle" style="--particle-index: {i};"></div>
		{/each}
	</div>

	<!-- Ripple effects -->
	<div class="gradient-button__ripples">
		{#each ripples as ripple (ripple.id)}
			<div class="gradient-button__ripple" style="left: {ripple.x}px; top: {ripple.y}px;"></div>
		{/each}
	</div>

	<!-- Content -->
	<span class="gradient-button__content">
		{#if children}
			{@render children()}
		{/if}
	</span>
</a>

<style>
	.gradient-button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 3rem;
		padding: 0 1.5rem;
		border-radius: 1rem;
		overflow: hidden;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.875rem;
		color: oklch(15.22% 0.008 68.34);
		cursor: pointer;
		transition:
			transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.3s ease;
		isolation: isolate;
		border: 2px solid transparent;
		box-shadow:
			0 4px 20px rgba(0, 0, 0, 0.3),
			0 0 0 1px rgba(239, 94, 3, 0.1);
		--mouse-x: 50%;
		--mouse-y: 50%;
		--gradient-angle: 135deg;
		--pulse-intensity: 1;
		--border-glow: 0;
	}

	.gradient-button:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow:
			0 8px 30px rgba(239, 94, 3, 0.4),
			0 0 40px rgba(239, 94, 3, 0.2),
			0 0 0 1px rgba(239, 94, 3, 0.3);
	}

	.gradient-button.pressed {
		transform: translateY(0) scale(0.98);
		box-shadow:
			0 2px 10px rgba(239, 94, 3, 0.5),
			0 0 20px rgba(239, 94, 3, 0.3),
			inset 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	/* Background layers */
	.gradient-button__bg-layer {
		position: absolute;
		inset: 0;
		transition: all 0.5s ease;
		pointer-events: none;
	}

	/* Base gradient layer - matches .gradient-background */
	.gradient-button__bg-layer--base {
		background: linear-gradient(
			var(--gradient-angle),
			oklch(83.24% 0.032 70.46) 5%,
			oklch(79.15% 0.093 67.93) 10%,
			oklch(72.89% 0.148 58.17) 30%,
			oklch(69.18% 0.179 49.92) 40%,
			oklch(66.11% 0.195 43.01) 50%,
			oklch(60.01% 0.226 32.29) 71%,
			oklch(51.41% 0.207 29.86) 83%,
			oklch(39.55% 0.157 30.14) 97%,
			oklch(26.5% 0.092 32.64) 100%
		);
		opacity: calc(0.9 * var(--pulse-intensity));
		z-index: 1;
	}

	/* Radial gradient that follows mouse */
	.gradient-button__bg-layer--radial {
		background: radial-gradient(
			circle 800px at var(--mouse-x) var(--mouse-y),
			oklch(83.24% 0.032 70.46) 0%,
			oklch(79.15% 0.093 67.93) 10%,
			oklch(72.89% 0.148 58.17) 20%,
			oklch(69.18% 0.179 49.92) 30%,
			oklch(66.11% 0.195 43.01) 40%,
			transparent 70%
		);
		opacity: 0;
		z-index: 2;
		transition: opacity 0.3s ease;
	}

	.gradient-button.hovering .gradient-button__bg-layer--radial {
		opacity: 0.8;
	}

	/* Shine effect */
	.gradient-button__bg-layer--shine {
		background: linear-gradient(
			calc(var(--gradient-angle) + 45deg),
			transparent 30%,
			rgba(255, 255, 255, 0.3) 50%,
			transparent 70%
		);
		opacity: 0;
		z-index: 3;
		transform: translateX(-100%);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
	}

	.gradient-button.hovering .gradient-button__bg-layer--shine {
		opacity: 1;
		transform: translateX(100%);
		transition:
			opacity 0.1s ease,
			transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Border glow */
	.gradient-button__border-glow {
		position: absolute;
		inset: -4px;
		border-radius: 1.125rem;
		background: linear-gradient(
			var(--gradient-angle),
			oklch(83.24% 0.032 70.46),
			oklch(79.15% 0.093 67.93),
			oklch(72.89% 0.148 58.17),
			oklch(69.18% 0.179 49.92)
		);
		opacity: 0;
		z-index: 0;
		filter: blur(8px);
		transition: opacity 0.3s ease;
		pointer-events: none;
		animation: border-rotate 3s linear infinite;
	}

	.gradient-button.hovering .gradient-button__border-glow {
		opacity: calc(0.6 * var(--border-glow));
	}

	@keyframes border-rotate {
		0% {
			transform: rotate(0deg) scale(1);
		}
		50% {
			transform: rotate(180deg) scale(1.05);
		}
		100% {
			transform: rotate(360deg) scale(1);
		}
	}

	/* Particles */
	.gradient-button__particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 4;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.gradient-button.hovering .gradient-button__particles {
		opacity: 1;
	}

	.gradient-button__particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: radial-gradient(circle, oklch(87.02% 0.025 71.44), oklch(83.24% 0.032 70.46));
		border-radius: 50%;
		opacity: 0;
		animation: particle-float 3s ease-in-out infinite;
		animation-delay: calc(var(--particle-index) * 0.15s);
		left: calc(5% + var(--particle-index) * 8%);
		box-shadow: 0 0 8px oklch(83.24% 0.032 70.46);
	}

	@keyframes particle-float {
		0%,
		100% {
			transform: translateY(0) translateX(0) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
			transform: translateY(-5px) translateX(0) scale(1);
		}
		50% {
			transform: translateY(-20px) translateX(10px) scale(1.2);
			opacity: 0.8;
		}
		90% {
			opacity: 0.3;
		}
	}

	/* Ripples */
	.gradient-button__ripples {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 5;
	}

	.gradient-button__ripple {
		position: absolute;
		width: 20px;
		height: 20px;
		margin: -10px 0 0 -10px;
		background: radial-gradient(
			circle,
			oklch(87.02% 0.025 71.44) 0%,
			oklch(83.24% 0.032 70.46) 30%,
			transparent 70%
		);
		border-radius: 50%;
		transform: scale(0);
		opacity: 1;
		animation: ripple-expand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes ripple-expand {
		to {
			transform: scale(15);
			opacity: 0;
		}
	}

	/* Content */
	.gradient-button__content {
		position: relative;
		z-index: 10;
		transition:
			transform 0.2s ease,
			text-shadow 0.3s ease;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.gradient-button.hovering .gradient-button__content {
		transform: scale(1.05);
		text-shadow:
			0 2px 8px rgba(0, 0, 0, 0.4),
			0 0 20px rgba(239, 94, 3, 0.3);
	}

	.gradient-button.pressed .gradient-button__content {
		transform: scale(0.95);
	}

	/* Focus state for accessibility */
	.gradient-button:focus-visible {
		outline: 2px solid oklch(83.24% 0.032 70.46);
		outline-offset: 4px;
	}

	/* Keyboard navigation support */
	.gradient-button:focus-visible:not(:hover) {
		box-shadow:
			0 4px 20px rgba(239, 94, 3, 0.4),
			0 0 0 3px oklch(83.24% 0.032 70.46);
	}
</style>
