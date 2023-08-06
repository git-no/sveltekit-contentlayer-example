<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: author = data.post?.authors ? data.post.authors[0] : null;
</script>

<h1>{data.post?.title}</h1>
<h5>Author: {author?.name}</h5>

<article>
	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<!-- <div>{@html data.post?.body.html}</div> -->
