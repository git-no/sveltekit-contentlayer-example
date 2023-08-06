import fm from 'front-matter';
import fs from 'fs';
import { compile as mdsvexCompile } from 'mdsvex';

export const parseMDXFile = async (filePath: string) => {
	try {
		const source = fs.readFileSync(filePath, 'utf-8');
		const { attributes, body } = fm(source);
		const md = await mdsvexCompile(body);

		return { attributes, body: md?.code };
	} catch (error) {
		return undefined;
	}
};

export const matterize = async (markdown: string) => {
	const { attributes: header, body } = fm(markdown);
	const md = await mdsvexCompile(markdown);

	console.log(`data: ${JSON.stringify(md, null, 2)}`);
	return { header, body: md?.data };
};

// export const matterize = async (
// 	markdown: string
// ): Promise<{ header: { [key: string]: any }; body: string }> => {
// 	const { attributes: header, body } = fm(markdown);

// 	const md = await mdsvexCompile(markdown);

// 	return { header, body: md.code };
// };
