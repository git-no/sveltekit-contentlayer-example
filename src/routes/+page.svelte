<script lang="ts">
	import { formatDate } from '$lib/helper/DateFromString';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>SvelteKit Contentlayer Demo</h1>

<p>Content driven by Contentlayer</p>

<ul>
	{#each data.posts as post}
		<li><a href={post.slugFull}>{post.title}</a> from {formatDate(post.date)}</li>
	{/each}
</ul>
