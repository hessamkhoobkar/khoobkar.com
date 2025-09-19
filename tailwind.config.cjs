/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gray: {
					50: '#dedfe1',
					100: '#d3d4d7',
					200: '#c9cacd',
					300: '#a8aaaf',
					400: '#666a74',
					500: '#252A38',
					600: '#212632',
					700: '#1c202a',
					800: '#161922',
					900: '#10141D'
				},
				primary: {
					50: '#ffe6e0',
					100: '#ffded5',
					200: '#ffd6cb',
					300: '#ffbdac',
					400: '#fe8c6d',
					500: '#FE5B2F',
					600: '#e5522a',
					700: '#bf4423',
					800: '#98371c',
					900: '#7c2d17'
				},
				tertiary: {
					50: '#ffece1',
					100: '#ffe6d7',
					200: '#ffe0cd',
					300: '#fecdae',
					400: '#fea872',
					500: '#FD8335',
					600: '#e47630',
					700: '#be6228',
					800: '#984f20',
					900: '#7c401a'
				}
			},
			screens: {
				'2xl': '1536px'
			},
			fontFamily: {
				sans: [
					'"Inter var", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
					{
						fontFeatureSettings: '"cv02","cv03","cv04","cv11"',
						fontVariationSettings: 'normal'
					}
				]
			}
		}
	},
	corePlugins: {
		aspectRatio: false
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')]
};
