<script lang="ts">
	import '../app.css';

	import SideNavWrap from '@/components/layout/SideNavWrap.svelte';
	import PageTransition from './transition.svelte';

	export let data: any;
</script>

<svelte:head>
	<meta name="title" content="Hessam Khoobkar | Front End Developer and UI Designer Portfolio" />
	<meta
		name="description"
		content="Hessam Khoobkar's portfolio website showcasing his front-end development and UI design skills. Get in touch for web development collaborations."
	/>
	<meta
		name="keywords"
		content="front-end developer, front end developer, UI designer, web development, HTML, CSS, JavaScript, responsive design, user experience, user interface, portfolio"
	/>
</svelte:head>

<SideNavWrap />
<div class="min-h-screen xl:ml-72 2xl:ml-80">
	<div class="w-full max-w-screen-2xl mx-auto p-4 bg-gray-900">
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	</div>
</div>

<style lang="postcss">
	@reference;

	:global(html) {
		@apply antialiased text-base font-sans text-gray-100 bg-gray-900;
		scroll-behavior: smooth;
	}

	:global(.article-content h3) {
		@apply text-5xl leading-tight font-normal mb-4 text-sky-500;
	}

	:global(.article-content p) {
		@apply text-base leading-6 font-normal mb-4;
	}

	:global(::-webkit-scrollbar) {
		width: 10px;
	}

	:global(::-webkit-scrollbar-track) {
		box-shadow: inset 0 0 1px #a8aaaf;
		border-radius: 0px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #fe5b2f;
		border-radius: 0px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: #fe5b2f;
	}
</style>
