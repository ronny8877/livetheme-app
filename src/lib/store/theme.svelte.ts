import THEMES from '$lib/utils/constants';

export type Typography = {
	font: string;
	/**
	 * Array of numeric font weights available/selected for the font (e.g., [400,500]).
	 * The first entry is treated as the active weight for single-weight UI controls.
	 */
	weights: number[];
	letterSpacing: number; // em units
	lineHeight: number;
	subset: string;
};

export interface DaisyTheme {
	name: string;
	id: string;
	colors: Record<string, string>;
	radius: Record<string, string>;
	misc: Record<string, string | number>;
}

export const active_theme = $state<{ theme: DaisyTheme | null; is_modified: boolean }>({
	theme: THEMES[0],
	is_modified: false
});

export const typography = $state<{
	is_modified: boolean;
	heading: Typography;
	body: Typography;
}>({
	is_modified: false,
	heading: {
		font: 'roboto',
		weights: [400],
		letterSpacing: 0, // em units
		lineHeight: 1.2,
		subset: 'latin'
	},
	body: {
		font: 'roboto',
		weights: [400],
		letterSpacing: 0,
		lineHeight: 1.25,
		subset: 'latin'
	}
});
