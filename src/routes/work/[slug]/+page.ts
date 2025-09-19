import { error } from '@sveltejs/kit';
import { loadContentItem } from '$lib/utils/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const caseStudy = await loadContentItem('case-studies', params.slug);

	if (!caseStudy) {
		throw error(404, 'Case study not found');
	}

	return {
		caseStudy,
		meta: caseStudy.meta
	};
};
