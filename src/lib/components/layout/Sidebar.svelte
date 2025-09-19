<script lang="ts">
	import { page } from '$app/stores';
	import { mainNavigation } from '$lib/data/navigation';

	$: currentPath = $page.url.pathname;
</script>

<aside
	class="fixed inset-y-4 start-4 w-[320px] rounded-2xl border border-surface-700 bg-surface-800 p-6"
>
	<!-- Logo/Brand -->
	<div class="mb-8">
		<a href="/" class="text-2xl font-bold text-surface-50 transition-colors hover:text-primary-400">
			Khoobkar
		</a>
		<p class="mt-1 text-sm text-surface-400">Digital Excellence</p>
	</div>

	<!-- Main Navigation -->
	<nav class="space-y-2">
		{#each mainNavigation as item}
			<a
				href={item.href}
				class="block rounded-lg px-4 py-3 text-surface-300 transition-all duration-200 hover:bg-surface-800 hover:text-surface-50 {currentPath ===
				item.href
					? 'border-l-2 border-primary-500 bg-primary-600/20 text-primary-300'
					: ''}"
				title={item.description}
			>
				<span class="font-medium">{item.label}</span>
				{#if item.description}
					<span class="mt-1 block text-xs text-surface-500">{item.description}</span>
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Footer -->
	<div class="absolute right-6 bottom-6 left-6">
		<div class="text-center text-xs text-surface-500">© 2024 Khoobkar</div>
	</div>
</aside>
