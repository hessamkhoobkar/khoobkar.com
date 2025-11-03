<script lang="ts">
	import { page } from '$app/stores';
	import { mainNavigation } from '$lib/data/navigation';
	import Logo from './sidebar/Logo.svelte';
	import UserCard from './sidebar/UserCard.svelte';
	import { House, Briefcase, Lightbulb, Workflow, User, Mail, Rocket } from '@lucide/svelte';

	interface Props {
		isMobile?: boolean;
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isMobile = false, isOpen = false, onClose = () => {} }: Props = $props();

	let currentPath = $derived($page.url.pathname);

	// Icon mapping
	const iconMap = {
		home: House,
		briefcase: Briefcase,
		rocket: Rocket,
		workflow: Workflow,
		lightbulb: Lightbulb,
		user: User,
		mail: Mail
	};

	// Get icon component by name
	function getIconComponent(iconName: string) {
		return iconMap[iconName as keyof typeof iconMap] || null;
	}

	// Check if a navigation item is active (exact match or child route)
	function isActive(href: string, currentPath: string): boolean {
		// For root path, only match exactly
		if (href === '/') {
			return currentPath === '/';
		}
		// For other paths, match if current path starts with the href
		return currentPath === href || currentPath.startsWith(href + '/');
	}

	// Handle navigation click on mobile
	function handleNavClick() {
		if (isMobile) {
			onClose();
		}
	}

	// Handle backdrop click
	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	// Handle escape key
	function handleKeydown(e: KeyboardEvent) {
		if (isMobile && isOpen && e.key === 'Escape') {
			onClose();
		}
	}

	// Mouse tracking for navigation links
	function handleNavMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = (x / rect.width) * 100;
		const centerY = (y / rect.height) * 100;

		target.style.setProperty('--mouse-x', `${centerX}%`);
		target.style.setProperty('--mouse-y', `${centerY}%`);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isMobile}
	<!-- Mobile Bottom Sheet -->
	{#if isOpen}
		<!-- Backdrop -->
		<div
			class="fixed inset-0 z-40 bg-surface-950/60 backdrop-blur-sm transition-opacity duration-300"
			onclick={handleBackdropClick}
			role="presentation"
		></div>
	{/if}

	<!-- Bottom Sheet -->
	<div
		class="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-3xl border-t border-surface-700 bg-surface-800 shadow-2xl transition-transform duration-300 ease-out {isOpen
			? 'translate-y-0'
			: 'translate-y-full'}"
		role="dialog"
		aria-modal="true"
		aria-label="Mobile navigation menu"
	>
		<!-- Handle bar for visual affordance -->
		<div class="flex w-full items-center justify-center py-3">
			<div class="h-1.5 w-12 rounded-full bg-surface-600"></div>
		</div>

		<!-- Scrollable content -->
		<div class="flex flex-1 flex-col overflow-y-auto">
			<!-- Logo/Brand -->
			<div class="px-6 pb-4">
				<Logo />
			</div>

			<!-- Main Navigation -->
			<nav class="flex w-full flex-col items-start justify-start px-4 pb-4">
				{#each mainNavigation as item}
					{@const IconComponent = getIconComponent(item.icon || '')}
					<a
						href={item.href}
						class="nav-link relative block w-full overflow-hidden rounded-2xl px-4 py-3 {isActive(
							item.href,
							currentPath
						)
							? 'nav-link--active cursor-default'
							: ''}"
						title={item.description}
						onclick={handleNavClick}
						onmousemove={handleNavMouseMove}
					>
						<div class="flex items-center gap-3">
							{#if IconComponent}
								<IconComponent size={18} />
							{/if}
							<span class="font-medium">{item.label}</span>
						</div>
					</a>
				{/each}
			</nav>

			<!-- Footer -->
			<div class="mt-auto">
				<UserCard />
			</div>
		</div>
	</div>
{:else}
	<!-- Desktop Sidebar (app-like structure, no collapse) -->
	<aside
		class="fixed inset-y-4 start-4 z-50 flex w-[320px] flex-col overflow-hidden rounded-2xl border border-surface-700 bg-surface-800 shadow-xl"
		aria-label="Primary navigation sidebar"
	>
		<!-- Header: Logo area -->
		<div class="flex items-center justify-between px-3 py-3">
			<div class="flex">
				<Logo />
			</div>
		</div>

		<!-- Scrollable content -->
		<div class="flex min-h-0 flex-1 flex-col gap-2">
			<!-- Section: Navigation -->
			<div class="px-6 pt-2 text-[10px] font-semibold tracking-wider text-surface-400 uppercase">
				Navigation
			</div>
			<nav class="flex w-full flex-1 flex-col items-start justify-start gap-1 px-4">
				{#each mainNavigation as item}
					{@const IconComponent = getIconComponent(item.icon || '')}
					<a
						href={item.href}
						class="nav-link group relative block w-full overflow-hidden rounded-2xl px-3 py-2.5 {isActive(
							item.href,
							currentPath
						)
							? 'nav-link--active cursor-default'
							: ''}"
						title={item.label}
						onmousemove={handleNavMouseMove}
					>
						<div class="flex items-center gap-3">
							{#if IconComponent}
								<IconComponent size={18} />
							{/if}
							<span class="font-medium">{item.label}</span>
						</div>
					</a>
				{/each}
			</nav>

			<!-- Footer/User area -->
			<UserCard />
		</div>
	</aside>
{/if}

<style>
	/* Navigation Links - Almost invisible with smooth animations */
	.nav-link {
		color: oklch(85% 0.005 264);
		transition:
			all 0.3s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
		--mouse-x: 50%;
		--mouse-y: 50%;
	}

	/* Mouse-following radial gradient with lighter colors */
	.nav-link::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle 150px at var(--mouse-x) var(--mouse-y),
			oklch(68% 0.21 45 / 0.25) 0%,
			oklch(65% 0.23 40 / 0.18) 30%,
			oklch(62% 0.25 38 / 0.1) 60%,
			transparent 100%
		);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	.nav-link:hover::before {
		opacity: 1;
	}

	/* Border shimmer that follows mouse */
	.nav-link::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 1rem;
		padding: 1px;
		background: radial-gradient(
			circle 200px at var(--mouse-x) var(--mouse-y),
			oklch(68% 0.21 45 / 0.7) 0%,
			oklch(65% 0.23 40 / 0.5) 50%,
			transparent 100%
		);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.nav-link:hover::after {
		opacity: 1;
	}

	.nav-link:hover {
		color: oklch(68% 0.21 45);
		transform: translateX(4px);
		background: radial-gradient(
			circle 250px at var(--mouse-x) var(--mouse-y),
			oklch(65% 0.23 40 / 0.15) 0%,
			oklch(62% 0.25 38 / 0.08) 100%
		);
	}

	.nav-link:active {
		transform: translateX(2px) scale(0.98);
		transition:
			all 0.1s cubic-bezier(0.4, 0, 0.6, 1),
			transform 0.1s ease;
	}

	/* Active state - colored and visible */
	.nav-link--active {
		background: linear-gradient(
			45deg,
			oklch(68% 0.21 45) 0%,
			oklch(65% 0.23 40) 50%,
			oklch(62% 0.25 38) 100%
		);
		color: oklch(15.22% 0.008 68.34);
		box-shadow:
			0 2px 8px oklch(65% 0.23 40 / 0.5),
			0 0 20px oklch(62% 0.25 38 / 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		transform: translateX(0);
	}

	.nav-link--active::before,
	.nav-link--active::after {
		display: none;
	}

	/* Disable all hover and active effects for active navigation link */
	.nav-link--active:hover,
	.nav-link--active:active {
		background: linear-gradient(
			45deg,
			oklch(68% 0.21 45) 0%,
			oklch(65% 0.23 40) 50%,
			oklch(62% 0.25 38) 100%
		);
		color: oklch(15.22% 0.008 68.34);
		transform: translateX(0);
		box-shadow:
			0 2px 8px oklch(65% 0.23 40 / 0.5),
			0 0 20px oklch(62% 0.25 38 / 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		filter: brightness(1);
	}
</style>
