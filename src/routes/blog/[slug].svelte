<script context="module">
	import marked from 'marked';
	import fm from 'front-matter';
	import format from 'date-format';

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const postData = fm(await(res.text()));

		if (res.status === 200) {
			return { post: postData };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>

<style>
	.post-content :global(h1) {
		font-size: 3.0em;
		font-weight: 400;
	}

	.post-content :global(h2) {
		font-size: 2.4em;
		font-weight: 300;
	}

	.date {
		font-size: 0.8em;
		font-weight: 200;
	}

	.post-content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.post-content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.post-content :global(ul) {
		line-height: 1.5;
	}

	.post-content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.post-content :global(p){
		font-size: 1.15em;
	}

</style>

<svelte:head>
	<title>{post.attributes.title}</title>
</svelte:head>

<main class='post-content'>
	<h1>{post.attributes.title}</h1>
	<h5 class='date'>{format('MM/dd/yyyy',post.attributes.date)}</h5>

	<div>
		{@html marked(post.body)}
	</div>
</main>

