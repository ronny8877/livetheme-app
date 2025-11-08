<script lang="ts">
	import {
		Play,
		ThumbsUp,
		ThumbsDown,
		Share2,
		Download,
		MoreHorizontal,
		Search,
		Bell,
		Menu,
		Home,
		Compass,
		Library,
		History,
		Clock,
		Film,
		X
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface Video {
		id: string;
		title: string;
		channel: string;
		channelAvatar: string;
		views: string;
		timestamp: string;
		duration: string;
		thumbnail: string;
		description: string;
		likes: string;
		dislikes: string;
		subscribers: string;
	}

	interface VideoCategory {
		id: string;
		name: string;
	}

	const STORAGE_KEY = 'youtube-watch-history';

	// Mock data for videos
	const videoDatabase: Video[] = [
		{
			id: '1',
			title: 'Building a Modern Web App with SvelteKit',
			channel: 'WebDev Pro',
			channelAvatar: '🚀',
			views: '125K',
			timestamp: '2 days ago',
			duration: '15:42',
			thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			description:
				'Learn how to build a modern, performant web application using SvelteKit. We cover routing, server-side rendering, and more!',
			likes: '3.2K',
			dislikes: '45',
			subscribers: '245K'
		},
		{
			id: '2',
			title: 'CSS Grid vs Flexbox: When to Use Each',
			channel: 'Design Masters',
			channelAvatar: '🎨',
			views: '89K',
			timestamp: '5 days ago',
			duration: '12:18',
			thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
			description:
				'A comprehensive guide on when to use CSS Grid versus Flexbox for your layouts. Includes practical examples!',
			likes: '2.1K',
			dislikes: '23',
			subscribers: '189K'
		},
		{
			id: '3',
			title: 'Advanced TypeScript Patterns You Should Know',
			channel: 'Code Academy',
			channelAvatar: '💻',
			views: '203K',
			timestamp: '1 week ago',
			duration: '22:35',
			thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
			description:
				'Master advanced TypeScript patterns including generics, conditional types, and mapped types with real-world examples.',
			likes: '5.8K',
			dislikes: '67',
			subscribers: '512K'
		},
		{
			id: '4',
			title: 'UI/UX Design Principles That Actually Work',
			channel: 'UX Insights',
			channelAvatar: '✨',
			views: '156K',
			timestamp: '3 days ago',
			duration: '18:24',
			thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
			description:
				'Discover the fundamental UI/UX principles that separate good designs from great ones. Backed by research and case studies.',
			likes: '4.3K',
			dislikes: '52',
			subscribers: '378K'
		},
		{
			id: '5',
			title: 'Building RESTful APIs with Node.js',
			channel: 'Backend Boss',
			channelAvatar: '⚡',
			views: '98K',
			timestamp: '4 days ago',
			duration: '28:15',
			thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
			description:
				'Complete guide to building secure, scalable RESTful APIs using Node.js and Express. Includes authentication and validation.',
			likes: '2.7K',
			dislikes: '34',
			subscribers: '298K'
		},
		{
			id: '6',
			title: 'React vs Vue vs Svelte: Framework Comparison 2024',
			channel: 'Tech Debates',
			channelAvatar: '🔥',
			views: '412K',
			timestamp: '2 weeks ago',
			duration: '32:48',
			thumbnail: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
			description:
				'An honest, unbiased comparison of the top JavaScript frameworks. Performance benchmarks, developer experience, and more.',
			likes: '12.4K',
			dislikes: '234',
			subscribers: '892K'
		},
		{
			id: '7',
			title: 'Mastering Git: Advanced Commands and Workflows',
			channel: 'Dev Tools Daily',
			channelAvatar: '🔧',
			views: '67K',
			timestamp: '6 days ago',
			duration: '16:52',
			thumbnail: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
			description:
				'Level up your Git skills with advanced commands, rebasing strategies, and professional workflows used by top developers.',
			likes: '1.9K',
			dislikes: '18',
			subscribers: '156K'
		},
		{
			id: '8',
			title: 'Web Performance Optimization: From 5s to 0.5s',
			channel: 'Speed Demons',
			channelAvatar: '⚡',
			views: '178K',
			timestamp: '1 week ago',
			duration: '24:36',
			thumbnail: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
			description:
				'Real-world case study of optimizing a slow website. Code splitting, lazy loading, caching strategies, and more!',
			likes: '5.2K',
			dislikes: '43',
			subscribers: '423K'
		},
		{
			id: '9',
			title: 'Introduction to Machine Learning with Python',
			channel: 'AI Explained',
			channelAvatar: '🤖',
			views: '289K',
			timestamp: '3 weeks ago',
			duration: '42:12',
			thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
			description:
				'Beginner-friendly introduction to machine learning concepts and practical implementation using Python and scikit-learn.',
			likes: '8.7K',
			dislikes: '123',
			subscribers: '634K'
		},
		{
			id: '10',
			title: 'Docker Containers Explained Simply',
			channel: 'DevOps Guide',
			channelAvatar: '🐳',
			views: '145K',
			timestamp: '5 days ago',
			duration: '19:27',
			thumbnail: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
			description:
				'Demystifying Docker containers. Learn what they are, why they matter, and how to use them in your development workflow.',
			likes: '4.1K',
			dislikes: '56',
			subscribers: '312K'
		},
		{
			id: '11',
			title: 'Building Accessible Web Applications',
			channel: 'Web For All',
			channelAvatar: '♿',
			views: '54K',
			timestamp: '1 week ago',
			duration: '21:18',
			thumbnail: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
			description:
				'Learn how to make your web applications accessible to everyone. ARIA labels, keyboard navigation, screen readers, and more.',
			likes: '1.8K',
			dislikes: '12',
			subscribers: '98K'
		},
		{
			id: '12',
			title: 'GraphQL vs REST: Modern API Design',
			channel: 'API Architects',
			channelAvatar: '🌐',
			views: '112K',
			timestamp: '4 days ago',
			duration: '17:54',
			thumbnail: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
			description:
				'Deep dive into GraphQL and REST APIs. Learn the pros, cons, and when to use each approach for your next project.',
			likes: '3.5K',
			dislikes: '48',
			subscribers: '267K'
		}
	];

	const categories: VideoCategory[] = [
		{ id: 'all', name: 'All' },
		{ id: 'web-dev', name: 'Web Development' },
		{ id: 'design', name: 'Design' },
		{ id: 'javascript', name: 'JavaScript' },
		{ id: 'backend', name: 'Backend' },
		{ id: 'devops', name: 'DevOps' },
		{ id: 'ai', name: 'AI & ML' },
		{ id: 'mobile', name: 'Mobile Dev' }
	];

	let currentView = $state<'home' | 'player'>('home');
	let currentVideo = $state<Video | null>(null);
	let selectedCategory = $state('all');
	let searchQuery = $state('');
	let sidebarOpen = $state(false);
	let watchHistory = $state<string[]>([]);
	let mounted = $state(false);
	let showDescription = $state(false);
	let isTransitioning = $state(false);

	// Load watch history
	onMount(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				watchHistory = JSON.parse(stored);
			}
		} catch (e) {
			console.error('Failed to load watch history:', e);
		}
		mounted = true;
	});

	// Save watch history
	$effect(() => {
		if (mounted && watchHistory.length > 0) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(watchHistory));
			} catch (e) {
				console.error('Failed to save watch history:', e);
			}
		}
	});

	function openVideo(video: Video) {
		isTransitioning = true;

		// Close sidebar on mobile when opening video
		sidebarOpen = false;

		// Small delay for smooth transition
		setTimeout(() => {
			currentVideo = video;
			currentView = 'player';
			showDescription = false;

			// Add to watch history
			if (!watchHistory.includes(video.id)) {
				watchHistory = [video.id, ...watchHistory].slice(0, 50); // Keep last 50
			}

			isTransitioning = false;

			// Scroll to top smoothly
			if (typeof window !== 'undefined') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}, 150);
	}

	function goHome() {
		isTransitioning = true;

		setTimeout(() => {
			currentView = 'home';
			currentVideo = null;
			showDescription = false;
			isTransitioning = false;

			// Scroll to top
			if (typeof window !== 'undefined') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}, 150);
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function getFilteredVideos(): Video[] {
		let filtered = videoDatabase;

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(v) =>
					v.title.toLowerCase().includes(query) ||
					v.channel.toLowerCase().includes(query) ||
					v.description.toLowerCase().includes(query)
			);
		}

		return filtered;
	}

	function getRelatedVideos(): Video[] {
		if (!currentVideo) return [];
		const current = currentVideo;
		return videoDatabase.filter((v) => v.id !== current.id).slice(0, 8);
	}
</script>

<div class="flex h-screen flex-col overflow-hidden bg-base-100 font-body">
	<!-- Header -->
	<header class="flex h-14 items-center gap-4 border-b border-base-300 bg-base-100 px-4 shadow-sm">
		<button
			class="btn btn-square btn-ghost transition-transform duration-200 btn-sm hover:scale-110 active:scale-95"
			onclick={toggleSidebar}
			aria-label="Toggle sidebar"
		>
			{#if sidebarOpen}
				<X class="h-5 w-5" />
			{:else}
				<Menu class="h-5 w-5" />
			{/if}
		</button>

		<button
			class="flex items-center gap-2 transition-transform duration-200 hover:scale-105 active:scale-95"
			onclick={goHome}
			aria-label="Go to home"
		>
			<div
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-error text-lg font-bold text-error-content shadow-md"
			>
				▶
			</div>
			<span class="text-lg font-bold">ViewTube</span>
		</button>

		<div class="mx-auto flex w-full max-w-2xl items-center gap-2">
			<div class="relative flex-1">
				<input
					type="text"
					placeholder="Search videos..."
					class="input-bordered input input-sm w-full pr-10 pl-4 transition-shadow duration-200 focus:shadow-md"
					bind:value={searchQuery}
					onkeydown={(e) => {
						if (e.key === 'Enter' && currentView === 'player') {
							goHome();
						}
					}}
				/>
				<button
					class="btn absolute top-0 right-0 btn-square btn-ghost transition-transform duration-200 btn-sm hover:scale-110"
					aria-label="Search"
					onclick={() => {
						if (currentView === 'player' && searchQuery.trim()) {
							goHome();
						}
					}}
				>
					<Search class="h-4 w-4" />
				</button>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button
				class="btn btn-square btn-ghost transition-transform duration-200 btn-sm hover:scale-110 active:scale-95"
				aria-label="Notifications"
			>
				<Bell class="h-5 w-5" />
			</button>
			<button
				class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content shadow-md transition-transform duration-200 hover:scale-110 active:scale-95"
				aria-label="User menu"
			>
				U
			</button>
		</div>
	</header>

	<div class="flex flex-1 overflow-hidden">
		<!-- Sidebar -->
		<aside
			class="absolute top-0 z-40 flex h-[calc(100vh)] w-64 flex-col overflow-y-auto border-r border-base-300 bg-base-100 transition-transform duration-300 ease-out lg:relative lg:translate-x-0"
			class:translate-x-0={sidebarOpen}
			class:-translate-x-full={!sidebarOpen}
		>
			<nav class="flex flex-col gap-1 p-3">
				<button
					class="btn justify-start transition-transform duration-200 btn-sm hover:scale-105"
					class:btn-primary={currentView === 'home'}
					class:btn-ghost={currentView !== 'home'}
					onclick={goHome}
					disabled={isTransitioning}
				>
					<Home class="h-4 w-4" />
					Home
				</button>
				<button
					class="btn justify-start btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
				>
					<Compass class="h-4 w-4" />
					Explore
				</button>
				<button
					class="btn justify-start btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
				>
					<Library class="h-4 w-4" />
					Library
				</button>
				<button
					class="btn justify-start btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
				>
					<History class="h-4 w-4" />
					History
				</button>

				<div class="divider my-2"></div>

				<div class="px-3 py-2 text-xs font-semibold uppercase opacity-60">Subscriptions</div>
				<button
					class="btn justify-start gap-3 btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
				>
					<div class="text-lg">🚀</div>
					<span class="text-sm">WebDev Pro</span>
				</button>
				<button
					class="btn justify-start gap-3 btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
				>
					<div class="text-lg">🎨</div>
					<span class="text-sm">Design Masters</span>
				</button>
				<button
					class="btn justify-start gap-3 btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
				>
					<div class="text-lg">💻</div>
					<span class="text-sm">Code Academy</span>
				</button>
				<button
					class="btn justify-start gap-3 btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
				>
					<div class="text-lg">⚡</div>
					<span class="text-sm">Backend Boss</span>
				</button>

				<div class="divider my-2"></div>

				<div class="px-3 py-2 text-xs font-semibold uppercase opacity-60">Watch History</div>
				{#if watchHistory.length > 0}
					{#each watchHistory.slice(0, 5) as videoId (videoId)}
						{@const video = videoDatabase.find((v) => v.id === videoId)}
						{#if video}
							<button
								class="btn h-auto justify-start gap-2 py-2 btn-ghost transition-transform duration-200 btn-sm hover:scale-105"
								onclick={() => openVideo(video)}
								disabled={isTransitioning}
							>
								<Clock class="h-3 w-3 shrink-0" />
								<span class="line-clamp-2 text-left text-xs">{video.title}</span>
							</button>
						{/if}
					{/each}
				{:else}
					<p class="px-3 text-xs opacity-50">No watch history yet</p>
				{/if}
			</nav>
		</aside>

		<!-- Overlay for mobile -->
		{#if sidebarOpen}
			<button
				class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
				onclick={toggleSidebar}
				aria-label="Close sidebar"
				transition:fade={{ duration: 200 }}
			></button>
		{/if}

		<!-- Main Content -->
		<main class="flex-1 overflow-y-auto">
			{#if currentView === 'home'}
				<!-- Home View with Video Grid -->
				<div class="p-6" in:fade={{ duration: 300, delay: 150 }} out:fade={{ duration: 150 }}>
					<!-- Category Pills -->
					<div class="mb-6 flex gap-3 overflow-x-auto pb-2">
						{#each categories as category (category.id)}
							<button
								class="btn whitespace-nowrap transition-transform duration-200 btn-sm hover:scale-105 active:scale-95"
								class:btn-primary={selectedCategory === category.id}
								class:btn-ghost={selectedCategory !== category.id}
								onclick={() => (selectedCategory = category.id)}
							>
								{category.name}
							</button>
						{/each}
					</div>

					<!-- Video Grid -->
					<div
						class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
					>
						{#each getFilteredVideos() as video (video.id)}
							<button
								class="text-left transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
								onclick={() => openVideo(video)}
								disabled={isTransitioning}
							>
								<div class="group cursor-pointer">
									<div
										class="relative mb-3 aspect-video overflow-hidden rounded-xl bg-base-200 shadow-md transition-shadow duration-200 group-hover:shadow-xl"
									>
										<div
											class="h-full w-full transition-transform duration-300 group-hover:scale-105"
											style="background: {video.thumbnail}"
										></div>
										<div
											class="absolute right-2 bottom-2 rounded bg-black/90 px-1.5 py-0.5 text-xs font-semibold text-white"
										>
											{video.duration}
										</div>
										<div
											class="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10"
										></div>
									</div>
									<div class="flex gap-3">
										<div
											class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-lg"
										>
											{video.channelAvatar}
										</div>
										<div class="min-w-0 flex-1">
											<h3
												class="line-clamp-2 font-heading text-sm leading-tight font-semibold group-hover:text-primary"
											>
												{video.title}
											</h3>
											<p class="mt-1 text-xs opacity-70">{video.channel}</p>
											<p class="text-xs opacity-60">{video.views} views • {video.timestamp}</p>
										</div>
									</div>
								</div>
							</button>
						{/each}
					</div>

					{#if getFilteredVideos().length === 0}
						<div class="flex flex-col items-center justify-center py-20">
							<Film class="mb-4 h-16 w-16 opacity-30" />
							<p class="text-lg font-semibold opacity-70">No videos found</p>
							<p class="text-sm opacity-50">Try adjusting your search or filters</p>
						</div>
					{/if}
				</div>
			{:else if currentView === 'player' && currentVideo}
				<!-- Video Player View -->
				<div
					class="grid gap-4 lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,426px]"
					in:fade={{ duration: 300, delay: 150 }}
					out:fade={{ duration: 150 }}
				>
					<!-- Left Column: Player + Info -->
					<div class="flex flex-col">
						<!-- Video Player -->
						<div
							class="relative h-96 w-full overflow-hidden rounded-3xl bg-black lg:h-[80vh]"
							in:scale={{ duration: 300, start: 0.95, opacity: 0, delay: 150, easing: cubicOut }}
						>
							<div
								class="flex h-full w-full items-center justify-center"
								style="background: {currentVideo.thumbnail}"
							>
								<button
									class="btn btn-circle shadow-2xl transition-transform duration-200 btn-lg btn-primary hover:scale-110 active:scale-95"
									aria-label="Play video"
								>
									<Play class="h-8 w-8 fill-current" />
								</button>
							</div>
						</div>

						<!-- Video Info Section -->
						<div
							class="space-y-3 p-4"
							in:fly={{ y: 20, duration: 300, delay: 250, easing: cubicOut }}
						>
							<!-- Video Title -->
							<h1 class="font-heading text-lg leading-tight font-semibold lg:text-xl">
								{currentVideo.title}
							</h1>

							<!-- Channel Info & Actions -->
							<div class="flex flex-wrap items-start justify-between gap-3">
								<!-- Channel Info -->
								<div class="flex items-center gap-3">
									<button
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xl transition-transform duration-200 hover:scale-105"
										aria-label="View channel"
									>
										{currentVideo.channelAvatar}
									</button>
									<div class="flex flex-col">
										<button class="text-left font-semibold transition-colors hover:text-primary">
											{currentVideo.channel}
										</button>
										<span class="text-xs opacity-60">{currentVideo.subscribers} subscribers</span>
									</div>
									<button
										class="btn rounded-full px-5 transition-transform duration-200 btn-sm btn-primary hover:scale-105"
									>
										Subscribe
									</button>
								</div>

								<!-- Action Buttons -->
								<div class="flex flex-wrap gap-2">
									<div class="join">
										<button
											class="btn join-item gap-1 transition-transform duration-200 btn-sm hover:scale-105"
										>
											<ThumbsUp class="h-4 w-4" />
											<span class="font-semibold">{currentVideo.likes}</span>
										</button>
										<div class="join-item border-l border-base-300"></div>
										<button
											class="btn join-item transition-transform duration-200 btn-sm hover:scale-105"
										>
											<ThumbsDown class="h-4 w-4" />
										</button>
									</div>
									<button
										class="btn gap-2 transition-transform duration-200 btn-sm hover:scale-105"
									>
										<Share2 class="h-4 w-4" />
										<span>Share</span>
									</button>
									<button
										class="btn gap-2 transition-transform duration-200 btn-sm hover:scale-105"
									>
										<Download class="h-4 w-4" />
										<span>Download</span>
									</button>
									<button
										class="btn btn-square transition-transform duration-200 btn-sm hover:scale-105"
									>
										<MoreHorizontal class="h-4 w-4" />
									</button>
								</div>
							</div>

							<!-- Description -->
							<div
								class="rounded-xl bg-base-200/50 p-3 transition-colors duration-200 hover:bg-base-200"
							>
								<div class="flex items-center gap-2 text-sm font-semibold">
									<span>{currentVideo.views} views</span>
									<span class="opacity-50">•</span>
									<span>{currentVideo.timestamp}</span>
								</div>
								<div class="mt-2">
									<p
										class="text-sm leading-relaxed whitespace-pre-wrap"
										class:line-clamp-3={!showDescription}
									>
										{currentVideo.description}
									</p>
									<button
										class="mt-2 text-sm font-semibold transition-colors hover:text-primary"
										onclick={() => (showDescription = !showDescription)}
									>
										{showDescription ? 'Show less' : '...more'}
									</button>
								</div>
							</div>
						</div>

						<!-- Comments Section -->
						<div class="space-y-6 p-4">
							<div class="flex items-center gap-4">
								<h3 class="font-heading text-lg font-bold">128 Comments</h3>
								<button class="btn gap-2 btn-ghost btn-sm">
									<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
										/>
									</svg>
									Sort by
								</button>
							</div>

							<div class="space-y-5">
								{#each [1, 2, 3] as i (i)}
									<div class="flex gap-3">
										<button
											class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg transition-transform duration-200 hover:scale-105"
											aria-label="View profile"
										>
											{['👤', '🎯', '🌟'][i - 1]}
										</button>
										<div class="flex-1">
											<div class="flex items-center gap-2">
												<button class="text-sm font-semibold transition-colors hover:text-primary"
													>@user{i}</button
												>
												<span class="text-xs opacity-50">{i} days ago</span>
											</div>
											<p class="mt-1 text-sm leading-relaxed">
												Great video! Really helpful explanation of the concepts.
											</p>
											<div class="mt-2 flex items-center gap-4 text-xs">
												<button
													class="flex items-center gap-1 transition-colors hover:text-primary"
												>
													<ThumbsUp class="h-3 w-3" />
													<span class="font-medium">{24 - i * 5}</span>
												</button>
												<button
													class="flex items-center gap-1 transition-colors hover:text-primary"
												>
													<ThumbsDown class="h-3 w-3" />
												</button>
												<button class="font-semibold transition-colors hover:text-primary"
													>Reply</button
												>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Related Videos Sidebar -->
					<div
						class="space-y-2 p-4 lg:p-0"
						in:fly={{ x: 20, duration: 300, delay: 300, easing: cubicOut }}
					>
						{#each getRelatedVideos() as video, index (video.id)}
							<button
								class="group flex w-full gap-2 rounded-lg p-2 text-left transition-all duration-200 hover:bg-base-200 active:scale-[0.98]"
								onclick={() => openVideo(video)}
								disabled={isTransitioning}
								in:fly={{ y: 20, duration: 300, delay: 300 + index * 50, easing: cubicOut }}
							>
								<div
									class="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-base-300 shadow-sm"
								>
									<div
										class="h-full w-full transition-transform duration-300 group-hover:scale-105"
										style="background: {video.thumbnail}"
									></div>
									<div
										class="absolute right-1 bottom-1 rounded bg-black/90 px-1.5 py-0.5 text-xs font-semibold text-white"
									>
										{video.duration}
									</div>
								</div>
								<div class="flex flex-1 flex-col justify-start py-1">
									<h4
										class="line-clamp-2 font-heading text-sm leading-tight font-semibold transition-colors group-hover:text-primary"
									>
										{video.title}
									</h4>
									<p class="mt-1 text-xs opacity-70">{video.channel}</p>
									<p class="text-xs opacity-60">{video.views} views • {video.timestamp}</p>
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</main>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
