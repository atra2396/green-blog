<style>
	nav {
		font-weight: 300;
		/* padding: 0 1em; */
		display: flex;
		flex-direction: row;
		justify-content: start;
		max-width: 70em;
	}

	nav .logo {
		max-width: 10em;
	}

	div :hover {
		text-decoration: underline;
	}

	.spacer {
		flex-grow: 1;
	}

	.github {
		max-width: 1.2em;
	}

	a {
		text-decoration: none;
		color: inherit;
		padding: 1em 0.5em;
	}
</style>

<nav>
		<div><a rel=prefetch href='/'><img class='logo' src='/greendev.png' alt='The Green Developer'/></a></div>
		<div><a rel=prefetch href='/'>home</a></div>
		<div><a rel=prefetch href='blog'>blog</a></div>
		<div class="spacer"></div>
		<div><a href='www.github.com/atra2396'><img class='github' src='/github-logo.png' alt='GitHub Link'/></a></div>
</nav>
