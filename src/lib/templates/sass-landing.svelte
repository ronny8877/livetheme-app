<script lang="ts">
	import {
		ArrowRight,
		Check,
		Users,
		Menu,
		Headphones,
		Github,
		Twitter,
		Linkedin,
		Palette,
		Sparkles,
		Layout,
		Code,
		Download,
		Eye,
		Settings
	} from '@lucide/svelte';

	let mobileMenuOpen = false;

	const features = [
		{
			icon: Palette,
			title: 'Beautiful Themes',
			description:
				'Create stunning, professional themes with our intuitive design tools and extensive customization options.'
		},
		{
			icon: Code,
			title: 'Export Ready Code',
			description:
				'Generate clean, production-ready code that you can use in any project. No vendor lock-in.'
		},
		{
			icon: Sparkles,
			title: 'AI-Powered Design',
			description:
				'Let AI help you create beautiful color palettes and typography combinations that work perfectly together.'
		},
		{
			icon: Layout,
			title: 'Pre-built Components',
			description:
				'Access hundreds of pre-designed components and templates to speed up your development process.'
		},
		{
			icon: Eye,
			title: 'Live Preview',
			description:
				'See your changes in real-time with our interactive preview system. What you see is what you get.'
		},
		{
			icon: Download,
			title: 'Multiple Formats',
			description:
				'Export your themes in CSS, SCSS, Tailwind, or any format you need for your project.'
		}
	];

	const testimonials = [
		{
			name: 'Sarah Chen',
			role: 'UI Designer at DesignCorp',
			avatar:
				'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
			content:
				'LiveTheme has completely transformed my design workflow. I can create beautiful, consistent themes in minutes instead of hours.',
			rating: 5
		},
		{
			name: 'Marcus Rodriguez',
			role: 'Frontend Developer at StartupXYZ',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
			content:
				'The code export feature is incredible. Clean, well-structured CSS that integrates perfectly with our existing projects.',
			rating: 5
		},
		{
			name: 'Emily Watson',
			role: 'Product Designer at TechFlow',
			avatar:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
			content:
				"The AI suggestions are spot-on. It's like having a design expert helping me create perfect color combinations every time.",
			rating: 5
		}
	];

	const pricingPlans = [
		{
			name: 'Free',
			price: '$0',
			period: '/month',
			description: 'Perfect for trying out and personal projects',
			features: [
				'3 theme projects',
				'Basic color palettes',
				'Standard templates',
				'Community support',
				'CSS export'
			],
			popular: false
		},
		{
			name: 'Pro',
			price: '$19',
			period: '/month',
			description: 'Ideal for designers and small teams',
			features: [
				'Unlimited projects',
				'Advanced AI suggestions',
				'Premium templates',
				'Priority support',
				'All export formats',
				'Custom components',
				'Team collaboration'
			],
			popular: true
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			description: 'For agencies and large organizations',
			features: [
				'Everything in Pro',
				'White-label solution',
				'Custom integrations',
				'Dedicated support',
				'Advanced analytics',
				'Brand guidelines',
				'SLA guarantees'
			],
			popular: false
		}
	];
</script>

<div class="min-h-screen bg-base-100 font-sans">
	<!-- Navigation -->
	<div class="navbar sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur-md">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between md:h-20">
				<div class="flex items-center gap-8">
					<div class="flex items-center gap-3">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary md:h-10 md:w-10"
						>
							<Palette class="h-5 w-5 text-primary-content md:h-6 md:w-6" />
						</div>
						<h1 class="text-xl font-bold text-base-content md:text-2xl">LiveTheme</h1>
					</div>

					<div class="hidden items-center gap-8 lg:flex">
						<a href="#features" class="text-base-content transition-colors hover:text-primary">
							Features
						</a>
						<a href="#templates" class="text-base-content transition-colors hover:text-primary">
							Templates
						</a>
						<a href="#pricing" class="text-base-content transition-colors hover:text-primary">
							Pricing
						</a>
						<a href="#docs" class="text-base-content transition-colors hover:text-primary">
							Docs
						</a>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<button
						class="btn hidden rounded-box text-base-content btn-outline btn-sm md:inline-flex"
					>
						Sign In
					</button>
					<button class="btn rounded-box btn-sm btn-primary md:btn-md"> Start Creating </button>
					<button
						class="btn btn-circle rounded-box btn-ghost btn-sm lg:hidden"
						on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
					>
						<Menu class="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Hero Section - Bento Style -->
	<section class="hero min-h-screen bg-linear-to-br from-base-100 via-base-200 to-base-300">
		<div class="hero-content text-center">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<!-- Main Hero Content -->
				<div class="mx-auto mb-16 max-w-4xl text-center">
					<div class="mb-8 badge h-auto gap-2 badge-lg badge-primary">
						<Sparkles class="h-4 w-4" />
						Streamline your workflow with our software!
					</div>

					<h1
						class="mb-6 text-4xl leading-tight font-bold text-base-content md:text-6xl lg:text-7xl"
					>
						Create Beautiful{' '}
						<span class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
							Themes
						</span>{' '}
						Instantly
					</h1>

					<p class="mb-10 text-xl leading-relaxed text-base-content/70 md:text-2xl">
						Experience seamless integration and user-friendly features. Design, customize, and
						export professional themes in minutes.
					</p>

					<div class="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<button class="btn rounded-box shadow-xl btn-lg btn-primary hover:shadow-2xl">
							Try free
							<ArrowRight class="h-5 w-5" />
						</button>
						<button class="btn rounded-box btn-outline btn-lg"> Schedule demo </button>
					</div>
				</div>

				<!-- Bento Grid -->
				<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
					<!-- Large Card - Happy Clients -->
					<div class="card bg-base-100 shadow-xl md:col-span-2 lg:col-span-2">
						<div class="card-body">
							<div class="mb-6 flex items-center gap-4">
								<div class="text-4xl font-bold text-primary md:text-5xl">500K+</div>
								<div class="avatar-group -space-x-2">
									<div class="avatar">
										<div
											class="h-8 w-8 rounded-full bg-linear-to-r from-blue-400 to-blue-600"
										></div>
									</div>
									<div class="avatar">
										<div
											class="h-8 w-8 rounded-full bg-linear-to-r from-green-400 to-green-600"
										></div>
									</div>
									<div class="avatar">
										<div
											class="h-8 w-8 rounded-full bg-linear-to-r from-purple-400 to-purple-600"
										></div>
									</div>
									<div class="avatar">
										<div
											class="h-8 w-8 rounded-full bg-linear-to-r from-pink-400 to-pink-600"
										></div>
									</div>
								</div>
							</div>
							<h3 class="card-title text-base-content">Happy clients</h3>
							<p class="text-base-content/60">Trusted by designers and developers worldwide</p>
						</div>
					</div>

					<!-- Medium Card - Projects -->
					<div class="card bg-base-100 shadow-xl">
						<div class="card-body">
							<div class="mb-2 text-3xl font-bold text-primary">10K+</div>
							<h3 class="card-title text-lg text-base-content">Projects managed</h3>
							<div class="h-2 w-full rounded-full bg-base-200">
								<div class="h-2 w-3/4 rounded-full bg-linear-to-r from-primary to-secondary"></div>
							</div>
						</div>
					</div>

					<!-- Medium Card - Users -->
					<div class="card bg-base-100 shadow-xl">
						<div class="card-body">
							<div class="mb-2 text-3xl font-bold text-primary">200K+</div>
							<h3 class="card-title text-lg text-base-content">Users engaged</h3>
							<div class="flex items-center gap-2">
								<Users class="h-5 w-5 text-primary" />
								<span class="text-sm text-base-content/60"> Active community </span>
							</div>
						</div>
					</div>

					<!-- Large Card - Contact -->
					<div
						class="card bg-linear-to-r from-primary to-secondary text-primary-content shadow-xl md:col-span-3 lg:col-span-2"
					>
						<div class="card-body">
							<h3 class="card-title text-2xl text-primary-content">Contact us</h3>
							<p class="text-primary-content opacity-90">
								Ready to transform your design workflow? Get in touch with our team.
							</p>
							<div class="card-actions">
								<button class="btn rounded-box btn-secondary">
									Inquiries
									<ArrowRight class="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>

					<!-- Small Card - Upgrade -->
					<div class="card bg-base-100 shadow-xl lg:col-span-2">
						<div class="card-body">
							<div class="mb-4 flex items-center gap-3">
								<div class="placeholder avatar">
									<div class="w-10 rounded-xl bg-warning/20 text-warning">
										<Settings class="h-5 w-5" />
									</div>
								</div>
								<div class="badge badge-warning">UPGRADE PLAN</div>
							</div>
							<h3 class="card-title text-lg text-base-content">Unlock premium features</h3>
							<p class="text-sm text-base-content/60">Get access to advanced tools and templates</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="py-20 md:py-32">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-bold text-base-content md:text-5xl">
					Everything You Need to{' '}
					<span class="text-primary">Design</span>
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-base-content/70">
					Built for modern designers and developers who demand beautiful, functional, and
					customizable themes.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature, index}
					<div class="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
						<div class="card-body">
							<div class="placeholder avatar mb-6">
								<div
									class="flex w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
								>
									<svelte:component this={feature.icon} class="mx-auto mt-2 block h-6 w-6" />
								</div>
							</div>
							<h3 class="card-title text-base-content">
								{feature.title}
							</h3>
							<p class="text-base-content/70">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section id="testimonials" class="bg-base-200 py-20 md:py-32">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-bold text-base-content md:text-5xl">
					Loved by <span class="text-primary">Designers</span>
				</h2>
				<p class="text-xl text-base-content/70">
					See what our customers are saying about LiveTheme
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each testimonials as testimonial, index}
					<div class="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
						<div class="card-body">
							<div class="rating-sm rating mb-6">
								{#each Array(testimonial.rating) as _, i}
									<input type="radio" class="mask bg-warning mask-star-2" checked disabled />
								{/each}
							</div>
							<p class="mb-6 text-base-content/80">
								{testimonial.content}
							</p>
							<div class="flex items-center gap-4">
								<div class="avatar">
									<div class="w-12 rounded-full">
										<img src={testimonial.avatar} alt={testimonial.name} />
									</div>
								</div>
								<div>
									<div class="font-semibold text-base-content">
										{testimonial.name}
									</div>
									<div class="text-sm text-base-content/60">
										{testimonial.role}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section id="pricing" class="py-20 md:py-32">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-bold text-base-content md:text-5xl">
					Simple, <span class="text-primary">Transparent</span> Pricing
				</h2>
				<p class="text-xl text-base-content/70">Start free, scale as you grow. No hidden fees.</p>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each pricingPlans as plan, index}
					<div
						class={`card shadow-xl transition-all duration-300 hover:shadow-2xl ${
							plan.popular
								? 'scale-105 bg-primary text-primary-content ring-4 ring-primary/20'
								: 'bg-base-100'
						}`}
					>
						{#if plan.popular}
							<div class="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform">
								<div class="badge gap-1 badge-secondary">⭐ Most Popular</div>
							</div>
						{/if}

						<div class="card-body text-center">
							<h3
								class={`card-title justify-center text-2xl ${plan.popular ? 'text-primary-content' : 'text-base-content'}`}
							>
								{plan.name}
							</h3>
							<p
								class={`mb-6 ${plan.popular ? 'text-primary-content/80' : 'text-base-content/60'}`}
							>
								{plan.description}
							</p>

							<div class="mb-8">
								<span
									class={`text-4xl font-bold md:text-5xl ${plan.popular ? 'text-primary-content' : 'text-base-content'}`}
								>
									{plan.price}
								</span>
								<span
									class={`text-lg ${plan.popular ? 'text-primary-content/80' : 'text-base-content/60'}`}
								>
									{plan.period}
								</span>
							</div>

							<ul class="mb-8 space-y-4">
								{#each plan.features as feature, idx}
									<li class="flex items-center gap-3">
										<Check class="h-5 w-5 shrink-0 text-success" />
										<span
											class={`text-sm ${plan.popular ? 'text-primary-content' : 'text-base-content'}`}
										>
											{feature}
										</span>
									</li>
								{/each}
							</ul>

							<div class="card-actions justify-center">
								<button
									class={`btn w-full rounded-box ${plan.popular ? 'btn-secondary' : 'btn-primary'}`}
								>
									{plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Creating'}
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section
		class="hero bg-linear-to-r from-primary to-secondary py-20 text-primary-content md:py-32"
	>
		<div class="hero-content text-center">
			<div class="max-w-2xl">
				<h2 class="mb-6 text-3xl font-bold text-primary-content md:text-5xl">
					Ready to Create Amazing Themes?
				</h2>
				<p class="mb-10 text-xl text-primary-content opacity-90">
					Join thousands of designers who trust LiveTheme for their creative projects.
				</p>
				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<button class="btn rounded-box shadow-xl btn-lg btn-secondary">
						Start Creating
						<ArrowRight class="h-5 w-5" />
					</button>
					<button
						class="btn rounded-box border-primary-content text-primary-content btn-outline btn-lg hover:bg-primary-content hover:text-primary"
					>
						<Headphones class="h-5 w-5" />
						Get Support
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer-center footer bg-base-300 p-10 text-base-content">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="footer grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-4">
				<div class="col-span-1 md:col-span-2 lg:col-span-1">
					<div class="mb-6 flex items-center gap-3">
						<div class="placeholder avatar">
							<div
								class="w-8 rounded-xl bg-linear-to-br from-primary to-secondary text-primary-content"
							>
								<Palette class="h-5 w-5" />
							</div>
						</div>
						<h3 class="text-xl font-bold text-base-content">LiveTheme</h3>
					</div>
					<p class="mb-6 text-left text-base-content/70">
						The fastest way to create, customize, and export beautiful themes for your projects.
					</p>
					<div class="flex gap-3">
						<button class="btn btn-circle rounded-box btn-ghost btn-sm">
							<Twitter class="h-4 w-4" />
						</button>
						<button class="btn btn-circle rounded-box btn-ghost btn-sm">
							<Github class="h-4 w-4" />
						</button>
						<button class="btn btn-circle rounded-box btn-ghost btn-sm">
							<Linkedin class="h-4 w-4" />
						</button>
					</div>
				</div>

				<div>
					<span class="footer-title text-base-content">Product</span>
					<a href="#" class="link text-base-content link-hover">Theme Builder</a>
					<a href="#" class="link text-base-content link-hover">Templates</a>
					<a href="#" class="link text-base-content link-hover">Color Tools</a>
					<a href="#" class="link text-base-content link-hover"> Export Options </a>
				</div>

				<div>
					<span class="footer-title text-base-content">Resources</span>
					<a href="#" class="link text-base-content link-hover">Documentation</a>
					<a href="#" class="link text-base-content link-hover">Tutorials</a>
					<a href="#" class="link text-base-content link-hover">Design Guide</a>
					<a href="#" class="link text-base-content link-hover">Community</a>
				</div>

				<div>
					<span class="footer-title text-base-content">Company</span>
					<a href="#" class="link text-base-content link-hover">About</a>
					<a href="#" class="link text-base-content link-hover">Blog</a>
					<a href="#" class="link text-base-content link-hover">Careers</a>
					<a href="#" class="link text-base-content link-hover">Contact</a>
				</div>
			</div>

			<div class="divider"></div>
			<div class="text-center">
				<p class="text-base-content/60">© 2025 LiveTheme. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
