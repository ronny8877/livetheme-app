<script>
	import PreviewDeviceSelector from '$lib/components/preview-device-selector.svelte';
	import Preview from '$lib/engine/preview.svelte';
	import { active_preview_device } from '$lib/store/app.svelte';
	import { active_template } from '$lib/store/templates.svelte';
	import TemplateModal from '$lib/templates/template-modal.svelte';
	import { devicePresets } from '$lib/utils/constants';
	import { active_theme, typography } from '$lib/store/theme.svelte';
	import Dock from '$lib/components/dock.svelte';

	// Get the component and theme colors with proper types
	let templateComponent = $derived(active_template.template?.component);
	let themeColors = $derived(active_theme.theme ?{
		...active_theme.theme.colors,
		...active_theme.theme.radius,
		...active_theme.theme.misc
	}:{});
</script>

<PreviewDeviceSelector />
<TemplateModal/>

<div
			class="h-full w-auto min-w-0 flex-1 duration-300 {active_preview_device.device ===
			'fullscreen'
				? ''
				: ''}"
		>
			{#if templateComponent}
				<Preview
					template={templateComponent}
					templateProps={{ title: active_template.template?.title || 'Live Preview' }}
					device={active_preview_device.device}
					{devicePresets}
					className="h-full w-full"
					{typography}
					themeVars={themeColors}
					frameworkId={active_template.template?.framework || 'daisyui'}
				/>
			{:else}
				<div class="flex h-full items-center justify-center">
					<div class="text-center">
						<p class="text-base-content/70">Select a template to preview</p>
					</div>
				</div>
			{/if}
		</div>
<Dock />