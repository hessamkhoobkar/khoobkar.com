<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut, quintOut } from 'svelte/easing';

	export let url: string;
</script>

{#key url}
	<div
		class="transition"
		in:fly|global={{
			y: 50,
			duration: 750,
			easing: quartOut
		}}
	>
		<slot />
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
