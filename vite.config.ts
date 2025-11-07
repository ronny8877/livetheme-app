import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	build: {
		sourcemap: false,
		cssCodeSplit: true,
		minify: 'esbuild',
		chunkSizeWarningLimit: 250,
		cssMinify: 'lightningcss'
	}
});
