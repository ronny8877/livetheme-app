<script lang="ts">
	import { app_modals } from '$lib/store/app.svelte';
	import {
		ChevronLeftIcon,
		ChevronRightIcon,
		Lock,
		RefreshCwIcon,
		XIcon,
		Bold,
		Italic,
		Check,
		Heart
	} from '@lucide/svelte';

	let modal: HTMLDialogElement | null = null;
	let activeTab = $state<'discover' | 'info'>('discover');
	let sampleTexts = $state<Record<string, string>>({
		Heading: 'Font pairing made simple',
		Subheading: 'Generate font combinations with deep learning',
		Body: 'Click (Generate) to create a new font pairing, (Lock) to lock fonts that you want to keep, and (Edit) to choose a font manually. The text is editable, try replacing it with your company name or other copy.\n\nThe goal of font pairing is to select fonts that share an overarching theme yet have a pleasing contrast. Which fonts work together is largely a matter of intuition, but we approach this problem with a neural net. See Github for more technical details.',
		Monospace: 'const liveTheme = {};'
	});
	let editableElements: Record<string, HTMLDivElement | null> = $state({
		Heading: null,
		Subheading: null,
		Body: null,
		Monospace: null
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

	const handleEditableInput = (type: string, element: HTMLDivElement) => {
		sampleTexts[type] = element.textContent || '';
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
	<button class="btn absolute top-3 right-5 btn-circle btn-ghost btn-sm" onclick={closeModal}>
		<XIcon />
	</button>
{/snippet}

{#snippet discoverControls()}
	<div
		class="pointer-events-auto absolute right-5 bottom-5 z-20 flex flex-col items-center justify-center gap-2 space-x-4 md:flex-row"
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

{#snippet discover({ type, size = 'text-5xl' }: { type: string; size?: string })}
	<div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-5">
		<div class="col-span-1 flex items-center justify-start md:col-span-2">
			<div class="flex w-full flex-col items-center justify-center gap-3">
				<div class="flex flex-wrap items-center justify-center gap-2">
					<button class="btn btn-circle btn-ghost btn-md" title="Lock font">
						<Lock size={16} />
					</button>
					<button
						class={`btn btn-circle transition-colors btn-md ${likedFonts[type] ? 'btn-error' : 'btn-ghost'}`}
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
		<div class="relative col-span-1 flex w-full items-center gap-3 md:col-span-10">
			<div
				id={`editable-${type.toLowerCase()}`}
				class={`font-${type.toLowerCase()} ${size} block min-h-16 w-full max-w-2xl resize-none rounded border-none px-4 py-2 whitespace-pre-wrap outline-none focus:ring-2 focus:ring-primary focus:outline-0 ${fontStyles[type].bold ? 'font-bold' : ''} ${fontStyles[type].italic ? 'italic' : ''}`}
				contenteditable="true"
			>
				{sampleTexts[type]}
			</div>
			<div class="absolute top-1/2 right-0 flex -translate-y-1/2 transform justify-center">
				<button
					class="btn btn-sm btn-primary"
					onclick={(e) => {
						const button = e.currentTarget;
						const menu = button.nextElementSibling as HTMLElement;
						menu?.classList.toggle('hidden');
					}}
					title="Apply font to another type"
				>
					Apply <Check size={16} />
				</button>
				<div
					class="absolute top-full z-30 mt-2 hidden rounded-lg border border-base-300 bg-base-100 whitespace-nowrap shadow-lg"
				>
					<button
						class="block w-full rounded-t-lg px-4 py-2 text-left text-sm hover:bg-base-200"
						onclick={() => applyFontTo(type, 'Heading')}
					>
						Apply to Heading
					</button>
					<button
						class="block w-full px-4 py-2 text-left text-sm hover:bg-base-200"
						onclick={() => applyFontTo(type, 'Subheading')}
					>
						Apply to Subheading
					</button>
					<button
						class="block w-full rounded-b-lg px-4 py-2 text-left text-sm hover:bg-base-200"
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
	<div class="relative w-full max-w-7xl">
		{#if activeTab === 'discover'}
			{@render discoverControls()}
		{/if}
		<div
			class="relative modal-box h-[calc(100vh-10rem)] w-full max-w-7xl overflow-y-auto rounded-2xl p-4 md:rounded-3xl md:p-6"
		>
			{@render closeButton()}

			<div role="tablist" class="tabs-border tabs overflow-x-auto tabs-lg tracking-wide">
				<button
					role="tab"
					tabindex="0"
					onclick={() => switchTab('discover')}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							switchTab('discover');
						}
					}}
					class={activeTab === 'discover'
						? 'tab-active tab text-sm md:text-base'
						: 'tab text-sm md:text-base'}
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
					class={activeTab === 'info'
						? 'tab-active tab text-sm md:text-base'
						: 'tab text-sm md:text-base'}
					aria-selected={activeTab === 'info'}
				>
					Info
				</button>
			</div>
			<div class="relative rounded-2xl p-3 md:rounded-3xl md:p-5">
				{#if activeTab === 'discover'}
					{#each fontType as type}
						{@render discover({
							type,
							size:
								type === 'Heading'
									? 'text-3xl md:text-5xl'
									: type === 'Subheading'
										? 'text-2xl md:text-3xl'
										: 'text-lg md:text-xl'
						})}
					{/each}
				{:else if activeTab === 'info'}
					<div class="prose prose-sm mt-4 max-w-none md:prose">
						<h2>Font Modal Info</h2>
						<p>This is the info tab of the Font Modal.</p>
					</div>
				{/if}
			</div>
			<!-- END -->
		</div>
	</div>
</dialog>
