<script lang="ts">
  import { Star } from "@lucide/svelte";

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

  const title = "Creamy Tomato Pasta with Basil";
  const description =
    "A simple yet flavorful pasta dish with a rich tomato sauce and a touch of cream, garnished with fresh basil.";
  const heroImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCIjDu3r4zKNeY93Iep61jwU4UscR9D45Og9N3SHe2X1CuT1nOhV1k_6iVuPrsDiWLKttlEMOkndxyckQ0QUkHw8AyTkCC8yJkwMj8SuErYwp4vaHldYQYK3eDBlmXkFXXs1uGrCiP3DMtii6Tc_UKQNYNiPXR8RnSc2qdtQGXg6Q9TjmzL3qp4HT-mFRYRTd87685aUTsPqLOtKqTZ_tRYmDuHzMvhQdvpnTfdbHx5kYx12VkGuK-hnBKYU-kYB1LllCxlVnb6k3E";

  const ingredients: Ingredient[] = [
    { label: "200g pasta (e.g., spaghetti)" },
    { label: "400g canned chopped tomatoes" },
    { label: "100ml double cream" },
    { label: "1 onion, finely chopped" },
    { label: "2 cloves garlic, minced" },
    { label: "2 tbsp olive oil" },
    { label: "Fresh basil leaves" },
  ];

  const instructions: Instruction[] = [
    {
      step: 1,
      title: "Prepare the Base",
      body: "Heat the olive oil in a pan over medium heat. Add the chopped onion and cook until softened, about 5 minutes. Stir in the minced garlic and cook for another minute until fragrant.",
    },
    {
      step: 2,
      title: "Simmer the Sauce",
      body: "Pour in the canned chopped tomatoes and bring to a simmer. Cook for about 10 minutes, stirring occasionally, until the sauce thickens slightly.",
    },
    {
      step: 3,
      title: "Add the Cream",
      body: "Stir in the double cream and season with salt and pepper to taste. Continue to cook for another 2-3 minutes until the sauce is smooth and creamy.",
    },
    {
      step: 4,
      title: "Cook the Pasta",
      body: "While the sauce is simmering, cook the pasta according to package instructions until al dente. Drain the pasta and add it to the creamy tomato sauce.",
    },
    {
      step: 5,
      title: "Combine and Serve",
      body: "Toss the pasta in the sauce until it's well coated. Garnish with fresh basil leaves before serving.",
    },
  ];

  const reviews: Review[] = [
    {
      name: "Sophia Carter",
      ago: "1 month ago",
      text: "This recipe is a game-changer! So easy to make and the flavors are incredible. The creamy tomato sauce is rich and satisfying, and the fresh basil adds a lovely touch.",
      rating: 5,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8aZkNP6785jo4dNpGW9aiLV_3SZLZtFenQ4sfEIAT5_TMaA5PeVf9bNufFceWvpWj1pdgMhH2w7uhW-LQDhga0Q9ZKn61liuvAeUoAeTBBLfRp7E97Y_irRT800rqGiO5EoVxAnMyKjRKulKwEPJDd_WdVk2rzpK-koQw7c2_voKZsNXIBnok5eZJgS127AUhMqLcxQAqrsDrLWDRRJ5AhU3cL8qS61icB5HFnsG10XgH1R5kXZjXBt4Np9zV8FYQomhfHE4Nvx8",
      likes: 12,
      comments: 1,
    },
    {
      name: "Ethan Bennett",
      ago: "2 months ago",
      text: "A solid recipe for a quick and tasty meal. The sauce is creamy and flavorful. I added a pinch of red pepper flakes for heat.",
      rating: 4,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCINBUQUomz-Z1kQUO6Rujrx9uwAlVLo-BlBhB0XJgZVNFpKxpoqYVlicDkhXon-KWyEUcO0jLr2Ms8NvBTeej3w-Dr2MFjZ2sDDcNu0uwP5SX7tMv63syl9oN-aysEiNJTxYry23ru9_fXDEuUfw5qMBSIEw9mRiRBhmyCwj8u9zUah7_Exq13ITcljQjqVCBlwXq2KCxn14twNT6peBaHfgR1wcG4u99m-2-fiDy0aFydmW5Y22QORtW-IZR4vljq9QyUMp4JdHY",
      likes: 8,
      comments: 2,
    },
  ];

  let mobileMenuOpen = false;
</script>

<div class="min-h-screen bg-base-100">
  <header class="flex items-center justify-between border-b border-base-300 px-4 sm:px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-base-100/95">
    <div class="flex items-center gap-4 sm:gap-6 flex-1">
      <div class="flex items-center gap-2 sm:gap-3 text-primary">
        <div class="w-7 h-7 sm:w-8 sm:h-8">
          <svg
            viewBox="0 0 48 48"
            fill="currentColor"
            class="w-full h-full"
          >
            <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" />
          </svg>
        </div>
        <h2 class="text-lg sm:text-xl font-bold text-base-content">Cookbook</h2>
      </div>

      <nav class="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-base-content/70">
        <a href="#" class="hover:text-primary transition-colors">Recipes</a>
        <a href="#" class="hover:text-primary transition-colors">Ingredients</a>
        <a href="#" class="hover:text-primary transition-colors">Meal Plans</a>
        <a href="#" class="hover:text-primary transition-colors">Community</a>
      </nav>
    </div>

    <div class="flex items-center gap-2 sm:gap-4">
      <div class="relative hidden sm:block">
        <div class="flex items-center rounded-full border border-base-300 bg-base-100 px-3 py-1.5 gap-2 w-48 lg:w-64">
          <svg
            class="w-4 h-4 text-base-content/60"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
          </svg>
          <input
            class="w-full bg-transparent focus:outline-none text-sm text-base-content placeholder:text-base-content/50"
            placeholder="Search recipes..."
          />
        </div>
      </div>

      <button class="btn btn-ghost btn-circle btn-sm sm:btn-md">
        <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 256 256" fill="currentColor">
          <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
        </svg>
      </button>

      <div class="dropdown dropdown-end md:hidden">
        <button tabindex="0" class="btn btn-ghost btn-circle btn-sm">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
          <li><a href="#" class="text-base-content">Recipes</a></li>
          <li><a href="#" class="text-base-content">Ingredients</a></li>
          <li><a href="#" class="text-base-content">Meal Plans</a></li>
          <li><a href="#" class="text-base-content">Community</a></li>
        </ul>
      </div>

      <div
        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cover bg-center ring-2 ring-primary ring-offset-2 ring-offset-base-100"
        style="background-image: url('https://images.unsplash.com/photo-1545996124-1b2325a5a3b9?w=200&h=200&fit=crop')"
      ></div>
    </div>
  </header>

  <main class="px-4 py-6 sm:py-10">
    <div class="max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
      <div
        class="w-full bg-cover bg-center min-h-[250px] sm:min-h-[360px] lg:min-h-[480px] relative"
        style="background-image: url('{heroImage}')"
      >
        <div class="absolute inset-0 bg-linear-to-t from-base-100/60 to-transparent"></div>
      </div>

      <div class="p-4 sm:p-6 lg:p-8">
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-base-content">{title}</h1>
          <p class="text-base-content/60 mt-2 text-sm sm:text-base">{description}</p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center border-y border-base-300 py-4 sm:py-6 mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div class="flex-1 text-center sm:text-left sm:border-r border-base-300 sm:pr-6">
            <p class="text-sm text-base-content/60 font-medium">Prep time</p>
            <p class="text-lg sm:text-xl font-bold text-base-content">15 minutes</p>
          </div>
          <div class="flex-1 text-center sm:text-left sm:pl-6">
            <p class="text-sm text-base-content/60 font-medium">Servings</p>
            <p class="text-lg sm:text-xl font-bold text-base-content">2</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <aside class="lg:col-span-1">
            <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-base-content">Ingredients</h2>
            <div class="space-y-3 bg-base-200 p-4 sm:p-6 rounded-xl">
              {#each ingredients as ing, i}
                <label class="flex items-start gap-3 cursor-pointer hover:bg-base-300 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-primary mt-0.5"
                  />
                  <span class="text-sm sm:text-base text-base-content">{ing.label}</span>
                </label>
              {/each}
            </div>
          </aside>

          <section class="lg:col-span-2">
            <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-base-content">Instructions</h2>
            <div class="space-y-4 sm:space-y-6">
              {#each instructions as ins}
                <div class="flex gap-3 sm:gap-4 p-4 rounded-xl hover:bg-base-200 transition-colors">
                  <div class="shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm sm:text-base">
                    {ins.step}
                  </div>
                  <div class="flex-1">
                    <p class="text-base sm:text-lg font-semibold text-base-content mb-1">{ins.title}</p>
                    <p class="text-sm sm:text-base text-base-content/60 leading-relaxed">{ins.body}</p>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        </div>

        <div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-base-300">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-base-content">User Reviews</h2>
          <div class="space-y-6 sm:space-y-8">
            {#each reviews as r, idx}
              <div class="space-y-3 p-4 sm:p-6 bg-base-200 rounded-xl hover:shadow-lg transition-shadow">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cover bg-center ring-2 ring-base-300"
                    style="background-image: url('{r.avatar}')"
                  ></div>
                  <div class="flex-1">
                    <p class="font-semibold text-base-content text-sm sm:text-base">{r.name}</p>
                    <p class="text-xs sm:text-sm text-base-content/60">{r.ago}</p>
                  </div>
                </div>

                <div class="flex items-center gap-1">
                  {#each Array(5) as _, i}
                    <Star
                      class={i < r.rating
                        ? "w-4 h-4 fill-warning text-warning"
                        : "w-4 h-4 fill-base-300 text-base-300"}
                    />
                  {/each}
                </div>

                <p class="text-sm sm:text-base text-base-content/70 leading-relaxed">{r.text}</p>

                <div class="flex gap-4 pt-2">
                  <button class="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors text-sm">
                    <svg
                      class="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                    </svg>
                    <span class="font-medium">{r.likes ?? 0}</span>
                  </button>

                  <button class="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors text-sm">
                    <svg
                      class="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
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