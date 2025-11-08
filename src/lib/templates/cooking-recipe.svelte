<script lang="ts">
	import { Star } from '@lucide/svelte';

	type Ingredient = { label: string };
	type Instruction = { step: number; title: string; body: string };
	type Review = {
		name: string;
		ago: string;
		text: string;
		rating: number;
		avatar?: string;
		likes?: number;
		comments?: number;
	};

	const title = 'Creamy Tomato Pasta with Basil';
	const description =
		'A simple yet flavorful pasta dish with a rich tomato sauce and a touch of cream, garnished with fresh basil.';
	const heroImage =
		'https://lh3.googleusercontent.com/aida-public/AB6AXuCIjDu3r4zKNeY93Iep61jwU4UscR9D45Og9N3SHe2X1CuT1nOhV1k_6iVuPrsDiWLKttlEMOkndxyckQ0QUkHw8AyTkCC8yJkwMj8SuErYwp4vaHldYQYK3eDBlmXkFXXs1uGrCiP3DMtii6Tc_UKQNYNiPXR8RnSc2qdtQGXg6Q9TjmzL3qp4HT-mFRYRTd87685aUTsPqLOtKqTZ_tRYmDuHzMvhQdvpnTfdbHx5kYx12VkGuK-hnBKYU-kYB1LllCxlVnb6k3E';

	const ingredients: Ingredient[] = [
		{ label: '200g pasta (e.g., spaghetti)' },
		{ label: '400g canned chopped tomatoes' },
		{ label: '100ml double cream' },
		{ label: '1 onion, finely chopped' },
		{ label: '2 cloves garlic, minced' },
		{ label: '2 tbsp olive oil' },
		{ label: 'Fresh basil leaves' }
	];

	const instructions: Instruction[] = [
		{
			step: 1,
			title: 'Prepare the Base',
			body: 'Heat the olive oil in a pan over medium heat. Add the chopped onion and cook until softened, about 5 minutes. Stir in the minced garlic and cook for another minute until fragrant.'
		},
		{
			step: 2,
			title: 'Simmer the Sauce',
			body: 'Pour in the canned chopped tomatoes and bring to a simmer. Cook for about 10 minutes, stirring occasionally, until the sauce thickens slightly.'
		},
		{
			step: 3,
			title: 'Add the Cream',
			body: 'Stir in the double cream and season with salt and pepper to taste. Continue to cook for another 2-3 minutes until the sauce is smooth and creamy.'
		},
		{
			step: 4,
			title: 'Cook the Pasta',
			body: 'While the sauce is simmering, cook the pasta according to package instructions until al dente. Drain the pasta and add it to the creamy tomato sauce.'
		},
		{
			step: 5,
			title: 'Combine and Serve',
			body: "Toss the pasta in the sauce until it's well coated. Garnish with fresh basil leaves before serving."
		}
	];

	const reviews: Review[] = [
		{
			name: 'Sophia Carter',
			ago: '1 month ago',
			text: 'This recipe is a game-changer! So easy to make and the flavors are incredible. The creamy tomato sauce is rich and satisfying, and the fresh basil adds a lovely touch.',
			rating: 5,
			avatar:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuD8aZkNP6785jo4dNpGW9aiLV_3SZLZtFenQ4sfEIAT5_TMaA5PeVf9bNufFceWvpWj1pdgMhH2w7uhW-LQDhga0Q9ZKn61liuvAeUoAeTBBLfRp7E97Y_irRT800rqGiO5EoVxAnMyKjRKulKwEPJDd_WdVk2rzpK-koQw7c2_voKZsNXIBnok5eZJgS127AUhMqLcxQAqrsDrLWDRRJ5AhU3cL8qS61icB5HFnsG10XgH1R5kXZjXBt4Np9zV8FYQomhfHE4Nvx8',
			likes: 12,
			comments: 1
		},
		{
			name: 'Ethan Bennett',
			ago: '2 months ago',
			text: 'A solid recipe for a quick and tasty meal. The sauce is creamy and flavorful. I added a pinch of red pepper flakes for heat.',
			rating: 4,
			avatar:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuCINBUQUomz-Z1kQUO6Rujrx9uwAlVLo-BlBhB0XJgZVNFpKxpoqYVlicDkhXon-KWyEUcO0jLr2Ms8NvBTeej3w-Dr2MFjZ2sDDcNu0uwP5SX7tMv63syl9oN-aysEiNJTxYry23ru9_fXDEuUfw5qMBSIEw9mRiRBhmyCwj8u9zUah7_Exq13ITcljQjqVCBlwXq2KCxn14twNT6peBaHfgR1wcG4u99m-2-fiDy0aFydmW5Y22QORtW-IZR4vljq9QyUMp4JdHY',
			likes: 8,
			comments: 2
		}
	];

	let mobileMenuOpen = false;
</script>

<div class="min-h-screen bg-base-100">
	<header
		class="sticky top-0 z-50 flex items-center justify-between border-b border-base-300 bg-base-100/95 px-4 py-4 backdrop-blur-sm sm:px-6"
	>
		<div class="flex flex-1 items-center gap-4 sm:gap-6">
			<div class="flex items-center gap-2 text-primary sm:gap-3">
				<div class="h-7 w-7 sm:h-8 sm:w-8">
					<svg viewBox="0 0 48 48" fill="currentColor" class="h-full w-full">
						<path
							d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
						/>
					</svg>
				</div>
				<h2 class="text-lg font-bold text-base-content sm:text-xl">Cookbook</h2>
			</div>

			<nav class="hidden items-center gap-4 text-sm text-base-content/70 md:flex lg:gap-6">
				<a href="#" class="transition-colors hover:text-primary">Recipes</a>
				<a href="#" class="transition-colors hover:text-primary">Ingredients</a>
				<a href="#" class="transition-colors hover:text-primary">Meal Plans</a>
				<a href="#" class="transition-colors hover:text-primary">Community</a>
			</nav>
		</div>

		<div class="flex items-center gap-2 sm:gap-4">
			<div class="relative hidden sm:block">
				<div
					class="flex w-48 items-center gap-2 rounded-full border border-base-300 bg-base-100 px-3 py-1.5 lg:w-64"
				>
					<svg class="h-4 w-4 text-base-content/60" viewBox="0 0 256 256" fill="currentColor">
						<path
							d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
						/>
					</svg>
					<input
						class="w-full bg-transparent text-sm text-base-content placeholder:text-base-content/50 focus:outline-none"
						placeholder="Search recipes..."
					/>
				</div>
			</div>

			<button class="btn btn-circle btn-ghost btn-sm sm:btn-md">
				<svg class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"
					/>
				</svg>
			</button>

			<div class="dropdown dropdown-end md:hidden">
				<button tabindex="0" class="btn btn-circle btn-ghost btn-sm">
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<ul
					tabindex="0"
					class="dropdown-content menu w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
				>
					<li><a href="#" class="text-base-content">Recipes</a></li>
					<li><a href="#" class="text-base-content">Ingredients</a></li>
					<li><a href="#" class="text-base-content">Meal Plans</a></li>
					<li><a href="#" class="text-base-content">Community</a></li>
				</ul>
			</div>

			<div
				class="h-8 w-8 rounded-full bg-cover bg-center ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:h-10 sm:w-10"
				style="background-image: url('https://images.unsplash.com/photo-1545996124-1b2325a5a3b9?w=200&h=200&fit=crop')"
			></div>
		</div>
	</header>

	<main class="px-4 py-6 sm:py-10">
		<div
			class="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-xl"
		>
			<div
				class="relative min-h-[250px] w-full bg-cover bg-center sm:min-h-[360px] lg:min-h-[480px]"
				style="background-image: url('{heroImage}')"
			>
				<div class="absolute inset-0 bg-linear-to-t from-base-100/60 to-transparent"></div>
			</div>

			<div class="p-4 sm:p-6 lg:p-8">
				<div class="mb-6 sm:mb-8">
					<h1 class="text-2xl leading-tight font-bold text-base-content sm:text-3xl lg:text-4xl">
						{title}
					</h1>
					<p class="mt-2 text-sm text-base-content/60 sm:text-base">{description}</p>
				</div>

				<div
					class="mb-6 flex flex-col items-stretch gap-4 border-y border-base-300 py-4 sm:mb-8 sm:flex-row sm:items-center sm:gap-0 sm:py-6"
				>
					<div class="flex-1 border-base-300 text-center sm:border-r sm:pr-6 sm:text-left">
						<p class="text-sm font-medium text-base-content/60">Prep time</p>
						<p class="text-lg font-bold text-base-content sm:text-xl">15 minutes</p>
					</div>
					<div class="flex-1 text-center sm:pl-6 sm:text-left">
						<p class="text-sm font-medium text-base-content/60">Servings</p>
						<p class="text-lg font-bold text-base-content sm:text-xl">2</p>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
					<aside class="lg:col-span-1">
						<h2 class="mb-4 text-xl font-bold text-base-content sm:mb-6 sm:text-2xl">
							Ingredients
						</h2>
						<div class="space-y-3 rounded-xl bg-base-200 p-4 sm:p-6">
							{#each ingredients as ing, i}
								<label
									class="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors hover:bg-base-300"
								>
									<input type="checkbox" class="checkbox mt-0.5 checkbox-primary" />
									<span class="text-sm text-base-content sm:text-base">{ing.label}</span>
								</label>
							{/each}
						</div>
					</aside>

					<section class="lg:col-span-2">
						<h2 class="mb-4 text-xl font-bold text-base-content sm:mb-6 sm:text-2xl">
							Instructions
						</h2>
						<div class="space-y-4 sm:space-y-6">
							{#each instructions as ins}
								<div class="flex gap-3 rounded-xl p-4 transition-colors hover:bg-base-200 sm:gap-4">
									<div
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content sm:h-10 sm:w-10 sm:text-base"
									>
										{ins.step}
									</div>
									<div class="flex-1">
										<p class="mb-1 text-base font-semibold text-base-content sm:text-lg">
											{ins.title}
										</p>
										<p class="text-sm leading-relaxed text-base-content/60 sm:text-base">
											{ins.body}
										</p>
									</div>
								</div>
							{/each}
						</div>
					</section>
				</div>

				<div class="mt-8 border-t border-base-300 pt-6 sm:mt-12 sm:pt-8">
					<h2 class="mb-4 text-xl font-bold text-base-content sm:mb-6 sm:text-2xl">User Reviews</h2>
					<div class="space-y-6 sm:space-y-8">
						{#each reviews as r, idx}
							<div
								class="space-y-3 rounded-xl bg-base-200 p-4 transition-shadow hover:shadow-lg sm:p-6"
							>
								<div class="flex items-center gap-3">
									<div
										class="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-base-300 sm:h-12 sm:w-12"
										style="background-image: url('{r.avatar}')"
									></div>
									<div class="flex-1">
										<p class="text-sm font-semibold text-base-content sm:text-base">{r.name}</p>
										<p class="text-xs text-base-content/60 sm:text-sm">{r.ago}</p>
									</div>
								</div>

								<div class="flex items-center gap-1">
									{#each Array(5) as _, i}
										<Star
											class={i < r.rating
												? 'h-4 w-4 fill-warning text-warning'
												: 'h-4 w-4 fill-base-300 text-base-300'}
										/>
									{/each}
								</div>

								<p class="text-sm leading-relaxed text-base-content/70 sm:text-base">{r.text}</p>

								<div class="flex gap-4 pt-2">
									<button
										class="flex items-center gap-2 text-sm text-base-content/60 transition-colors hover:text-primary"
									>
										<svg class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 256 256" fill="currentColor">
											<path
												d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"
											/>
										</svg>
										<span class="font-medium">{r.likes ?? 0}</span>
									</button>

									<button
										class="flex items-center gap-2 text-sm text-base-content/60 transition-colors hover:text-primary"
									>
										<svg class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 256 256" fill="currentColor">
											<path
												d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"
											/>
										</svg>
										<span class="font-medium">{r.comments ?? 0}</span>
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
