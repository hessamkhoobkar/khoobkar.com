<script lang="ts">
	import { page } from '$app/stores';
	import { mainNavigation } from '$lib/data/navigation';
	import Logo from './sidebar/Logo.svelte';
	import UserCard from './sidebar/UserCard.svelte';

	interface Props {
		isMobile?: boolean;
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isMobile = false, isOpen = false, onClose = () => {} }: Props = $props();

	let currentPath = $derived($page.url.pathname);

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
					<a
						href={item.href}
						class="block w-full rounded-2xl px-4 py-3 text-surface-100 transition-all duration-200 hover:bg-primary-500/5 hover:text-primary-500 active:scale-95 {isActive(
							item.href,
							currentPath
						)
							? 'bg-primary-500 text-surface-950'
							: ''}"
						title={item.description}
						onclick={handleNavClick}
					>
						<span class="font-medium">{item.label}</span>
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
	<!-- Desktop Sidebar (original) -->
	<aside
		class="fixed inset-y-4 start-4 z-50 flex w-[320px] flex-col justify-between rounded-2xl border border-surface-700 bg-surface-800"
	>
		<!-- Logo/Brand -->
		<Logo />

		<!-- Main Navigation -->
		<nav class="flex w-full flex-col items-start justify-start px-4">
			{#each mainNavigation as item}
				<a
					href={item.href}
					class="block w-full rounded-2xl px-4 py-3 text-surface-100 transition-all duration-200 hover:bg-primary-500/5 hover:text-primary-500 {isActive(
						item.href,
						currentPath
					)
						? 'bg-primary-500 text-surface-950'
						: ''}"
					title={item.description}
				>
					<span class="font-medium">{item.label}</span>
				</a>
			{/each}
		</nav>

		<!-- Footer -->
		<UserCard />
	</aside>
{/if}
