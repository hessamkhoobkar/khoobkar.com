<script lang="ts">
	import WorkChip from '../work/WorkChip.svelte';

	export let title: string = '';
	export let href: string = '#';
	export let thumbnail: string = '';
	export let thumbnailAlt: string = '';
	export let stack: string[] = [];
</script>

<div class="w-full rounded-2xl bg-gray-800 border border-gray-600">
	<a class="w-full h-full flex flex-col p-4 {href === '#' && 'cursor-default'}" {href}>
		<div class="w-full aspect-[4/3] rounded-xl overflow-hidden">
			<img class="object-cover" src={thumbnail} alt={thumbnailAlt} />
		</div>
		<div class="flex flex-col justify-between gap-4 font-medium pt-4">
			<h3 class="text-xl font-bold">{title}</h3>
			<div class="flex flex-wrap gap-2">
				{#each stack as label}
					<WorkChip {label} />
				{/each}
			</div>
		</div>
	</a>
</div>
