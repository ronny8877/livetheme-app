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
    Settings,
  } from "@lucide/svelte";

  let mobileMenuOpen = false;

  const features = [
    {
      icon: Palette,
      title: "Beautiful Themes",
      description:
        "Create stunning, professional themes with our intuitive design tools and extensive customization options.",
    },
    {
      icon: Code,
      title: "Export Ready Code",
      description:
        "Generate clean, production-ready code that you can use in any project. No vendor lock-in.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description:
        "Let AI help you create beautiful color palettes and typography combinations that work perfectly together.",
    },
    {
      icon: Layout,
      title: "Pre-built Components",
      description:
        "Access hundreds of pre-designed components and templates to speed up your development process.",
    },
    {
      icon: Eye,
      title: "Live Preview",
      description:
        "See your changes in real-time with our interactive preview system. What you see is what you get.",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description:
        "Export your themes in CSS, SCSS, Tailwind, or any format you need for your project.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UI Designer at DesignCorp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content:
        "LiveTheme has completely transformed my design workflow. I can create beautiful, consistent themes in minutes instead of hours.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Frontend Developer at StartupXYZ",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        "The code export feature is incredible. Clean, well-structured CSS that integrates perfectly with our existing projects.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Product Designer at TechFlow",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "The AI suggestions are spot-on. It's like having a design expert helping me create perfect color combinations every time.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out and personal projects",
      features: [
        "3 theme projects",
        "Basic color palettes",
        "Standard templates",
        "Community support",
        "CSS export",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Ideal for designers and small teams",
      features: [
        "Unlimited projects",
        "Advanced AI suggestions",
        "Premium templates",
        "Priority support",
        "All export formats",
        "Custom components",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For agencies and large organizations",
      features: [
        "Everything in Pro",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "Brand guidelines",
        "SLA guarantees",
      ],
      popular: false,
    },
  ];
</script>

<div class="min-h-screen bg-base-100 font-sans">
  <!-- Navigation -->
  <div class="navbar sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Palette class="w-5 h-5 md:w-6 md:h-6 text-primary-content" />
            </div>
            <h1 class="text-xl md:text-2xl font-bold text-base-content">
              LiveTheme
            </h1>
          </div>

          <div class="hidden lg:flex items-center gap-8">
            <a
              href="#features"
              class="text-base-content hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              class="text-base-content hover:text-primary transition-colors"
            >
              Templates
            </a>
            <a
              href="#pricing"
              class="text-base-content hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#docs"
              class="text-base-content hover:text-primary transition-colors"
            >
              Docs
            </a>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button class="hidden md:inline-flex btn btn-outline text-base-content btn-sm rounded-box">
            Sign In
          </button>
          <button class="btn btn-primary btn-sm md:btn-md rounded-box">
            Start Creating
          </button>
          <button 
            class="btn btn-ghost btn-sm btn-circle lg:hidden rounded-box"
            on:click={() => mobileMenuOpen = !mobileMenuOpen}
          >
            <Menu class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Hero Section - Bento Style -->
  <section class="hero min-h-screen bg-linear-to-br from-base-100 via-base-200 to-base-300">
    <div class="hero-content text-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main Hero Content -->
        <div class="text-center max-w-4xl mx-auto mb-16">
          <div class="badge badge-primary badge-lg gap-2 mb-8 h-auto">
            <Sparkles class="w-4 h-4" />
            Streamline your workflow with our software!
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-base-content">
            Create Beautiful{" "}
            <span class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Themes
            </span>{" "}
            Instantly
          </h1>

          <p class="text-xl md:text-2xl text-base-content/70 mb-10 leading-relaxed">
            Experience seamless integration and user-friendly features.
            Design, customize, and export professional themes in minutes.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button class="btn btn-primary btn-lg shadow-xl hover:shadow-2xl rounded-box">
              Try free
              <ArrowRight class="w-5 h-5" />
            </button>
            <button class="btn btn-outline btn-lg rounded-box">
              Schedule demo
            </button>
          </div>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <!-- Large Card - Happy Clients -->
          <div class="md:col-span-2 lg:col-span-2 card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="flex items-center gap-4 mb-6">
                <div class="text-4xl md:text-5xl font-bold text-primary">
                  500K+
                </div>
                <div class="avatar-group -space-x-2">
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-blue-600"></div>
                  </div>
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-linear-to-r from-green-400 to-green-600"></div>
                  </div>
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-linear-to-r from-purple-400 to-purple-600"></div>
                  </div>
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-linear-to-r from-pink-400 to-pink-600"></div>
                  </div>
                </div>
              </div>
              <h3 class="card-title text-base-content">
                Happy clients
              </h3>
              <p class="text-base-content/60">
                Trusted by designers and developers worldwide
              </p>
            </div>
          </div>

          <!-- Medium Card - Projects -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="text-3xl font-bold text-primary mb-2">
                10K+
              </div>
              <h3 class="card-title text-lg text-base-content">
                Projects managed
              </h3>
              <div class="w-full bg-base-200 rounded-full h-2">
                <div class="bg-linear-to-r from-primary to-secondary h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          <!-- Medium Card - Users -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="text-3xl font-bold text-primary mb-2">
                200K+
              </div>
              <h3 class="card-title text-lg text-base-content">
                Users engaged
              </h3>
              <div class="flex items-center gap-2">
                <Users class="w-5 h-5 text-primary" />
                <span class="text-sm text-base-content/60">
                  Active community
                </span>
              </div>
            </div>
          </div>

          <!-- Large Card - Contact -->
          <div class="md:col-span-3 lg:col-span-2 card bg-linear-to-r from-primary to-secondary text-primary-content shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl text-primary-content">
                Contact us
              </h3>
              <p class="opacity-90 text-primary-content">
                Ready to transform your design workflow? Get in touch with
                our team.
              </p>
              <div class="card-actions">
                <button class="btn btn-secondary rounded-box">
                  Inquiries
                  <ArrowRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Small Card - Upgrade -->
          <div class="lg:col-span-2 card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4">
                <div class="avatar placeholder">
                  <div class="bg-warning/20 text-warning rounded-xl w-10">
                    <Settings class="w-5 h-5" />
                  </div>
                </div>
                <div class="badge badge-warning">UPGRADE PLAN</div>
              </div>
              <h3 class="card-title text-lg text-base-content">
                Unlock premium features
              </h3>
              <p class="text-sm text-base-content/60">
                Get access to advanced tools and templates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 md:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold mb-6 text-base-content">
          Everything You Need to{" "}
          <span class="text-primary">Design</span>
        </h2>
        <p class="text-xl text-base-content/70 max-w-3xl mx-auto">
          Built for modern designers and developers who demand beautiful,
          functional, and customizable themes.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each features as feature, index}
          <div
            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div class="card-body">
              <div class="avatar placeholder mb-6">
                <div class="bg-primary/10 text-primary flex items-center justify-center rounded-xl w-12">
                  <svelte:component this={feature.icon} class="w-6 h-6 block mt-2 mx-auto" />
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
  <section id="testimonials" class="py-20 md:py-32 bg-base-200">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold mb-6 text-base-content">
          Loved by <span class="text-primary">Designers</span>
        </h2>
        <p class="text-xl text-base-content/70">
          See what our customers are saying about LiveTheme
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each testimonials as testimonial, index}
          <div
            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div class="card-body">
              <div class="rating rating-sm mb-6">
                {#each Array(testimonial.rating) as _, i}
                  <input
                    type="radio"
                    class="mask mask-star-2 bg-warning"
                    checked
                    disabled
                  />
                {/each}
              </div>
              <p class="text-base-content/80 mb-6">
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
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold mb-6 text-base-content">
          Simple, <span class="text-primary">Transparent</span> Pricing
        </h2>
        <p class="text-xl text-base-content/70">
          Start free, scale as you grow. No hidden fees.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {#each pricingPlans as plan, index}
          <div
            class={`card shadow-xl transition-all duration-300 hover:shadow-2xl ${
              plan.popular
                ? "bg-primary text-primary-content scale-105 ring-4 ring-primary/20"
                : "bg-base-100"
            }`}
          >
            {#if plan.popular}
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div class="badge badge-secondary gap-1">
                  ⭐ Most Popular
                </div>
              </div>
            {/if}

            <div class="card-body text-center">
              <h3
                class={`card-title justify-center text-2xl ${plan.popular ? "text-primary-content" : "text-base-content"}`}
              >
                {plan.name}
              </h3>
              <p
                class={`mb-6 ${plan.popular ? "text-primary-content/80" : "text-base-content/60"}`}
              >
                {plan.description}
              </p>

              <div class="mb-8">
                <span
                  class={`text-4xl md:text-5xl font-bold ${plan.popular ? "text-primary-content" : "text-base-content"}`}
                >
                  {plan.price}
                </span>
                <span
                  class={`text-lg ${plan.popular ? "text-primary-content/80" : "text-base-content/60"}`}
                >
                  {plan.period}
                </span>
              </div>

              <ul class="space-y-4 mb-8">
                {#each plan.features as feature, idx}
                  <li class="flex items-center gap-3">
                    <Check class="w-5 h-5 text-success shrink-0" />
                    <span
                      class={`text-sm ${plan.popular ? "text-primary-content" : "text-base-content"}`}
                    >
                      {feature}
                    </span>
                  </li>
                {/each}
              </ul>

              <div class="card-actions justify-center">
                <button
                  class={`btn w-full rounded-box ${plan.popular ? "btn-secondary" : "btn-primary"}`}
                >
                  {plan.name === "Enterprise"
                    ? "Contact Sales"
                    : "Start Creating"}
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="hero py-20 md:py-32 bg-linear-to-r from-primary to-secondary text-primary-content">
    <div class="hero-content text-center">
      <div class="max-w-2xl">
        <h2 class="text-3xl md:text-5xl font-bold mb-6 text-primary-content">
          Ready to Create Amazing Themes?
        </h2>
        <p class="text-xl opacity-90 mb-10 text-primary-content">
          Join thousands of designers who trust LiveTheme for their creative
          projects.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button class="btn btn-secondary btn-lg shadow-xl rounded-box">
            Start Creating
            <ArrowRight class="w-5 h-5" />
          </button>
          <button class="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary rounded-box">
            <Headphones class="w-5 h-5" />
            Get Support
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer footer-center p-10 bg-base-300 text-base-content">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="footer items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <div class="avatar placeholder">
              <div class="bg-linear-to-br from-primary to-secondary text-primary-content rounded-xl w-8">
                <Palette class="w-5 h-5" />
              </div>
            </div>
            <h3 class="text-xl font-bold text-base-content">
              LiveTheme
            </h3>
          </div>
          <p class="text-base-content/70 mb-6 text-left">
            The fastest way to create, customize, and export beautiful
            themes for your projects.
          </p>
          <div class="flex gap-3">
            <button class="btn btn-ghost btn-circle btn-sm rounded-box">
              <Twitter class="w-4 h-4" />
            </button>
            <button class="btn btn-ghost btn-circle btn-sm rounded-box">
              <Github class="w-4 h-4" />
            </button>
            <button class="btn btn-ghost btn-circle btn-sm rounded-box">
              <Linkedin class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <span class="footer-title text-base-content">Product</span>
          <a href="#" class="link link-hover text-base-content">Theme Builder</a>
          <a href="#" class="link link-hover text-base-content">Templates</a>
          <a href="#" class="link link-hover text-base-content">Color Tools</a>
          <a href="#" class="link link-hover text-base-content">
            Export Options
          </a>
        </div>

        <div>
          <span class="footer-title text-base-content">Resources</span>
          <a href="#" class="link link-hover text-base-content">Documentation</a>
          <a href="#" class="link link-hover text-base-content">Tutorials</a>
          <a href="#" class="link link-hover text-base-content">Design Guide</a>
          <a href="#" class="link link-hover text-base-content">Community</a>
        </div>

        <div>
          <span class="footer-title text-base-content">Company</span>
          <a href="#" class="link link-hover text-base-content">About</a>
          <a href="#" class="link link-hover text-base-content">Blog</a>
          <a href="#" class="link link-hover text-base-content">Careers</a>
          <a href="#" class="link link-hover text-base-content">Contact</a>
        </div>
      </div>

      <div class="divider"></div>
      <div class="text-center">
        <p class="text-base-content/60">
          © 2025 LiveTheme. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>