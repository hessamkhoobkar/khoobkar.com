<script lang="ts">
	export let variant: 'primary' | 'surface' = 'primary';
	let variantStyle: string;

	$: switch (true) {
		case variant === 'primary':
			variantStyle = 'bg-gradient-to-br from-primary-600 to-tertiary-500 text-gray-900';
			break;

		case variant === 'surface':
			variantStyle = 'bg-gradient-to-tr from-gray-800 to-gray-500 text-white';
			break;

		default:
			variantStyle = '';
			break;
	}
</script>

<div class="w-full rounded-2xl mt-4 min-h-60 font-medium overflow-hidden {variantStyle}">
	<slot />
</div>
