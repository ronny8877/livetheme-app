<script lang="ts">
	import { Palette, Sparkles, Eye, Zap, Type, ArrowRight, Check } from '@lucide/svelte';

	// Accept props for preview mode
	let { isPreview = true }: { isPreview?: boolean } = $props();

	const features = [
		{
			icon: Palette,
			title: 'Unlimited Themes',
			description: 'Create and save unlimited color palettes with intelligent color harmonies'
		},
		{
			icon: Eye,
			title: 'Real-Time Preview',
			description: 'See your themes applied instantly to actual UI templates'
		},
		{
			icon: Sparkles,
			title: 'Smart Generation',
			description: 'Generate beautiful theme combinations with one click'
		},
		{
			icon: Type,
			title: '2000+ Fonts',
			description: 'Professional font library to perfect your designs'
		}
	];

	const stats = [
		{ value: '1M+', label: 'Themes Created' },
		{ value: '2000+', label: 'Fonts' },
		{ value: '50+', label: 'Templates' }
	];

	// Helper to handle link clicks in preview mode
	function handleClick(e: MouseEvent) {
		if (isPreview) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
</script>

<div class="min-h-screen bg-base-100">
	<!-- Navigation -->
	<nav class="navbar sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur-xl">
		<div class="container mx-auto flex items-center justify-between px-4 lg:px-6">
			<button class="flex items-center gap-2" onclick={handleClick}>
				<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
					<Palette class="h-5 w-5 text-primary-content" />
				</div>
				<span class="font-heading text-xl font-bold">LiveTheme</span>
			</button>
			<div class="flex items-center gap-6 md:flex">
				<button
					onclick={handleClick}
					class="text-sm font-medium transition-colors hover:text-primary"
				>
					Features
				</button>
				<button
					onclick={handleClick}
					class="text-sm font-medium transition-colors hover:text-primary"
				>
					Pricing
				</button>
				<button
					onclick={handleClick}
					class="text-sm font-medium transition-colors hover:text-primary"
				>
					Editor
				</button>
			</div>
			<div class="flex items-center gap-2">
				<button onclick={handleClick} class="btn btn-ghost btn-sm">Sign In</button>
				<button onclick={handleClick} class="group btn btn-sm btn-primary">
					Get Started
					<ArrowRight class="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
				</button>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="px-6 py-20 md:py-32">
		<div class="container mx-auto max-w-5xl text-center">
			<div class="mb-6 badge gap-2 badge-outline badge-primary">
				<Sparkles class="h-3 w-3" />
				Over 1 Million Themes Generated
			</div>

			<h1 class="mb-6 font-heading text-4xl leading-tight font-bold md:text-6xl">
				Create Beautiful Themes<br />In Real-Time
			</h1>

			<p class="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-base-content/70 md:text-lg">
				Design, preview, and perfect color palettes instantly. Access 2000+ fonts, generate
				unlimited themes, and see your creations come to life on real UI templates.
			</p>

			<div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
				<button onclick={handleClick} class="group btn w-full btn-lg btn-primary sm:w-auto">
					Start Creating Free
					<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
				</button>
				<button onclick={handleClick} class="btn w-full btn-outline btn-lg sm:w-auto">
					Learn More
				</button>
			</div>

			<!-- Stats -->
			<div class="mt-20 grid grid-cols-3 gap-6">
				{#each stats as stat}
					<div
						class="rounded-2xl border border-base-300 bg-base-200 p-6 transition-all hover:border-primary hover:shadow-lg"
					>
						<div class="mb-2 text-3xl font-bold text-primary">{stat.value}</div>
						<div class="text-sm text-base-content/60">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Showcase -->
	<section class="bg-base-200 px-6 py-20">
		<div class="container mx-auto max-w-6xl">
			<div class="mb-12 text-center">
				<div class="mb-4 badge gap-2 badge-outline badge-secondary">
					<Zap class="h-3 w-3" />
					Features
				</div>
				<h2 class="mb-4 font-heading text-3xl font-bold md:text-4xl">Everything You Need</h2>
				<p class="mx-auto max-w-2xl text-base text-base-content/70">
					Professional tools designed for designers and developers
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				{#each features as feature}
					{@const Icon = feature.icon}
					<div class="group card bg-base-100 shadow-md transition-all hover:shadow-xl">
						<div class="card-body p-6">
							<div
								class="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
							>
								<Icon class="h-6 w-6 text-primary" />
							</div>
							<h3 class="card-title text-lg">{feature.title}</h3>
							<p class="text-sm text-base-content/70">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section class="px-6 py-20">
		<div class="container mx-auto max-w-5xl">
			<div class="mb-12 text-center">
				<h2 class="mb-4 font-heading text-3xl font-bold md:text-4xl">Simple Pricing</h2>
				<p class="mx-auto max-w-2xl text-base text-base-content/70">
					Start free, upgrade when you're ready
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				<!-- Free Plan -->
				<div class="card bg-base-100 shadow-lg">
					<div class="card-body">
						<h3 class="card-title">Free</h3>
						<div class="mb-4 flex items-baseline">
							<span class="text-4xl font-bold">$0</span>
							<span class="ml-2 text-base-content/60">/forever</span>
						</div>
						<p class="mb-6 text-sm text-base-content/70">Perfect for getting started</p>

						<ul class="space-y-3">
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-success" />
								<span class="text-sm">Unlimited theme creation</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-success" />
								<span class="text-sm">Real-time preview</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-success" />
								<span class="text-sm">Basic fonts</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-success" />
								<span class="text-sm">Cloud sync (10 themes)</span>
							</li>
						</ul>

						<div class="mt-6 card-actions">
							<button onclick={handleClick} class="btn w-full btn-outline">Start Free</button>
						</div>
					</div>
				</div>

				<!-- Pro Plan -->
				<div class="card border-2 border-primary bg-base-100 shadow-xl">
					<div class="card-body">
						<div class="absolute top-4 right-4 badge badge-primary">Popular</div>

						<h3 class="card-title">Pro</h3>
						<div class="mb-4 flex items-baseline">
							<span class="text-4xl font-bold">$5.99</span>
							<span class="ml-2 text-base-content/60">/month</span>
						</div>
						<p class="mb-6 text-sm text-base-content/70">For serious creators</p>

						<ul class="space-y-3">
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
								<span class="text-sm font-medium">Everything in Free, plus:</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
								<span class="text-sm">2000+ premium fonts</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
								<span class="text-sm">Random font suggestions</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
								<span class="text-sm">Unlimited cloud sync</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
								<span class="text-sm">No ads</span>
							</li>
						</ul>

						<div class="mt-6 card-actions">
							<button onclick={handleClick} class="btn w-full btn-primary">Upgrade to Pro</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-base-200 px-6 py-20">
		<div class="container mx-auto max-w-3xl text-center">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body items-center p-12">
					<Sparkles class="mb-4 h-10 w-10 text-primary" />
					<h2 class="mb-4 card-title text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
					<p class="mb-6 text-base text-base-content/70">
						Join thousands of designers and developers creating beautiful themes
					</p>
					<button onclick={handleClick} class="group btn btn-lg btn-primary">
						Start Creating Now
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer-center footer border-t border-base-300 bg-base-100 p-10 text-base-content">
		<aside>
			<div class="flex items-center gap-2">
				<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
					<Palette class="h-5 w-5 text-primary-content" />
				</div>
				<span class="font-heading text-xl font-bold">LiveTheme</span>
			</div>
			<p class="mt-4 max-w-md text-sm text-base-content/70">
				Create, preview, and perfect your color themes in real-time
			</p>
		</aside>
		<nav class="grid grid-flow-col gap-4">
			<button onclick={handleClick} class="link text-sm link-hover">Features</button>
			<button onclick={handleClick} class="link text-sm link-hover">Pricing</button>
			<button onclick={handleClick} class="link text-sm link-hover">Editor</button>
			<button onclick={handleClick} class="link text-sm link-hover">About</button>
		</nav>
		<aside>
			<p class="text-xs text-base-content/60">© 2025 LiveTheme. All rights reserved.</p>
		</aside>
	</footer>
</div>
