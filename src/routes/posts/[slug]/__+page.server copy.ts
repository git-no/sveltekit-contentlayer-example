import { parseMDXFile } from '$lib/helper/MDX';
import { allPosts } from 'contentlayer/generated';
import path from 'path';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const post = allPosts.find((post) => post.slugAsParams === params.slug);

	// parse MDX and add result to Contentlayer doc object in body.html
	if (post) {
		const filePath = path.resolve(path.join('content', post._raw.sourceFilePath));
		const markdown = await parseMDXFile(filePath);
		if (markdown?.body) {
			post.body.html = markdown?.body;
			console.log(`data: ${JSON.stringify(markdown, null, 2)}`);
		}
	}

	return {
		post
	};
}) satisfies PageServerLoad;
