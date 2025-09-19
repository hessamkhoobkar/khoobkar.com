import { error } from '@sveltejs/kit';
import { loadContentItem } from '$lib/utils/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await loadContentItem('blog', params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post,
		meta: post.meta
	};
};
