export enum MODAL_TYPE {
	FONTS = 'fonts',
	TEMPLATES = 'templates',
	GRADIENT = 'gradient',
	VAULT = 'vault',
	EXPLORE = 'explore',
	SETTINGS = 'settings'
}

export const active_preview_device = $state({
	device: 'fullscreen'
});

export const app_preferences = $state({
	fonts: {
		randomize_fonts: false
	},
	preview: {
		hidden_preview_devices: [] as string[],
		show_preview_device_menu: true,
		custom_preview_devices: [] as Array<{ name: string; width: number; height: number; id: string }>
	}
});

export const app_modals = $state({
	active_modal: null as MODAL_TYPE | null
});
