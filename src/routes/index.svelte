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
<!-- Brief about, few recent posts -->
<div class="about-blog">
  <h3>About this blog</h3>
  <p>I created this blog because I thought it'd be a neat way to share my experiences as a software developer 
  with the world, while documenting things that I'm learning along the way.</p>
</div>
</main>

<style>
</style>
