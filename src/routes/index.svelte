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
<!-- Brief about, few recent posts -->
<div>
  <h2>Alijah Green's Blog</h2>
  <p>This blog serves as a place for me to document what I'm learning, projects I'm working on, and stories from the workplace.
  </p>
</div>
</main>
