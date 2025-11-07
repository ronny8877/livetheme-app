<script lang="ts">
	import {
		Home,
		Search,
		Bell,
		Mail,
		Bookmark,
		User,
		Settings,
		MoreHorizontal,
		Heart,
		MessageCircle,
		Repeat2,
		Upload,
		Image as ImageIcon,
		Smile,
		Calendar,
		MapPin,
		X,
		ChevronLeft,
		ChevronRight,
		Verified
	} from '@lucide/svelte';
	import { fly, fade, scale, slide } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';
	import { shareWebsite } from '$lib/utils/share';

	interface Post {
		id: string;
		author: {
			name: string;
			username: string;
			avatar: string;
			verified: boolean;
		};
		content: string;
		timestamp: string;
		images?: string[];
		stats: {
			likes: number;
			retweets: number;
			replies: number;
		};
		liked?: boolean;
		retweeted?: boolean;
	}

	interface User {
		name: string;
		username: string;
		avatar: string;
		verified: boolean;
	}

	// Current user
	const currentUser: User = {
		name: 'LiveTheme',
		username: '@livetheme',
		avatar: '/logo.png',
		verified: true
	};

	// Sample posts data
	let posts = $state<Post[]>([
		{
			id: '1',
			author: {
				name: 'Sarah Chen',
				username: '@sarah_codes',
				avatar: 'https://i.pinimg.com/736x/d0/57/b8/d057b820f2acbbe61a9141a81333e8da.jpg',
				verified: true
			},
			content: 'Me and my team when  AWS us-east-1 went down',
			timestamp: '2h',
			images: [
				'https://i.pinimg.com/1200x/b0/df/a0/b0dfa009249aa77832b3a673ba3d1dc7.jpg',
				'https://i.pinimg.com/736x/06/a2/ba/06a2ba8ce6c078f1eeb81efa51ce16df.jpg',
				'https://i.pinimg.com/736x/24/10/04/241004171a0bd3c2b51a0b6bd75ceb2e.jpg'
			],
			stats: { likes: 234, retweets: 45, replies: 23 },
			liked: false,
			retweeted: false
		},
		{
			id: '2',
			author: {
				name: 'Mewok Johnson',
				username: '@mewok_dev',
				avatar: 'https://i.pinimg.com/736x/0e/02/d7/0e02d7951f0cc5036caee5704e3a9ae8.jpg',
				verified: false
			},
			content: "I think coding is overrated... Tuna is where it's at! 🐟😄",
			timestamp: '4h',
			stats: { likes: 567, retweets: 89, replies: 145 },
			liked: true,
			retweeted: false
		},
		{
			id: '3',
			author: {
				name: 'Self Host Davis',
				username: '@self_host_davis',
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
				verified: true
			},
			content: 'Cloud Went down again today... time to break out the emergency snacks ☁️🍪',
			timestamp: '5h',
			images: ['https://media.tenor.com/Ym6VeAcZoTcAAAAi/aaaah-cat.gif'],
			stats: { likes: 892, retweets: 156, replies: 67 },
			liked: false,
			retweeted: false
		},
		{
			id: '4',
			author: {
				name: 'Clueless  Park',
				username: '@davidparkdev',
				avatar: 'https://media.tenor.com/cyORI7kwShQAAAAi/shigure-ui-dance.gif',
				verified: false
			},
			content: 'No idea what people in here talking about, I am here just fo the Vibes',
			timestamp: '8h',
			images: ['https://media1.tenor.com/m/Lw6Z3WhArHcAAAAC/nokotan-anime.gif'],
			stats: { likes: 1243, retweets: 234, replies: 89 },
			liked: true,
			retweeted: true
		},
		{
			id: '5',
			author: {
				name: 'Lisa Wang',
				username: '@lisa_dev',
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
				verified: true
			},
			content:
				'Pro tip for developers: Take regular breaks! 🧘‍♀️\n\nYour brain (and eyes) will thank you. The Pomodoro technique has been a game-changer for my productivity.',
			timestamp: '12h',
			stats: { likes: 445, retweets: 78, replies: 34 },
			liked: false,
			retweeted: false
		},
		// Extra fun, sarcastic, and charming posts
		{
			id: '6',
			author: {
				name: 'Ava Green',
				username: '@plant_person',
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ava',
				verified: false
			},
			content: "Bought a new plant to fix my personality. It's already thriving. I am not. 🌱😌",
			timestamp: '14h',
			stats: { likes: 713, retweets: 54, replies: 29 },
			liked: false,
			retweeted: false
		},
		{
			id: '7',
			author: {
				name: 'Nate Carter',
				username: '@definitelyoffline',
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nate',
				verified: true
			},
			content:
				"I went for a 'quick walk' and came back with existential clarity and three pastries. 10/10, would recommend. 🥐✨",
			timestamp: '16h',
			images: ['https://media.tenor.com/TnBDL9LEoX8AAAAi/happy-emoji-happy.gif'],
			stats: { likes: 986, retweets: 120, replies: 41 },
			liked: false,
			retweeted: false
		},
		{
			id: '8',
			author: {
				name: 'Maya',
				username: '@mayabakes',
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
				verified: false
			},
			content:
				"Recipe drop: Chaos Cookies. Add chocolate chips until the ancestors whisper 'enough'. Then add a few more. 🍪",
			timestamp: '18h',
			stats: { likes: 652, retweets: 77, replies: 58 },
			liked: false,
			retweeted: false
		},
		{
			id: '9',
			author: {
				name: 'Leo',
				username: '@gym-ish',
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leo',
				verified: false
			},
			content:
				'Went to the gym. Stared at a dumbbell. Decided we were both not ready. Growth is nonlinear. 💪🧠',
			timestamp: '20h',
			stats: { likes: 403, retweets: 42, replies: 17 },
			liked: false,
			retweeted: false
		},
		{
			id: '10',
			author: {
				name: 'Ruby',
				username: '@weekendphilosopher',
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ruby',
				verified: true
			},
			content:
				"I cleaned my room and found my motivation under a pile of 'later'. Minimalism is just losing things elegantly. 🧹",
			timestamp: 'yesterday',
			stats: { likes: 1203, retweets: 210, replies: 64 },
			liked: false,
			retweeted: false
		}
	]);

	// Trending topics
	const trendingTopics = [
		{ tag: 'Svelte5', posts: '45.2K' },
		{ tag: 'WebDev', posts: '128K' },
		{ tag: 'TypeScript', posts: '89.4K' },
		{ tag: 'TailwindCSS', posts: '67.8K' },
		{ tag: 'OpenSource', posts: '234K' }
	];

	// Suggestions
	const suggestions = [
		{
			name: 'TechDaily',
			username: '@techdaily',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
			verified: true
		},
		{
			name: 'CodeNewbie',
			username: '@codenewbie',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=code',
			verified: false
		},
		{
			name: 'DevTips',
			username: '@devtips',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tips',
			verified: true
		}
	];

	// UI State
	let activeTab = $state<'For you' | 'Following'>('For you');
	let showPostModal = $state(false);
	let showImageModal = $state(false);
	let selectedImages = $state<string[]>([]);
	let currentImageIndex = $state(0);
	let selectedPost = $state<Post | null>(null);
	let newPostText = $state('');

	// Functions
	function toggleLike(post: Post) {
		post.liked = !post.liked;
		post.stats.likes += post.liked ? 1 : -1;
	}

	function toggleRetweet(post: Post) {
		post.retweeted = !post.retweeted;
		post.stats.retweets += post.retweeted ? 1 : -1;
	}

	function openImageCarousel(images: string[], index: number, post: Post) {
		selectedImages = images;
		currentImageIndex = index;
		selectedPost = post;
		showImageModal = true;
	}

	function closeImageModal() {
		showImageModal = false;
		selectedImages = [];
		currentImageIndex = 0;
		selectedPost = null;
	}

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % selectedImages.length;
	}

	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + selectedImages.length) % selectedImages.length;
	}

	function openPostModal() {
		showPostModal = true;
		newPostText = '';
	}

	function closePostModal() {
		showPostModal = false;
		newPostText = '';
	}

	function createPost() {
		if (!newPostText.trim()) return;

		const newPost: Post = {
			id: Date.now().toString(),
			author: currentUser,
			content: newPostText,
			timestamp: 'now',
			stats: { likes: 0, retweets: 0, replies: 0 },
			liked: false,
			retweeted: false
		};

		posts = [newPost, ...posts];
		closePostModal();
	}

	function formatNumber(num: number): string {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	}

	function sharePost(post: Post) {
		const preview = post.content.length > 140 ? post.content.slice(0, 137) + '…' : post.content;
		shareWebsite({ title: 'LiveTheme', text: preview });
	}
</script>

<div class="font-body min-h-screen bg-base-100 text-base-content">
	<!-- Main Container -->
	<div class="mx-auto flex max-w-7xl">
		<!-- Left Sidebar -->
		<aside
			class="sticky top-0 hidden h-screen w-20 flex-col justify-between border-r border-base-300 py-4 lg:flex xl:w-64"
		>
			<div class="space-y-2">
				<!-- Logo -->
				<div class="mb-6 px-4">
					<div class="btn px-2 btn-ghost">
						<img src="/logo-transparent.png" alt="LiveTheme" class="h-8 w-auto" />
					</div>
				</div>

				<!-- Navigation -->
				<nav class="space-y-1">
					{#each [{ icon: Home, label: 'Home', active: true }, { icon: Search, label: 'Explore', active: false }, { icon: Bell, label: 'Notifications', active: false }, { icon: Mail, label: 'Messages', active: false }, { icon: Bookmark, label: 'Bookmarks', active: false }, { icon: User, label: 'Profile', active: false }] as item}
						<button
							class="btn w-full justify-start gap-4 text-lg btn-ghost {item.active
								? 'font-bold'
								: 'font-normal'}"
							in:fly={{ x: -20, duration: 300, delay: 100 }}
						>
							<item.icon class="h-6 w-6" />
							<span class="hidden xl:inline">{item.label}</span>
						</button>
					{/each}
				</nav>

				<!-- Post Button -->
				<div class="px-4 pt-4">
					<button
						onclick={openPostModal}
						class="btn w-full rounded-full text-lg font-bold shadow-lg transition-transform btn-primary hover:scale-105"
						in:fly={{ y: 20, duration: 300, delay: 200 }}
					>
						<span class="hidden xl:inline">Post</span>
						<span class="xl:hidden">+</span>
					</button>
				</div>
			</div>

			<!-- User Profile -->
			<div class="px-4">
				<button
					class="btn w-full justify-start gap-3 btn-ghost transition-all hover:bg-base-200"
					in:fly={{ y: 20, duration: 300, delay: 250 }}
				>
					<div class="avatar">
						<div class="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
							<img src={currentUser.avatar} alt={currentUser.name} />
						</div>
					</div>
					<div class="hidden flex-col items-start xl:flex">
						<div class="flex items-center gap-1 font-semibold">
							{currentUser.name}
							{#if currentUser.verified}
								<Verified class="h-4 w-4 fill-primary text-primary-content" />
							{/if}
						</div>
						<div class="text-sm text-base-content/60">{currentUser.username}</div>
					</div>
					<MoreHorizontal class="ml-auto hidden h-5 w-5 xl:block" />
				</button>
			</div>
		</aside>

		<!-- Main Feed -->
		<main class="min-h-screen flex-1 border-r border-base-300">
			<!-- Header -->
			<div class="sticky top-0 z-10 border-b border-base-300 bg-base-100/80 backdrop-blur-md">
				<div class="flex items-center justify-between p-4">
					<h1 class="font-heading text-xl font-bold">Home</h1>
					<button class="btn btn-ghost btn-sm lg:hidden">
						<Settings class="h-5 w-5" />
					</button>
				</div>

				<!-- Tabs -->
				<div class="flex border-b border-base-300">
					{#each ['For you', 'Following'] as tab}
						<button
							onclick={() => (activeTab = tab as 'For you' | 'Following')}
							class="relative flex-1 py-4 text-center font-semibold transition-colors hover:bg-base-200/50 {activeTab ===
							tab
								? 'text-base-content'
								: 'text-base-content/50'}"
						>
							{tab}
							{#if activeTab === tab}
								<div
									class="absolute right-0 bottom-0 left-0 h-1 rounded-full bg-primary"
									in:scale={{ duration: 200, easing: backOut }}
								></div>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- New Post Box (Desktop) -->
			<div class="hidden border-b border-base-300 p-4 md:block">
				<div class="flex gap-3">
					<div class="avatar">
						<div class="h-12 w-12 rounded-full">
							<img src={currentUser.avatar} alt={currentUser.name} />
						</div>
					</div>
					<div class="flex-1">
						<button
							onclick={openPostModal}
							class="w-full rounded-xl bg-base-200/50 px-4 py-3 text-left text-base-content/60 transition-all hover:bg-base-200"
						>
							What's happening?
						</button>
					</div>
				</div>
			</div>

			<!-- Posts Feed -->
			<div class="divide-y divide-base-300">
				{#each posts as post, index (post.id)}
					<article
						class="cursor-pointer p-4 transition-colors hover:bg-base-200/30"
						in:fly={{ y: 20, duration: 400, delay: index * 50, easing: quintOut }}
					>
						<div class="flex gap-3">
							<!-- Avatar -->
							<div class="avatar">
								<div
									class="h-12 w-12 rounded-full ring-2 ring-base-300 ring-offset-2 ring-offset-base-100"
								>
									<img src={post.author.avatar} alt={post.author.name} />
								</div>
							</div>

							<!-- Content -->
							<div class="flex-1">
								<!-- Header -->
								<div class="flex items-center gap-2">
									<span class="font-bold hover:underline">{post.author.name}</span>
									{#if post.author.verified}
										<Verified class="h-4 w-4 fill-primary text-primary-content" />
									{/if}
									<span class="text-base-content/50">{post.author.username}</span>
									<span class="text-base-content/50">·</span>
									<span class="text-base-content/50">{post.timestamp}</span>
									<button class="btn ml-auto btn-ghost btn-xs">
										<MoreHorizontal class="h-4 w-4" />
									</button>
								</div>

								<!-- Post Content -->
								<p class="mt-2 text-base leading-relaxed whitespace-pre-wrap">
									{post.content}
								</p>

								<!-- Images -->
								{#if post.images && post.images.length > 0}
									<div
										class="mt-3 grid gap-2 {post.images.length === 1
											? 'grid-cols-1'
											: post.images.length === 2
												? 'grid-cols-2'
												: 'grid-cols-2'}"
										in:scale={{ duration: 300, delay: 100, easing: quintOut }}
									>
										{#each post.images as image, imgIndex}
											<button
												onclick={() => openImageCarousel(post.images!, imgIndex, post)}
												class="group relative overflow-hidden rounded-2xl {post.images!.length ===
													3 && imgIndex === 0
													? 'col-span-2'
													: ''} {post.images!.length === 1 ? 'aspect-video' : 'aspect-square'}"
											>
												<img
													src={image}
													alt="Post attachment {imgIndex + 1}"
													class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
												/>
												<div
													class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10"
												></div>
											</button>
										{/each}
									</div>
								{/if}

								<!-- Stats & Actions -->
								<div class="mt-3 flex items-center justify-between">
									<!-- Reply -->
									<button
										class="btn gap-2 btn-ghost transition-all btn-sm hover:scale-110 hover:text-info"
									>
										<MessageCircle class="h-5 w-5" />
										<span class="text-sm">{formatNumber(post.stats.replies)}</span>
									</button>

									<!-- Retweet -->
									<button
										onclick={() => toggleRetweet(post)}
										class="btn gap-2 btn-ghost transition-all btn-sm hover:scale-110 {post.retweeted
											? 'text-success'
											: 'hover:text-success'}"
									>
										<Repeat2 class="h-5 w-5" />
										<span class="text-sm">{formatNumber(post.stats.retweets)}</span>
									</button>

									<!-- Like -->
									<button
										onclick={() => toggleLike(post)}
										class="btn gap-2 btn-ghost transition-all btn-sm hover:scale-110 {post.liked
											? 'text-error'
											: 'hover:text-error'}"
									>
										<Heart class="h-5 w-5 {post.liked ? 'fill-current' : ''}" />
										<span class="text-sm">{formatNumber(post.stats.likes)}</span>
									</button>

									<!-- Share -->
									<button
										onclick={() => sharePost(post)}
										class="btn btn-ghost transition-all btn-sm hover:scale-110 hover:text-primary"
									>
										<Upload class="h-5 w-5" />
									</button>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</main>

		<!-- Right Sidebar -->
		<aside class="hide-scrollbar sticky top-0 hidden h-screen w-80 overflow-y-auto p-4 lg:block">
			<!-- Search -->
			<div class="relative mb-4" in:fly={{ x: 20, duration: 300, delay: 100 }}>
				<div class="relative">
					<Search class="absolute top-1/2 left-4 z-20 h-5 w-5 -translate-y-1/2 text-base-content" />
					<input
						type="text"
						placeholder="Search"
						class="input w-full rounded-full bg-base-200 pl-12 focus:outline-primary"
					/>
				</div>
			</div>

			<!-- Trending -->
			<div
				class="mb-4 overflow-hidden rounded-2xl bg-base-200"
				in:fly={{ x: 20, duration: 300, delay: 150 }}
			>
				<div class="p-4">
					<h2 class="font-heading text-xl font-bold">Trends for you</h2>
				</div>
				<div class="divide-y divide-base-300">
					{#each trendingTopics as trend, index}
						<div
							class="block w-full p-4 text-left transition-colors hover:bg-base-300/50"
							in:fly={{ x: 20, duration: 300, delay: 200 + index * 50 }}
						>
							<div class="flex items-start justify-between">
								<div>
									<div class="text-sm text-base-content/50">Trending</div>
									<div class="font-bold">#{trend.tag}</div>
									<div class="text-sm text-base-content/50">{trend.posts} posts</div>
								</div>
								<button class="btn btn-ghost btn-xs" onclick={(e) => e.stopPropagation()}>
									<MoreHorizontal class="h-4 w-4" />
								</button>
							</div>
						</div>
					{/each}
				</div>
				<button class="block w-full p-4 text-left text-primary hover:bg-base-300/50">
					Show more
				</button>
			</div>

			<!-- Who to follow -->
			<div
				class="overflow-hidden rounded-2xl bg-base-200"
				in:fly={{ x: 20, duration: 300, delay: 200 }}
			>
				<div class="p-4">
					<h2 class="font-heading text-xl font-bold">Who to follow</h2>
				</div>
				<div class="divide-y divide-base-300">
					{#each suggestions as suggestion, index}
						<div
							class="flex items-center gap-3 p-4 transition-colors hover:bg-base-300/50"
							in:fly={{ x: 20, duration: 300, delay: 250 + index * 50 }}
						>
							<div class="avatar">
								<div class="w-12 rounded-full ring-2 ring-base-300">
									<img src={suggestion.avatar} alt={suggestion.name} />
								</div>
							</div>
							<div class="flex-1">
								<div class="flex items-center gap-1 font-semibold">
									{suggestion.name}
									{#if suggestion.verified}
										<Verified class="h-4 w-4 fill-primary text-primary-content" />
									{/if}
								</div>
								<div class="text-sm text-base-content/50">{suggestion.username}</div>
							</div>
							<button class="btn rounded-full font-bold btn-sm btn-primary">Follow</button>
						</div>
					{/each}
				</div>
				<button class="block w-full p-4 text-left text-primary hover:bg-base-300/50">
					Show more
				</button>
			</div>
		</aside>
	</div>

	<!-- Mobile Bottom Navigation -->
	<div
		class="btm-nav z-50 border-t border-base-300 bg-base-100 lg:hidden"
		in:slide={{ duration: 300, easing: quintOut }}
	>
		{#each [{ icon: Home, label: 'Home' }, { icon: Search, label: 'Search' }, { icon: Bell, label: 'Notifications' }, { icon: Mail, label: 'Messages' }] as item}
			<button class="text-base-content">
				<item.icon class="h-6 w-6" />
				<span class="btm-nav-label text-xs">{item.label}</span>
			</button>
		{/each}
	</div>

	<!-- Floating Action Button (Mobile) -->
	<button
		onclick={openPostModal}
		class="btn fixed right-4 bottom-20 z-40 btn-circle h-14 w-14 shadow-2xl btn-primary lg:hidden"
		in:scale={{ duration: 300, delay: 200, easing: backOut }}
	>
		<span class="text-2xl">+</span>
	</button>

	<!-- Post Modal -->
	{#if showPostModal}
		<div
			class="modal-open modal"
			onclick={(e) => e.target === e.currentTarget && closePostModal()}
			onkeydown={(e) => e.key === 'Escape' && closePostModal()}
			role="dialog"
			aria-modal="true"
			aria-labelledby="post-modal-title"
			tabindex="-1"
			transition:fade={{ duration: 200 }}
		>
			<div
				class="modal-box max-w-2xl"
				in:scale={{ duration: 300, start: 0.9, easing: backOut }}
				out:scale={{ duration: 200, start: 0.9 }}
			>
				<!-- Header -->
				<div class="mb-4 flex items-center justify-between">
					<button onclick={closePostModal} class="btn btn-circle btn-ghost btn-sm">
						<X class="h-5 w-5" />
					</button>
					<h3 id="post-modal-title" class="font-heading text-lg font-bold">Create post</h3>
					<button
						onclick={createPost}
						class="btn rounded-full px-6 font-bold btn-sm btn-primary"
						disabled={!newPostText.trim()}
					>
						Post
					</button>
				</div>

				<!-- Content -->
				<div class="flex gap-3">
					<div class="avatar">
						<div class="h-12 w-12 rounded-full">
							<img src={currentUser.avatar} alt={currentUser.name} />
						</div>
					</div>
					<div class="flex-1">
						<textarea
							bind:value={newPostText}
							placeholder="What's happening?"
							class="textarea w-full resize-none textarea-ghost text-lg focus:outline-none"
							rows="6"
						></textarea>

						<!-- Actions -->
						<div class="mt-4 flex items-center justify-between border-t border-base-300 pt-4">
							<div class="flex gap-2">
								<button class="btn btn-circle text-primary btn-ghost btn-sm">
									<ImageIcon class="h-5 w-5" />
								</button>
								<button class="btn btn-circle text-primary btn-ghost btn-sm">
									<Smile class="h-5 w-5" />
								</button>
								<button class="btn btn-circle text-primary btn-ghost btn-sm">
									<Calendar class="h-5 w-5" />
								</button>
								<button class="btn btn-circle text-primary btn-ghost btn-sm">
									<MapPin class="h-5 w-5" />
								</button>
							</div>
							<div class="text-sm text-base-content/50">
								{newPostText.length} / 280
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Image Carousel Modal -->
	{#if showImageModal && selectedImages.length > 0}
		<div
			class="modal-open modal bg-black/95"
			onclick={(e) => e.target === e.currentTarget && closeImageModal()}
			onkeydown={(e) => e.key === 'Escape' && closeImageModal()}
			role="dialog"
			aria-modal="true"
			aria-labelledby="image-modal-title"
			tabindex="-1"
			transition:fade={{ duration: 300 }}
		>
			<div class="relative h-full w-full">
				<!-- Close Button -->
				<button
					onclick={closeImageModal}
					class="btn absolute top-4 left-4 z-50 btn-circle bg-black/50 text-white btn-ghost hover:bg-black/70"
					aria-label="Close image viewer"
					in:scale={{ duration: 200, delay: 100, easing: backOut }}
				>
					<X class="h-6 w-6" />
				</button>

				<!-- Image Counter -->
				{#if selectedImages.length > 1}
					<div
						id="image-modal-title"
						class="absolute top-4 right-4 z-50 rounded-full bg-black/70 px-4 py-2 text-white"
						in:scale={{ duration: 200, delay: 100, easing: backOut }}
					>
						{currentImageIndex + 1} / {selectedImages.length}
					</div>
				{/if}

				<!-- Main Image -->
				<div class="flex h-full items-center justify-center p-4">
					<img
						src={selectedImages[currentImageIndex]}
						alt="Full size"
						class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
						in:fly={{ x: 100, duration: 300, easing: quintOut }}
					/>
				</div>

				<!-- Navigation Arrows -->
				{#if selectedImages.length > 1}
					<button
						onclick={prevImage}
						class="btn absolute top-1/2 left-4 btn-circle -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
						aria-label="Previous image"
						in:scale={{ duration: 200, delay: 150, easing: backOut }}
					>
						<ChevronLeft class="h-6 w-6" />
					</button>
					<button
						onclick={nextImage}
						class="btn absolute top-1/2 right-4 btn-circle -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
						aria-label="Next image"
						in:scale={{ duration: 200, delay: 150, easing: backOut }}
					>
						<ChevronRight class="h-6 w-6" />
					</button>
				{/if}

				<!-- Post Info at Bottom -->
				{#if selectedPost}
					<div
						class="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-6"
						in:slide={{ duration: 300, delay: 100 }}
					>
						<div class="flex items-center gap-3 text-white">
							<div class="avatar">
								<div class="w-12 rounded-full ring-2 ring-white/20">
									<img src={selectedPost.author.avatar} alt={selectedPost.author.name} />
								</div>
							</div>
							<div>
								<div class="flex items-center gap-2">
									<span class="font-bold">{selectedPost.author.name}</span>
									{#if selectedPost.author.verified}
										<Verified class="h-4 w-4 fill-primary text-primary-content" />
									{/if}
								</div>
								<div class="text-sm text-white/70">{selectedPost.author.username}</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Thumbnails (if multiple images) -->
				{#if selectedImages.length > 1}
					<div
						class="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2"
						in:slide={{ duration: 300, delay: 200 }}
					>
						{#each selectedImages as image, index}
							{@const imageLabel = `View image ${index + 1}`}
							<button
								onclick={() => (currentImageIndex = index)}
								aria-label={imageLabel}
								class="h-2 w-2 rounded-full transition-all {index === currentImageIndex
									? 'w-8 bg-white'
									: 'bg-white/50 hover:bg-white/75'}"
							></button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
