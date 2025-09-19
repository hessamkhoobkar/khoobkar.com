<script lang="ts">
	import Apple from '@/assets/icons/Apple.svelte';
	import PageHero from '@/components/layout/PageHero.svelte';
	import WorkCard from '@/components/work/WorkCard.svelte';

	export let data;
</script>

<div class="flex flex-col justify-start items-start gap-6">
	<PageHero variant="surface">
		<div class="p-4 xl:p-10 xl:pt-8 xl:pb-0 max-w-4xl font-medium">
			<h1 class="font-black text-4xl mb-4">Curated collection of my work</h1>
			<p>
				I invite you to explore this carefully selected compilation of my most cherished works. Each
				piece is a testament to my dedication to craft, blending form and function to create digital
				experiences that resonate.
			</p>
		</div>
	</PageHero>

	<div class="flex flex-col gap-16 xl:gap-20 pb-16">
		{#each data.posts as work}
			<WorkCard {work} />

			<div class="w-full h-4 relative flex justify-center items-center last-of-type:hidden">
				<div class="w-full h-px bg-gray-500"></div>
				<div class="absolute bg-gray-900">
					<Apple class="w-8 h-8 xl:w-12 xl:h-12 text-gray-500" />
				</div>
			</div>
		{/each}
	</div>
</div>
