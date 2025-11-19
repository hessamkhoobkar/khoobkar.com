import { error } from '@sveltejs/kit';
import { loadContentItem } from '$lib/utils/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await loadContentItem('insight', params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post,
		meta: post.meta
	};
};

