<script lang="ts">
	let { title = 'Live Preview' } = $props<{ title?: string }>();
</script>

<div class="flex h-full w-full items-center justify-center font-body">
	<div
		class="rounded-3xl border border-dashed border-base-300 p-8 text-center text-sm text-base-content/70"
	>
		<div class="mb-2 font-semibold">{title}</div>
		<div>Pick a template to get started.</div>
	</div>
</div>
