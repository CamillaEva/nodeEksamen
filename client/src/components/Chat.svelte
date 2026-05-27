<script>
    import { socket } from "../socket.js";
    import { motivationMessages } from "../stores/SocketStore.js";
    import { onMount } from "svelte";

    function sendMessage(text) {
        socket.emit("motivation-message", {
            text,
        });
    }

    onMount(() => {
        const handler = (message) => {
            const newMessage = {
                id: Date.now(),
                text: message.text,
            };

            motivationMessages.update((old) => [...old, newMessage]);
            setTimeout(() => {
                motivationMessages.update((old) =>
                    old.filter((message) => message.id !== newMessage.id),
                );
            }, 3000);
        };

        socket.on("receive-message", handler);

        return () => {
            socket.off("receive-message", handler);
        };
    });
</script>

<div class="message-container">
    {#each $motivationMessages as message}
        <div class="message">
            {message.text}
        </div>
    {/each}
</div>

<h4>Send motivation to other users.</h4>

<button onclick={() => sendMessage("You've got this!")}>
    You've got this!
</button>

<button onclick={() => sendMessage("Keep going!")}> Keep going! </button>

<button onclick={() => sendMessage("Run, Forrest, run!")}>
    Run, Forrest, run!
</button>

<button onclick={() => sendMessage("You tha bomb!")}> You tha bomb! </button>

<style>
    h4 {
        color: #321900;
    }

    button {
        width: 80%;
        height: 100px;
        background: #ec8e8e;
        border-radius: 40px;
        color: #321900;
        cursor: pointer;
        font-weight: 600;
        border: 2px solid #321900;
        margin: 10px;
    }

    .message-container {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
    }
    .message {
        background: #ec8e8e;
        color: #321900;
        padding: 12px 20px;
        border-radius: 40px;
        border: 2px solid #321900;
        font-weight: 600;
        max-width: 300px;
    }
</style>
