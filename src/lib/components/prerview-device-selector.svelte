<script lang="ts">
	import { Smartphone, Tablet, Monitor, Laptop, FullscreenIcon, Box } from '@lucide/svelte';
	import { devicePresets as DEFAULT_PRESETS } from '$lib/utils/constants';
	import { active_preview_device, app_preferences } from '$lib/store/app.svelte';
	import { fade } from 'svelte/transition';
	import { animations } from '$lib/utils/animations';
	import tippy from 'tippy.js';
	type DeviceSize = { width: number; height: number };
	type Presets = Record<string, DeviceSize>;

	// Merge default presets with custom devices
	const devicePresets = $derived.by(() => {
		const merged: Presets = { ...DEFAULT_PRESETS };

		// Add custom devices to the presets
		app_preferences.preview.custom_preview_devices.forEach((device) => {
			merged[device.id] = { width: device.width, height: device.height };
		});

		return merged;
	});

	// Filter out hidden devices (excluding fullscreen)
	const visibleDevices = $derived.by(() => {
		return Object.keys(devicePresets).filter(
			(deviceId) => !app_preferences.preview.hidden_preview_devices.includes(deviceId)
		);
	});

	// Hide selector entirely if only fullscreen is available OR if the preference is disabled
	const shouldShowSelector = $derived(
		visibleDevices.length > 0 && app_preferences.preview.show_preview_device_menu
	);

	const isActive = (d: string) => d === active_preview_device.device;
	const select = (d: string) => {
		active_preview_device.device = d;
	};

	// Auto-switch to fullscreen when selector is hidden and current device is not visible
	$effect(() => {
		if (!shouldShowSelector || visibleDevices.length === 0) {
			// If selector is hidden or no devices visible, ensure fullscreen is selected
			if (active_preview_device.device !== 'fullscreen') {
				active_preview_device.device = 'fullscreen';
			}
		} else if (
			!visibleDevices.includes(active_preview_device.device) &&
			active_preview_device.device !== 'fullscreen'
		) {
			// If current device is hidden, switch to first visible device or fullscreen
			active_preview_device.device = visibleDevices[0] || 'fullscreen';
		}
	});

	// Check if a device is a custom device
	const isCustomDevice = (d: string) => {
		return app_preferences.preview.custom_preview_devices.some((device) => device.id === d);
	};

	// Get custom device name
	const getCustomDeviceName = (d: string) => {
		const device = app_preferences.preview.custom_preview_devices.find((device) => device.id === d);
		return device?.name || d;
	};
</script>

{#if shouldShowSelector}
	<div
		in:fade={animations.fadeIn}
		out:fade={animations.fadeOut}
		class="fixed top-1/2 left-4 z-50 hidden -translate-y-1/2 lg:block"
	>
		<div
			class="flex flex-col items-center gap-2 rounded-full bg-base-100 p-2 shadow-lg outline outline-base-300"
		>
			{#each visibleDevices as d}
				<button
					data-umami-event="device-select"
					data-device={d}
					data-tippy-content={isCustomDevice(d)
						? getCustomDeviceName(d)
						: d.charAt(0).toUpperCase() + d.slice(1)}
					use:tippy={{ placement: 'right', animation: 'shift-away', duration: 200  }}
					title={d}
					aria-pressed={isActive(d)}
					class={`btn flex h-10 w-10 items-center justify-center rounded-3xl p-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] btn-sm ${isActive(d) ? 'scale-105 shadow-lg btn-primary' : 'btn-ghost hover:scale-110 hover:btn-outline'}`}
					onclick={() => select(d)}
				>
					{#if isCustomDevice(d)}
						<Box class="h-4 w-4" />
					{:else if d === 'phone'}
						<Smartphone class="h-4 w-4" />
					{:else if d === 'tablet'}
						<Tablet class="h-4 w-4" />
					{:else if d === 'desktop'}
						<Monitor class="h-4 w-4" />
					{:else}
						<Laptop class="h-4 w-4" />
					{/if}
				</button>
			{/each}
			{#if visibleDevices.length > 0}
				<div class="divider m-0 divide-accent p-0"></div>
			{/if}
			<button
				data-umami-event="device-select"
				data-device="fullscreen"
				use:tippy={{ placement: 'right', animation: 'shift-away', duration: 200 }}
				title={'fullscreen'}
				data-tippy-content={'Fullscreen'}
				aria-pressed={isActive('fullscreen')}
				class={`btn flex h-10 w-10 items-center justify-center rounded-3xl p-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] btn-sm ${isActive('fullscreen') ? 'scale-105 shadow-lg btn-primary' : 'btn-ghost hover:scale-110 hover:btn-outline'}`}
				onclick={() => select('fullscreen')}
			>
				<FullscreenIcon class="h-4 w-4" />
			</button>
		</div>
	</div>
{/if}
