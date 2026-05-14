<script>
    import { user } from "../stores/AuthStore.js";
    import { fetchGet } from "../util/fetchUtil.js";
    import { onMount } from "svelte";

    async function checkSession() {
        const result = await fetchGet("/api/session");
        if (!result.data) {
            window.location.href = "/login";
        }
    }

    checkSession();

    onMount(async () => {
        const result = await fetchGet("/api/dashboard");
        if (result.user) {
            user.set(result.user);
        } else {
            window.location.href = "/login";
        }
    });
</script>

<h1 class="headline">
    Welcome {$user}!
</h1>

<style>
    .headline {
        line-height: 1.5;
        padding: 10px 0;
        text-align: center;
    }
</style>
