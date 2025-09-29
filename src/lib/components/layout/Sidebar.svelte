<script lang="ts">
	import { page } from '$app/stores';
	import { mainNavigation } from '$lib/data/navigation';
	import Logo from './sidebar/Logo.svelte';
	import UserCard from './sidebar/UserCard.svelte';

	$: currentPath = $page.url.pathname;
</script>

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
				class="block w-full rounded-2xl px-4 py-3 text-surface-100 transition-all duration-200 hover:bg-primary-600/5 hover:text-primary-500 {currentPath ===
				item.href
					? 'bg-primary-600 text-surface-950'
					: ''}"
				title={item.description}
			>
				<span class="font-medium">{item.label}</span>
				<!-- {#if item.description}
					<span class="mt-1 block text-xs text-surface-500">{item.description}</span>
				{/if} -->
			</a>
		{/each}
	</nav>

	<!-- Footer -->
	<UserCard />
</aside>
