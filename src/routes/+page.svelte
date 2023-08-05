<script lang="ts">
	import { DateFromString } from '$lib/helper/DateFromString';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>SvelteKit Contentlayer Demo</h1>

<p>Content driven by Contentlayer</p>

<ul>
	{#each data.posts as post}
		<li><a href={post.slug}>{post.title}</a> from {DateFromString(post.date)}</li>
	{/each}
</ul>
