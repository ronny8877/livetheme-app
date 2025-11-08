<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import AuthLogin from '$lib/components/ui/templates/auth-login.svelte';
	import AuthSignup from '$lib/components/ui/templates/auth-signup.svelte';
	import PlusIcon from '$lib/components/ui/templates/plus-icon.svelte';
	import { authStore } from '$lib/store/auth.svelte';

	// Accept isPreview prop from parent (preview-engine)
	let { isPreview = false }: { isPreview?: boolean } = $props();

	let currentView = $derived(authStore.currentView);
	let isLogin = $derived(currentView === 'login');
</script>

<div class="flex min-h-screen items-center justify-center p-4 font-body">
	<div
		class="w-full max-w-[1000px] overflow-hidden rounded-4xl border border-base-300 bg-base-100 shadow-2xl"
	>
		<div class="grid h-[80vh] grid-cols-1 md:grid-cols-2">
			<!-- Image Section - Slides between left and right -->
			<div
				class="relative hidden items-center justify-center md:flex {isLogin
					? 'md:order-1'
					: 'md:order-2'}"
				style="transition: order 0.3s ease-out;"
			>
				{#key currentView}
					<div
						class="absolute h-full w-full overflow-hidden rounded-r-3xl"
						in:fly={{ x: isLogin ? -50 : 50, duration: 300, delay: 150, easing: cubicOut }}
						out:fly={{ x: isLogin ? 50 : -50, duration: 250, easing: cubicOut }}
					>
						<img
							src={isLogin
								? 'https://picscave.com/assetstore/medium/anime_girl_in_white_dress_7Wuel-vAYkBOJm.jpeg'
								: 'https://picscave.com/assetstore/medium/zerotwo_EGKGahsvG4Q2kp.jpeg'}
							alt="Auth Illustration"
							class="h-full w-full object-cover"
						/>
					</div>
				{/key}
			</div>

			<!-- Form Section - Slides between left and right -->
			<div
				class="relative flex flex-col p-8 {isLogin ? 'md:order-2' : 'md:order-1'}"
				style="transition: order 0.3s ease-out;"
			>
				<div class="mb-4 flex justify-end">
					<div class="h-8 w-8">
						<PlusIcon />
					</div>
				</div>

				<div class="relative flex flex-1 items-center justify-center overflow-hidden">
					<div class="w-full max-w-[360px]">
						{#key currentView}
							<div
								class="absolute inset-0 flex items-center justify-center"
								in:fly={{
									x: isLogin ? 50 : -50,
									duration: 300,
									delay: 150,
									easing: cubicOut
								}}
								out:fly={{
									x: isLogin ? -50 : 50,
									duration: 250,
									easing: cubicOut
								}}
							>
								<div class="w-full max-w-[360px]">
									{#if currentView === 'login'}
										<AuthLogin {isPreview} />
									{:else}
										<AuthSignup {isPreview} />
									{/if}
								</div>
							</div>
						{/key}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
