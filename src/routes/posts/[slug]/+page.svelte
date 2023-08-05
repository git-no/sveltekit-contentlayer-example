<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: author = data.post?.authors ? data.post.authors[0] : null;
</script>

<h1>{data.post?.title}</h1>
{#if author}
	<h5>Author: {author?.name}</h5>
{/if}
<div>{@html data.post?.body.html}</div>
