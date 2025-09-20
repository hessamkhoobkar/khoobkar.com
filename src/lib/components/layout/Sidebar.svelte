<script lang="ts">
	import { page } from '$app/stores';
	import { mainNavigation } from '$lib/data/navigation';
	import logo from '$lib/assets/logo.png';

	$: currentPath = $page.url.pathname;
</script>

<aside
	class="fixed inset-y-4 start-4 z-50 w-[320px] rounded-2xl border border-surface-700 bg-surface-800 p-6"
>
	<!-- Logo/Brand -->
	<div class="mb-8">
		<a href="/">
			<img
				src={logo}
				alt="combination of logo and text of my name hessam khoobkar. The logo is the letter H in Farsi with deep sunset color. And text hessam khoobkar in bold english letters on top of each other"
				class="h-12"
			/>
		</a>
	</div>

	<!-- Main Navigation -->
	<nav class="flex w-full flex-col items-start justify-start">
		{#each mainNavigation as item}
			<a
				href={item.href}
				class="block w-full rounded-lg px-4 py-3 text-surface-100 transition-all duration-200 hover:bg-surface-800 hover:text-surface-50 {currentPath ===
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
