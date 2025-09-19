<script lang="ts">
	import ButtonType from './ButtonType.svelte';

	// TODO:
	// Add icon dynamic sizeing realtive to selceted size
	// Add icon fix by flex order
	// Finish color and varient styles

	let klass = '';
	export { klass as class };

	export let icon: any | null = null;
	export let iconFix: 'prefix' | 'suffix' = 'prefix';
	export let disabled: boolean = false;
	export let label: string | null = null;
	export let href: string | null = null;
	export let target: '_blank' | '_self' = '_self';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let variant: 'filled' | 'tonal' | 'outline' | 'text' = 'filled';
	export let color: 'primary' | 'secondary' | 'success' | 'danger' | 'plain' = 'primary';
	export let type: 'button' | 'submit' | 'reset' = 'button';

	// Styling & Classes
	// Base style for all buttons
	let baseStyle =
		'inline-flex justify-center items-center rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-primary-900 transition-all ease-in-out duration-200 group';

	// Size Classes & icon sizes
	$: btnSize =
		size === 'small'
			? 'text-xs h-12'
			: size === 'large'
				? 'text-baselg h-14 py-4 px-10'
				: 'text-sm h-12 py-3 px-6';

	$: iconSize = size === 'small' ? '20' : size === 'large' ? '24' : '20';

	// Variant & Color Classes
	let variantStyle: string;
	$: switch (true) {
		case variant === 'filled' && color === 'primary' && disabled:
			variantStyle =
				'bg-primary-700 border-primary-700 text-primary-900 hover:bg-primary-700 hover:text-primary-900 opacity-70 cursor-not-allowed';
			break;

		case variant === 'filled' && color === 'primary':
			variantStyle =
				'bg-gradient-to-br from-primary-500 to-tertiary-500 border-primary-600 text-gray-900 hover:opacity-80';
			break;

		case variant === 'filled' && color === 'plain':
			variantStyle =
				'bg-gray-800 border-gray-800 text-white hover:bg-primary-900 hover:bg-opacity-20 hover:text-primary-500 hover:border-primary-700';
			break;

		case variant === 'outline' && color === 'plain':
			variantStyle =
				'border-2 border-gray-800 text-white hover:bg-gray-800 hover:text-primary-500 hover:border-primary-500';
			break;

		default:
			variantStyle = '';
			break;
	}
</script>

<ButtonType
	on:click
	class="{baseStyle} {variantStyle} {btnSize} {klass} focus:ring-2"
	{href}
	{target}
	{disabled}
	{type}
>
	{#if icon !== null}
		<span
			class=" {iconFix === 'prefix' ? 'order-1' : 'order-2'} 
			{label !== null && iconFix === 'prefix' ? 'mr-2' : ''}
			{label !== null && iconFix === 'suffix' ? 'ml-2' : ''}"
		>
			<svelte:component
				this={icon}
				size={iconSize}
				class="opacity-30 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
			/>
		</span>
	{/if}
	{#if label !== null}
		<span
			class="leading-none font-bold {iconFix === 'prefix' ? 'order-2' : 'order-1'}
		{icon !== null && iconFix === 'prefix' ? 'me-2' : ''}
		"
		>
			{label}
		</span>
	{/if}
</ButtonType>
