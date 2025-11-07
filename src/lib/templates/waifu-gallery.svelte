<script lang="ts">
	import { X, Maximize2, Heart, ExternalLink, Sparkles, Search, Tag } from '@lucide/svelte';
	import { onMount } from 'svelte';

	interface WaifuImage {
		url: string;
		signature: string;
		extension: string;
		image_id: number;
		favorites: number;
		dominant_color: string;
		source: string;
		artist: {
			name: string;
			artist_id: number;
		};
		tags: Array<{
			tag_id: number;
			name: string;
			description: string;
		}>;
	}

	interface CacheEntry {
		data: WaifuImage[];
		timestamp: number;
		query: string;
	}

	const CACHE_KEY = 'waifu-gallery-cache';
	const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

	// Popular tags for filtering
	const popularTags = [
		'maid',
		'uniform',
		'selfies',
		'waifu',
		'marin-kitagawa',
		'mori-calliope',
		'raiden-shogun',
		'oppai'
	];

	let images = $state<WaifuImage[]>([]);
	let loading = $state(true);
	let error = $state('');
	let selectedImage = $state<WaifuImage | null>(null);
	let page = $state(1);
	let loadingMore = $state(false);
	let searchQuery = $state('');
	let selectedTags = $state<string[]>([]);
	let showTagFilter = $state(false);

	function getCacheKey(): string {
		const tags = selectedTags.sort().join(',');
		return `${CACHE_KEY}-${tags || 'all'}`;
	}

	function getCache(): WaifuImage[] | null {
		try {
			const cached = localStorage.getItem(getCacheKey());
			if (!cached) return null;

			const entry: CacheEntry = JSON.parse(cached);
			const now = Date.now();

			// Check if cache is still valid
			if (now - entry.timestamp < CACHE_DURATION) {
				console.log('Using cached data');
				return entry.data;
			} else {
				// Clear expired cache
				localStorage.removeItem(getCacheKey());
				return null;
			}
		} catch (e) {
			console.error('Error reading cache:', e);
			return null;
		}
	}

	function setCache(data: WaifuImage[]) {
		try {
			const entry: CacheEntry = {
				data,
				timestamp: Date.now(),
				query: selectedTags.join(',')
			};
			localStorage.setItem(getCacheKey(), JSON.stringify(entry));
		} catch (e) {
			console.error('Error writing cache:', e);
			// Clear old caches if storage is full
			clearOldCaches();
		}
	}

	function clearOldCaches() {
		try {
			const keys = Object.keys(localStorage);
			keys.forEach((key) => {
				if (key.startsWith(CACHE_KEY)) {
					localStorage.removeItem(key);
				}
			});
		} catch (e) {
			console.error('Error clearing caches:', e);
		}
	}

	async function fetchImages(pageNum: number = 1, useCache: boolean = true) {
		try {
			if (pageNum === 1) {
				loading = true;

				// Try to use cache first
				if (useCache) {
					const cachedData = getCache();
					if (cachedData && cachedData.length > 0) {
						images = cachedData;
						loading = false;
						return;
					}
				}
			} else {
				loadingMore = true;
			}

			// Build query parameters
			let url = `https://api.waifu.im/search/?is_nsfw=false&many=true&limit=30`;

			if (selectedTags.length > 0) {
				url += `&included_tags=${selectedTags.join(',')}`;
			}

			// Fetch from API
			const response = await fetch(url);
			const data: any = await response.json();

			if (data.images && Array.isArray(data.images)) {
				if (pageNum === 1) {
					images = data.images;
					// Cache the results
					setCache(data.images);
				} else {
					images = [...images, ...data.images];
				}
			}
		} catch (e) {
			error = 'Failed to load images. Please try again later.';
			console.error('Error fetching images:', e);
		} finally {
			loading = false;
			loadingMore = false;
		}
	}

	function loadMore() {
		page++;
		fetchImages(page, false); // Don't use cache for pagination
	}

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function applyFilters() {
		page = 1;
		images = [];
		fetchImages(1, true); // Try cache first
	}

	function clearFilters() {
		selectedTags = [];
		searchQuery = '';
		page = 1;
		images = [];
		fetchImages(1, true);
	}

	// Filter images based on search query (client-side filtering)
	let filteredImages = $derived(
		searchQuery.trim()
			? images.filter((img) => {
					const query = searchQuery.toLowerCase();
					const artistName = img.artist?.name?.toLowerCase() || '';
					const tags = img.tags.map((t) => t.name.toLowerCase()).join(' ');
					return artistName.includes(query) || tags.includes(query);
				})
			: images
	);

	function openImage(image: WaifuImage) {
		selectedImage = image;
		document.body.style.overflow = 'hidden';
	}

	function closeImage() {
		selectedImage = null;
		document.body.style.overflow = 'auto';
	}

	onMount(() => {
		fetchImages();
		return () => {
			document.body.style.overflow = 'auto';
		};
	});
</script>

<div class="font-body min-h-screen bg-gradient-to-br from-base-100 to-base-200">
	<!-- Header with API Credit & Search -->
	<header
		class=" z-40 mx-auto max-w-6xl rounded-b-3xl border-b border-base-300 bg-base-100/80 shadow-sm backdrop-blur-lg"
	>
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div class="flex items-center gap-2">
						<Sparkles class="h-6 w-6 text-primary" />
						<h1
							class="heading-metrics font-heading text-xl font-bold text-base-content sm:text-2xl"
						>
							Waifu Gallery
						</h1>
					</div>
					<a
						href="https://docs.waifu.im/"
						target="_blank"
						rel="noopener noreferrer"
						class="btn gap-2 rounded-full border-2 border-primary/20 bg-primary/10 text-primary btn-sm hover:bg-primary hover:text-primary-content"
					>
						<span class="text-xs sm:text-sm">Powered by waifu.im</span>
						<ExternalLink class="h-3 w-3 sm:h-4 sm:w-4" />
					</a>
				</div>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section
		class="relative mx-auto my-8 max-w-7xl overflow-hidden rounded-4xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 shadow-md"
	>
		<div
			class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-30"
		></div>

		<div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div class="text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
				>
					<Sparkles class="h-4 w-4" />
					<span>Curated Anime Art Collection</span>
				</div>

				<h2
					class="heading-metrics mb-4 font-heading text-4xl font-extrabold text-base-content sm:text-6xl lg:text-7xl"
				>
					<span
						class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
					>
						Waifu
					</span>
				</h2>

				<div class="flex flex-wrap items-center justify-center gap-4">
					<div class="flex items-center gap-2 rounded-lg bg-base-100/50 px-4 py-2 backdrop-blur-sm">
						<Heart class="h-5 w-5 text-error" />
						<span class="text-sm font-medium text-base-content">
							{images.length}+ Artworks
						</span>
					</div>
					<div class="flex items-center gap-2 rounded-lg bg-base-100/50 px-4 py-2 backdrop-blur-sm">
						<Sparkles class="h-5 w-5 text-warning" />
						<span class="text-sm font-medium text-base-content"> SFW Content Only </span>
					</div>
					<div class="flex items-center gap-2 rounded-lg bg-base-100/50 px-4 py-2 backdrop-blur-sm">
						<ExternalLink class="h-5 w-5 text-info" />
						<span class="text-sm font-medium text-base-content"> High Quality </span>
					</div>
				</div>
			</div>
		</div>

		<!-- Decorative elements -->
		<div class="absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
		<div class="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
	</section>
	<div class="mx-auto max-w-4xl">
		<!-- Search Bar -->
		<div class="flex flex-col gap-2 sm:flex-row">
			<div class="relative flex-1">
				<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-base-content/50" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search by artist or tags..."
					class="input-bordered input input-sm w-full pr-4 pl-10"
				/>
			</div>
			<button class="btn gap-2 btn-outline btn-sm" onclick={() => (showTagFilter = !showTagFilter)}>
				<Tag class="h-4 w-4" />
				Tags {selectedTags.length > 0 ? `(${selectedTags.length})` : ''}
			</button>
			{#if selectedTags.length > 0 || searchQuery}
				<button class="btn btn-ghost" onclick={clearFilters}> Clear </button>
			{/if}
		</div>

		<!-- Tag Filter -->
		{#if showTagFilter}
			<div class="rounded-lg border border-base-300 bg-base-200 p-4">
				<div class="mb-3 flex items-center justify-between">
					<h3 class="font-semibold text-base-content">Filter by Tags</h3>
					<button
						class="btn btn-sm btn-primary"
						onclick={() => {
							applyFilters();
							showTagFilter = false;
						}}
					>
						Apply Filters
					</button>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each popularTags as tag}
						<button
							class="badge badge-lg transition-all hover:scale-105 {selectedTags.includes(tag)
								? 'badge-primary'
								: 'badge-outline'}"
							onclick={() => toggleTag(tag)}
						>
							{tag}
						</button>
					{/each}
				</div>
				{#if selectedTags.length > 0}
					<div class="mt-3 text-xs text-base-content/60">
						Selected: {selectedTags.join(', ')}
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		{#if loading}
			<div class="flex min-h-[60vh] items-center justify-center">
				<div class="text-center">
					<span class="loading loading-lg loading-spinner text-primary"></span>
					<p class="mt-4 text-base-content/70">Loading beautiful art...</p>
				</div>
			</div>
		{:else if error}
			<div class="flex min-h-[60vh] items-center justify-center">
				<div class="text-center">
					<p class="text-error">{error}</p>
					<button class="btn mt-4 btn-primary" onclick={() => fetchImages()}> Try Again </button>
				</div>
			</div>
		{:else}
			<!-- Results Info -->
			{#if searchQuery || selectedTags.length > 0}
				<div class="mb-4 rounded-lg bg-base-200 p-4">
					<p class="text-sm text-base-content/70">
						{#if searchQuery && selectedTags.length > 0}
							Showing {filteredImages.length} results for
							<span class="font-semibold">"{searchQuery}"</span>
							with tags: <span class="font-semibold">{selectedTags.join(', ')}</span>
						{:else if searchQuery}
							Showing {filteredImages.length} results for
							<span class="font-semibold">"{searchQuery}"</span>
						{:else}
							Showing {filteredImages.length} results for tags:
							<span class="font-semibold">{selectedTags.join(', ')}</span>
						{/if}
					</p>
				</div>
			{/if}

			<!-- Masonry Grid -->
			<div class="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
				{#each filteredImages as image, i (`${image.image_id}-${i}`)}
					<div
						class="group relative break-inside-avoid overflow-hidden rounded-3xl bg-base-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
						style="animation: fadeIn 0.5s ease-in {i * 0.05}s backwards;"
					>
						<button class="relative block w-full cursor-pointer" onclick={() => openImage(image)}>
							<img
								src={image.url}
								alt="Waifu art by {image.artist?.name || 'Unknown Artist'}"
								class="h-auto w-full transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
							>
								<div class="absolute right-0 bottom-0 left-0 p-4">
									<div class="flex items-center justify-between text-white">
										<div class="flex items-center gap-2">
											<Heart class="h-4 w-4" />
											<span class="text-sm font-semibold">{image.favorites}</span>
										</div>
										<Maximize2 class="h-5 w-5" />
									</div>
								</div>
							</div>
						</button>

						<!-- Info Card (visible on hover) -->
						<div
							class="absolute top-2 right-2 left-2 translate-y-[-120%] rounded-xl bg-base-100/90 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0"
						>
							<p class="truncate text-xs font-semibold text-base-content">
								By {image.artist?.name || 'Unknown Artist'}
							</p>
							{#if image.tags && image.tags.length > 0}
								<div class="mt-1 flex flex-wrap gap-1">
									{#each image.tags.slice(0, 3) as tag}
										<span class="badge badge-xs badge-primary">{tag.name}</span>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Load More Button -->
			{#if !searchQuery && filteredImages.length > 0}
				<div class="mt-8 text-center">
					<button
						class="btn btn-wide rounded-full btn-primary"
						onclick={loadMore}
						disabled={loadingMore}
					>
						{#if loadingMore}
							<span class="loading loading-sm loading-spinner"></span>
							Loading...
						{:else}
							Load More
						{/if}
					</button>
					<p class="mt-2 text-xs text-base-content/50">
						Cached results are used when available to prevent API overload
					</p>
				</div>
			{:else if searchQuery && filteredImages.length === 0}
				<div class="mt-8 text-center">
					<p class="text-base-content/70">No results found for "{searchQuery}"</p>
					<button class="btn mt-2 btn-ghost btn-sm" onclick={() => (searchQuery = '')}>
						Clear search
					</button>
				</div>
			{/if}
		{/if}
	</main>

	<!-- Footer -->
	<footer class="border-t border-base-300 bg-base-200 py-6">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<p class="text-sm text-base-content/60">
				All images are safe-for-work content provided by
				<a
					href="https://docs.waifu.im/"
					target="_blank"
					rel="noopener noreferrer"
					class="link link-primary"
				>
					waifu.im API
				</a>
			</p>
			<p class="mt-2 text-xs text-base-content/40">
				This template showcases how themes look with dynamic image galleries
			</p>
		</div>
	</footer>

	<!-- Fullscreen Modal -->
	{#if selectedImage}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all duration-300 ease-out"
			style="animation: fadeIn 0.3s ease-out;"
			onclick={closeImage}
			onkeydown={(e) => e.key === 'Escape' && closeImage()}
			role="button"
			tabindex="0"
			aria-label="Close modal"
		>
			<button
				class="btn absolute top-4 right-4 btn-circle text-white btn-ghost hover:bg-white/20"
				onclick={closeImage}
			>
				<X class="h-6 w-6" />
			</button>

			<div
				class="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-base-100 shadow-2xl transition-all duration-300 ease-out"
				style="animation: modalSlideUp 0.3s ease-out;"
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				tabindex="-1"
			>
				<div class="grid gap-0 md:grid-cols-2">
					<!-- Image -->
					<div class="flex items-center justify-center bg-base-200 p-4">
						<img
							src={selectedImage.url}
							alt="Waifu art by {selectedImage.artist?.name || 'Unknown Artist'}"
							class="max-h-[60vh] w-auto rounded-lg object-contain md:max-h-[80vh]"
						/>
					</div>

					<!-- Details -->
					<div class="flex flex-col gap-4 p-6">
						<div>
							<h3 class="heading-metrics font-heading text-xl font-bold text-base-content">
								Art Details
							</h3>
							<div class="mt-4 space-y-3">
								<div>
									<p class="text-xs font-semibold tracking-wide text-base-content/60 uppercase">
										Artist
									</p>
									<p class="text-base font-medium text-base-content">
										{selectedImage.artist?.name || 'Unknown Artist'}
									</p>
								</div>

								{#if selectedImage.source}
									<div>
										<p class="text-xs font-semibold tracking-wide text-base-content/60 uppercase">
											Source
										</p>
										<a
											href={selectedImage.source}
											target="_blank"
											rel="noopener noreferrer"
											class="link text-sm link-primary"
										>
											View Original
											<ExternalLink class="ml-1 inline h-3 w-3" />
										</a>
									</div>
								{/if}

								<div>
									<p class="text-xs font-semibold tracking-wide text-base-content/60 uppercase">
										Favorites
									</p>
									<div class="flex items-center gap-2 text-base-content">
										<Heart class="h-4 w-4 text-error" />
										<span class="font-medium">{selectedImage.favorites}</span>
									</div>
								</div>

								{#if selectedImage.tags && selectedImage.tags.length > 0}
									<div>
										<p
											class="mb-2 text-xs font-semibold tracking-wide text-base-content/60 uppercase"
										>
											Tags
										</p>
										<div class="flex flex-wrap gap-2">
											{#each selectedImage.tags as tag}
												<span class="badge badge-primary">{tag.name}</span>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						</div>

						<div class="mt-auto flex gap-2">
							<a
								href={selectedImage.url}
								target="_blank"
								rel="noopener noreferrer"
								class="btn flex-1 btn-primary"
							>
								Open Full Size
							</a>
							<button class="btn btn-ghost" onclick={closeImage}> Close </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes modalSlideUp {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(20px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
