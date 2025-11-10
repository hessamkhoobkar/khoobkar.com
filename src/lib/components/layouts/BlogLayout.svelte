<script lang="ts">
	let { children } = $props();
</script>

<div class="mx-auto max-w-8xl">
	<div class="prose prose-lg max-w-none prose-invert">
		{@render children?.()}
	</div>
</div>
