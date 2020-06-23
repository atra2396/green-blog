<style>
	nav {
		border-bottom: 1px solid rgba(11, 73, 11, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	li :hover {
		background-color: #efffef;
	}

	a {
		text-decoration: none;
		color: inherit;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a rel=prefetch href='/'>home</a></li>
		<li><a rel=prefetch href='blog'>blog</a></li>
	</ul>
</nav>
