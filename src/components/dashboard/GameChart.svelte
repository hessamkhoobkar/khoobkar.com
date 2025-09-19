<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let canvas: HTMLCanvasElement;

	const data = {
		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		datasets: [
			{
				label: 'Work',
				data: [8, 8, 9, 8, 8, 2, 0],
				borderWidth: 2,
				borderRadius: Number.MAX_VALUE,
				borderSkipped: false,
				borderColor: 'rgba(	99, 102, 241, 1)',
				backgroundColor: 'rgba(	99, 102, 241, 0.4)'
			},
			{
				label: 'Video Games',
				data: [2, 5, 3, 5, 4, 8, 10],
				borderWidth: 2,
				borderRadius: Number.MAX_VALUE,
				borderSkipped: false,
				borderColor: 'rgba(	14, 165, 233, 1)',
				backgroundColor: 'rgba(	14, 165, 233, 0.4)'
			}
		]
	};

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			const chart = new Chart(ctx, {
				type: 'bar',
				data,
				options: {
					scales: {
						y: {
							beginAtZero: true,
							title: {
								display: true,
								text: 'Hours per day'
							}
						}
					}
				}
			});
		}
	});
</script>

<div class="bg-gray-800 shadow-lg shadow-gray-900 rounded-2xl p-6 col-span-6">
	<h3
		class="text-lg mb-4 font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-teal-500 uppercase"
	>
		Video game and work balance
	</h3>
	<canvas bind:this={canvas}></canvas>
</div>
