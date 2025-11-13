<script lang="ts">
	import { Repeat } from '@lucide/svelte';
	import { type SvelteComponent, type ComponentProps, mount, unmount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { animations } from '$lib/utils/animations';

	type DeviceKey = string;
	type DeviceSize = { width: number; height: number };
	type SvelteComponentType = new (...args: any[]) => SvelteComponent;

	let {
		template,
		templateProps = {},
		device = 'fullscreen',
		devicePresets = {},
		themeVars = {},
		frameworkId = 'daisyui',
		fonts = undefined,
		autoApplyFontStacks = true,
		className = '',
		iframeClassName = '',
		backgroundClassName = 'bg-transparent',
		paddingClassName = 'p-2',
		disableStyleCloning = false,
		showReloadButton = true,
		animate = true,
		animationDurationMs = 700,
		animationEasing = 'cubic-bezier(0.22, 1, 0.36, 1)',
		innerClassName = 'mockup-browser overflow-hidden rounded-3xl border shadow-xl',
		typography,
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
		fonts?: {
			heading?: {
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
	let mountedComponent: ReturnType<typeof mount> | null = null;
	let availableHeight: number | null = $state(null);
	let availableWidth: number | null = $state(null);
	let viewportHeight: number = $state(typeof window !== 'undefined' ? window.innerHeight : 800);
	let viewportWidth: number = $state(typeof window !== 'undefined' ? window.innerWidth : 1280);

	// --- Constants ---
	const DEFAULT_DEVICE_PRESETS: Record<DeviceKey, DeviceSize> = {
		phone: { width: 390, height: 844 },
		tablet: { width: 834, height: 1112 },
		macbook: { width: 1280, height: 832 },
		desktop: { width: 1920, height: 1080 }
	};

	const SRC_DOC = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Preview</title>
<style>
html,body{scrollbar-width:none;-ms-overflow-style:none;margin:0;padding:0;}
html::-webkit-scrollbar,body::-webkit-scrollbar{display:none;}
#root{width:100%;height:100%;isolation:isolate;}
body{all:unset;display:block;width:100%;height:100%;overflow:auto; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}
</style>
</head>
<body><div class="transition-all duration-300 ease-in" id="root"></div></body></html>`;

	// --- Derived State ---
	const presets = $derived({ ...DEFAULT_DEVICE_PRESETS, ...devicePresets });
	const size = $derived(getDeviceSize(device, presets));

	const effectiveWidth = $derived(
		device === 'fullscreen'
			? Math.min(availableWidth ?? viewportWidth, viewportWidth)
			: Math.min(size.width, availableWidth ?? viewportWidth, viewportWidth)
	);

	const effectiveHeight = $derived(
		device === 'fullscreen'
			? Math.min(availableHeight ?? viewportHeight, viewportHeight)
			: Math.min(size.height, availableHeight ?? viewportHeight, viewportHeight)
	);

	const frameStyle: string = $derived(
		`width: ${effectiveWidth}px; height: ${effectiveHeight}px; max-width: 100%; max-height: 100%;` +
			(animate ? ` transition: all ${animationDurationMs}ms ${animationEasing};` : '')
	);

	const outerClasses = $derived(
		[
			'h-full flex items-center justify-center rounded-xl',
			device === 'fullscreen' ? '' : paddingClassName,
			backgroundClassName,
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	// --- Helper Functions ---
	function getDeviceSize(d: DeviceKey | DeviceSize, p: Record<DeviceKey, DeviceSize>): DeviceSize {
		if (d === 'fullscreen') {
			return {
				width: viewportWidth,
				height: viewportHeight
			};
		}
		if (typeof d === 'object' && d !== null && 'width' in d && 'height' in d) return d;
		return p[d as DeviceKey] ?? p.mobile ?? { width: 390, height: 800 };
	}

	function cloneParentStylesInto(doc: Document) {
		if (!doc) return;
		doc.head.querySelectorAll("[data-preview-style-clone='1']").forEach((el) => el.remove());

		const nodes = document.head.querySelectorAll("style, link[rel='stylesheet']");
		nodes.forEach((node) => {
			const clone = node.cloneNode(true) as HTMLElement;
			clone.setAttribute('data-preview-style-clone', '1');
			clone.removeAttribute('nonce');
			doc.head.appendChild(clone);
		});

		const ensureLast = (id: string) => {
			const el = doc.getElementById(id);
			if (el) doc.head.appendChild(el);
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

		const rootVars = Object.entries(vars)
			.map(([key, value]) => `${key}: ${value};`)
			.join('\n\t');

		styleEl.textContent = `:root {\n\t${rootVars}\n}`;
		doc.head.appendChild(styleEl);

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

		const extra = autoApplyFontStacks
			? `\nbody { font-family: var(--font-body); }\nh1,h2,h3,h4,h5,h6 { font-family: var(--font-heading); }`
			: '';

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

		const headingLH = simple.heading?.lineHeight ?? 1.2;
		const headingLS = (simple.heading?.letterSpacing ?? 0) + 'em';
		const bodyLH = simple.body?.lineHeight ?? 1.25;
		const bodyLS = (simple.body?.letterSpacing ?? 0) + 'em';
		styleEl.textContent = `:root { --heading-line-height:${headingLH}; --heading-letter-spacing:${headingLS}; --body-line-height:${bodyLH}; --body-letter-spacing:${bodyLS}; }
.font-heading { line-height: var(--heading-line-height); letter-spacing: var(--heading-letter-spacing); }
.font-body { line-height: var(--body-line-height); letter-spacing: var(--body-letter-spacing); }`;
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

		const styleId = '__preview_disable_nav';
		let styleEl = doc.getElementById(styleId) as HTMLStyleElement | null;
		if (!styleEl) {
			styleEl = doc.createElement('style');
			styleEl.id = styleId;
			doc.head.appendChild(styleEl);
		}
		styleEl.textContent = `a { cursor: default !important; }`;

		const preventClick = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target.tagName === 'A' || target.closest('a')) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		doc.addEventListener('contextmenu', preventClick, true);

		return () => {
			doc.removeEventListener('contextmenu', preventClick, true);
		};
	}

	function mountSvelteComponent() {
		if (!iframeDoc || !template) return;
		const target = iframeDoc.getElementById('root');
		if (!target) return;

		if (mountedComponent) {
			unmount(mountedComponent);
			mountedComponent = null;
		}

		const props = disableNavigation ? { ...templateProps, isPreview: true } : templateProps;
		mountedComponent = mount(template, { target, props });

		if (disableNavigation) {
			disableNavigationInIframe(iframeDoc);
		}
	}

	function handleReload() {
		if (!iframeEl) return;
		if (mountedComponent) {
			unmount(mountedComponent);
			mountedComponent = null;
		}
		iframeDoc = null;
		iframeEl.srcdoc = SRC_DOC;
	}

	// Effect 1: Initialize iframe and mount component
	$effect(() => {
		if (!iframeEl) return;

		const handleLoad = () => {
			const doc = iframeEl?.contentDocument;
			if (!doc) return;
			iframeDoc = doc;

			if (!disableStyleCloning) cloneParentStylesInto(doc);
			applyThemeVariables(doc, themeVars);
			applyFontConfiguration(doc, fonts);
			mountSvelteComponent();
		};

		iframeEl.addEventListener('load', handleLoad);
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
		if (iframeDoc && (template || templateProps)) {
			mountSvelteComponent();
		}
	});

	// Effect 3: Sync parent styles on change (optimized with debouncing)
	$effect(() => {
		if (disableStyleCloning || !iframeDoc) return;

		cloneParentStylesInto(iframeDoc);

		let rafScheduled = false;
		let debounceTimer: number | null = null;

		const scheduleClone = () => {
			if (debounceTimer) clearTimeout(debounceTimer);

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
			for (const mutation of mutations) {
				if (
					mutation.type === 'childList' ||
					(mutation.target as HTMLElement).tagName === 'STYLE' ||
					(mutation.target as HTMLElement).tagName === 'LINK'
				) {
					scheduleClone();
					break;
				}
			}
		});

		observer.observe(document.head, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['href', 'media'],
			characterData: true
		});

		return () => {
			observer.disconnect();
			if (debounceTimer) clearTimeout(debounceTimer);
		};
	});

	// Effect 4: Update theme variables
	$effect(() => {
		if (iframeDoc && themeVars) {
			applyThemeVariables(iframeDoc, themeVars);
		}
	});

	// Effect 5: Update font configuration
	$effect(() => {
		if (!iframeDoc) return;
		const simple = typography as any;
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

	// Effect 6: Track viewport dimensions
	$effect(() => {
		const updateViewport = () => {
			viewportHeight = window.innerHeight;
			viewportWidth = window.innerWidth;
		};

		updateViewport();
		window.addEventListener('resize', updateViewport);

		return () => {
			window.removeEventListener('resize', updateViewport);
		};
	});

	// Effect 7: Track available container dimensions
	$effect(() => {
		if (!outerRefEl) {
			availableWidth = null;
			availableHeight = null;
			return;
		}

		const computeDimensions = () => {
			const rect = outerRefEl!.getBoundingClientRect();
			const cs = getComputedStyle(outerRefEl!);
			const padLeft = parseFloat(cs.paddingLeft) || 0;
			const padRight = parseFloat(cs.paddingRight) || 0;
			const padTop = parseFloat(cs.paddingTop) || 0;
			const padBottom = parseFloat(cs.paddingBottom) || 0;
			availableWidth = Math.max(0, Math.floor(rect.width - padLeft - padRight));
			availableHeight = Math.max(0, Math.floor(rect.height - padTop - padBottom));
		};

		computeDimensions();
		const resizeObserver = new ResizeObserver(computeDimensions);
		resizeObserver.observe(outerRefEl);

		return () => {
			resizeObserver.disconnect();
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
