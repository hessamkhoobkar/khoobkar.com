<script lang="ts">
	import placeholderBg from '@/assets/images/theme-placeholder-bg.png';
	export let title: string = 'Coming soon';
	export let price: string = 'Free';
	export let href: string = '#';
	export let thumbnail: string = placeholderBg;
	export let thumbnailAlt: string =
		'The word "theme" appears in bright white amidst a collection of dark orange ones. This image is a placeholder for the "coming soon" card.';
</script>

<div class="w-full rounded-2xl bg-gray-800 border border-gray-600">
	<a class="w-full h-full flex flex-col p-4 {href === '#' && 'cursor-default'}" {href}>
		<div class="w-full aspect-[4/3] rounded-xl overflow-hidden">
			<img class="object-cover" src={thumbnail} alt={thumbnailAlt} />
		</div>
		<div class="flex justify-between font-medium pt-4">
			<h3>{title}</h3>
			<span>{price}</span>
		</div>
	</a>
</div>
