<script lang="ts">
	import {
		ArrowRight,
		BookOpen,
		Zap,
		Users,
		TrendingUp,
		Star,
		Clock,
		Mail,
		Search,
		Menu
	} from '@lucide/svelte';
</script>

<!-- Blog Landing Page Template -->
<div class="body-metrics min-h-screen bg-base-100 font-body">
	<!-- Navigation -->
	<nav
		class=" fixed top-3 right-0 left-0 z-50 mx-auto w-full max-w-7xl rounded-full border-b border-base-300 bg-base-100/60 px-4 backdrop-blur-lg sm:px-6 lg:px-8"
	>
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center gap-2">
				<BookOpen class="h-6 w-6 text-primary" />
				<span class="heading-metrics font-heading text-xl font-bold text-base-content"
					>TechInsights</span
				>
			</div>
			<div class="hidden items-center gap-6 md:flex">
				<span
					class="text-sm font-medium text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
					>Articles</span
				>
				<span
					class="text-sm font-medium text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
					>Topics</span
				>
				<span
					class="text-sm font-medium text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
					>About</span
				>
				<button
					class="btn rounded-full transition-transform duration-300 ease-out btn-sm btn-primary hover:scale-105"
					>Subscribe</button
				>
			</div>
			<button
				class="btn btn-circle btn-ghost transition-transform duration-200 ease-out hover:scale-105 md:hidden"
			>
				<Menu class="h-5 w-5" />
			</button>
		</div>
	</nav>

	<!-- Hero Section -->
	<section
		class="relative overflow-hidden bg-linear-to-br from-primary/20 via-primary/50 to-primary/80"
	>
		<!-- Animated Background -->
		<div class="absolute inset-0">
			<div
				class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_2px)] bg-size-[24px_24px]"
			></div>
			<div
				class="absolute top-0 left-0 h-[500px] w-[500px] animate-pulse rounded-full bg-primary-content/10 blur-[120px]"
				style="animation-duration: 8s;"
			></div>
			<div
				class="absolute right-0 bottom-0 h-[500px] w-[500px] animate-pulse rounded-full bg-secondary-content/10 blur-[120px]"
				style="animation-duration: 10s; animation-delay: 2s;"
			></div>
		</div>

		<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
			<div class="mx-auto max-w-4xl text-center">
				<!-- Badge -->
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-content/30 bg-primary-content/10 px-5 py-2 backdrop-blur-sm"
				>
					<Star class="h-4 w-4 fill-primary-content text-primary-content" />
					<span class="text-sm font-semibold text-base-content">Featured on Product Hunt</span>
				</div>

				<!-- Headline -->
				<h1
					class="heading-metrics mb-6 font-heading text-4xl leading-tight font-bold text-base-content sm:text-5xl lg:text-6xl"
				>
					Where Ideas Meet Innovation
				</h1>

				<p class="mb-10 text-base leading-relaxed text-base-content/90 sm:text-lg lg:text-xl">
					Join 50,000+ developers who stay ahead with our curated insights, tutorials, and deep
					dives into modern software development.
				</p>

				<!-- Search Bar -->
				<div class="mx-auto mb-10 max-w-2xl">
					<div class="flex flex-col gap-3 sm:flex-row">
						<div class="relative flex-1">
							<Search
								class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-base-content/40"
							/>
							<input
								type="text"
								placeholder="Search articles, topics, authors..."
								class="input h-14 w-full rounded-full border-2 border-primary-content/20 bg-base-100/90 pl-12 text-base-content placeholder-base-content/50 backdrop-blur-sm focus:border-primary-content focus:outline-none"
							/>
						</div>
						<button
							class="btn h-14 rounded-full bg-base-100 text-primary transition-transform duration-300 ease-out btn-lg hover:scale-105"
						>
							<Search class="h-5 w-5" />
						</button>
					</div>
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-3 gap-6 sm:gap-8">
					<div class="space-y-2">
						<div
							class="heading-metrics font-heading text-3xl font-bold text-primary-content sm:text-4xl"
						>
							50K+
						</div>
						<div class="text-xs text-primary-content/80 sm:text-sm">Active Readers</div>
					</div>
					<div class="space-y-2">
						<div
							class="heading-metrics font-heading text-3xl font-bold text-primary-content sm:text-4xl"
						>
							500+
						</div>
						<div class="text-xs text-primary-content/80 sm:text-sm">Articles</div>
					</div>
					<div class="space-y-2">
						<div
							class="heading-metrics font-heading text-3xl font-bold text-primary-content sm:text-4xl"
						>
							4.9★
						</div>
						<div class="text-xs text-primary-content/80 sm:text-sm">Rating</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Decorative Wave -->
		<div class="absolute bottom-0 left-0 w-full rotate-180 overflow-hidden leading-0">
			<svg class="relative block h-16 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
				<path
					d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
					class="fill-base-100"
				></path>
			</svg>
		</div>
	</section>

	<!-- Featured Topics -->
	<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="mb-12 text-center">
			<span
				class="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase"
				>Popular Topics</span
			>
			<h2
				class="heading-metrics mb-4 font-heading text-3xl font-bold text-base-content sm:text-4xl lg:text-5xl"
			>
				Explore What Interests You
			</h2>
			<p class="mx-auto max-w-2xl text-base text-base-content/70 sm:text-lg">
				Dive deep into the topics that matter most to your development journey
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
			<!-- Topic Card 1 -->
			<button
				class="group card relative transform-gpu overflow-hidden border-2 border-primary/20 bg-base-100 p-6 text-left shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary lg:col-span-4"
			>
				<div
					class="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 transition-all duration-500 ease-out group-hover:scale-150"
				></div>
				<div class="relative">
					<div
						class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content"
					>
						<Zap class="h-6 w-6" />
					</div>
					<h3 class="heading-metrics mb-2 font-heading text-xl font-bold text-base-content">
						Performance
					</h3>
					<p class="mb-3 text-sm leading-relaxed text-base-content/70">
						Master optimization techniques and make your apps blazing fast
					</p>
					<span
						class="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-300 ease-in-out group-hover:gap-2"
					>
						127 Articles <ArrowRight class="h-4 w-4" />
					</span>
				</div>
			</button>

			<!-- Topic Card 2 -->
			<button
				class="group card relative transform-gpu overflow-hidden border-2 border-secondary/20 bg-base-100 p-6 text-left shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-secondary lg:col-span-2"
			>
				<div
					class="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-secondary/5 transition-all duration-500 ease-out group-hover:scale-150"
				></div>
				<div class="relative">
					<div
						class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-content"
					>
						<Users class="h-6 w-6" />
					</div>
					<h3 class="heading-metrics mb-2 font-heading text-xl font-bold text-base-content">
						Team Dynamics
					</h3>
					<p class="mb-3 text-sm leading-relaxed text-base-content/70">
						Build high-performing teams with better collaboration strategies
					</p>
					<span
						class="inline-flex items-center gap-1 text-sm font-semibold text-secondary transition-all duration-300 ease-in-out group-hover:gap-2"
					>
						89 Articles <ArrowRight class="h-4 w-4" />
					</span>
				</div>
			</button>

			<!-- Topic Card 3 -->
			<button
				class="group card relative transform-gpu overflow-hidden border-2 border-accent/20 bg-base-100 p-6 text-left shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-accent lg:col-span-2"
			>
				<div
					class="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-accent/5 transition-all duration-500 ease-out group-hover:scale-150"
				></div>
				<div class="relative">
					<div
						class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-content"
					>
						<BookOpen class="h-6 w-6" />
					</div>
					<h3 class="heading-metrics mb-2 font-heading text-xl font-bold text-base-content">
						Best Practices
					</h3>
					<p class="mb-3 text-sm leading-relaxed text-base-content/70">
						Learn proven patterns from experienced developers worldwide
					</p>
					<span
						class="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-300 ease-in-out group-hover:gap-2"
					>
						156 Articles <ArrowRight class="h-4 w-4" />
					</span>
				</div>
			</button>

			<!-- Topic Card 4 -->
			<button
				class="group card relative transform-gpu overflow-hidden border-2 border-base-300 bg-base-100 p-6 text-left shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary lg:col-span-4"
			>
				<div
					class="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 transition-all duration-500 ease-out group-hover:scale-150"
				></div>
				<div class="relative">
					<div
						class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 text-primary transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content"
					>
						<TrendingUp class="h-6 w-6" />
					</div>
					<h3 class="heading-metrics mb-2 font-heading text-xl font-bold text-base-content">
						Industry Trends
					</h3>
					<p class="mb-3 text-sm leading-relaxed text-base-content/70">
						Stay ahead with insights into emerging tools and methodologies
					</p>
					<span
						class="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-300 ease-in-out group-hover:gap-2"
					>
						92 Articles <ArrowRight class="h-4 w-4" />
					</span>
				</div>
			</button>
		</div>
	</section>

	<!-- Latest Articles Preview -->
	<section class="bg-base-200/50 py-16 lg:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
			>
				<div>
					<h2
						class="heading-metrics mb-2 font-heading text-3xl font-bold text-base-content sm:text-4xl"
					>
						Latest Articles
					</h2>
					<p class="text-base-content/70">Fresh insights delivered weekly</p>
				</div>
				<button class="btn gap-2 rounded-full btn-outline btn-primary">
					View All <ArrowRight class="h-4 w-4" />
				</button>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each [{ title: 'Building Scalable Systems from Day One', category: 'Engineering', time: '12 min read', author: 'Sarah Chen', date: 'Mar 15, 2025', gradient: 'from-primary via-primary to-secondary' }, { title: 'Mastering Modern Web Performance', category: 'Performance', time: '8 min read', author: 'Alex Rivera', date: 'Mar 12, 2025', gradient: 'from-secondary via-secondary to-accent' }, { title: 'The Future of Frontend Development', category: 'Trends', time: '10 min read', author: 'Jamie Liu', date: 'Mar 10, 2025', gradient: 'from-accent via-accent to-primary' }] as article, i}
					<article
						class="group card relative transform-gpu overflow-hidden border border-base-300 bg-base-100 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2"
					>
						<!-- Featured Image -->
						<div
							class="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br {article.gradient}"
						>
							<div
								class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
							></div>
							<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
							<div class="absolute right-3 bottom-3 left-3 flex items-center justify-between">
								<span
									class="badge border-0 bg-base-100 text-xs font-bold text-base-content shadow-lg"
								>
									{article.category}
								</span>
								<span class="flex items-center gap-1 text-xs font-medium text-white">
									<Clock class="h-3 w-3" />
									{article.time}
								</span>
							</div>
						</div>

						<!-- Content -->
						<div class="p-6">
							<h3
								class="heading-metrics mb-3 font-heading text-xl leading-tight font-bold text-base-content transition-colors duration-300 ease-in-out group-hover:text-primary"
							>
								{article.title}
							</h3>
							<p class="mb-4 text-sm leading-relaxed text-base-content/70">
								Discover essential strategies and best practices that will transform your
								development workflow and boost productivity.
							</p>

							<!-- Author & CTA -->
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<div class="placeholder avatar">
										<div class="w-8 rounded-full bg-primary text-xs text-primary-content">
											{article.author
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</div>
									</div>
									<div class="text-xs">
										<p class="font-semibold text-base-content">{article.author}</p>
										<p class="text-base-content/60">{article.date}</p>
									</div>
								</div>
								<button
									class="btn btn-circle text-primary btn-ghost transition-transform duration-300 ease-out btn-sm group-hover:scale-110"
								>
									<ArrowRight class="h-4 w-4" />
								</button>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Newsletter CTA -->
	<section
		class="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/50 to-primary/80 py-20 lg:py-28"
	>
		<!-- Animated Background -->
		<div class="absolute inset-0">
			<div
				class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px]"
			></div>
			<div
				class="absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-[120px]"
				style="animation-duration: 8s;"
			></div>
			<div
				class="absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-[120px]"
				style="animation-duration: 10s; animation-delay: 2s;"
			></div>
		</div>

		<div class="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
			<div
				class="mb-6 inline-flex items-center justify-center rounded-full border-2 border-primary-content/30 bg-primary-content/10 p-4 backdrop-blur-sm"
			>
				<Mail class="h-10 w-10 text-primary-content sm:h-12 sm:w-12" />
			</div>

			<h2
				class="heading-metrics mb-4 font-heading text-3xl font-bold text-primary-content sm:text-4xl lg:text-5xl"
			>
				Join Our Community
			</h2>
			<p class="mb-8 text-base leading-relaxed text-primary-content/90 sm:text-lg lg:text-xl">
				Get exclusive articles, tutorials, and industry insights delivered straight to your inbox.
				Join 15,000+ developers who are staying ahead.
			</p>

			<div class="mx-auto max-w-lg">
				<div class="flex flex-col gap-3 sm:flex-row">
					<input
						type="email"
						placeholder="Enter your email address"
						class="input h-14 flex-1 rounded-full border-2 border-primary-content/30 bg-base-100/90 text-base-content placeholder-base-content/50 backdrop-blur-sm transition-all focus:border-primary-content focus:outline-none"
					/>
					<button
						class="btn h-14 rounded-full border-0 bg-base-100 text-primary shadow-xl transition-transform duration-300 ease-out btn-lg hover:scale-105"
					>
						Subscribe Now
					</button>
				</div>
				<p class="mt-4 text-xs text-primary-content/80">
					✨ Free forever. Unsubscribe anytime. No spam, ever.
				</p>
			</div>

			<!-- Social Proof -->
			<div class="mt-10 flex items-center justify-center gap-6">
				<div class="text-center">
					<div class="heading-metrics font-heading text-2xl font-bold text-primary-content">
						15K+
					</div>
					<div class="text-xs text-primary-content/80">Subscribers</div>
				</div>
				<div class="h-8 w-px bg-primary-content/30"></div>
				<div class="text-center">
					<div class="heading-metrics font-heading text-2xl font-bold text-primary-content">
						4.9★
					</div>
					<div class="text-xs text-primary-content/80">Average Rating</div>
				</div>
				<div class="h-8 w-px bg-primary-content/30"></div>
				<div class="text-center">
					<div class="heading-metrics font-heading text-2xl font-bold text-primary-content">
						Weekly
					</div>
					<div class="text-xs text-primary-content/80">Updates</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="mb-12 text-center">
			<span
				class="mb-3 inline-block rounded-full bg-success/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-success uppercase"
				>Testimonials</span
			>
			<h2
				class="heading-metrics mb-4 font-heading text-3xl font-bold text-base-content sm:text-4xl"
			>
				Loved by Developers Worldwide
			</h2>
			<p class="mx-auto max-w-2xl text-base-content/70">
				Don't just take our word for it — hear from developers who've leveled up their skills with
				our content
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each [{ name: 'Sarah Chen', role: 'Senior Engineer', company: 'TechCorp', quote: 'These articles consistently provide actionable insights. No fluff, just practical guidance I can apply immediately to real projects.', avatar: 'SC', color: 'from-primary to-secondary' }, { name: 'Marcus Rodriguez', role: 'Tech Lead', company: 'StartupXYZ', quote: 'Finally, a blog that respects my time. Every piece is well-researched, well-written, and genuinely helpful for solving actual problems.', avatar: 'MR', color: 'from-secondary to-accent' }, { name: 'Emily Johnson', role: 'Engineering Manager', company: 'DevCo', quote: 'I share these articles with my team regularly. They spark great discussions and consistently level up our practices and workflows.', avatar: 'EJ', color: 'from-accent to-primary' }] as testimonial}
				<div
					class="group card relative transform-gpu overflow-hidden border-2 border-base-300 bg-base-100 p-6 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary/50"
				>
					<div
						class="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-primary/5 transition-all duration-500 ease-out group-hover:scale-150"
					></div>
					<div class="relative">
						<div class="mb-4 flex items-center gap-1">
							{#each [1, 2, 3, 4, 5] as star}
								<Star class="h-4 w-4 fill-warning text-warning" />
							{/each}
						</div>
						<p class="mb-6 text-sm leading-relaxed text-base-content">
							"{testimonial.quote}"
						</p>
						<div class="flex items-center gap-3">
							<div class="placeholder avatar">
								<div class="w-12 rounded-full bg-gradient-to-br {testimonial.color}">
									<span class="text-sm font-bold text-primary-content">{testimonial.avatar}</span>
								</div>
							</div>
							<div>
								<div class="font-bold text-base-content">{testimonial.name}</div>
								<div class="text-xs text-base-content/60">{testimonial.role}</div>
								<div class="text-xs font-medium text-primary">{testimonial.company}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-base-300 bg-base-200 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
				<!-- Brand -->
				<div class="lg:col-span-4">
					<div class="mb-4 flex items-center gap-2">
						<BookOpen class="h-7 w-7 text-primary" />
						<span class="heading-metrics font-heading text-2xl font-bold text-base-content"
							>TechInsights</span
						>
					</div>
					<p class="mb-6 max-w-sm text-sm leading-relaxed text-base-content/70">
						Empowering developers with practical guides, deep dives, and insights into modern
						software development.
					</p>
					<div class="flex gap-3">
						<button
							aria-label="Follow us on Twitter"
							class="btn btn-circle border-base-300 bg-base-100 transition-all duration-200 ease-in-out btn-sm hover:border-primary hover:bg-primary hover:text-primary-content"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"
								><path
									d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
								/></svg
							>
						</button>
						<button
							aria-label="Follow us on GitHub"
							class="btn btn-circle border-base-300 bg-base-100 transition-all duration-200 ease-in-out btn-sm hover:border-primary hover:bg-primary hover:text-primary-content"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"
								><path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/></svg
							>
						</button>
						<button
							aria-label="Follow us on LinkedIn"
							class="btn btn-circle border-base-300 bg-base-100 transition-all duration-200 ease-in-out btn-sm hover:border-primary hover:bg-primary hover:text-primary-content"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"
								><path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/></svg
							>
						</button>
					</div>
				</div>

				<!-- Links -->
				<div class="lg:col-span-2">
					<h4 class="mb-4 font-bold text-base-content">Topics</h4>
					<ul class="space-y-2.5 text-sm">
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Performance</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Architecture</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Best Practices</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Tutorials</button
							>
						</li>
					</ul>
				</div>

				<div class="lg:col-span-2">
					<h4 class="mb-4 font-bold text-base-content">Resources</h4>
					<ul class="space-y-2.5 text-sm">
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>All Articles</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Newsletter</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>RSS Feed</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Sitemap</button
							>
						</li>
					</ul>
				</div>

				<div class="lg:col-span-2">
					<h4 class="mb-4 font-bold text-base-content">Company</h4>
					<ul class="space-y-2.5 text-sm">
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>About Us</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Careers</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Contact</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Advertise</button
							>
						</li>
					</ul>
				</div>

				<div class="lg:col-span-2">
					<h4 class="mb-4 font-bold text-base-content">Legal</h4>
					<ul class="space-y-2.5 text-sm">
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Privacy</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Terms</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Cookie Policy</button
							>
						</li>
						<li>
							<button
								class="text-base-content/70 transition-colors duration-300 ease-in-out hover:text-primary"
								>Licenses</button
							>
						</li>
					</ul>
				</div>
			</div>

			<div
				class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-base-300 pt-8 sm:flex-row"
			>
				<p class="text-sm text-base-content/60">&copy; 2025 TechInsights. All rights reserved.</p>
				<p class="text-xs text-base-content/50">Made with ❤️ for developers</p>
			</div>
		</div>
	</footer>
</div>
