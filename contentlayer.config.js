import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	slug: {
		type: 'string',
		resolve: (doc) => `/${doc._raw.flattenedPath}`
	},
	slugAsParams: {
		type: 'string',
		resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/')
	}
};

const Author = defineNestedType(() => ({
	name: 'Author',
	fields: {
		name: { type: 'string', required: true },
		handle: { type: 'string', required: true },
		avatar: { type: 'string', required: true }
	}
}));

export const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: `posts/**/*.md`,
	// contentType: "mdx",
	fields: {
		draft: {
			type: 'boolean',
			description: 'Show in production mode',
			default: false
		},
		title: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string'
		},
		date: {
			type: 'date',
			required: true
		},
		authors: {
			type: 'list',
			of: Author,
			required: false
		}
	},
	computedFields
}));

export default makeSource({
	contentDirPath: './content',
	documentTypes: [Post]
});
