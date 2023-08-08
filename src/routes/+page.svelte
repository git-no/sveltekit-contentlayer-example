<script lang="ts">
	import { formatDate } from '$lib/helper/DateFromString';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="prose">
	<h1>SvelteKit Contentlayer Demo</h1>
	<p>
		Support of MDX, frontmatter in markdown, Svelte components in markdown with SvelteKit and <a
			href="https://www.contentlayer.dev/">Contentlayer</a
		>.
	</p>
	<p />
	<ul>
		{#each data.posts as post}
			<li><a href={post.slugFull}>{post.title}</a> from {formatDate(post.date)}</li>
		{/each}
	</ul>
</div>
