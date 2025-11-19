import { error } from '@sveltejs/kit';
import { loadContentItem } from '$lib/utils/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const caseStudy = await loadContentItem('work', params.slug);

		if (!caseStudy) {
			throw error(404, 'Case study not found');
		}

		return {
			caseStudy,
			meta: caseStudy.meta
		};
	} catch (err) {
		// Log error for debugging
		console.error('Error loading work case study:', err);
		// Re-throw to let SvelteKit handle it
		throw err;
	}
};
