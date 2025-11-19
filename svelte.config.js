import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	layout: {
		blog: resolve(__dirname, 'src/lib/components/layouts/BlogLayout.svelte'),
		'case-study': resolve(__dirname, 'src/lib/components/layouts/CaseStudyLayout.svelte'),
		_: resolve(__dirname, 'src/lib/components/layouts/DefaultLayout.svelte')
	},
	remarkPlugins: [],
	rehypePlugins: []
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			// Runtime options for Vercel
			runtime: 'nodejs20.x'
		}),
		alias: {
			$content: './src/content'
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
