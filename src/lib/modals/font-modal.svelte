<script lang="ts">
	import { app_modals } from '$lib/store/app.svelte';
	import { XIcon } from '@lucide/svelte';

	let modal: HTMLDialogElement | null = null;
	$effect(() => {
		const isOpen = app_modals.active_modal === 'fonts';
		if (modal) {
			if (isOpen && !modal.open) {
				modal.showModal();
			} else if (!isOpen && modal.open) {
				modal.close();
			}
		}
	});

    const closeModal = () => {
        app_modals.active_modal = null;
    };

	const handleBackdropClick = (e: MouseEvent) => {
		if (modal && e.target === modal) {
			closeModal();
		}
	};
</script>

<dialog 
id="font_modal" 
class="modal z-50 relative"
bind:this={modal} 
	onmousedown={handleBackdropClick}>
    <div class="modal-box w-full container h-[calc(100vh-10rem)] overflow-y-auto">
        <button 
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onclick={closeModal}>
            <XIcon />
        </button>
		<h3 class="text-lg font-bold">Hello!</h3>
		<p class="py-4">Press ESC key or click the button below to close</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button 
                onclick={closeModal}
                class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
