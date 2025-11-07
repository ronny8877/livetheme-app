<script lang="ts">
	import { Repeat } from '@lucide/svelte';
	import { type SvelteComponent, type ComponentProps, mount, unmount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { animations } from '$lib/utils/animations';

	type DeviceKey = string;
	type DeviceSize = { width: number; height: number };
	type SvelteComponentType = new (...args: any[]) => SvelteComponent;

	let {
		// The Svelte component to render inside the iframe
		template,
		// Props for the template component
		templateProps = {},
		// Device preset or custom size
		device = 'fullscreen',
		// Custom device presets
		devicePresets = {},
		// CSS variables to inject
		themeVars = {},
		// Framework ID for proper scoping (daisyui, shadcn, tailwind, etc.)
		frameworkId = 'daisyui',
		// Font configuration (heading/body) to inject as CSS vars + optional @font-face sources
		fonts = undefined,
		// Automatically apply the font stacks to body / heading elements inside iframe
		autoApplyFontStacks = true,
		// Wrapper class
		className = '',
		// Iframe element class
		iframeClassName = '',
		// Background for the outer wrapper
		backgroundClassName = 'bg-transparent',
		// Padding around the device frame
		paddingClassName = 'p-2',
		// Disable style cloning
		disableStyleCloning = false,
		// Show reload button
		showReloadButton = true,
		// Enable size change animations
		animate = true,
		// Animation duration
		animationDurationMs = 700,
		// Animation easing function (premium smooth bezier)
		animationEasing = 'cubic-bezier(0.22, 1, 0.36, 1)',
		innerClassName = 'mockup-browser overflow-hidden rounded-3xl border shadow-xl',
		// Cap height to nearest <main> or window
		fitToMainHeight = true,
		typography,
		// Disable links and navigation in preview mode
		disableNavigation = true
	}: {
		template: SvelteComponentType;
		templateProps?: ComponentProps<InstanceType<SvelteComponentType>>;
		device?: DeviceKey | DeviceSize;
		devicePresets?: Record<DeviceKey, DeviceSize>;
		themeVars?: Record<string, string>;
		frameworkId?: string;
		className?: string;
		iframeClassName?: string;
		backgroundClassName?: string;
		paddingClassName?: string;
		disableStyleCloning?: boolean;
		showReloadButton?: boolean;
		animate?: boolean;
		animationDurationMs?: number;
		animationEasing?: string;
		fitToMainHeight?: boolean;
		fonts?: {
			heading?: {
				family: string; // e.g. "Inter"
				fallbacks?: string[]; // e.g. ['ui-sans-serif','system-ui']
				sources?: Array<{
					url: string; // font file URL
					format?: string; // e.g. 'woff2'
					weight?: string | number; // 100-900 or normal/bold
					style?: string; // normal, italic
					unicodeRange?: string;
				}>;
			};
			body?: {
				family: string;
				fallbacks?: string[];
				sources?: Array<{
					url: string;
					format?: string;
					weight?: string | number;
					style?: string;
					unicodeRange?: string;
				}>;
			};
		};
		autoApplyFontStacks?: boolean;
		// Optional simplified typography config (fallback when `fonts` not provided)
		// Matches global store shape: { heading: { font }, body: { font } }
		typography?: {
			heading: { font: string };
			body: { font: string };
		};
		innerClassName?: string;
		disableNavigation?: boolean;
	} = $props();

	// --- State and Refs ---
	let outerRefEl: HTMLDivElement | null = $state(null);
	let iframeEl: HTMLIFrameElement | null = $state(null);
	let iframeDoc: Document | null = $state(null);
	// Non-reactive handle to avoid effect dependency loops
	let mountedComponent: ReturnType<typeof mount> | null = null;
	let availableHeight: number | null = $state(null);
	let availableWidth: number | null = $state(null);

	// --- Constants ---
	const DEFAULT_DEVICE_PRESETS: Record<DeviceKey, DeviceSize> = {
		mobile: { width: 390, height: 800 },
		tablet: { width: 834, height: 800 },
		desktop: { width: 1280, height: 800 }
	};
	const SRC_DOC = `<!DOCTYPE html>
	<html><head><meta charset="UTF-8"><title>Preview</title>
	<style>
	/* Iframe CSS reset to prevent conflicts */
	html,body { scrollbar-width: none;-ms-overflow-style: none; margin: 0; padding: 0;}
	html::-webkit-scrollbar,body::-webkit-scrollbar {display: none;} 
	#root{width:100%;height:100%;isolation:isolate;}
	/* Scope DaisyUI to prevent conflicts with parent */
	body { all: unset; display: block; }
	</style></head>
	<body><div id="root"></div></body></html>`;

	// --- Derived State (Equivalent to useMemo) ---
	const presets = $derived({ ...DEFAULT_DEVICE_PRESETS, ...devicePresets });
	const size = $derived(getDeviceSize(device, presets));
	const maxPresetWidth = $derived(Math.max(...Object.values(presets).map((p) => p.width)));
	const effectiveMaxWidth = $derived(
		availableWidth != null ? Math.min(maxPresetWidth, availableWidth) : maxPresetWidth
	);
	const outerClasses = $derived(
		[
			' h-full flex items-center justify-center rounded-xl',
			device === 'fullscreen' ? '' : paddingClassName,
			backgroundClassName,
			className
		].join(' ')
	);

	const effectiveWidth = $derived(
		device === 'fullscreen'
			? (availableWidth ?? size.width)
			: Math.min(size.width, effectiveMaxWidth)
	);
	const effectiveHeight = $derived(
		availableHeight != null ? Math.min(size.height, availableHeight) : size.height
	);

	const frameStyle: string = $derived(
		`width: ${effectiveWidth}px; height: ${effectiveHeight}px; max-width: 100%; margin: 0 auto;` +
			(animate
				? ` transition: all ${animationDurationMs}ms ${animationEasing}; will-change: transform, opacity; transform: scale(1); backface-visibility: hidden;`
				: '')
	);

	// --- Helper Functions ---
	function getDeviceSize(d: DeviceKey | DeviceSize, p: Record<DeviceKey, DeviceSize>): DeviceSize {
		const isBrowser = typeof window !== 'undefined';
		if (d === 'fullscreen')
			return {
				width: isBrowser ? window.innerWidth : (p.desktop?.width ?? 1280),
				height: isBrowser ? window.innerHeight : (p.desktop?.height ?? 800)
			};
		if (typeof d === 'object' && d !== null && 'width' in d && 'height' in d) return d;
		return p[d as DeviceKey] ?? p.mobile ?? Object.values(p)[0] ?? { width: 1280, height: 800 };
	}

	function cloneParentStylesInto(doc: Document) {
		if (!doc) return;
		// Clear previous clones
		doc.head.querySelectorAll("[data-preview-style-clone='1']").forEach((el) => el.remove());

		// Clone current styles, but filter out component-specific styles
		const nodes = document.head.querySelectorAll("style, link[rel='stylesheet']");
		nodes.forEach((node) => {
			// Skip component-specific styles that shouldn't be in preview

			const clone = node.cloneNode(true) as HTMLElement;
			clone.setAttribute('data-preview-style-clone', '1');
			clone.removeAttribute('nonce');
			doc.head.appendChild(clone);
		});

		// Ensure our theme var style stays last for cascade precedence
		const ensureLast = (id: string) => {
			const el = doc.getElementById(id);
			if (el) doc.head.appendChild(el); // move to end
		};
		ensureLast('__preview_theme_vars');
	}

	function applyThemeVariables(doc: Document, vars: Record<string, string>) {
		if (!doc) return;
		const styleId = '__preview_theme_vars';
		let styleEl = doc.getElementById(styleId) as HTMLStyleElement | null;
		if (!styleEl) {
			styleEl = doc.createElement('style');
			styleEl.id = styleId;
			doc.head.appendChild(styleEl);
		}

		// Build CSS variables for :root
		const rootVars: string[] = [];

		for (const [key, value] of Object.entries(vars)) {
			rootVars.push(`${key}: ${value};`);
		}

		// Apply all variables to :root
		const css = `
:root {
	${rootVars.join('\n\t')}
}`;

		styleEl.textContent = css;
		// Keep our variables style as the last element to avoid being overridden by cloned styles
		doc.head.appendChild(styleEl);

		// Apply framework scoping attribute for CSS isolation
		if (doc.body) {
			doc.body.setAttribute('data-framework', frameworkId || 'daisyui');
		}
	}

	function buildFontFaceRules(
		fontCfg: NonNullable<typeof fonts>[keyof NonNullable<typeof fonts>]
	): string {
		if (!fontCfg?.sources?.length) return '';
		return fontCfg.sources
			.map((src) => {
				const parts: string[] = [];
				parts.push(`font-family: '${fontCfg.family}';`);
				if (src.weight) parts.push(`font-weight: ${src.weight};`);
				if (src.style) parts.push(`font-style: ${src.style};`);
				if (src.unicodeRange) parts.push(`unicode-range: ${src.unicodeRange};`);
				const formatStr = src.format ? ` format('${src.format}')` : '';
				parts.push(`src: url('${src.url}')${formatStr};`);
				// Default to swap to avoid FOIT
				parts.push('font-display: swap;');
				return `@font-face { ${parts.join(' ')} }`;
			})
			.join('\n');
	}

	function applyFontConfiguration(doc: Document, cfg: typeof fonts) {
		if (!doc || !cfg) return;
		// 1. Inject @font-face declarations so iframe can load custom sources
		const fontFaceId = '__preview_font_faces';
		let fontFaceStyle = doc.getElementById(fontFaceId) as HTMLStyleElement | null;
		if (!fontFaceStyle) {
			fontFaceStyle = doc.createElement('style');
			fontFaceStyle.id = fontFaceId;
			doc.head.appendChild(fontFaceStyle);
		}
		fontFaceStyle.textContent = [buildFontFaceRules(cfg.heading), buildFontFaceRules(cfg.body)]
			.filter(Boolean)
			.join('\n');

		// 2. Inject CSS variables for Tailwind interoperability
		const varId = '__preview_font_vars';
		let varStyle = doc.getElementById(varId) as HTMLStyleElement | null;
		if (!varStyle) {
			varStyle = doc.createElement('style');
			varStyle.id = varId;
			doc.head.appendChild(varStyle);
		}
		const headingStack = cfg.heading
			? `'${cfg.heading.family}'${cfg.heading.fallbacks?.length ? ', ' + cfg.heading.fallbacks.join(', ') : ''}`
			: 'inherit';
		const bodyStack = cfg.body
			? `'${cfg.body.family}'${cfg.body.fallbacks?.length ? ', ' + cfg.body.fallbacks.join(', ') : ''}`
			: 'inherit';
		let extra = '';
		if (autoApplyFontStacks) {
			extra = `\nbody { font-family: var(--font-body); }\n.font-heading, .h-heading, h1,h2,h3,h4,h5,h6 { font-family: var(--font-heading); }`;
		}
		varStyle.textContent = `:root { --font-heading: ${headingStack}; --font-body: ${bodyStack}; }${extra}`;
	}

	function applyTypographyMetrics(
		doc: Document,
		simple?: {
			heading?: { lineHeight?: number; letterSpacing?: number };
			body?: { lineHeight?: number; letterSpacing?: number };
		}
	) {
		if (!doc || !simple) return;
		const id = '__preview_font_metrics';
		let styleEl = doc.getElementById(id) as HTMLStyleElement | null;
		if (!styleEl) {
			styleEl = doc.createElement('style');
			styleEl.id = id;
			doc.head.appendChild(styleEl);
		}
		// Convert letterSpacing numeric (assumed in em units) to CSS
		const headingLH = simple.heading?.lineHeight ?? 1.2;
		const headingLS = (simple.heading?.letterSpacing ?? 0) + 'em';
		const bodyLH = simple.body?.lineHeight ?? 1.25;
		const bodyLS = (simple.body?.letterSpacing ?? 0) + 'em';
		styleEl.textContent = `:root { --heading-line-height:${headingLH}; --heading-letter-spacing:${headingLS}; --body-line-height:${bodyLH}; --body-letter-spacing:${bodyLS}; }
.heading-metrics, .font-heading { line-height: var(--heading-line-height); letter-spacing: var(--heading-letter-spacing); }
.body-metrics, .font-body { line-height: var(--body-line-height); letter-spacing: var(--body-letter-spacing); }`;
	}

	function guessFontFamilyName(raw?: string) {
		if (!raw) return raw;
		return raw
			.split(/[-_\s]+/g)
			.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			.join(' ');
	}

	function disableNavigationInIframe(doc: Document) {
		if (!doc || !disableNavigation) return;

		// Add CSS to show pointer-events-none on all clickable elements
		const styleId = '__preview_disable_nav';
		let styleEl = doc.getElementById(styleId) as HTMLStyleElement | null;
		if (!styleEl) {
			styleEl = doc.createElement('style');
			styleEl.id = styleId;
			doc.head.appendChild(styleEl);
		}
		styleEl.textContent = `
			a{
				cursor: default !important;
			}
		`;

		// Prevent all navigation and link clicks
		const preventClick = (e: Event) => {
			const target = e.target as HTMLElement;
			// Check if it's a link or button
			if (target.tagName === 'A' || target.closest('a')) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		// Add event listeners to prevent navigation
		doc.addEventListener('contextmenu', preventClick, true); // Right click

		// Return cleanup function
		return () => {
			doc.removeEventListener('contextmenu', preventClick, true);
		};
	}

	function mountSvelteComponent() {
		if (!iframeDoc || !template) return;
		const target = iframeDoc.getElementById('root');
		if (!target) return;

		// Destroy previous component instance if it exists
		if (mountedComponent) {
			unmount(mountedComponent);
			mountedComponent = null;
		}

		// Mount the new component with isPreview prop if disableNavigation is true
		const props = disableNavigation ? { ...templateProps, isPreview: true } : templateProps;

		mountedComponent = mount(template, {
			target,
			props
		});

		// Disable navigation after component is mounted
		if (disableNavigation) {
			disableNavigationInIframe(iframeDoc);
		}
	}

	function handleReload() {
		if (!iframeEl) return;
		// Unmount component
		if (mountedComponent) {
			unmount(mountedComponent);
			mountedComponent = null;
		}
		iframeDoc = null;
		// Setting srcdoc triggers a reload
		iframeEl.srcdoc = SRC_DOC;
	}

	$effect(() => {
		if (!iframeEl) return;

		const handleLoad = () => {
			const doc = iframeEl?.contentDocument;
			if (!doc) return;
			iframeDoc = doc; // This assignment triggers other effects

			if (!disableStyleCloning) cloneParentStylesInto(doc);
			applyThemeVariables(doc, themeVars);
			applyFontConfiguration(doc, fonts);
			mountSvelteComponent();
		};

		// Keep a single load listener to handle both initial load and reloads
		iframeEl.addEventListener('load', handleLoad);

		// Initial load
		iframeEl.srcdoc = SRC_DOC;

		return () => {
			iframeEl?.removeEventListener('load', handleLoad);
			if (mountedComponent) {
				unmount(mountedComponent);
				mountedComponent = null;
			}
		};
	});

	// Effect 2: Re-render component when template or props change
	$effect(() => {
		if (iframeDoc) {
			mountSvelteComponent();
		}
	});

	// Effect 3: Sync parent document styles (for HMR) – throttled to avoid excessive work
	$effect(() => {
		if (disableStyleCloning || !iframeDoc) return;

		// Initial sync
		cloneParentStylesInto(iframeDoc);

		// Throttle style cloning to next animation frame and debounce rapid changes
		let rafScheduled = false;
		let debounceTimer: number | null = null;

		const scheduleClone = () => {
			// Clear any existing debounce timer
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}

			// Debounce: wait 100ms for rapid changes to settle
			debounceTimer = window.setTimeout(() => {
				if (rafScheduled) return;
				rafScheduled = true;
				requestAnimationFrame(() => {
					rafScheduled = false;
					if (iframeDoc) cloneParentStylesInto(iframeDoc);
				});
			}, 100);
		};

		const observer = new MutationObserver((mutations) => {
			// Only react to meaningful changes
			let shouldUpdate = false;
			for (const mutation of mutations) {
				// Check if this is a style change we care about
				if (mutation.type === 'childList') {
					// New or removed style nodes
					shouldUpdate = true;
					break;
				} else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
					// Style content or attributes changed
					const target = mutation.target as HTMLElement;
					if (target.tagName === 'STYLE' || target.tagName === 'LINK') {
						shouldUpdate = true;
						break;
					}
				}
			}

			if (shouldUpdate) {
				scheduleClone();
			}
		});

		observer.observe(document.head, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['href', 'media'], // Only watch relevant attributes
			characterData: true
		});

		return () => {
			observer.disconnect();
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
		};
	});

	// Effect 4: Update theme variables when they change
	$effect(() => {
		if (iframeDoc) {
			applyThemeVariables(iframeDoc, themeVars);
		}
	});

	// Effect 4b: Update font configuration when fonts OR typography fallback change
	$effect(() => {
		if (!iframeDoc) return;
		const simple = typography as any as
			| {
					heading?: { font?: string; lineHeight?: number; letterSpacing?: number };
					body?: { font?: string; lineHeight?: number; letterSpacing?: number };
			  }
			| undefined;
		if (fonts) {
			applyFontConfiguration(iframeDoc, fonts);
			applyTypographyMetrics(iframeDoc, simple);
			return;
		}
		if (simple?.heading?.font || simple?.body?.font) {
			applyFontConfiguration(iframeDoc, {
				heading: simple.heading?.font
					? { family: guessFontFamilyName(simple.heading.font) || simple.heading.font }
					: undefined,
				body: simple.body?.font
					? { family: guessFontFamilyName(simple.body.font) || simple.body.font }
					: undefined
			});
			applyTypographyMetrics(iframeDoc, simple);
		}
	});

	// Effect 6: Track available width for responsive sizing
	$effect(() => {
		if (!outerRefEl) {
			availableWidth = null;
			return;
		}

		const computeWidth = () => {
			const rect = outerRefEl!.getBoundingClientRect();
			const cs = getComputedStyle(outerRefEl!);
			const padLeft = parseFloat(cs.paddingLeft) || 0;
			const padRight = parseFloat(cs.paddingRight) || 0;
			availableWidth = Math.max(0, Math.floor(rect.width - padLeft - padRight));
		};

		computeWidth();
		const resizeObserver = new ResizeObserver(computeWidth);
		resizeObserver.observe(outerRefEl);
		window.addEventListener('resize', computeWidth);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', computeWidth);
		};
	});
</script>

<div class={outerClasses} bind:this={outerRefEl}>
	<div class={device !== 'fullscreen' ? innerClassName : 'min-h-screen w-full'} style={frameStyle}>
		{#if device !== 'fullscreen'}
			<div
				in:slide={animations.toolbarSlideIn}
				out:slide={animations.toolbarSlideOut}
				style={'margin-block: calc(0.25rem * 1)'}
				class="mockup-browser-toolbar &my-1 flex items-center justify-between gap-2"
			>
				<div class="input rounded-3xl text-sm">https://preview.app</div>
				{#if showReloadButton}
					<button
						type="button"
						class="btn btn-ghost btn-xs"
						aria-label="Reload preview"
						title="Reload preview"
						onclick={handleReload}
					>
						<Repeat size={14} />
					</button>
				{/if}
			</div>
		{/if}
		<iframe
			bind:this={iframeEl}
			title="Preview"
			class="block h-full w-full {iframeClassName}"
			style="border: 0;"
		>
		</iframe>
	</div>
</div>
