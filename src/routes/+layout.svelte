<script lang="ts">
	import '../app.css';

	// favicon
	import favicon from '$lib/assets/favicon.svg';
	import favicon96x96 from '$lib/assets/favicon-96x96.png';
	import faviconIco from '$lib/assets/favicon.ico';
	import faviconSvg from '$lib/assets/favicon.svg';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import siteWebmanifest from '$lib/assets/site.webmanifest';

	// Components imports
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import ScrollSmoother from '$lib/components/ui/ScrollSmoother.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<!-- favicon -->
	<link rel="icon" href={favicon} />
	<link rel="icon" type="image/png" href={favicon96x96} sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href={faviconSvg} />
	<link rel="shortcut icon" href={faviconIco} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<meta name="apple-mobile-web-app-title" content="Khoobkar" />
	<link rel="manifest" href={siteWebmanifest} />

	<!-- Meta Data -->
	<title>Hessam Khoobkar</title>
	<meta name="description" content="Hessam Khoobkar's personal website" />
	<meta
		name="keywords"
		content="Hessam Khoobkar, personal website, software engineer, full stack developer, AI, machine learning, data science, web development, mobile development, software development, software engineering, software architecture, software design, software development, software engineering, software architecture, software design"
	/>
	<meta name="author" content="Hessam Khoobkar" />
	<!-- <meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />
	<meta name="yandexbot" content="index, follow" />
	<meta name="google" content="notranslate" />
	<meta name="google" content="notranslate" /> -->
</svelte:head>

<div class="w-full">
	<div class="hidden w-full lg:block">
		<Sidebar />
	</div>
	<ScrollSmoother smooth={1.4} effects={true} smoothTouch={0.2}>
		<div class="pb-8">
			{@render children?.()}
		</div>
	</ScrollSmoother>
</div>
