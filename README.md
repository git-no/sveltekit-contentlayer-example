# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Manually Installation and Setup


### Preparation

- SvelteKit installed (remove node_modules, package-lock.json, remove .folders

### Install Contentlayer and Configure
```bash
pnpm i
pnpm update --latest
pnpm build
pnpm dev
pnpm i contentlayer -D
pnpm i concurrently -D
```

#### Add scripts in package.json 
```json
		"dev": "concurrently \"npm:dev:content\" \"npm:dev:svelte\"",
		"dev:content": "contentlayer dev",
		"dev:svelte": "vite dev",
		"build": "contentlayer build && vite build",
		"build:content": "contentlayer build",
		"build:content-clear": "contentlayer build --clearCache",
		"build:svelte": "vite build",
```

### Create contentlayer.config.js
```js
import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';
import path from 'path';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/').toLowerCase()
	},
	slugFull: {
		type: 'string',
		resolve: (doc) => `/${doc._raw.flattenedPath.toLowerCase()}`
	},
	fileName: {
		type: 'string',
		resolve: (doc) => path.parse(doc._raw.sourceFilePath.split('/').slice(-1).join('/')).name
	},
	suffix: {
		type: 'string',
		resolve: (doc) => path.parse(doc._raw.sourceFilePath.split('/').slice(-1).join('/')).ext
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
	fields: {
		draft: {
			type: 'boolean',
			description: 'Disable in production mode',
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
	documentTypes: [Post],
	disableImportAliasWarning: true
});
```

### Create Content folder
- /content/posts
- create .md files

### Generate Content 

```bash
pnpm build:content
```

### Create Post List

#### Extend tsconfig.ts (compilerOptions)
```json
"include": [
	"./svelte-kit/ambient.d.ts",
	"./svelte-kit/types/**/$types.d.ts",
	"./vite.config.ts",
	"./src/**/*.js",
	"./src/**/*.ts",
	"./src/**/*.svelte",
	"./tests/**/*.js",
	"./tests/**/*.ts",
	"./tests/**/*.svelte",
	".contentlayer/generated"
],
"exclude": [
	"../node_modules/**",
	"./[!ambient.d.ts]**",
	"../src/service-worker.js",
	"../src/service-worker.ts",
	"../src/service-worker.d.ts",
	"./.contentlayer/generated"
]
```

#### Extend vite.config.ts
```ts
import { fileURLToPath, URL } from 'url';

server: {
	fs: {
		strict: false
	}
},
resolve: {
	alias: [
		{
			find: 'contentlayer/generated',
			replacement: fileURLToPath(new URL('./.contentlayer/generated', import.meta.url))
		}
	]
}
```

#### Create routes/+page.ts

```svelte
import { dev } from '$app/environment';
import { allPosts } from 'contentlayer/generated';
import type { PageLoad } from './$types';

export const load = (async () => {
	// Filter only NOT DRAFT posts in productive mode

	const posts = dev ? allPosts : allPosts.filter((post) => post.draft === false);

	return {
		posts
	};
}) satisfies PageLoad;

```

#### Extend routes/+page.svelte 

```svelte
<script>
	export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="mt-20">
	<h2>Posts</h2>
	<ul>
		{#each data.posts as post}
			<li>{post.title}</li>
		{/each}
	</ul>
</div>

<style>
	.mt-20 {
		margin-top: 20px;
	}
</style>

```

#### Check result

```bash
pnpm dev:svelte
```

### Create Single Post

#### Create /routes/posts/[slug]/+page.ts

```ts
import { error } from '@sveltejs/kit';
import { allPosts } from 'contentlayer/generated';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	console.log(params.slug)
	try {
		const post = allPosts.find((post) => post.slug === params.slug);
		if (!post) {
			throw 'Content not found';
		}

		return {
			post
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}) satisfies PageLoad;
```

#### Extend /routes/posts/[slug]/+page.svelte
```svelte
<script>
	export let data;
</script>

{@html data.post.body.html}
```

- Check rendered pages, change markdown

### MDX

#### Install MDsveX
```bash
pnpm i mdsvex -D
```


#### Extend svelte.config.js
```js
import { mdsvex } from 'mdsvex';

extensions: ['.svelte', '.md', '.svelte.md'],
preprocess: [mdsvex({ extensions: ['.svelte.md', '.md', '.svx'] }), vitePreprocess()],
```

#### Extend post +page.ts

```ts
const content = await import(`../../../../..content/posts/${post.fileName}.md`);
return {
	post,
	content: content.default
};
```


#### Extended post +page.svelte

```svelte
<svelte:component this={data.content} />
```

Add frontmatter in markdown, add Svelte components in markdown, all will be rendered.

<script context="module">
    import {ExternalComponent} from '$lib/components/ExternalComponent.svelte'
</script>

<ExternalComponent>
markdown lorem ipsum
</ExternalComponent>