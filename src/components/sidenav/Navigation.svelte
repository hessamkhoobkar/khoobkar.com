<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	import AppleIcon from '@/assets/icons/Apple.svelte';
	import AtSignIcon from '@/assets/icons/At.svelte';
	import DeviceCodeIcon from '@/assets/icons/DeviceCode.svelte';
	import ColorSwatchIcon from '@/assets/icons/ColorSwatch.svelte';
	import HomeIcon from '@/assets/icons/Home.svelte';
	import TailwindIcon from '@/assets/icons/Tailwind.svelte';

	const links = [
		{ adress: '/', label: 'Dashboard', icon: HomeIcon, disabled: false },
		{ adress: '/work', label: 'My Work', icon: AppleIcon, disabled: false },
		{ adress: '/projects', label: 'Projects', icon: DeviceCodeIcon, disabled: false },
		{ adress: '/themes', label: 'Free Themes', icon: ColorSwatchIcon, disabled: false },
		{ adress: '#', label: 'Tailwind Collection', icon: TailwindIcon, disabled: true },
		// { adress: '#', label: 'My Services', icon: TagsIcon, disabled: true },
		{ adress: '/contact', label: 'Contact Me', icon: AtSignIcon, disabled: false }
	];

	const dispatch = createEventDispatcher();

	function handleToggle() {
		dispatch('linkClick');
	}
</script>

<ul>
	{#each links as { adress, label, icon, disabled }}
		<li>
			<a
				on:click={handleToggle}
				href={adress}
				class="flex gap-3 p-3 rounded-2xl border border-transparent mb-1 group {$page.url
					.pathname === adress
					? 'bg-gradient-to-br from-primary-500 to-tertiary-500 border-primary-600'
					: ''}					
					{disabled ? 'cursor-not-allowed' : ''}
					"
			>
				<svelte:component
					this={icon}
					class="transition-colors duration-300 ease-in-out {$page.url.pathname === adress
						? 'text-gray-900 group-hover:text-gray-900'
						: disabled
							? 'text-gray-600 group-hover:text-gray-600'
							: 'text-gray-500 group-hover:text-primary-500'}
						
						"
				/>
				<span
					class="transition-colors duration-300 ease-in-out font-medium {$page.url.pathname ===
					adress
						? 'text-gray-900 group-hover:text-gray-900'
						: disabled
							? 'text-gray-500 group-hover:text-gray-500'
							: 'text-gray-300 group-hover:text-white'}
						"
				>
					{label}
				</span>
			</a>
		</li>
	{/each}
</ul>
