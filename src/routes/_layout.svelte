<script>
	import Nav from '../components/Nav.svelte';

</script>

<style>

	.content {
		position: relative;
		max-width: 60em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.logo {
	width: 15em;
	}
</style>


<main>
	<div class='content'>
		<a href='/'><img class='logo' src='/greendev.png' alt='The Green Developer'/></a>
		<Nav />
		<br>
		<slot></slot>
	</div>
</main>