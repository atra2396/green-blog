<script>
import { onMount } from 'svelte';

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
	<title>The Green Developer Blog</title>
	<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<main>

<div>
  <h2>Alijah Green's Blog</h2>
  <h3>Who am I?</h3>
  <p>My name is Alijah Green, and I'm a software developer from the Lexington, KY area. I created this blog as a way for me to 
  document things I'm learning, projects I'm working on, and stories from the workplace.
  <br><br>
  <a href='https://www.github.com/atra2396' target='_blank'>Here</a> is a link to my GitHub, where you can find the source for this very blog.
  </p>

</div>
</main>
