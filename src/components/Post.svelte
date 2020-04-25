<script>
    import marked from 'marked';
    export let author;
    export let title;
    export let body;
</script>

<main>
    <h1>{title}</h1>
    <h3>by: {author}</h3>
    <div class="content">{@html marked(body)}</div>
</main>

<style>
</style>