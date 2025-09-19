<script lang="ts">
	import type { Post } from '@/lib/types';
	import WorkCardDetails from './WorkCardDetails.svelte';
	import Button from '../foundation/Button/Button.svelte';

	export let work: Post;
</script>

<div class="w-full flex flex-col gap-4">
	<div
		class="w-full rounded-2xl bg-gray-800 border border-gray-500 hover:border-primary-900 hover:border-opacity-50 transition-all duration-200 ease-out"
	>
		<a
			class="flex max-md:flex-col gap-4 justify-between md:items-center p-4 hover:text-primary-500 transition-all duration-200 ease-out"
			href={`work/${work.slug}`}
		>
			<h2 class="text-2xl 2xl:text-4xl font-bold underline">
				{work.title}
			</h2>

			<Button class="max-md:w-full" color="primary" variant="filled" label="View More Details" />
		</a>
	</div>

	<div class="w-full grid grid-cols-1 xl:grid-cols-12 xl:grid-rows-3 gap-4">
		{#each work.thumbnailArray as thumbnail, i}
			{#if i === 0}
				<div
					class="col-span-1 xl:col-span-3 xl:row-span-3 xl:col-start-1 xl:row-start-1 rounded-2xl bg-gray-800 overflow-hidden"
				>
					<img class="object-cover w-full h-full" src={thumbnail.url} alt={thumbnail.alt} />
				</div>
			{:else}
				<div
					class="col-span-1 xl:col-span-3 xl:row-span-1 xl:col-start-4 xl:row-start-1 rounded-2xl bg-gray-800 overflow-hidden"
				>
					<img class="object-cover w-full h-full" src={thumbnail.url} alt={thumbnail.alt} />
				</div>
			{/if}
		{/each}

		<WorkCardDetails
			client={work.client}
			year={work.year}
			ProjectDuration={work.ProjectDuration}
			roles={work.role}
			stacks={work.stack}
		/>

		<div
			class="col-span-1 xl:col-span-6 xl:row-span-3 xl:col-start-7 xl:row-start-1 rounded-2xl bg-gray-800 aspect-[4/3] relative overflow-hidden"
		>
			<img class="object-cover w-full h-full" src={work.thumbnail} alt={work.thumbnailAlt} />
		</div>
	</div>
</div>
