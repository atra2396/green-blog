<script>
	import Nav from '../components/Nav.svelte';

</script>

<style>

	.content {
		position: relative;
		max-width: 50em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Piazzolla:wght@300&display=swap" rel="stylesheet">
</svelte:head>

<main>
	<div class='content'>
		<Nav />
		<br>
		<slot></slot>
	</div>
</main>