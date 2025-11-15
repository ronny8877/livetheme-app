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
	let activeTab = $state<'discover' | 'info' | 'synergy'>('discover');
	let sampleTexts = $state<Record<string, string>>({
		Heading: 'Font pairing made simple',
		Subheading: 'Generate font combinations with deep learning',
		Body: 'Click (Generate) to create a new font pairing, (Lock) to lock fonts that you want to keep, and (Edit) to choose a font manually. The text is editable, try replacing it with your company name or other copy.\n\nThe goal of font pairing is to select fonts that share an overarching theme yet have a pleasing contrast. Which fonts work together is largely a matter of intuition, but we approach this problem with a neural net. See Github for more technical details.',
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
		Monospace: false,
		Discover: false
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

	const switchTab = (tab: 'discover' | 'info' | 'synergy') => {
		activeTab = tab;
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

{#snippet synergyControls()}
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

{#snippet synergy({ type, size = 'text-5xl' }: { type: string; size?: string })}
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
				{@render applyMenu(type)}
			</div>
		</div>
	</div>
{/snippet}

{#snippet applyMenu(sourceType: string)}
	<div
		class="absolute top-full z-30 mt-2 hidden rounded-lg border border-base-300 bg-base-100 whitespace-nowrap shadow-lg"
	>
		<button
			class="block w-full rounded-t-lg px-4 py-2 text-left text-sm hover:bg-base-200"
			onclick={() => applyFontTo(sourceType, 'Heading')}
		>
			Apply to Heading
		</button>
		<button
			class="block w-full px-4 py-2 text-left text-sm hover:bg-base-200"
			onclick={() => applyFontTo(sourceType, 'Subheading')}
		>
			Apply to Subheading
		</button>
		<button
			class="block w-full rounded-b-lg px-4 py-2 text-left text-sm hover:bg-base-200"
			onclick={() => applyFontTo(sourceType, 'Body')}
		>
			Apply to Body
		</button>
	</div>
{/snippet}

{#snippet discoverCard()}
	<div
		class="card w-full border border-base-200 bg-base-100 shadow-md transition-shadow hover:shadow-lg"
	>
		<div class="card-body">
			<!-- Title -->
			<h3 class="card-title text-lg font-semibold">Playfair Display</h3>
			<!-- Subtitle -->
			<p class="-mt-2 text-sm text-base-content/60">A sophisticated serif typeface</p>

			<!-- Font Preview -->
			<div class="bg-base-50 flex flex-col gap-2 rounded-lg px-2">
				<p class="text-3xl font-semibold" style="font-family: 'Playfair Display'">
					The Quick Brown Fox Jumps Over The Lazy Dog
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p>1234567890 !@#$%^&*()_+-=|;':",/?</p>
			</div>

			<!-- Actions -->
			<div class="mt-4 card-actions items-center justify-between">
				<button
					class={`btn btn-circle transition-colors btn-sm ${likedFonts['Discover'] ? 'btn-error' : 'btn-ghost'}`}
					onclick={() => toggleLike('Discover')}
					title="Like this font"
				>
					<Heart size={16} fill={likedFonts['Discover'] ? 'currentColor' : 'none'} />
				</button>

				<div class="relative">
					<button
						class="btn gap-1 btn-sm btn-primary"
						onclick={(e) => {
							const button = e.currentTarget;
							const menu = button.nextElementSibling as HTMLElement;
							menu?.classList.toggle('hidden');
						}}
						title="Apply font to another type"
					>
						Apply <Check size={16} />
					</button>
					{@render applyMenu('Discover')}
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet discover()}
	<div class=" mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
		{#each Array.from({ length: 6 }) as _, i (i)}
			{@render discoverCard()}
		{/each}
	</div>
{/snippet}

{#snippet fontCard({
	type,
	fontFamily,
	category,
	description
}: {
	type: string;
	fontFamily: string;
	category: string;
	description: string;
})}
	<div
		class="rounded-xl border border-base-300 bg-base-200/30 p-4 transition-all hover:border-primary/50"
	>
		<div class="mb-3 flex items-center justify-between">
			<h3 class="text-sm font-semibold tracking-wide text-base-content/70 uppercase">{type}</h3>
			<div class="badge badge-outline badge-sm">{category}</div>
		</div>
		<p class="mb-2 text-2xl font-bold" style="font-family: {fontFamily}">
			{fontFamily}
		</p>
		<p class="text-xs text-base-content/60">{description}</p>
	</div>
{/snippet}

{#snippet contrastCard({
	colorName,
	bgClass,
	contentClass,
	score,
	level,
	description
}: {
	colorName: string;
	bgClass: string;
	contentClass: string;
	score: string;
	level: 'AAA' | 'AA' | 'Fail';
	description: string;
})}
	<div class="overflow-hidden rounded-xl border border-base-300 transition-shadow hover:shadow-md">
		<div class="flex items-center justify-between bg-base-200/30 p-4">
			<div class="flex items-center gap-3">
				<div class="h-14 w-14 rounded-xl {bgClass} border-2 border-base-content/10 shadow-sm"></div>
				<div>
					<h3 class="text-base font-semibold capitalize">{colorName}</h3>
					<p class="text-xs text-base-content/60">{description}</p>
				</div>
			</div>
			<div class="text-right">
				<div
					class="text-2xl font-bold {level === 'AAA'
						? 'text-success'
						: level === 'AA'
							? 'text-warning'
							: 'text-error'}"
				>
					{score}
				</div>
				<div
					class="badge badge-{level === 'AAA'
						? 'success'
						: level === 'AA'
							? 'warning'
							: 'error'} gap-1 badge-sm"
				>
					{#if level !== 'Fail'}<Check size={12} />{/if}
					{level}
				</div>
			</div>
		</div>
		<div class="p-5 {bgClass}">
			<p class="{contentClass} mb-2 text-lg font-semibold">
				The Quick Brown Fox Jumps Over The Lazy Dog
			</p>
			<p class="{contentClass} text-sm opacity-90">
				The Quick Brown Fox Jumps Over The Lazy Dog 0123456789.
			</p>
		</div>
	</div>
{/snippet}

{#snippet info()}
	<div class="mt-4 w-full space-y-6">
		<!-- Current Font Synergy Section -->
		<div class="card border border-base-200 bg-base-100 shadow-lg">
			<div class="card-body">
				<div class="mb-6 flex items-center justify-between">
					<div>
						<h2 class="text-2xl font-bold">Current Font Synergy</h2>
						<p class="mt-1 text-sm text-base-content/60">Your active font pairing configuration</p>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					{@render fontCard({
						type: 'Heading',
						fontFamily: 'Playfair Display',
						category: 'Serif',
						description: 'Elegant and sophisticated serif typeface'
					})}
					{@render fontCard({
						type: 'Subheading',
						fontFamily: 'Inter',
						category: 'Sans-serif',
						description: 'Modern and clean sans-serif typeface'
					})}
					{@render fontCard({
						type: 'Body',
						fontFamily: 'Inter',
						category: 'Sans-serif',
						description: 'Optimized for readability'
					})}
				</div>

				<!-- Synergy Score -->
				<div
					class="mt-6 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-6"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-bold">Synergy Score</h3>
							<p class="mt-1 text-sm text-base-content/70">Overall font pairing compatibility</p>
						</div>
						<div class="text-right">
							<div class="text-5xl font-bold text-primary">8.7</div>
							<div class="mt-1 text-xs text-base-content/60">out of 10</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Theme Color Contrast Section -->
		<div class="card border border-base-200 bg-base-100 shadow-lg">
			<div class="card-body">
				<div class="mb-6">
					<h2 class="text-2xl font-bold">Theme Color Contrast Analysis</h2>
					<p class="mt-2 text-sm text-base-content/60">
						Font readability with current theme colors (WCAG AA requires 4.5:1 for normal text, 3:1
						for large text)
					</p>
				</div>

				<div class="space-y-3">
					{@render contrastCard({
						colorName: 'primary',
						bgClass: 'bg-primary',
						contentClass: 'text-primary-content',
						score: '5.84',
						level: 'AA',
						description: 'Main brand color'
					})}
					{@render contrastCard({
						colorName: 'secondary',
						bgClass: 'bg-secondary',
						contentClass: 'text-secondary-content',
						score: '4.98',
						level: 'AA',
						description: 'Supporting brand color'
					})}
					{@render contrastCard({
						colorName: 'accent',
						bgClass: 'bg-accent',
						contentClass: 'text-accent-content',
						score: '7.26',
						level: 'AAA',
						description: 'Highlight color'
					})}
					{@render contrastCard({
						colorName: 'neutral',
						bgClass: 'bg-neutral',
						contentClass: 'text-neutral-content',
						score: '9.02',
						level: 'AAA',
						description: 'Background color'
					})}
					{@render contrastCard({
						colorName: 'info',
						bgClass: 'bg-info',
						contentClass: 'text-info-content',
						score: '5.92',
						level: 'AA',
						description: 'Informational color'
					})}
					{@render contrastCard({
						colorName: 'success',
						bgClass: 'bg-success',
						contentClass: 'text-success-content',
						score: '6.23',
						level: 'AA',
						description: 'Success state color'
					})}
					{@render contrastCard({
						colorName: 'warning',
						bgClass: 'bg-warning',
						contentClass: 'text-warning-content',
						score: '7.63',
						level: 'AAA',
						description: 'Warning state color'
					})}
					{@render contrastCard({
						colorName: 'error',
						bgClass: 'bg-error',
						contentClass: 'text-error-content',
						score: '6.33',
						level: 'AA',
						description: 'Error state color'
					})}
				</div>

				<!-- Legend -->
				<div
					class="mt-6 rounded-xl border border-base-300 bg-gradient-to-r from-base-200/50 to-base-300/30 p-5"
				>
					<h3 class="mb-4 text-sm font-bold tracking-wide uppercase">Contrast Score Legend</h3>
					<div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
						<div class="flex items-center gap-3 rounded-lg bg-base-100/50 p-2">
							<div class="badge badge-success">AAA</div>
							<span class="text-xs font-medium">7.0+ Enhanced readability</span>
						</div>
						<div class="flex items-center gap-3 rounded-lg bg-base-100/50 p-2">
							<div class="badge badge-warning">AA</div>
							<span class="text-xs font-medium">4.5+ Standard readability</span>
						</div>
						<div class="flex items-center gap-3 rounded-lg bg-base-100/50 p-2">
							<div class="badge badge-error">Fail</div>
							<span class="text-xs font-medium">&lt;4.5 Poor readability</span>
						</div>
					</div>
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
		{#if activeTab === 'synergy'}
			{@render synergyControls()}
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
					onclick={() => switchTab('synergy')}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							switchTab('synergy');
						}
					}}
					class={activeTab === 'synergy'
						? 'tab-active tab text-sm md:text-base'
						: 'tab text-sm md:text-base'}
					aria-selected={activeTab === 'synergy'}
				>
					Synergy
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
				{#if activeTab === 'synergy'}
					{#each fontType as type}
						{@render synergy({
							type,
							size:
								type === 'Heading'
									? 'text-3xl md:text-5xl'
									: type === 'Subheading'
										? 'text-2xl md:text-3xl'
										: 'text-lg md:text-xl'
						})}
					{/each}
				{:else if activeTab === 'discover'}
					{@render discover()}
				{:else if activeTab === 'info'}
					{@render info()}
				{/if}
			</div>
			<!-- END -->
		</div>
	</div>
</dialog>
