<script>
	import PrerviewDeviceSelector from '$lib/components/prerview-device-selector.svelte';
	import TemplateModal from '$lib/templates/template-modal.svelte';
</script>

<PrerviewDeviceSelector />
<TemplateModal isOpen={true} onSelectTemplate={() => {}} />