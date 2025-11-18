<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const status = $derived($page.status);
	const error = $derived($page.error);

	const statusCode = $derived(status || 500);
	const statusText = $derived(
		statusCode === 404
			? 'Page Not Found'
			: statusCode === 500
				? 'Internal Server Error'
				: 'An Error Occurred'
	);

	const message = $derived(
		statusCode === 404
			? "The page you're looking for doesn't exist or has been moved."
			: statusCode === 500
				? 'Something went wrong on our end. Please try again later.'
				: 'An unexpected error occurred. Please try again.'
	);

	onMount(() => {
		// Log error for monitoring (in production, this would go to error tracking service)
		if (error) {
			console.error('Page error:', { status: statusCode, error });
		}
	});
</script>

<svelte:head>
	<title>{statusCode} - {statusText} | Hessam Khoobkar</title>
	<meta name="description" content={message} />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-surface-950 px-6">
	<div class="max-w-md text-center">
		<div class="mb-8">
			<h1
				class="text-6xl font-bold text-primary-500 drop-shadow-[0_0_20px_rgba(239,94,3,0.3)]"
			>
				{statusCode}
			</h1>
			<h2 class="mt-4 text-2xl font-semibold text-surface-50">{statusText}</h2>
			<p class="mt-4 text-surface-300">{message}</p>
		</div>

		<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="/"
				class="inline-flex items-center justify-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-6 py-3 text-sm font-semibold tracking-[0.3em] text-primary-300 uppercase transition hover:border-primary-500 hover:bg-primary-500/20 hover:text-primary-200"
			>
				Go Home
			</a>
			<a
				href="mailto:amirhessam.dev@gmail.com?subject=Error Report - {statusCode}"
				class="inline-flex items-center justify-center gap-2 rounded-full border border-surface-700/60 bg-surface-800/50 px-6 py-3 text-sm font-semibold tracking-[0.3em] text-surface-200 uppercase transition hover:border-surface-600 hover:bg-surface-800/70"
			>
				Report Issue
			</a>
		</div>
	</div>
</div>

