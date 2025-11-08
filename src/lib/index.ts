import { active_theme } from './store/theme.svelte';
import { generateRandomTheme } from './utils/theme-random';

// place files you want to import through the `$lib` alias in this folder.
export function randomizeActiveTheme() {
	const newTheme = generateRandomTheme();
	active_theme.theme = newTheme;
	active_theme.is_modified = true;
}
