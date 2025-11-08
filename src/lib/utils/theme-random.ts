import { wcagContrast, random as culoriRandom, formatCss } from 'culori';
import { THEME_ADJECTIVES, THEME_NOUNS } from './constants';
import type { DaisyTheme } from '$lib/store/theme.svelte';

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
		c: constraints?.c ?? [0.03, 0.28],
		h: constraints?.h ?? [0, 360]
	});
	return { ...col, str: formatCss(col) };
}

// Ensure a content (foreground) color has at least required contrast vs base
function generateContentColor(bg: string, target = 7): string {
	// Try white/black first
	const extremes = ['#ffffff', '#000000'];
	let best = extremes[0];
	let bestCr = 0;

	for (const e of extremes) {
		const cr = wcagContrast(e, bg);
		if (cr >= target) return e;
		if (cr > bestCr) {
			bestCr = cr;
			best = e;
		}
	}

	// Sample neutral grays across the lightness spectrum using culori
	for (let i = 0; i < 12; i++) {
		const l = i < 6 ? rand(0.05, 0.45) : rand(0.55, 0.98);
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
	const baseChroma = rand(0, 0.06); // slightly increased max chroma for more character

	// For dark themes: base-100 is darkest, for light themes: base-100 is lightest
	let base100L: number, base200L: number, base300L: number;

	if (isDark) {
		// Dark theme: base-100 is the darkest background
		base100L = rand(0.08, 0.18); // very dark
		base200L = rand(0.12, 0.24); // slightly lighter
		base300L = rand(0.18, 0.32); // lighter still
	} else {
		// Light theme: base-100 is the lightest background
		base100L = rand(0.92, 0.98); // very light
		base200L = rand(0.85, 0.94); // slightly darker
		base300L = rand(0.78, 0.88); // darker still
	}

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
	const primaryL = isDark ? rand(0.55, 0.75) : rand(0.4, 0.65);
	const primary = randomColor({ c: [0.1, 0.35], l: [primaryL, primaryL + 0.1] });
	colors['--color-primary'] = primary.str;
	colors['--color-primary-content'] = generateContentColor(primary.str, 7);

	// Secondary: complementary or analogous to primary
	const secondaryHue = ((primary.h ?? 0) + rand(60, 180)) % 360;
	const secondaryL = isDark ? rand(0.5, 0.7) : rand(0.35, 0.6);
	const secondary = randomColor({
		h: [secondaryHue, secondaryHue],
		c: [0.08, 0.3],
		l: [secondaryL, secondaryL + 0.1]
	});
	colors['--color-secondary'] = secondary.str;
	colors['--color-secondary-content'] = generateContentColor(secondary.str, 7);

	// Accent: high chroma, distinct hue
	const accentHue = ((primary.h ?? 0) + rand(-120, 120) + 360) % 360;
	const accentL = isDark ? rand(0.6, 0.8) : rand(0.45, 0.7);
	const accent = randomColor({
		h: [accentHue, accentHue],
		c: [0.15, 0.4],
		l: [accentL, accentL + 0.1]
	});
	colors['--color-accent'] = accent.str;
	colors['--color-accent-content'] = generateContentColor(accent.str, 7);

	// Neutral: muted, mid-range
	const neutralL = isDark ? rand(0.35, 0.55) : rand(0.3, 0.5);
	const neutral = randomColor({ c: [0.02, 0.1], l: [neutralL, neutralL + 0.1] });
	colors['--color-neutral'] = neutral.str;
	colors['--color-neutral-content'] = generateContentColor(neutral.str, 7);

	// Semantic colors: keep them in recognizable ranges but with variation
	const semanticL = isDark ? [0.5, 0.75] : [0.45, 0.7];

	const semanticDefs: Array<{
		key: string;
		hue: number;
		c: [number, number];
		l: [number, number];
	}> = [
		// Error: red range (0-30°) - wide enough for variety but clearly red
		{
			key: '--color-error',
			hue: rand(0, 30),
			c: [0.15, 0.35],
			l: semanticL as [number, number]
		},
		// Warning: yellow/orange range (40-80°) - clearly warning colors
		{
			key: '--color-warning',
			hue: rand(40, 80),
			c: [0.15, 0.35],
			l: isDark ? [0.65, 0.85] : [0.55, 0.8]
		},
		// Success: green range (110-150°) - clearly success/positive
		{
			key: '--color-success',
			hue: rand(110, 150),
			c: [0.1, 0.26],
			l: semanticL as [number, number]
		},
		// Info: blue/cyan range (190-240°) - clearly informational
		{
			key: '--color-info',
			hue: rand(190, 240),
			c: [0.1, 0.28],
			l: semanticL as [number, number]
		}
	];

	for (const def of semanticDefs) {
		const hue = ((def.hue % 360) + 360) % 360;
		const col = randomColor({ h: [hue, hue], c: def.c, l: def.l });
		colors[def.key] = col.str;
		colors[contentKey(def.key)] = generateContentColor(col.str, 7);
	}

	return colors;
}

function generateRadius(): Record<string, string> {
	// More variety in radius styles
	const base = rand(0, 2.5);
	const toRem = (v: number) => `${v.toFixed(2)}rem`;
	return {
		'--radius-selector': toRem(base),
		'--radius-field': toRem(Math.max(0, base - rand(0, 0.6))),
		'--radius-box': toRem(Math.min(3, base + rand(0, 0.8)))
	};
}

function generateMisc(): Record<string, string | number> {
	const toRem = (v: number) => `${v.toFixed(2)}rem`;
	return {
		'--size-selector': toRem(rand(0.25, 0.35)),
		'--size-field': toRem(rand(0.32, 0.35)),
		'--border': `${randInt(0.5, 5)}px`,
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
