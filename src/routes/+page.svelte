<script lang="ts">
	import { formatDate } from '$lib/helper/DateFromString';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="prose">
	<h1>SvelteKit Contentlayer Demo</h1>
	<p>
		Just <strong>two code lines</strong> in Svelte to support MDX, frontmatter in markdown and
		Svelte components in markdown, made with SvelteKit,
		<a href="https://www.contentlayer.dev/">Contentlayer</a> and MDsveX.
	</p>
	<p />
	<ul>
		{#each data.posts as post}
			<li><a href={post.slugFull}>{post.title}</a> from {formatDate(post.date)}</li>
		{/each}
	</ul>
</div>
