<script>
	import { page } from '$app/stores';
	import '../app.css';

	console.log(`d: ${JSON.stringify($page.route)}`);
</script>

<div class="container mx-auto min-h-screen">
	<div class="my-10">
		<slot />
	</div>

	<hr class="my-5 border-slate-400" />
	{#if $page.route.id !== '/'}
		<a class="font-bold" href="/">Back to Home</a> -
	{/if}
	<a href="https://github.com/git-no/sveltekit-contentlayer-example">GitHub Repository</a>
	<p>
		<a href="https://www.contentlayer.dev/">Contentlayer</a> is a fast and easy content SDK that validates
		and transforms the markdown content into type-safe JSON.
	</p>
</div>
