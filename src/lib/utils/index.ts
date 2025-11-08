import { app_preferences } from '$lib/store/app.svelte';
import { typography } from '$lib/store/theme.svelte';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

async function fetchGoogleFontIds(): Promise<string[]> {
	try {
		const res = await fetch('/api/fonts');
		const data = (await res.json()) as { fonts?: Record<string, string> };
		// API returns { fonts: Record<id, displayName> }
		return Object.keys(data?.fonts ?? {});
	} catch {
		return [];
	}
}

export async function randomizeFontsIfEnabled() {
	if (!app_preferences.fonts.randomize_fonts) return;
	const ids = await fetchGoogleFontIds();
	if (!ids.length) return;
	const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
	const heading = pick(ids);
	let body = pick(ids);
	if (body === heading && ids.length > 1) {
		body = pick(ids.filter((x) => x !== heading));
	}
	typography.heading.font = heading;
	typography.heading.weights = [400, 600];
	typography.body.font = body;
	typography.body.weights = [400];
}
