<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`blog.json`);
		const postList = JSON.parse(await res.text());
		if (res.status === 200) {
			return { recentPosts: postList.slice(0, Math.min(postList.length, 5)) };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let recentPosts;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<main>
	<ol reversed>
		{ #each recentPosts as post }
		<li><a href="blog/{post.slug}">{ post.title }</a></li>
		{ /each }
	</ol>
</main>
