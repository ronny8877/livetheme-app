<script lang="ts">
	// Simplified blog view template (different from existing blog.svelte) for demonstration
	const props = $props<{ title?: string }>();
</script>

<div class="min-h-screen space-y-10 bg-base-100 p-10 font-body text-base-content">
	<header class="flex items-center justify-between">
		<h1 class="heading-metrics font-heading text-3xl font-bold">
			{props.title || 'Blog View Template'}
		</h1>
		<nav class="flex gap-4 text-sm">
			<a href="/" class="link link-hover">Home</a>
			<a href="/" class="link link-hover">Articles</a>
			<a href="/" class="link link-hover">About</a>
		</nav>
	</header>

	<section class="grid gap-8 md:grid-cols-3">
		{#each Array.from({ length: 6 }) as _, i}
			<article class="card bg-base-200 p-4">
				<h3 class="heading-metrics mb-2 font-heading text-lg font-semibold">Post Title {i + 1}</h3>
				<p class="text-sm opacity-70">
					Short excerpt for the blog post to showcase typography and spacing.
				</p>
				<button class="btn mt-4 btn-sm btn-primary">Read More</button>
			</article>
		{/each}
	</section>

	<footer class="pt-10 text-center text-xs opacity-50">Example blog template footer.</footer>
</div>
