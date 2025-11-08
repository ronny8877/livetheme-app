<script>
	import Dock from '$lib/components/dock.svelte';
	import PreviewDeviceSelector from '$lib/components/preview-device-selector.svelte';
	import TemplateModal from '$lib/templates/template-modal.svelte';
</script>

<PreviewDeviceSelector />
<TemplateModal isOpen={true} onSelectTemplate={() => {}} />
<Dock />
