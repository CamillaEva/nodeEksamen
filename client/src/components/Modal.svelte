<script>
    export let showModal = false;
</script>

{#if showModal}
    <div class="backdrop">
        <div class="modal">
            <slot />
        </div>
    </div>
{/if}

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #f9c5c4;
        border: 2px solid #321900;
        padding: 2rem;
        border-radius: 10px;
        width: 700px;
        height: 700px;
    }
</style>
