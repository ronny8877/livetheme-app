<script lang="ts">
	import { Search } from '@lucide/svelte';

	// 2. Define component data directly in the script
	const heroImage =
		'https://lh3.googleusercontent.com/aida-public/AB6AXuCyr8wbpOZNNZ8n7JMYh3kQnn77OE6PfbBEHgwKXlcGHZ5VT30CTU_87vVORYKV9DON-byUbXXgqVhAUJw-MCkOmho5PUZnc81Qy8yo2MQY0kRoNHFEJZ5_NT6dNzlJo9GEJc19lsiIg6HUtK8XDb7zzJ5YYDEkgUiQDZ3tnvasLPN-i1A4mNxzhhH1uDVEhEBz3Mvy0iQHKlbJL9AMpr7Ik1qi0XraiHhxL51IkShTRn49SVJxbAwADvohKVk38UlOQwEjpvcACkc';

	const articles = [
		{
			title: 'Mastering Productivity: Time Management Techniques',
			excerpt: 'Learn proven time management strategies to boost your productivity.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuDYITX-oW-AxA02mHod2VaLRZMYOjFnh-DUxaapI5QyzmD1UUIQJQF5hT5d6mrX2LAXwtAwvyJvNTdP4Q7fVMaIvcd9GZvCS8nCrRdkMcFW5keuLSqc25dO7Y_TapikerXv5F0rrcn3TTdKXsYlpzR0wiPcfPAs_TM-zS2wkT5-TP6QRtkl3lz2G6CepwP3xmj0nItO42yLYrKEIDGBlNdzzlrMd4bYba-UU93n0pLVZX_Rh9I3WBug-susTxI2nAlkMuqn9GFQ3GI'
		},
		{
			title: 'The Rise of AI in Software Development',
			excerpt: 'Discover how artificial intelligence is transforming software development.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuBLzrVJsKaPllk-wZ6deJ2Ed5ZPo2INNjQwCYZb7yXTpMp_wt4Ei78PUXV1g93Dz8ydKpYmUgEh7gUP8LMe0Wvx8xTQ7xMTO1MsdSadivTPKyFglQOlmlyjow40t7T1G6EwseObaeufmbx1sIQVnjTWYJciWOkKFggzUokbSSj1K4pi4gwe4qcMhg9OnOs5G7WwBv0mLhPuhW6EfHWJyY-22PDfS3iEKInPp7B09QfN7owil-UKiLzfH9-rnfxDfKrHKu-0EFxGnUY'
		},
		{
			title: 'Cybersecurity Essentials for Remote Workers',
			excerpt: 'Essential cybersecurity tips and practices to safeguard your data.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuDl3zDxyigQXaV7KXFYuwWfkT-mBgAFktTAqjFN2fdNC1-EetdWUp9ukhxjkdTIeRsu0T4bpBjOVdhtaHbS7gQJXi_ayGTobBZQ6mliiIfnzzf5j-0oIbxUvMrOKtEyvPM9WCmhTpysY_8hVvpPSZPYOV58AuFuaswTPyTu0L9M008JZzCMWBKVV0JiDmjjQcxweLP2viMK7TB3vbydyZ7bBly3Klb9-Z8hRrGKnTWOSK4nLI8Tlur5p9Gh51q7HBx-KugbN32f2Ik'
		},
		{
			title: 'The Art of Effective Communication in Virtual Teams',
			excerpt: 'Enhance your communication skills in virtual settings.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuCGWkJ5LnqIvEmqNSyYIGYA2wWH4EJ0cGb_dEQVrP-ExeLKztQqwuz90vaCnhGiyLBnZPEqamOd5IDiSnBuLVlONvlfSRr-L3OF0JVjJC0RfO4H5-rFuNfM5LWniccHwrjcqLw7mJ2cF0WH3n6OI870vYVKaAJsnCivqhCD7yuoYrDhErGA-JC5-BZNsX9UqL5fFQL6fiSE6V-fA1it7YyWePKuY-5EvtGUwG2npTtoLDXIsAeUq-BjtIcEOz7rily5XbO6mWip270'
		},
		{
			title: 'Building a Strong Personal Brand Online',
			excerpt: 'Strategies for crafting a compelling personal brand online.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuDCg_fSTPX83-VDS9OsZo6tAOz0PWIWN_Nc3t2XwxF6EDIWGfskO4SRxhmJLYMDXFaAx7XoUhq6mzGAV62KiKgmyT9MQ750Zln6xDhf3P7tgBLLzj4pCuSuE2oQyih2grr5l8zzdW4qvf9v2qR4DfuJb5u1aDdE4wQMsvEU6nXxP882BhyOLnE2-9b-Xkl0HqmNh3BgZKx0rEV-8xcwLVIw9e18Q6ilvKjnW8ANrGe0IkHBY_bW75IkBTunTxYlwcuEN3PbfeUsTko'
		}
	];

	const categories = [
		'AI',
		'Remote Work',
		'Security',
		'Productivity',
		'Cloud',
		'Frontend',
		'Backend'
	];
</script>

<!-- Root now uses body font via CSS var (set by preview engine) -->
<div class="font-body body-metrics min-h-screen bg-base-100">
	<header
		class="top-0 z-40 mx-auto mt-5 flex max-w-6xl items-center justify-between rounded-selector border-b border-base-200 bg-primary px-4 py-4 text-primary-content sm:px-6"
	>
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-3">
				<svg
					class="h-6 w-6"
					viewBox="0 0 48 48"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" />
				</svg>
				<h2 class="heading-metrics font-heading text-base font-bold tracking-tight sm:text-xl">
					Tech Insights
				</h2>
			</div>

			<nav class="hidden items-center gap-6 text-sm md:flex">
				<a href="/" class="transition-colors">Home</a>
				<a href="/" class="transition-colors">Articles</a>
				<a href="/" class="transition-colors">About</a>
				<a href="/" class="transition-colors">Contact</a>
			</nav>
		</div>

		<div class="flex items-center gap-3">
			<div class="hidden sm:block">
				<div
					class="flex w-64 max-w-full items-center gap-2 rounded-full border border-base-200 bg-base-100 px-2 py-1"
				>
					<Search class="h-4 w-4 text-base-content/60" />
					<input
						class="w-full bg-transparent text-sm focus:outline-none"
						placeholder="Search articles..."
					/>
				</div>
			</div>

			<button class="btn btn-circle btn-ghost btn-sm">
				<Search class="h-4 w-4" />
			</button>
		</div>
	</header>

	<main class="px-4 py-10">
		<div class="mx-auto max-w-6xl">
			<div class="group relative overflow-hidden rounded-box">
				<div
					class="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
					style="background-image: url({heroImage});"
				></div>
				<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
				<div class="relative p-8 text-white sm:p-12">
					<h1
						class="heading-metrics mb-4 font-heading text-3xl leading-tight font-bold md:text-4xl lg:text-5xl"
					>
						The Future of Work: Embracing Remote Collaboration
					</h1>
					<p class="mb-6 max-w-3xl text-sm text-white/80 md:text-base">
						Explore the evolving landscape of remote work, its benefits, and strategies for
						effective collaboration in distributed teams.
					</p>
					<a class=" btn rounded-field btn-sm btn-primary" href="/"> Read More </a>
				</div>
			</div>

			<h2
				class="heading-metrics text-text mt-12 mb-6 font-heading text-2xl font-bold text-base-content md:text-3xl"
			>
				Recent Articles
			</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each articles as article (article.title)}
					<article
						class="group card min-w-0 bg-primary p-2 transition-transform duration-300 ease-out hover:-translate-y-1"
					>
						<div class="overflow-hidden rounded-box">
							<div
								class="aspect-video w-full rounded-box bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
								style="background-image: url({article.image});"
							></div>
						</div>
						<div class="mt-4">
							<h6
								class="truncate text-lg text-primary-content transition-colors group-hover:text-accent-content"
							>
								{article.title}
							</h6>
							<p class="mt-2 text-sm text-primary-content/70">
								{article.excerpt}
							</p>
						</div>
					</article>
				{/each}
			</div>

			<section class="mt-12 text-base-content">
				<h2 class="heading-metrics mb-6 font-heading text-2xl font-bold md:text-3xl">
					Why readers love Tech Insights
				</h2>
				<p class="mb-6 max-w-3xl text-base-content/70">
					We write with curiosity and a coffee cup in hand — bite-sized deep dives, practical
					guides, and occasional opinion pieces with personality. No jargon that hides the how; just
					useful takeaways you can apply today.
				</p>

				<div
					class="grid grid-cols-1 gap-6 text-primary-content sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
				>
					<div class="card bg-base-100 p-4 shadow transition hover:shadow-lg">
						<div class="flex items-start gap-4">
							<div class="text-3xl">🤖</div>
							<div>
								<h3 class="font-semibold text-base-content">AI-Powered Briefs</h3>
								<p class="mt-1 text-sm text-base-content/70">
									Short summaries of complex topics so you can stay current without the deep-dive
									drain.
								</p>
							</div>
						</div>
					</div>

					<div class="card bg-base-100 p-4 shadow transition hover:shadow-lg">
						<div class="flex items-start gap-4">
							<div class="text-3xl">🌐</div>
							<div>
								<h3 class="font-semibold text-base-content">Remote Work Playbooks</h3>
								<p class="mt-1 text-sm text-base-content">
									Actionable strategies for distributed teams — meetings, async writing, and better
									rituals.
								</p>
							</div>
						</div>
					</div>

					<div class="card bg-base-100 p-4 shadow transition hover:shadow-lg">
						<div class="flex items-start gap-4">
							<div class="text-3xl">🔒</div>
							<div>
								<h3 class="font-semibold text-base-content">Security First</h3>
								<p class="mt-1 text-sm text-base-content/70">
									Practical tips and checklists to keep your team and users safe without the scare
									tactics.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="mt-12 grid grid-cols-1 gap-8 text-base-content md:grid-cols-3">
				<div class="md:col-span-2">
					<h3 class="heading-metrics mb-4 font-heading text-xl font-semibold">
						Popular Categories
					</h3>
					<div class="flex flex-wrap gap-3">
						{#each categories as category (category)}
							<span class="badge badge-outline">{category}</span>
						{/each}
					</div>

					<div class="mt-8">
						<h3 class="heading-metrics mb-4 font-heading text-xl font-semibold">Editor’s Picks</h3>
						<div class="space-y-4">
							{#each articles.slice(0, 3) as article (article.title)}
								<div class="flex min-w-0 items-start gap-4">
									<div
										class="h-10 w-16 rounded-md bg-base-200 bg-cover bg-center"
										style="background-image: url({article.image});"
									></div>
									<div>
										<h6
											class="max-w-full truncate transition-colors hover:text-primary md:max-w-[24rem]"
										>
											{article.title}
										</h6>
										<p class="text-xs text-base-content/60">
											{article.excerpt}
										</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<aside class="space-y-6">
					<div class="card border border-primary/20 bg-primary/10 p-4">
						<h4 class="heading-metrics font-heading font-semibold text-primary">
							Join our newsletter
						</h4>
						<p class="mt-2 text-sm text-base-content/70">
							Weekly roundups, zero spam — just the stuff we’d read ourselves.
						</p>
						<div class="mt-4 flex gap-2">
							<input class="input-bordered input input-sm flex-1" placeholder="you@company.com" />
							<button class="btn btn-sm btn-primary">Subscribe</button>
						</div>
					</div>

					<div class="card bg-base-100 p-4 shadow">
						<h5 class="heading-metrics font-heading font-semibold">From the team</h5>
						<p class="mt-2 text-sm text-base-content/70">
							We publish practical guides every Tuesday — built for builders who want to ship better
							software.
						</p>
					</div>
				</aside>
			</section>
		</div>
	</main>
</div>
