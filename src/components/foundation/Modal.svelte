<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Close from '@/assets/icons/Close.svelte';
	import Button from './Button/Button.svelte';
	import { fade } from 'svelte/transition';

	export let haveFooter = false;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal: HTMLElement;

	const handle_keydown = (event: any) => {
		if (event.key === 'Escape') {
			close();
			return;
		}

		if (event.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*') as NodeListOf<HTMLElement>;
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);
			let index = 0;
			if (document.activeElement) {
				index = tabbable.indexOf(document.activeElement as HTMLElement);
			}
			if (index === -1 && event.shiftKey) index = 0;

			index += tabbable.length + (event.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			event.preventDefault();
		}
	};

	const previously_focused =
		typeof document !== 'undefined' && (document.activeElement as HTMLElement);

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div
	class="fixed inset-0 w-screen h-screen bg-gray-900 bg-opacity-90 backdrop-blur-sm cursor-pointer z-40"
	on:click={close}
	on:keydown={handle_keydown}
	transition:fade|global={{
		duration: 300
	}}
/>

<!-- class="fixed top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 w-[calc(100vw - 4rem)] max-w-lg max-h-[calc(100vh - 4rem)] bg-gray-700 rounded-2xl z-50" -->
<div
	class="fixed inset-x-4 max-xl:bottom-4 xl:inset-x-0 xl:top-1/2 xl:-translate-y-1/2 mx-auto xl:max-w-xl bg-gray-700 rounded-2xl z-50"
	role="dialog"
	aria-modal="true"
	bind:this={modal}
	transition:fade|global={{
		duration: 300
	}}
>
	<!-- svelte-ignore a11y-autofocus -->
	<button
		class="absolute -top-12 right-0 flex justify-center items-center rounded-2xl px-4 py-2 bg-gray-800 text-white border border-transparent hover:text-red-500 hover:border-red-500 focus:outline-none focus:text-red-500 focus:border-red-500 transition-colors duration-200 ease-in-out"
		autofocus
		on:click={close}
	>
		<Close size="20" class="mr-1" />
		<span> Close </span>
	</button>
	<div class="p-4 xl:p-8 py-6">
		<slot name="header" />
	</div>
	<div class="p-4 xl:p-8 pt-0">
		<slot />
	</div>
	{#if haveFooter}
		<div
			class="p-4 xl:px-8 xl:py-4 bg-gray-800 rounded-b-2xl flex flex-col md:flex-row justify-end items-center gap-4"
		>
			<Button
				variant="filled"
				color="plain"
				label="Cancel"
				class="max-md:min-w-full"
				on:click={close}
			/>
			<Button
				variant="filled"
				color="primary"
				label="Bamboozled"
				class="min-w-full xl:min-w-[9rem]"
				on:click={close}
			/>
		</div>
	{/if}
</div>
