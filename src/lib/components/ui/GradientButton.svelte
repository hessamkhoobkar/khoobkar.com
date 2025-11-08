<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
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
	let buttonRect: DOMRect | null = null;
	let sparkleIdCounter = 0;
	let rippleIdCounter = 0;
	let mouseX = $state(0);
	let mouseY = $state(0);
	let isHovering = $state(false);
	let isPressed = $state(false);
	let ripples = $state<Array<{ id: number; x: number; y: number }>>([]);
	let pulseIntensity = $state(0);
	let borderGlow = $state(0);
	let sparkles = $state<Array<{ id: number; x: number; y: number }>>([]);
	let pointerFrame: number | null = null;
	let styleFrame: number | null = null;

	const sparkleTimers = new Set<number>();
	const rippleTimers = new Set<number>();
	const hoverTimers = new Set<number>();

	function updateButtonRect(force = false) {
		if (!buttonElement) return;
		if (force || !buttonRect) {
			buttonRect = buttonElement.getBoundingClientRect();
		}
	}

	function clearTimers(...groups: Set<number>[]) {
		for (const group of groups) {
			for (const timer of group) {
				window.clearTimeout(timer);
			}
			group.clear();
		}
	}

	function registerTimeout(callback: () => void, delay: number, registry: Set<number>) {
		const timer = window.setTimeout(() => {
			registry.delete(timer);
			callback();
		}, delay);
		registry.add(timer);
		return timer;
	}

	function queueSparkle(x: number, y: number, lifespan = 1200) {
		const id = ++sparkleIdCounter;
		sparkles = [...sparkles, { id, x, y }];
		registerTimeout(
			() => {
				sparkles = sparkles.filter((sparkle) => sparkle.id !== id);
			},
			lifespan,
			sparkleTimers
		);
	}

	function queueRipple(x: number, y: number, lifespan = 1000) {
		const id = ++rippleIdCounter;
		ripples = [...ripples, { id, x, y }];
		registerTimeout(
			() => {
				ripples = ripples.filter((ripple) => ripple.id !== id);
			},
			lifespan,
			rippleTimers
		);
	}

	function getOriginFromEvent(event: MouseEvent) {
		updateButtonRect();
		if (!buttonRect) {
			return { x: 0, y: 0 };
		}
		return {
			x: event.clientX - buttonRect.left,
			y: event.clientY - buttonRect.top
		};
	}

	function getCenterOrigin() {
		updateButtonRect();
		if (!buttonRect) {
			return { x: 0, y: 0 };
		}
		return {
			x: buttonRect.width / 2,
			y: buttonRect.height / 2
		};
	}

	// Mouse move handler for interactive effects
	function handleMouseMove(event: MouseEvent) {
		if (!buttonElement) return;
		updateButtonRect();

		const applyPointerUpdate = () => {
			pointerFrame = null;
			if (!buttonRect) return;

			const x = event.clientX - buttonRect.left;
			const y = event.clientY - buttonRect.top;

			mouseX = x / buttonRect.width;
			mouseY = y / buttonRect.height;
		};

		if (pointerFrame !== null) {
			window.cancelAnimationFrame(pointerFrame);
		}
		pointerFrame = window.requestAnimationFrame(applyPointerUpdate);
	}

	function handleMouseEnter() {
		isHovering = true;
		updateButtonRect(true);
		animateBorderGlow();

		// Create multiple sparkles on hover
		if (buttonRect) {
			for (let i = 0; i < 5; i++) {
				registerTimeout(
					() => {
						if (!buttonRect) return;
						const x = Math.random() * buttonRect.width;
						const y = Math.random() * buttonRect.height;
						queueSparkle(x, y);
					},
					i * 100,
					hoverTimers
				);
			}
		}
	}

	function handleMouseLeave() {
		isHovering = false;
		mouseX = 0.5;
		mouseY = 0.5;
		borderGlow = 0;
		if (pointerFrame !== null) {
			window.cancelAnimationFrame(pointerFrame);
			pointerFrame = null;
		}
		buttonRect = null;
		clearTimers(hoverTimers);
	}

	function handlePressStart(origin: { x: number; y: number }) {
		isPressed = true;

		// Create burst effect on click
		if (buttonRect) {
			for (let i = 0; i < 8; i++) {
				const angle = (i / 8) * Math.PI * 2;
				const distance = 30 + Math.random() * 20;
				queueSparkle(
					origin.x + Math.cos(angle) * distance,
					origin.y + Math.sin(angle) * distance,
					800
				);
			}
		}
	}

	function handlePressEnd(origin: { x: number; y: number }) {
		isPressed = false;

		// Create ripple effect
		queueRipple(origin.x, origin.y);
	}

	function handleMouseDown(event: MouseEvent) {
		updateButtonRect();
		if (!buttonRect) return;
		handlePressStart(getOriginFromEvent(event));
	}

	function handleMouseUp(event: MouseEvent) {
		updateButtonRect();
		if (!buttonRect) return;
		handlePressEnd(getOriginFromEvent(event));
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.repeat) return;

		const isSpace = event.key === ' ' || event.key === 'Space';
		const isEnter = event.key === 'Enter';

		if (!isSpace && !isEnter) return;

		if (isSpace) {
			event.preventDefault();
		}

		handlePressStart(getCenterOrigin());
	}

	function handleKeyUp(event: KeyboardEvent) {
		const isSpace = event.key === ' ' || event.key === 'Space';
		const isEnter = event.key === 'Enter';

		if (!isSpace && !isEnter) return;

		if (isSpace) {
			event.preventDefault();
			buttonElement?.click();
		}

		handlePressEnd(getCenterOrigin());
	}

	function handleBlur() {
		isPressed = false;
	}

	function animateBorderGlow() {
		if (!isHovering) return;

		borderGlow = 1;
		pulseIntensity = 1;

		setTimeout(() => {
			if (isHovering) {
				pulseIntensity = 0.7;
				setTimeout(() => {
					if (isHovering) animateBorderGlow();
				}, 800);
			}
		}, 1200);
	}

	// Continuous subtle animation when not interacting
	onMount(() => {
		let frame = 0;
		let animationFrameId = 0;
		const animate = () => {
			if (!isHovering) {
				frame += 0.01;
				pulseIntensity = Math.sin(frame) * 0.15 + 0.85;
			}
			animationFrameId = window.requestAnimationFrame(animate);
		};
		animationFrameId = window.requestAnimationFrame(animate);

		let resizeObserver: ResizeObserver | null = null;
		if ('ResizeObserver' in window) {
			resizeObserver = new ResizeObserver(() => {
				if (isHovering) {
					updateButtonRect(true);
				} else {
					buttonRect = null;
				}
			});
			if (buttonElement) {
				resizeObserver.observe(buttonElement);
			}
		}

		return () => {
			window.cancelAnimationFrame(animationFrameId);
			resizeObserver?.disconnect();
		};
	});

	// Update CSS variables based on state
	$effect(() => {
		if (buttonElement) {
			if (styleFrame !== null) {
				window.cancelAnimationFrame(styleFrame);
			}
			const mouseXValue = `${mouseX * 100}%`;
			const mouseYValue = `${mouseY * 100}%`;
			const pulseValue = `${pulseIntensity}`;
			const borderGlowValue = `${borderGlow}`;

			styleFrame = window.requestAnimationFrame(() => {
				if (!buttonElement) return;
				buttonElement.style.setProperty('--mouse-x', mouseXValue);
				buttonElement.style.setProperty('--mouse-y', mouseYValue);
				buttonElement.style.setProperty('--pulse-intensity', pulseValue);
				buttonElement.style.setProperty('--border-glow', borderGlowValue);
			});
		}
	});

	onDestroy(() => {
		if (pointerFrame !== null) {
			window.cancelAnimationFrame(pointerFrame);
		}
		if (styleFrame !== null) {
			window.cancelAnimationFrame(styleFrame);
		}
		clearTimers(sparkleTimers, rippleTimers, hoverTimers);
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
	onkeydown={handleKeyDown}
	onkeyup={handleKeyUp}
	onblur={handleBlur}
	role="button"
	tabindex="0"
>
	<!-- Animated background layers -->
	<div class="gradient-button__bg-layer gradient-button__bg-layer--base"></div>
	<div class="gradient-button__bg-layer gradient-button__bg-layer--radial"></div>
	<div class="gradient-button__bg-layer gradient-button__bg-layer--shine"></div>
	<div class="gradient-button__bg-layer gradient-button__bg-layer--glow"></div>

	<!-- Border glow effect -->
	<div class="gradient-button__border-glow"></div>

	<!-- Sparkle effects -->
	<div class="gradient-button__sparkles">
		{#each sparkles as sparkle (sparkle.id)}
			<div class="gradient-button__sparkle" style="left: {sparkle.x}px; top: {sparkle.y}px;"></div>
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
		color: var(--color-text);
		cursor: pointer;
		transition:
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			filter 0.3s ease;
		isolation: isolate;
		border: 2px solid transparent;
		box-shadow:
			0 4px 20px rgba(0, 0, 0, 0.3),
			0 0 0 1px var(--shadow-soft),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		--mouse-x: 50%;
		--mouse-y: 50%;
		--pulse-intensity: 1;
		--border-glow: 0;
		will-change: transform;
		--color-text: oklch(15.22% 0.008 68.34);
		--accent-100: oklch(95% 0.01 71.44);
		--accent-95: oklch(87.02% 0.025 71.44);
		--accent-90: oklch(83.24% 0.032 70.46);
		--accent-80: oklch(79.15% 0.093 67.93);
		--accent-70: oklch(72.89% 0.148 58.17);
		--accent-65: oklch(69.18% 0.179 49.92);
		--accent-60: oklch(66.11% 0.195 43.01);
		--accent-50: oklch(60.01% 0.226 32.29);
		--accent-40: oklch(51.41% 0.207 29.86);
		--accent-35: oklch(39.55% 0.157 30.14);
		--shadow-strong: rgba(239, 94, 3, 0.5);
		--shadow-medium: rgba(239, 94, 3, 0.3);
		--shadow-soft: rgba(239, 94, 3, 0.1);
		--shadow-outline: rgba(239, 94, 3, 0.4);
		--shadow-intense: rgba(239, 94, 3, 0.6);
		--shadow-light: rgba(239, 94, 3, 0.2);
	}

	.gradient-button:hover {
		transform: translateY(-4px) scale(1.05);
		box-shadow:
			0 12px 40px var(--shadow-strong),
			0 0 60px var(--shadow-medium),
			0 0 100px var(--shadow-soft),
			0 0 0 2px var(--shadow-outline),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		filter: brightness(1.1) saturate(1.2);
	}

	.gradient-button.pressed {
		transform: translateY(-1px) scale(0.96);
		box-shadow:
			0 4px 15px var(--shadow-intense),
			0 0 30px var(--shadow-outline),
			0 0 60px var(--shadow-light),
			inset 0 3px 10px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		filter: brightness(1.2) saturate(1.3);
		transition:
			transform 0.1s cubic-bezier(0.4, 0, 0.6, 1),
			box-shadow 0.1s ease,
			filter 0.1s ease;
	}

	/* Background layers */
	.gradient-button__bg-layer {
		position: absolute;
		inset: 0;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
	}

	/* Base gradient layer - bottom-left to top-right (45deg) */
	.gradient-button__bg-layer--base {
		background: linear-gradient(
			45deg,
			var(--accent-90) 0%,
			var(--accent-80) 15%,
			var(--accent-70) 30%,
			var(--accent-65) 45%,
			var(--accent-60) 60%,
			var(--accent-50) 75%,
			var(--accent-40) 90%,
			var(--accent-35) 100%
		);
		opacity: calc(0.95 * var(--pulse-intensity));
		z-index: 1;
	}

	.gradient-button.hovering .gradient-button__bg-layer--base {
		opacity: 1;
	}

	/* Radial gradient that follows mouse */
	.gradient-button__bg-layer--radial {
		background: radial-gradient(
			circle 600px at var(--mouse-x) var(--mouse-y),
			var(--accent-95) 0%,
			var(--accent-90) 10%,
			var(--accent-80) 20%,
			var(--accent-70) 30%,
			var(--accent-65) 40%,
			transparent 60%
		);
		opacity: 0;
		z-index: 2;
		transition: opacity 0.4s ease;
		mix-blend-mode: overlay;
	}

	.gradient-button.hovering .gradient-button__bg-layer--radial {
		opacity: 0.9;
	}

	.gradient-button.pressed .gradient-button__bg-layer--radial {
		opacity: 1;
	}

	/* Shine effect */
	.gradient-button__bg-layer--shine {
		background: linear-gradient(
			90deg,
			transparent 0%,
			transparent 30%,
			rgba(255, 255, 255, 0.5) 50%,
			transparent 70%,
			transparent 100%
		);
		opacity: 0;
		z-index: 3;
		transform: translateX(-150%) skewX(-20deg);
		transition:
			opacity 0.2s ease,
			transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.gradient-button.hovering .gradient-button__bg-layer--shine {
		opacity: 1;
		transform: translateX(150%) skewX(-20deg);
	}

	/* Glow layer for extra depth */
	.gradient-button__bg-layer--glow {
		background: radial-gradient(
			ellipse 200% 100% at var(--mouse-x) var(--mouse-y),
			var(--accent-80) 0%,
			transparent 50%
		);
		opacity: 0;
		z-index: 1;
		filter: blur(20px);
		transition: opacity 0.4s ease;
		mix-blend-mode: screen;
	}

	.gradient-button.hovering .gradient-button__bg-layer--glow {
		opacity: 0.6;
		animation: glow-pulse 2s ease-in-out infinite;
	}

	.gradient-button.pressed .gradient-button__bg-layer--glow {
		opacity: 0.8;
	}

	@keyframes glow-pulse {
		0%,
		100% {
			filter: blur(20px);
			opacity: 0.6;
		}
		50% {
			filter: blur(30px);
			opacity: 0.8;
		}
	}

	/* Border glow */
	.gradient-button__border-glow {
		position: absolute;
		inset: -6px;
		border-radius: 1.2rem;
		background: linear-gradient(
			45deg,
			var(--accent-90),
			var(--accent-80),
			var(--accent-70),
			var(--accent-65),
			var(--accent-90)
		);
		background-size: 300% 300%;
		opacity: 0;
		z-index: 0;
		filter: blur(12px);
		transition: opacity 0.4s ease;
		pointer-events: none;
		animation: border-rotate 4s ease-in-out infinite;
	}

	.gradient-button.hovering .gradient-button__border-glow {
		opacity: calc(0.8 * var(--border-glow));
	}

	.gradient-button.pressed .gradient-button__border-glow {
		opacity: 1;
		filter: blur(16px);
	}

	@keyframes border-rotate {
		0% {
			background-position: 0% 50%;
			transform: rotate(0deg) scale(1);
		}
		25% {
			transform: rotate(90deg) scale(1.08);
		}
		50% {
			background-position: 100% 50%;
			transform: rotate(180deg) scale(1);
		}
		75% {
			transform: rotate(270deg) scale(1.08);
		}
		100% {
			background-position: 0% 50%;
			transform: rotate(360deg) scale(1);
		}
	}

	/* Sparkles */
	.gradient-button__sparkles {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 6;
	}

	.gradient-button__sparkle {
		position: absolute;
		width: 8px;
		height: 8px;
		margin: -4px 0 0 -4px;
		background: radial-gradient(
			circle,
			var(--accent-100) 0%,
			var(--accent-95) 20%,
			var(--accent-90) 40%,
			transparent 70%
		);
		border-radius: 50%;
		transform: scale(0) rotate(0deg);
		opacity: 1;
		animation: sparkle-burst 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
		box-shadow:
			0 0 10px var(--accent-95),
			0 0 20px var(--accent-90),
			0 0 30px var(--accent-80);
	}

	@keyframes sparkle-burst {
		0% {
			transform: scale(0) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		30% {
			transform: scale(1.5) rotate(180deg);
			opacity: 1;
		}
		60% {
			transform: scale(2) rotate(360deg);
			opacity: 0.6;
		}
		100% {
			transform: scale(0.5) rotate(720deg);
			opacity: 0;
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
		width: 30px;
		height: 30px;
		margin: -15px 0 0 -15px;
		background: radial-gradient(
			circle,
			var(--accent-100) 0%,
			var(--accent-95) 15%,
			var(--accent-90) 30%,
			var(--accent-80) 50%,
			transparent 70%
		);
		border-radius: 50%;
		transform: scale(0);
		opacity: 1;
		animation: ripple-expand 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
		box-shadow:
			0 0 20px var(--accent-90),
			0 0 40px var(--accent-80);
	}

	@keyframes ripple-expand {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
		100% {
			transform: scale(20);
			opacity: 0;
		}
	}

	/* Content */
	.gradient-button__content {
		position: relative;
		z-index: 10;
		transition:
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
			text-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			filter 0.3s ease;
		text-shadow:
			0 1px 2px rgba(0, 0, 0, 0.3),
			0 2px 4px rgba(0, 0, 0, 0.2);
		filter: brightness(1);
	}

	.gradient-button.hovering .gradient-button__content {
		transform: scale(1.08) translateY(-1px);
		text-shadow:
			0 2px 8px rgba(0, 0, 0, 0.5),
			0 0 20px var(--shadow-outline),
			0 0 40px var(--shadow-light),
			0 4px 12px rgba(0, 0, 0, 0.3);
		filter: brightness(1.1);
		animation: content-pulse 2s ease-in-out infinite;
	}

	@keyframes content-pulse {
		0%,
		100% {
			text-shadow:
				0 2px 8px rgba(0, 0, 0, 0.5),
				0 0 20px var(--shadow-outline),
				0 0 40px var(--shadow-light),
				0 4px 12px rgba(0, 0, 0, 0.3);
		}
		50% {
			text-shadow:
				0 2px 8px rgba(0, 0, 0, 0.5),
				0 0 30px var(--shadow-intense),
				0 0 60px var(--shadow-medium),
				0 4px 12px rgba(0, 0, 0, 0.3);
		}
	}

	.gradient-button.pressed .gradient-button__content {
		transform: scale(0.94) translateY(1px);
		text-shadow:
			0 1px 4px rgba(0, 0, 0, 0.6),
			0 0 30px var(--shadow-intense),
			0 0 60px var(--shadow-outline);
		filter: brightness(1.3);
		animation: none;
		transition:
			transform 0.1s cubic-bezier(0.4, 0, 0.6, 1),
			text-shadow 0.1s ease,
			filter 0.1s ease;
	}

	/* Focus state for accessibility */
	.gradient-button:focus-visible {
		outline: 3px solid var(--accent-90);
		outline-offset: 4px;
		box-shadow:
			0 8px 30px var(--shadow-strong),
			0 0 60px var(--shadow-medium),
			0 0 0 3px var(--accent-90);
	}

	/* Keyboard navigation support */
	.gradient-button:focus-visible:not(:hover) {
		box-shadow:
			0 4px 20px var(--shadow-outline),
			0 0 40px var(--shadow-light),
			0 0 0 3px var(--accent-90);
		animation: focus-pulse 2s ease-in-out infinite;
	}

	@keyframes focus-pulse {
		0%,
		100% {
			box-shadow:
				0 4px 20px var(--shadow-outline),
				0 0 40px var(--shadow-light),
				0 0 0 3px var(--accent-90);
		}
		50% {
			box-shadow:
				0 4px 20px var(--shadow-intense),
				0 0 60px var(--shadow-medium),
				0 0 0 3px var(--accent-90);
		}
	}
</style>
