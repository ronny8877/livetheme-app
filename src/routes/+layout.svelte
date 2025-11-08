<script lang="ts">
	import '../app.css';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/dist/backdrop.css';
	import 'tippy.js/animations/shift-away.css';
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<QueryClientProvider client={queryClient}>
	<main
		data-theme={data.theme}
		style="height: 100vh;"
		class="thin-scrollbar max-w-screen overflow-x-hidden font-sans"
	>
		{@render children()}
	</main>
</QueryClientProvider>
