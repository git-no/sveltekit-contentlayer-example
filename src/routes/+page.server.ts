import { dev } from '$app/environment';
import { allPosts } from 'contentlayer/generated';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// Filter only NOT DRAFT posts in productive mode
	const posts = dev ? allPosts : allPosts.filter((post) => post.draft === false);

	return {
		posts
	};
}) satisfies PageServerLoad;
