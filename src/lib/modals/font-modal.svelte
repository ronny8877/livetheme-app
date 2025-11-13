<script lang="ts">
	import { app_modals } from '$lib/store/app.svelte';
	import { ChevronLeftIcon, ChevronRightIcon, Lock, RefreshCwIcon, XIcon } from '@lucide/svelte';

	let modal: HTMLDialogElement | null = null;
	let activeTab = $state<'discover' | 'info'>('discover');
	$effect(() => {
		const isOpen = app_modals.active_modal === 'fonts';
		if (modal) {
			if (isOpen && !modal.open) {
				modal.showModal();
			} else if (!isOpen && modal.open) {
				modal.close();
			}
		}
	});

	const closeModal = () => {
		app_modals.active_modal = null;
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (modal && e.target === modal) {
			closeModal();
		}
	};

	const switchTab = (tab: 'discover' | 'info') => {
		activeTab = tab;
	};

	const fontType = ['Heading', 'Subheading', 'Body', 'Monospace'];
</script>

{#snippet closeButton()}
	<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm" onclick={closeModal}>
		<XIcon />
	</button>
{/snippet}

{#snippet discoverControls()}
	<div
		class="absolute bottom-5 right-5 z-20 flex flex-col items-center justify-center gap-2 space-x-4 md:flex-row"
	>
		<div class="flex items-center justify-center gap-1">
			<button class="btn btn-circle btn-ghost btn-sm"> <ChevronLeftIcon /> </button>
			<span class=" h-6 w-6 rounded-lg bg-red-500 text-sm font-medium"></span> /
			<span class=" h-6 w-6 rounded-lg bg-yellow-500 text-sm font-medium"></span>
			<button class="btn btn-circle btn-ghost btn-sm"> <ChevronRightIcon /> </button>
		</div>
		<button class="btn btn-outline btn-sm">Generate <RefreshCwIcon size={16} /> </button>
	</div>
{/snippet}

{#snippet fontControls()}
	<div class="flex items-center justify-center gap-2">
		<button class="btn btn-circle btn-ghost btn-md">
			<Lock size={16} />
		</button>
		<select class="select select-info">
			<option disabled selected>100</option>
			<option>100</option>
			<option>200</option>
			<option>300</option>
		</select>
	</div>
{/snippet}

{#snippet discover({
	type,
	sampleText = 'LiveTheme',
	size = 'text-5xl'
}:{
	type: string;
	sampleText?: string;
	size?: string;
})}
	<div class="mt-5 grid grid-cols-12 gap-5">
		<div class="col-span-2 flex flex-row">
			{@render fontControls()}
		</div>
		<div class="col-span-10">
			<textarea class={`font-${type.toLowerCase()} ${size} focus:outline-0 focus:ring-0 outline-none border-none resize-none`} >{sampleText}</textarea>
		</div>
	</div>
{/snippet}

<dialog
	id="font_modal"
	class="modal relative z-50"
	bind:this={modal}
	onmousedown={handleBackdropClick}
>
	<div class="modal-box h-[calc(100vh-10rem)] w-full max-w-7xl overflow-y-auto">
		{@render closeButton()}
		{#if activeTab === 'discover'}
			{@render discoverControls()}
		{/if}

		<div role="tablist" class="tabs-border tabs tabs-lg tracking-wide">
			<!-- svelte-ignore a11y_missing_attribute -->
			<a
				role="tab"
				tabindex="2"
				onclick={() => switchTab('discover')}
				class={activeTab === 'discover' ? 'tab-active tab' : 'tab'}>Discover</a
			>
			<a
				role="tab"
				tabindex="3"
				onclick={() => switchTab('info')}
				class={activeTab === 'info' ? 'tab-active tab' : 'tab'}>Info</a
			>
		</div>
		<div class="relative rounded-3xl p-5">
			{#if activeTab === 'discover'}
				{#each fontType as type}
					{@render discover({
						type,
						sampleText: type === 'Monospace' ? 'const liveTheme = {};' : 'LiveTheme',
						size: type === 'Heading' ? 'text-5xl' : type === 'Subheading' ? 'text-3xl' : 'text-xl'
					})}
				{/each}
			{:else if activeTab === 'info'}
				<div class="prose mt-4 max-w-none">
					<h2>Font Modal Info</h2>
					<p>This is the info tab of the Font Modal.</p>
				</div>
			{/if}
		</div>
		<!-- END -->
	</div>
</dialog>
