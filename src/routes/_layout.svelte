<script>
	import Nav from '../components/Nav.svelte';

	// export let segment;
</script>

<style>
	main {
		background-color: #fbfbfb;
		min-height: 100vh
	}

	.content {
		position: relative;
		max-width: 60em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	h1 {
		font-size: 2em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 2em;
		}
	}
</style>


<main>
	<div class='content'>
		<h1>The Green Developer</h1>
		<!-- <Nav {segment}/> -->
		<slot></slot>
	</div>
</main>