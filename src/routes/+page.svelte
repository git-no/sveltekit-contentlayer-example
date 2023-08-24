<script>
	export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="mt-20">
	<h2>Posts</h2>
	<ul>
		{#each data.posts as post}
			<li><a href={post.slugFull}>{post.title}</a></li>
		{/each}
	</ul>
</div>

<style>
	.mt-20 {
		margin-top: 20px;
	}
</style>
