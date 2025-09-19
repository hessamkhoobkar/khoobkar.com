import { error } from '@sveltejs/kit';
import { loadContentItem } from '$lib/utils/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const resource = await loadContentItem('resources', params.slug);

	if (!resource) {
		throw error(404, 'Resource not found');
	}

	return {
		resource,
		meta: resource.meta
	};
};
