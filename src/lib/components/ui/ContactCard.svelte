<script lang="ts">
	import type { Component } from 'svelte';
	import { ExternalLink } from '@lucide/svelte';

	interface Props {
		icon: Component<any>;
		title: string;
		subtitle: string;
		description: string;
		actions?: Array<{
			label: string;
			href?: string;
			onClick?: () => void | Promise<void>;
			icon?: Component<any>;
			external?: boolean;
			ariaLabel?: string;
		}>;
	}

	let { icon: Icon, title, subtitle, description, actions = [] }: Props = $props();
</script>

<section class="rounded-xl border border-surface-700 bg-surface-800/50 p-6 shadow-lg">
	<div class="mb-4 flex items-center gap-3">
		<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20">
			<Icon size={20} class="text-primary-400" aria-hidden="true" />
		</div>
		<div>
			<h3 class="text-lg font-bold text-surface-50">{title}</h3>
			<p class="text-xs text-surface-400">{subtitle}</p>
		</div>
	</div>
	<p class="mb-12 text-sm text-surface-300">
		{description}
	</p>
	{#if actions.length > 0}
		<div class="flex flex-col gap-3">
			{#each actions as action}
				{#if action.href}
					<a
						href={action.href}
						target={action.external ? '_blank' : undefined}
						rel={action.external ? 'noopener noreferrer' : undefined}
						aria-label={action.ariaLabel}
						class="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-600 bg-surface-700/50 px-4 py-3 text-sm font-medium text-surface-300 transition-all hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
					>
						{#if action.icon}
							{@const IconComponent = action.icon}
							<IconComponent size={18} aria-hidden="true" />
						{/if}
						<span>{action.label}</span>
						{#if action.external}
							<ExternalLink size={16} class="text-surface-400" aria-hidden="true" />
						{/if}
					</a>
				{:else if action.onClick}
					<button
						type="button"
						onclick={action.onClick}
						aria-label={action.ariaLabel}
						class="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-600 bg-surface-700/50 px-4 py-3 text-sm font-medium text-surface-300 transition-all hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-300"
					>
						{#if action.icon}
							{@const IconComponent = action.icon}
							<IconComponent size={18} aria-hidden="true" />
						{/if}
						<span>{action.label}</span>
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</section>
