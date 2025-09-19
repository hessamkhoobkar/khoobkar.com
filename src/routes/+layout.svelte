<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid w-full grid-cols-[256px_1fr]">
	<div class="relative col-span-1 h-screen w-full">
		<aside class="inset-4 rounded-lg bg-surface-900">
			<h1 class="text-2xl font-bold">hello</h1>
		</aside>
	</div>
	<main class="min-h-screen bg-surface-950">
		{@render children?.()}
	</main>
</div>
