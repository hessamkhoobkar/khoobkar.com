<script lang="ts">
	let klass: string | null = null;
	export { klass as class };
	export let size: string = '24';
</script>

<svg
	width={size}
	height={size}
	class={klass}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M11.5 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8M9 18h2m9 3l2-2l-2-2m-3 0l-2 2l2 2"
	/>
</svg>
