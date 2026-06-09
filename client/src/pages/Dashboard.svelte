<script>
    import { user, userInfo } from "../stores/AuthStore.js";
    import { fetchGet } from "../util/fetchUtil.js";
    import { onMount } from "svelte";
    // ----- child components -----
    import Modal from "../components/Modal.svelte";
    import StartInfo from "./StartInfo.svelte";
    import BMI from "../components/BMI.svelte";
    import Weight from "../components/Weight.svelte";
    import Calories from "../components/Calories.svelte";
    import Foodlog from "../components/Foodlog.svelte";
    import Chat from "../components/Chat.svelte";


    let showModal = $state(false);

    // ----- checking session -----
    export async function checkSession() {
        const result = await fetchGet("/api/session");
        if (!result.data) {
            window.location.href = "/login";
        }
    }

    checkSession();

    // ----- fetching userdata -----
    onMount(async () => {
        await checkSession();

        const result = await fetchGet("/api/dashboard");

        if (result.user) {
            user.set(result.user);
            userInfo.set(result.userInfo);

            if (!result.userInfo?.calorie_goal) {
                showModal = true;
            }
        } else {
            window.location.href = "/login";
        }
    });


    // -----  -----
    async function handleInfoSubmitted() {
        showModal = false;
        const result = await fetchGet("/api/dashboard");
        if (result.user) {
            user.set(result.user);
            userInfo.set(result.userInfo);
            showModal = false;
        }
    }
</script>

<!-- html for dashboard for the logged in user -->
<div class="background">
    <h1 class="headline">
        Welcome {$user}!
    </h1>
    {#if $userInfo?.calorie_goal}
        <div class="info-containers-row">
            <div class="info-containers">
                <Weight />
            </div>

            <div class="info-containers">
                <h2>Log Food</h2>
                <Foodlog />
            </div>

            <div class="small-info-containers-container">
                <div class="small-info-containers">
                    <Calories />
                </div>

                <div class="small-info-containers">
                    <h2>Your BMI</h2>
                    <BMI
                        weight={$userInfo.start_weight}
                        height={$userInfo.height}
                    />
                </div>
            </div>

            <div class="info-containers">
                <h2>Motivation</h2>
                <Chat />
            </div>
        </div>
    {:else}
        <!-- modal til start info - if user don't have a calorie_goal yet -->
        <div class="calorie-container">
            <Modal {showModal}>
                <h2>
                    Get started!
                    <small><em>input your informations here</em></small>
                </h2>

                <StartInfo onSubmit={handleInfoSubmitted} />
            </Modal>
        </div>
    {/if}
</div>

<style>
    .info-containers-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .info-containers {
        background-color: #f4b1b1;
        border: 2px solid #321900;
        border-radius: 40px;
        width: 20%;
        height: 600px;
        text-align: center;
        padding-top: 20px;
    }

    .small-info-containers {
        background-color: #f4b1b1;
        border: 2px solid #321900;
        border-radius: 40px;
        height: 280px;
        text-align: center;
        padding-top: 20px;
    }

    .small-info-containers-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
