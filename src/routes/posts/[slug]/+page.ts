import { allPosts } from 'contentlayer/generated';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const post = allPosts.find((post) => post.slugAsParams === params.slug);

	return {
		post
	};
}) satisfies PageLoad;
