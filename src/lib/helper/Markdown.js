import fm from 'front-matter';
import { compile as mdsvexCompile } from 'mdsvex';

/**
 * Convert a string to front-matter object and content string.
 * @param {string} markdown - The string containing two comma-separated numbers.
 * @return {Promise<{header:{[key:string]:any},body:string|undefined}>}
 */
export const matterize = async (markdown) => {
	const { attributes: header, body } = fm(markdown);
	const md = await mdsvexCompile(markdown);

	console.log(`data: ${JSON.stringify(md, null, 2)}`);
	return { header, body: md?.data };
};
