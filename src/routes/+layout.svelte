<script>
	import { page } from '$app/stores';
	import '../app.css';
</script>

<div class="container mx-auto min-h-screen">
	<div class="my-10">
		<slot />
	</div>

	<hr class="my-5 border-slate-400" />
	{#if $page.route.id !== '/'}
		<a class="font-bold bg-yellow-200" href="/">Back to Home</a>
	{/if}
	<p>
		<a href="https://www.contentlayer.dev/">Contentlayer</a> is a fast and easy content SDK that validates
		and transforms the markdown content into type-safe JSON.
	</p>

	<a class="font-bold" href="https://github.com/git-no/sveltekit-contentlayer-example"
		>GitHub Repository</a
	>, have a look into /src/routes/posts/[slug]/+page.ts line 13 and +page.svelte line 15.
</div>
