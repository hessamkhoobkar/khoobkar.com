<script lang="ts">
	import Instagram from '@lucide/svelte/icons/instagram';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Github from '@lucide/svelte/icons/github';
	import Dribbble from '@lucide/svelte/icons/dribbble';
	import GradientButton from '$lib/components/ui/GradientButton.svelte';

	const socialLinks = [
		{
			label: 'GitHub',
			href: 'https://github.com/khoobkar',
			icon: Github
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/khoobkar/',
			icon: Linkedin
		},
		{
			label: 'Instagram',
			href: 'https://www.instagram.com/khoobkar/',
			icon: Instagram
		},
		{
			label: 'Dribbble',
			href: 'https://www.dribbble.com/khoobkar/',
			icon: Dribbble
		}
	];
</script>

<div class="p-2">
	<div class="flex flex-col gap-4 rounded-xl border border-surface-600 bg-surface-700 p-2">
		<div class="mb-1 flex w-full items-center justify-start gap-4 p-2">
			<img
				src="https://khoobkar.com/_app/immutable/assets/hessam-avatar.b941527b.jpg"
				class="h-12 w-12 rounded-xl"
				alt="Myself in front of a wall"
			/>
			<div class="flex flex-col gap-1">
				<span class="font-bold">Hessam Khoobkar</span>
				<span class="text-xs text-gray-400">amirhessam.dev@gmail.com</span>
			</div>
		</div>
		<div class="flex w-full gap-2">
			{#each socialLinks as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="btn h-12 w-full rounded-xl border-2 border-surface-800 btn-lg text-surface-300 hover:border-primary-500 hover:bg-primary-600/10 hover:text-primary-500"
					title={link.label}
				>
					<svelte:component this={link.icon} class="h-4 w-4" />
				</a>
			{/each}
		</div>
		<div class="flex flex-col gap-2">
			<a
				href="/resume"
				class="resume-button btn h-12 w-full rounded-2xl border-2 border-surface-600 bg-surface-800 btn-lg text-surface-200 transition-colors duration-300 ease-in-out active:scale-[0.98]"
				title="Resume"
			>
				<span class="text-sm font-bold"> My Resume </span>
			</a>
			<GradientButton href="/contact" title="Contact Me">
				<span class="text-sm font-bold"> Contact Me </span>
			</GradientButton>
		</div>
	</div>
</div>

<style>
	/* Resume Button - Override hover to match nav link active state */
	.resume-button:hover {
		background: linear-gradient(
			45deg,
			oklch(68% 0.21 45) 0%,
			oklch(65% 0.23 40) 50%,
			oklch(62% 0.25 38) 100%
		) !important;
		color: oklch(15.22% 0.008 68.34) !important;
		border-color: transparent !important;
		box-shadow:
			0 2px 8px oklch(65% 0.23 40 / 0.5),
			0 0 20px oklch(62% 0.25 38 / 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
		filter: brightness(1) !important;
	}
</style>
