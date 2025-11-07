export const active_preview_device = $state({
	device: 'fullscreen'
});

export const app_preferences = $state({
	preview: {
		hidden_preview_devices: [] as string[],
		show_preview_device_menu: true,
		custom_preview_devices: [] as Array<{ name: string; width: number; height: number; id: string }>
	}
});
