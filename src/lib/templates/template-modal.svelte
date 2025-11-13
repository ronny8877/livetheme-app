<script lang="ts">
	import { X, Search } from '@lucide/svelte';
	import { templates_catalog, type TemplateDefinition } from '$lib/store/templates.svelte';
	import TemplateCard from './template-card.svelte';
	import { app_modals } from '$lib/store/app.svelte';

	let dialogEl: HTMLDialogElement | null = $state(null);
	let searchQuery = $state('');
	let selectedCategoryIndex = $state(0);
	let isOpen = $derived(app_modals.active_modal === 'templates');

	$effect(() => {
		if (isOpen) {
			// mount open
			if (dialogEl && !dialogEl.open) dialogEl.showModal();
		} else {
			if (dialogEl && dialogEl.open) dialogEl.close();
		}
	});

	function close() {
		app_modals.active_modal = null;
	}

	function onBackdrop(e: MouseEvent) {
		if (e.target === dialogEl) close();
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	if (typeof window !== 'undefined') {
		window.addEventListener('keydown', onKey);
		$effect(() => () => window.removeEventListener('keydown', onKey));
	}

	const categories = $derived([
		'All',
		...Array.from(new Set(templates_catalog.map((t) => t.category)))
	]);

	// Get selected category based on index
	const selectedCategory = $derived(categories[selectedCategoryIndex]);

	// Filter templates based on search query
	const filteredTemplates = $derived(() => {
		if (!searchQuery.trim()) {
			return templates_catalog;
		}

		const query = searchQuery.toLowerCase();
		return templates_catalog.filter(
			(template) =>
				template.title.toLowerCase().includes(query) ||
				template.description?.toLowerCase().includes(query) ||
				template.category.toLowerCase().includes(query) ||
				template.tags?.some((tag) => tag.toLowerCase().includes(query))
		);
	});

	// Filter templates based on search and category
	const shown = $derived(
		filteredTemplates().filter(
			(t: TemplateDefinition) => selectedCategory === 'All' || t.category === selectedCategory
		)
	);

	// Check if we're doing global search
	const isGlobalSearch = $derived(searchQuery.trim().length > 0);

	async function openTemplate(t: TemplateDefinition) {
		console.log('Selected template:', t);

		// Dynamically load the component
		const { loadTemplateComponent, active_template } = await import('$lib/store/templates.svelte');
		try {
			const component = await loadTemplateComponent(t);
			// Update the active template with the loaded component
			active_template.template = { ...t, component };
		} catch (error) {
			console.error('Failed to load template component:', error);
		}

		// Close modal after a short delay
		setTimeout(() => close(), 300);
	}
</script>

{#if isOpen}
	<dialog bind:this={dialogEl} class="modal p-0" onclick={onBackdrop}>
		<div
			class="hide-scrollbar modal-box h-[80vh] w-11/12 max-w-6xl gap-0 overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-0 shadow-2xl"
		>
			<!-- Header -->
			<header class="border-b border-base-300 p-6">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="font-body text-2xl font-bold tracking-tight text-base-content">
							Select Template
						</h2>
					</div>
					<button class="btn btn-circle btn-ghost btn-sm" aria-label="Close" onclick={close}>
						<X class="h-5 w-5" />
					</button>
				</div>
			</header>

			<!-- Search Bar -->
			<div class="border-b border-base-300 p-4">
				<div class="relative">
					<Search
						class="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-base-content/50"
					/>
					<input
						type="text"
						class="input input-lg w-full rounded-3xl pl-10 input-accent focus:outline-0"
						placeholder="Search templates, categories, or fonts..."
						bind:value={searchQuery}
					/>
				</div>
				{#if isGlobalSearch}
					<div class="mt-2 text-sm text-base-content/70">
						Found {shown.length} template{shown.length !== 1 ? 's' : ''} across all categories
					</div>
				{/if}
			</div>

			<!-- Content Container -->
			<div class="flex h-[calc(80vh-9rem)]">
				<!-- Categories Sidebar (desktop) - Hide when searching globally or on small screens -->
				{#if !isGlobalSearch}
					<div class="hidden w-64 border-r border-base-300 p-4 md:block">
						<h4 class="mb-4 font-semibold text-base-content">Categories</h4>
						<div class="hide-scrollbar h-[calc(80vh-9rem)] space-y-2 overflow-y-auto pb-5">
							{#each categories as category, index (category)}
								<button
									class="w-full cursor-pointer rounded-2xl p-3 text-left transition-all {selectedCategoryIndex ===
									index
										? 'bg-primary text-primary-content'
										: 'text-base-content hover:bg-base-200'}"
									onclick={() => (selectedCategoryIndex = index)}
								>
									<div class="font-body font-semibold">{category}</div>
									<div
										class="mt-1 text-xs {selectedCategoryIndex === index
											? 'text-primary-content/80'
											: 'text-base-content/60'}"
									>
										{category === 'All'
											? templates_catalog.length
											: templates_catalog.filter((t) => t.category === category).length} template{(category ===
										'All'
											? templates_catalog.length
											: templates_catalog.filter((t) => t.category === category).length) !== 1
											? 's'
											: ''}
									</div>
								</button>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Templates Grid -->
				<div class="flex-1 p-6 {isGlobalSearch ? 'w-full' : ''}">
					<!-- Category pills for small screens -->
					{#if !isGlobalSearch}
						<div class="mb-4 flex flex-wrap gap-2 md:hidden">
							{#each categories as category, idx (category)}
								<button
									onclick={() => (selectedCategoryIndex = idx)}
									class="rounded-full px-3 py-1 text-sm transition-all {selectedCategoryIndex ===
									idx
										? 'bg-primary text-primary-content'
										: 'bg-base-200 text-base-content/80'}"
								>
									{category}
								</button>
							{/each}
						</div>
					{/if}

					<div class="mb-6">
						<h4 class="text-xl font-semibold text-base-content">
							{isGlobalSearch ? 'Search Results' : selectedCategory}
						</h4>
						<p class="mt-1 text-base-content/70">
							{#if isGlobalSearch}
								Showing {shown.length} result{shown.length !== 1 ? 's' : ''} for "{searchQuery}"
							{:else}
								Choose from {shown.length} available template{shown.length !== 1 ? 's' : ''}
							{/if}
						</p>
					</div>

					<!-- Scrollable Template Grid -->
					<div class="hide-scrollbar h-80 overflow-y-auto md:h-[calc(100%-6rem)]">
						<div class="grid grid-cols-1 gap-4 pr-4 md:grid-cols-2">
							{#each shown as t (t.id)}
								<TemplateCard template={t} applying={false} onSelect={openTemplate} />
							{/each}
						</div>

						{#if shown.length === 0 && searchQuery.trim()}
							<div class="py-12 text-center">
								<div class="mb-2 text-base-content/50">No templates found</div>
								<p class="text-sm text-base-content/70">
									Try searching for different keywords or clear your search
								</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<form method="dialog" class="modal-backdrop bg-black/30 backdrop-blur-sm">
			<button aria-label="Close" onclick={close}>close</button>
		</form>
	</dialog>
{/if}
