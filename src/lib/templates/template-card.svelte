<script lang="ts">
	import type { TemplateDefinition } from '$lib/store/templates.svelte';
	import { Type } from '@lucide/svelte';

	const props = $props<{
		template: TemplateDefinition;
		applying?: boolean;
		onSelect: (t: TemplateDefinition) => void;
	}>();

	function select() {
		props.onSelect(props.template);
	}

	// Format font names for display
	const formatFontName = (font?: string) => {
		if (!font) return '';
		return font
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	};
</script>

<button
	class="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-base-300 bg-base-100 p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
	disabled={props.applying}
	onclick={select}
>
	<!-- Hover gradient overlay -->
	<div
		class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	></div>

	<!-- Framework Badge -->
	{#if props.template.framework}
		<div class="absolute top-3 right-3 z-10">
			<span class="badge gap-1 badge-sm badge-primary">
				{props.template.framework}
			</span>
		</div>
	{/if}

	<!-- Content -->
	<div class="relative z-10 flex flex-col gap-4">
		<!-- Header -->
		<div class="flex items-start gap-3">
			<div class="flex-1">
				<h3
					class="font-body text-2xl leading-relaxed font-bold tracking-tight transition-colors duration-200 group-hover:text-primary"
				>
					{props.template.title}
				</h3>
				<p class="mt-1.5 badge badge-ghost badge-sm">
					{props.template.category}
				</p>
			</div>
			{#if props.applying}
				<div class="loading loading-sm loading-spinner text-primary"></div>
			{/if}
		</div>

		<!-- Description -->
		<p class="line-clamp-2 text-sm leading-relaxed text-base-content/70">
			{props.template.description}
		</p>

		<!-- Font Info -->
		{#if props.template.fonts?.heading || props.template.fonts?.body}
			<div class="flex items-center gap-2 text-xs text-base-content/60">
				<Type class="h-4 w-4 text-base-content/40" />
				<div class="flex flex-wrap gap-2">
					{#if props.template.fonts?.heading}
						<span class="font-medium">
							H: <span class="text-primary">{formatFontName(props.template.fonts.heading)}</span>
						</span>
					{/if}
					{#if props.template.fonts?.body}
						<span class="font-medium">
							B: <span class="text-secondary">{formatFontName(props.template.fonts.body)}</span>
						</span>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Tags -->
		{#if props.template.tags && props.template.tags.length > 0}
			<div class="flex flex-wrap gap-1.5">
				{#each props.template.tags.slice(0, 3) as tag}
					<span class="badge badge-outline badge-xs">
						{tag}
					</span>
				{/each}
				{#if props.template.tags.length > 3}
					<span class="badge badge-ghost badge-xs">
						+{props.template.tags.length - 3}
					</span>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Hover indicator -->
	<div
		class="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-primary via-secondary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	></div>
</button>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
