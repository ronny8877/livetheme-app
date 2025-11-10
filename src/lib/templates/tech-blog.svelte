<script lang="ts">
	import {
		Home,
		FileText,
		Star,
		BookOpen,
		Lightbulb,
		Menu,
		Search,
		User,
		ChevronLeft,
		ChevronRight,
		MessageSquare
	} from '@lucide/svelte';

	let mobileMenuOpen = false;
</script>

<div
	class="min-h-screen bg-base-100 text-base-content"
	style="font-family: Inter, 'Noto Sans', sans-serif"
>
	<header class="w-full border-b border-base-200 bg-base-100/80 px-4 py-3 backdrop-blur-md">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="text-black">
					<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8">
						<path
							d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
							fill="currentColor"
						></path>
					</svg>
				</div>
				<h2 class="text-lg leading-tight font-bold tracking-[-0.015em] md:text-xl">TechCore</h2>
			</div>

			<!-- Desktop nav - visible on md+ -->
			<nav class="hidden items-center gap-6 md:flex z-50">
				<a
					class="flex items-center gap-2 text-sm leading-normal font-medium text-base-content"
					href="#"
				>
					<Home class="h-5 w-5 text-primary" />
					<span class="sr-only md:not-sr-only">Home</span>
				</a>
				<a
					class="flex items-center gap-2 text-sm leading-normal font-medium text-base-content"
					href="#"
				>
					<FileText class="h-5 w-5 text-primary" />
					<span class="sr-only md:not-sr-only">News</span>
				</a>
				<a
					class="flex items-center gap-2 text-sm leading-normal font-medium text-base-content"
					href="#"
				>
					<Star class="h-5 w-5 text-primary" />
					<span class="sr-only md:not-sr-only">Reviews</span>
				</a>
				<a
					class="flex items-center gap-2 text-sm leading-normal font-medium text-base-content"
					href="#"
				>
					<BookOpen class="h-5 w-5 text-primary" />
					<span class="sr-only md:not-sr-only">Guides</span>
				</a>
				<a
					class="flex items-center gap-2 text-sm leading-normal font-medium text-base-content"
					href="#"
				>
					<Lightbulb class="h-5 w-5 text-primary" />
					<span class="sr-only md:not-sr-only">Tips</span>
				</a>
			</nav>

			<!-- Mobile menu button -->
			<div class="relative md:hidden">
				<button
					class="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-100"
					on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				>
					<Menu class="h-5 w-5 text-neutral-700" />
				</button>
				{#if mobileMenuOpen}
					<div class="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-base-100 p-2 shadow-lg">
						<a
							class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
							href="#"
						>
							<Home class="h-5 w-5" />
							Home
						</a>
						<a
							class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
							href="#"
						>
							<FileText class="h-5 w-5" />
							News
						</a>
						<a
							class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
							href="#"
						>
							<Star class="h-5 w-5" />
							Reviews
						</a>
						<a
							class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
							href="#"
						>
							<BookOpen class="h-5 w-5" />
							Guides
						</a>
						<a
							class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
							href="#"
						>
							<Lightbulb class="h-5 w-5" />
							Tips
						</a>
					</div>
				{/if}
			</div>

			<div class="flex items-center gap-3">
				<button
					aria-label="Search"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
				>
					<Search class="h-5 w-5" />
				</button>
				<button
					aria-label="Account"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
				>
					<User class="h-5 w-5" />
				</button>
				<div
					class="aspect-square h-9 w-9 rounded-full bg-cover bg-center bg-no-repeat"
					style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAav6kqmw3uH0EXOPNDeNgwiBtTNhM_N62h8v2EyssPD1KnRnpAEeZ69qsdOJ1PmNn5LUihWshE3YHhSHxUzqo-H1xjBisprKczWcL-Wy0Ida_1GBOpby-a8XRePqWPSY4iD9ih355covw0B7W33uAXch08UTKcbfBqxfxsx7upFhCAlV8rnQgnQMCTESUHh-xrBDIeLHOVTEd11plVQFgLSpl3SYelJsSZz9kahbjRJKoa9SRc2jWHD-gq_i-wbZjEIpYwJapErDI')"
				></div>
			</div>
		</div>
	</header>

	<main class="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
		<div
			class="relative mb-12 flex min-h-[360px] w-full flex-col items-center justify-center overflow-hidden rounded-box bg-primary p-6 text-center md:min-h-[480px] md:p-8"
		>
			<div class="absolute inset-0 z-0 h-full w-full text-primary-content">
				<img
					alt="Hero background"
					class="h-full w-full rounded-box object-cover opacity-40"
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7S5iHoxjrAa3Jw5P8J7g-X-J6myTTjyFPVI6yFdsp6D4hiIcqKUse47y7b0M20-26qHE4Ev8CX-N24xH-wDt011gPoT0O_Q855MLsxX43mu7juDR-C8pWYmqCGF4y5v1MSrcs97PjHdjmzWe6N128UwTdVULX5TG45sutMZfj1vnV--DvscAz_jnQDHWPoc9x-IHMogLITwzsGUX4N2N_h19wjPzJqBhPR4pivhmrv9zw1k72T2kachnw0bzYevIJcTScaDbhsdQ"
				/>
			</div>
			<div class="relative z-10 flex flex-col items-center gap-6">
				<div class="flex flex-col gap-4 text-primary">
					<h1
						class="text-3xl leading-tight font-bold tracking-tight text-primary-content sm:text-4xl md:text-5xl lg:text-6xl"
					>
						The Future of Tech is Here
					</h1>
					<h2
						class="mx-auto max-w-2xl text-sm leading-normal font-normal text-primary-content sm:text-base"
					>
						Explore the latest innovations and insights in the world of technology. From
						groundbreaking gadgets to in-depth reviews, stay ahead of the curve with our expert
						analysis and commentary.
					</h2>
				</div>
				<button
					class="flex max-w-[480px] min-w-[84px] items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-content"
				>
					<span class="truncate">Explore Now</span>
				</button>
			</div>
		</div>

		<div class="grid grid-cols-12 gap-8">
			<div class="col-span-12 lg:col-span-8">
				<h2
					class="px-4 pt-5 pb-4 text-xl leading-tight font-bold tracking-tight text-base-content sm:text-2xl"
				>
					Recent Posts
				</h2>
				<div class="grid grid-cols-1 gap-8">
					{#each [1, 2, 3, 4] as i}
						<article
							class="flex flex-col gap-4 rounded-xl p-4 transition-shadow hover:shadow-lg md:flex-row"
						>
							<div class="w-full overflow-hidden rounded-box md:w-56 md:shrink-0">
								<img
									alt="Post thumbnail"
									class="h-48 w-full object-cover md:h-36"
									src="https://picsum.photos/seed/tech-{i}/800/450"
								/>
							</div>
							<div class="flex-1">
								<p class="text-lg leading-normal font-semibold text-base-content md:text-xl">
									Sample Post Title {i}
								</p>
								<p class="text-sm leading-normal font-normal text-base-content">
									A short excerpt highlighting the post's topic and why it's worth reading.
								</p>
								<a
									class="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
									href="#"
								>
									Read More
								</a>
							</div>
						</article>
					{/each}
				</div>
			</div>

			<aside class="col-span-12 lg:col-span-4">
				<div class="sticky top-20 md:top-28">
					<div class="space-y-6 rounded-2xl bg-base-100 p-4 md:p-6">
						<h3 class="flex items-center gap-2 text-base font-bold md:text-lg lg:text-xl">
							<FileText class="h-5 w-5" />
							Suggested Posts
						</h3>
						<div class="flex flex-col gap-4 sm:overflow-x-auto">
							{#each [1, 2, 3] as n}
								<div
									class="flex w-full shrink-0 items-center gap-4 rounded-box p-2 hover:bg-base-300 sm:w-56"
								>
									<img
										alt="Suggested post thumbnail"
										class="h-16 w-16 rounded-lg object-cover"
										src="https://picsum.photos/seed/thumb-{n}/80/80"
									/>
									<div class="flex flex-col">
										<p class="font-semibold">Suggested Post {n}</p>
										<p class="text-sm text-neutral-500">Category</p>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<div class="mt-6 space-y-6 rounded-2xl bg-base-100 p-4 md:p-6">
						<h3 class="flex items-center gap-2 text-base font-bold md:text-lg lg:text-xl">
							<MessageSquare class="h-5 w-5" />
							Comments
						</h3>
						<div class="space-y-6">
							{#each [1, 2] as c}
								<div class="flex items-start gap-4">
									<img
										alt="User avatar"
										class="h-10 w-10 shrink-0 rounded-full object-cover"
										src="https://picsum.photos/seed/avatar-{c}/48/48"
									/>
									<div class="flex flex-col">
										<div class="flex items-center gap-2">
											<p class="text-sm font-semibold">User {c}</p>
											<p class="text-xs">{c} days ago</p>
										</div>
										<p class="text-sm text-base-content">
											A short comment about the article or topic.
										</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</aside>
		</div>
		<div class="mt-8 flex items-center justify-center p-4">
			<a
				class="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
				href="#"
			>
				<ChevronLeft class="h-5 w-5" />
			</a>
			<a
				class="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
				href="#"
			>
				1
			</a>
			<a
				class="mx-1 flex h-10 w-10 items-center justify-center rounded-full text-sm font-normal text-neutral-600 hover:bg-neutral-100"
				href="#"
			>
				2
			</a>
			<a
				class="mx-1 flex h-10 w-10 items-center justify-center rounded-full text-sm font-normal text-neutral-600 hover:bg-neutral-100"
				href="#"
			>
				3
			</a>
			<a
				class="ml-2 flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
				href="#"
			>
				<ChevronRight class="h-5 w-5" />
			</a>
		</div>
	</main>
	<footer class="footer items-center rounded-2xl bg-base-200 p-6 text-base-content">
		<aside class="grid-flow-col items-center">
			<p class="font-semibold">Built on Tailwind + DaisyUI</p>
			<p class="text-sm opacity-70">with shadcn/ui patterns and Next.js running on the edge.</p>
		</aside>
		<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
			<a class="link link-hover" href="https://daisyui.com/" target="_blank" rel="noreferrer">
				DaisyUI docs
			</a>
			<a class="link link-hover" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
				Tailwind
			</a>
		</nav>
	</footer>
</div>
