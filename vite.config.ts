import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	// Explicitly load environment variables from .env files
	// This ensures .env.local is properly loaded
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
		// Explicitly define PUBLIC_ env vars to ensure they're available
		define: {
			'import.meta.env.PUBLIC_FORMSPREE_ENDPOINT': JSON.stringify(
				env.PUBLIC_FORMSPREE_ENDPOINT || ''
			)
		}
	};
});
