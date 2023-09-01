import { error } from '@sveltejs/kit';
import { allPosts } from 'contentlayer/generated';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	try {
		const post = allPosts.find((post) => post.slug === params.slug);
		if (!post) {
			throw 'Content not found';
		}

		const content = await import(`../../../../content/posts/${post.fileName}.md`); // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#imports-must-end-with-a-file-extension

		return {
			post,
			content: content.default
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}) satisfies PageLoad;
