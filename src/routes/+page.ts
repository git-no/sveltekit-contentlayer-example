import { allPosts } from 'contentlayer/generated';
import type { PageLoad } from './$types';

export const load = (() => {
	return {
		posts: allPosts
	};
}) satisfies PageLoad;
