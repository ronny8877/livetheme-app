<script lang="ts">
	import { app_modals } from '$lib/store/app.svelte';
	import { ChevronLeftIcon, ChevronRightIcon, Lock, RefreshCwIcon, XIcon, Bold, Italic, Check, Heart } from '@lucide/svelte';

	let modal: HTMLDialogElement | null = null;
	let activeTab = $state<'discover' | 'info'>('discover');
	let textareaElements: Record<string, HTMLTextAreaElement | null> = $state({
		Heading: null,
		Subheading: null,
		Body: null,
		Monospace: null
	});
	let sampleTexts = $state<Record<string, string>>({
		Heading: 'LiveTheme',
		Subheading: 'Discover beautiful typography with ease',
		Body: 'Welcome to LiveTheme, your ultimate design companion. Create stunning interfaces with our comprehensive font management system.',
		Monospace: 'const liveTheme = {};'
	});
	let fontStyles = $state<Record<string, { bold: boolean; italic: boolean }>>({
		Heading: { bold: false, italic: false },
		Subheading: { bold: false, italic: false },
		Body: { bold: false, italic: false },
		Monospace: { bold: false, italic: false }
	});
	let likedFonts = $state<Record<string, boolean>>({
		Heading: false,
		Subheading: false,
		Body: false,
		Monospace: false
	});

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

	const autoExpandTextarea = (textarea: HTMLTextAreaElement) => {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	};

	const toggleBold = (type: string) => {
		fontStyles[type].bold = !fontStyles[type].bold;
	};

	const toggleItalic = (type: string) => {
		fontStyles[type].italic = !fontStyles[type].italic;
	};

	const toggleLike = (type: string) => {
		likedFonts[type] = !likedFonts[type];
		console.log(`Font ${type} ${likedFonts[type] ? 'liked' : 'unliked'}`);
	};

	const applyFontTo = (sourceType: string, targetType: string) => {
		// Here you would implement the logic to apply the font from sourceType
		// to the target type (Heading, Subheading, or Body)
		console.log(`Apply font from ${sourceType} to ${targetType}`);
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
		class="absolute bottom-5 right-5 z-20 flex flex-col items-center justify-center gap-2 space-x-4 md:flex-row pointer-events-auto"
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

{#snippet discover({
	type,
	size = 'text-5xl'
}:{
	type: string;
	size?: string;
})}
	<div class="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-5">
		<div class="md:col-span-2 col-span-1 flex items-center justify-start">
			<div class="flex flex-col items-center justify-center gap-3 w-full">
				<div class="flex items-center justify-center gap-2 flex-wrap">
					<button class="btn btn-circle btn-ghost btn-md" title="Lock font">
						<Lock size={16} />
					</button>
					<button 
						class={`btn btn-circle btn-md transition-colors ${likedFonts[type] ? 'btn-error' : 'btn-ghost'}`}
						onclick={() => toggleLike(type)}
						title="Like this font"
					>
						<Heart size={16} fill={likedFonts[type] ? 'currentColor' : 'none'} />
					</button>
					<button 
						class={`btn btn-circle btn-sm ${fontStyles[type].bold ? 'btn-active' : 'btn-ghost'}`}
						onclick={() => toggleBold(type)}
						title="Toggle Bold"
					>
						<Bold size={16} />
					</button>
					<button 
						class={`btn btn-circle btn-sm ${fontStyles[type].italic ? 'btn-active' : 'btn-ghost'}`}
						onclick={() => toggleItalic(type)}
						title="Toggle Italic"
					>
						<Italic size={16} />
					</button>
				</div>
			</div>
		</div>
		<div class="md:col-span-10 col-span-1 flex flex-col items-center justify-start w-full gap-3">
			<textarea 
				class={`font-${type.toLowerCase()} ${size} block focus:outline-0 h-20 focus:ring-0 outline-none border-none resize-none w-full max-w-5xl ${fontStyles[type].bold ? 'font-bold' : ''} ${fontStyles[type].italic ? 'italic' : ''}`}
				bind:value={sampleTexts[type]}
				oninput={(e) => {
					if (e.currentTarget) {
						autoExpandTextarea(e.currentTarget);
					}
				}}
				bind:this={textareaElements[type]}
			>{sampleTexts[type]}</textarea>
			<div class="relative w-full flex justify-center">
				<button 
					class="btn btn-primary btn-sm"
					onclick={(e) => {
						const button = e.currentTarget;
						const menu = button.nextElementSibling as HTMLElement;
						menu?.classList.toggle('hidden');
					}}
					title="Apply font to another type"
				>
					Apply <Check size={16} />
				</button>
				<div class="hidden absolute top-full mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg z-30 whitespace-nowrap">
					<button
						class="block w-full text-left px-4 py-2 hover:bg-base-200 rounded-t-lg text-sm"
						onclick={() => applyFontTo(type, 'Heading')}
					>
						Apply to Heading
					</button>
					<button
						class="block w-full text-left px-4 py-2 hover:bg-base-200 text-sm"
						onclick={() => applyFontTo(type, 'Subheading')}
					>
						Apply to Subheading
					</button>
					<button
						class="block w-full text-left px-4 py-2 hover:bg-base-200 rounded-b-lg text-sm"
						onclick={() => applyFontTo(type, 'Body')}
					>
						Apply to Body
					</button>
				</div>
			</div>
		</div>
	</div>
{/snippet}

<dialog
	id="font_modal"
	class="modal relative z-50"
	bind:this={modal}
	onmousedown={handleBackdropClick}
>
	<div class="modal-box h-[calc(100vh-10rem)] w-full max-w-7xl overflow-y-auto p-4 md:p-6 rounded-2xl md:rounded-3xl relative">
		{@render closeButton()}
		{#if activeTab === 'discover'}
			{@render discoverControls()}
		{/if}

		<div role="tablist" class="tabs-border tabs tabs-lg tracking-wide overflow-x-auto">
			<button
				role="tab"
				tabindex="0"
				onclick={() => switchTab('discover')}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						switchTab('discover');
					}
				}}
				class={activeTab === 'discover' ? 'tab-active tab text-sm md:text-base' : 'tab text-sm md:text-base'}
				aria-selected={activeTab === 'discover'}
			>
				Discover
			</button>
			<button
				role="tab"
				tabindex="0"
				onclick={() => switchTab('info')}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						switchTab('info');
					}
				}}
				class={activeTab === 'info' ? 'tab-active tab text-sm md:text-base' : 'tab text-sm md:text-base'}
				aria-selected={activeTab === 'info'}
			>
				Info
			</button>
		</div>
		<div class="relative rounded-2xl md:rounded-3xl p-3 md:p-5">
			{#if activeTab === 'discover'}
				{#each fontType as type}
					{@render discover({
						type,
						size: type === 'Heading' ? 'text-3xl md:text-5xl' : type === 'Subheading' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
					})}
				{/each}
			{:else if activeTab === 'info'}
				<div class="prose prose-sm md:prose mt-4 max-w-none">
					<h2>Font Modal Info</h2>
					<p>This is the info tab of the Font Modal.</p>
				</div>
			{/if}
		</div>
		<!-- END -->
	</div>
</dialog>
