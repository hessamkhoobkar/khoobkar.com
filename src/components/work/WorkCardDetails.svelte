<script lang="ts">
	import WorkChip from './WorkChip.svelte';

	export let client: string;
	export let year: string;
	export let ProjectDuration: string;
	export let roles: [];
	export let stacks: [];
</script>

<div
	class="col-span-1 xl:col-span-3 xl:row-span-2 xl:col-start-4 xl:row-start-2 rounded-2xl bg-gray-800 flex flex-col gap-4 p-4 border border-gray-500"
>
	<div>
		<h3 class="text-xs 2xl:text-sm font-bold text-gray-400">Client:</h3>
		<p class="text-sm 2xl:text-lg font-bold">{client}</p>
	</div>
	<div class="flex">
		<div class="w-1/2">
			<h3 class="text-xs 2xl:text-sm font-bold text-gray-400">Date:</h3>
			<p class="text-sm 2xl:text-base">{year}</p>
		</div>
		<div class="w-1/2">
			<h3 class="text-xs 2xl:text-sm font-bold text-gray-400">Duration:</h3>
			<p class="text-sm 2xl:text-base">{ProjectDuration}</p>
		</div>
	</div>
	<div>
		<h3 class="text-xs 2xl:text-sm font-bold text-gray-400 mb-2">My Role:</h3>
		<div class="flex flex-wrap gap-2">
			{#each roles as role}
				<WorkChip label={role} />
			{/each}
		</div>
	</div>
	<div class="hidden 2xl:block">
		<h3 class="text-xs 2xl:text-sm font-bold text-gray-400 mb-2">Stack used:</h3>
		<div class="flex flex-wrap gap-2">
			{#each stacks as stack}
				<WorkChip label={stack} />
			{/each}
		</div>
	</div>
</div>
