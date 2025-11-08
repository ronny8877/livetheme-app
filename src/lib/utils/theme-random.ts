import { wcagContrast, random as culoriRandom, formatCss } from 'culori';
import { THEME_ADJECTIVES, THEME_NOUNS } from './constants';

// -------------------------------
// Types
// -------------------------------
export interface DaisyTheme {
	name: string;
	id: string;
	default: boolean; // allow boolean instead of literal false for compatibility with static theme objects
	colors: Record<string, string>;
	radius: Record<string, string>;
	misc: Record<string, string | number>;
}

function contentKey(key: string) {
	if (key.endsWith('-content')) return key; // already
	return key + '-content';
}

// -------------------------------
// Random helpers
// -------------------------------
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));
const pick = <T>(arr: T[]): T => arr[randInt(0, arr.length - 1)];

// Culori already formats OKLCH; direct formatting used where needed.

// Use culori's random with constraints to create varied but balanced OKLCH colors
function randomColor(constraints?: {
	l?: [number, number];
	c?: [number, number];
	h?: [number, number];
}) {
	const col = culoriRandom('oklch', {
		l: constraints?.l ?? [0.3, 0.85],
		c: constraints?.c ?? [0.05, 0.37], // Increased max chroma for more vibrancy
		h: constraints?.h ?? [0, 360]
	});
	return { ...col, str: formatCss(col) };
}

// Optimized: Ensure a content (foreground) color has at least required contrast vs base
function generateContentColor(bg: string, target = 7): string {
	// Try white/black first - covers 90% of cases efficiently
	const white = '#ffffff';
	const black = '#000000';

	const whiteContrast = wcagContrast(white, bg);
	if (whiteContrast >= target) return white;

	const blackContrast = wcagContrast(black, bg);
	if (blackContrast >= target) return black;

	// Binary search approach for faster convergence
	let best = whiteContrast > blackContrast ? white : black;
	let bestCr = Math.max(whiteContrast, blackContrast);

	// Optimize: reduce samples from 12 to 6, use smarter lightness selection
	const darkerSamples = [0.08, 0.18, 0.28];
	const lighterSamples = [0.72, 0.85, 0.95];

	for (const l of [...darkerSamples, ...lighterSamples]) {
		const neutral = formatCss({ mode: 'oklch', l, c: 0, h: 0 });
		const cr = wcagContrast(neutral, bg);
		if (cr >= target) return neutral;
		if (cr > bestCr) {
			bestCr = cr;
			best = neutral;
		}
	}

	return best;
}

// Generate a coherent base palette and semantic colors
function generateColors(themeType: 'light' | 'dark' | 'random' = 'random'): Record<string, string> {
	const colors: Record<string, string> = {};

	// Decide if this is a dark or light theme
	let isDark: boolean;
	if (themeType === 'random') {
		isDark = Math.random() < 0.5; // 50/50 chance
	} else {
		isDark = themeType === 'dark';
	}

	// Base neutrals: dynamically generate for dark or light themes
	const baseHue = rand(0, 360);
	const baseChroma = rand(0, 0.08); // Increased for more character without overwhelming

	// For dark themes: base-100 is darkest, for light themes: base-100 is lightest
	// Optimized: single assignment instead of conditional
	const [base100L, base200L, base300L] = isDark
		? [rand(0.08, 0.16), rand(0.14, 0.22), rand(0.2, 0.3)] // Dark: tighter ranges for consistency
		: [rand(0.94, 0.98), rand(0.87, 0.93), rand(0.8, 0.86)]; // Light: better separation

	colors['--color-base-100'] = formatCss({
		mode: 'oklch',
		l: base100L,
		c: baseChroma * 0.3,
		h: baseHue
	});
	colors['--color-base-200'] = formatCss({
		mode: 'oklch',
		l: base200L,
		c: baseChroma * 0.6,
		h: baseHue
	});
	colors['--color-base-300'] = formatCss({
		mode: 'oklch',
		l: base300L,
		c: baseChroma,
		h: baseHue
	});

	// Content color needs high contrast against base-200
	const targetContrast = isDark ? 8 : 10; // slightly lower contrast for dark themes
	colors['--color-base-content'] = generateContentColor(colors['--color-base-200'], targetContrast);

	// Primary: vibrant and saturated, adjusted for theme type
	const primaryL = isDark ? rand(0.58, 0.72) : rand(0.45, 0.65);
	const primary = randomColor({ c: [0.15, 0.4], l: [primaryL, primaryL + 0.08] }); // Increased chroma for vibrancy
	colors['--color-primary'] = primary.str;
	colors['--color-primary-content'] = generateContentColor(primary.str, 7);

	// Secondary: complementary or analogous to primary
	const secondaryHue = ((primary.h ?? 0) + rand(90, 150)) % 360; // Narrower range for better harmony
	const secondaryL = isDark ? rand(0.52, 0.68) : rand(0.4, 0.6);
	const secondary = randomColor({
		h: [secondaryHue, secondaryHue],
		c: [0.12, 0.35], // Increased vibrancy
		l: [secondaryL, secondaryL + 0.08]
	});
	colors['--color-secondary'] = secondary.str;
	colors['--color-secondary-content'] = generateContentColor(secondary.str, 7);

	// Accent: high chroma, distinct hue
	const accentHue = ((primary.h ?? 0) + rand(-90, 90) + 360) % 360; // Tighter control for cohesion
	const accentL = isDark ? rand(0.62, 0.78) : rand(0.5, 0.7);
	const accent = randomColor({
		h: [accentHue, accentHue],
		c: [0.2, 0.45], // Maximum vibrancy for accent
		l: [accentL, accentL + 0.08]
	});
	colors['--color-accent'] = accent.str;
	colors['--color-accent-content'] = generateContentColor(accent.str, 7);

	// Neutral: muted, mid-range
	const neutralL = isDark ? rand(0.38, 0.52) : rand(0.35, 0.5);
	const neutral = randomColor({ c: [0.03, 0.12], l: [neutralL, neutralL + 0.08] }); // Slightly more saturated
	colors['--color-neutral'] = neutral.str;
	colors['--color-neutral-content'] = generateContentColor(neutral.str, 7);

	// Semantic colors: strict boundaries for meaning, increased vibrancy
	// Optimized: pre-compute semantic lightness ranges
	const semanticL = isDark ? [0.55, 0.72] : [0.5, 0.68];

	const semanticDefs: Array<{
		key: string;
		hue: number;
		c: [number, number];
		l: [number, number];
	}> = [
		// Error: red range (350-25°) - spans 0° for true reds, vibrant
		{
			key: '--color-error',
			hue: rand(0, 1) > 0.7 ? rand(350, 360) : rand(0, 25), // Favor true reds
			c: [0.18, 0.4], // Increased for more vibrant errors
			l: semanticL as [number, number]
		},
		// Warning: amber/orange range (35-75°) - unmistakably warning
		{
			key: '--color-warning',
			hue: rand(35, 75),
			c: [0.18, 0.4], // Increased vibrancy
			l: isDark ? [0.68, 0.82] : [0.58, 0.78] // Brighter for visibility
		},
		// Success: green range (120-155°) - clearly positive, more vibrant
		{
			key: '--color-success',
			hue: rand(120, 155), // Tighter green range
			c: [0.15, 0.32], // Increased vibrancy while staying green
			l: semanticL as [number, number]
		},
		// Info: blue/cyan range (195-235°) - clearly informational
		{
			key: '--color-info',
			hue: rand(195, 235), // Tighter blue range
			c: [0.15, 0.35], // Increased vibrancy
			l: semanticL as [number, number]
		}
	];

	// Optimized: single loop with direct assignment
	for (const def of semanticDefs) {
		const hue = ((def.hue % 360) + 360) % 360;
		const col = randomColor({ h: [hue, hue], c: def.c, l: def.l });
		colors[def.key] = col.str;
		colors[contentKey(def.key)] = generateContentColor(col.str, 7);
	}

	return colors;
}

function generateRadius(): Record<string, string> {
	// Optimized: pre-calculate toRem function, more variety in radius styles
	const toRem = (v: number) => `${v.toFixed(2)}rem`;
	const base = rand(0, 2.5);
	// Use single calculation pass
	return {
		'--radius-selector': toRem(base),
		'--radius-field': toRem(Math.max(0, base - rand(0, 0.6))),
		'--radius-box': toRem(Math.min(3, base + rand(0, 0.8)))
	};
}

function generateMisc(): Record<string, string | number> {
	// Optimized: single toRem definition and calculation
	const toRem = (v: number) => `${v.toFixed(2)}rem`;
	return {
		'--size-selector': toRem(rand(0.25, 0.35)),
		'--size-field': toRem(rand(0.3, 0.38)), // Slightly increased for better touch targets
		'--border': `${randInt(1, 4)}px`, // Avoid 0.5px for sharper rendering
		'--depth': randInt(0, 1),
		'--noise': randInt(0, 1)
	};
}

export interface RandomThemeOptions {
	nameStrategy?: 'adjective-noun' | 'uuid' | 'timestamp';
	themeType?: 'light' | 'dark' | 'random'; // 'random' means 50/50 chance
}

// lightweight uuid-ish (not crypto strong, adequate for theme id)
function simpleId() {
	return 'xxxxxx'.replace(/x/g, () => randInt(0, 35).toString(36));
}

function generateName(strategy: RandomThemeOptions['nameStrategy'] = 'adjective-noun') {
	switch (strategy) {
		case 'uuid':
			return simpleId();
		case 'timestamp':
			return 'theme-' + Date.now();
		case 'adjective-noun':
		default:
			return `${pick(THEME_ADJECTIVES)} ${pick(THEME_NOUNS)}`.toLowerCase();
	}
}

export function generateRandomTheme(opts: RandomThemeOptions = {}): DaisyTheme {
	const themeType = opts.themeType ?? 'random';
	const colors = generateColors(themeType);
	const radius = generateRadius();
	const misc = generateMisc();
	const name = generateName(opts.nameStrategy);
	return {
		name,
		id: simpleId(),
		default: false,
		colors,
		radius,
		misc
	};
}

// Convenience: ensure shape matches existing theme file if needed
export function toDaisyUiTheme(theme: DaisyTheme) {
	return theme; // structure already matches expected usage
}

export function randomizeThemeInPlace(theme: DaisyTheme) {
	const next = generateRandomTheme();
	theme.colors = next.colors;
	theme.radius = next.radius;
	theme.misc = next.misc;
	theme.name = next.name;
	theme.id = next.id;
	return theme;
}
