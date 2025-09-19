<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let canvas: HTMLCanvasElement;

	const data = {
		datasets: [
			{
				label: 'Projects',
				data: [8, 4, 1],
				borderWidth: 4,
				borderColor: 'rgb(24, 32, 47)',
				backgroundColor: ['#FE5B2F', '#8E7DBE', '#99C1B9'],
				borderRadius: 9999
			}
		]
	};

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			const chart = new Chart(ctx, {
				type: 'doughnut',
				data,
				options: {
					responsive: true,
					cutout: '80%'
				}
			});
		}
	});
</script>

<div
	class="col-span-1 md:col-span-3 xl:col-span-4 bg-gray-800 shadow-lg shadow-gray-900 rounded-2xl p-6"
>
	<h3
		class="text-lg mb-4 font-black bg-clip-text text-transparent bg-gradient-to-br from-primary-500 to-tertiary-500 uppercase"
	>
		My Work Categories
	</h3>
	<div class="max-h-52 w-full">
		<canvas bind:this={canvas} class="mx-auto"></canvas>
	</div>
	<div class="flex flex-col mt-8 gap-2 text-sm">
		<div class="flex justify-between items-center font-medium">
			<span class="bg-primary-500 w-2 h-2 rounded-full mr-4"></span>
			<span class="text-primary-500 mr-auto">UI Design Projects</span>
			<span class="text-gray-400 mr-2">8</span>
			<span class="text-primary-500">62%</span>
		</div>
		<div class="flex justify-between items-center font-medium">
			<span class="bg-[#8E7DBE] w-2 h-2 rounded-full mr-4"></span>
			<span class="text-[#8E7DBE] mr-auto">Front-end Projects</span>
			<span class="text-gray-400 mr-2">4</span>
			<span class="text-[#8E7DBE]">30%</span>
		</div>
		<div class="flex justify-between items-center font-medium">
			<span class="bg-[#99C1B9] w-2 h-2 rounded-full mr-4"></span>
			<span class="text-[#99C1B9] mr-auto">Full-stack Projects</span>
			<span class="text-gray-400 mr-2">1</span>
			<span class="text-[#99C1B9]">8%</span>
		</div>
	</div>
</div>
