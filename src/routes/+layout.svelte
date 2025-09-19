<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid w-full grid-cols-1 lg:grid-cols-[352px_1fr]">
	<div class="relative col-span-1 hidden h-screen w-full lg:block">
		<Sidebar />
	</div>
	<main class="min-h-screen bg-surface-950 p-4">
		{@render children?.()}
	</main>
</div>
