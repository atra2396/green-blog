<script>
import { onMount } from 'svelte';
import Post from '../components/Post.svelte';

  onMount(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  });
</script>

<svelte:head>
	<title>Title</title>
	<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<main>
<Post author="Me" title="Fake post" body="body"></Post>
</main>

<style>
</style>
