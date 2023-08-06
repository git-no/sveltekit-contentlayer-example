import { allPosts } from 'contentlayer/generated';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		posts: allPosts
	};
}) satisfies PageServerLoad;
