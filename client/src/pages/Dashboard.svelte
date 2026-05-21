<script>
    import { user } from "../stores/AuthStore.js";
    import { fetchGet } from "../util/fetchUtil.js";
    import { onMount } from "svelte";
    import Modal from "../components/Modal.svelte";
    import StartInfo from "./StartInfo.svelte";
    import BMI from "../components/BMI.svelte";
    import CalorieCalculator from "../components/CalorieCalculator.svelte";
    import Age from "../components/Age.svelte";


    let showModal = $state(false);
    let userInfo = $state(null);

    // checking session
    async function checkSession() {
        const result = await fetchGet("/api/session");
        if (!result.data) {
            window.location.href = "/login";
        }
    }

    checkSession();

    // fetching userdata


    onMount(async () => {
        await checkSession();

        const result = await fetchGet("/api/dashboard");

        if (result.user) {
            user.set(result.user);

            userInfo = result.userInfo;

            if (!userInfo?.calorie_goal) {
                showModal = true;
            }
        } else {
            window.location.href = "/login";
        }
    });
</script>



<!-- html for dashboard for the logged in user -->
<h1>
    Welcome {$user}!
</h1>

{#if userInfo?.calorie_goal}
    <div class="calorie-container">
        <p>your daily calorie goal is: {userInfo.calorie_goal} kcal</p>
    </div>
    <div class="calculated-calorie-goal">
        <CalorieCalculator 
        weight={userInfo.start_weight} height={userInfo.height}
        activity_level={userInfo.activity_level} gender={userInfo.gender}
        birthday={userInfo.birthday} goal={userInfo.goal}>
        </CalorieCalculator>
    </div>
    <div class="weight-container">
        <p>your starting weight is: {userInfo.start_weight} kg</p>
    </div>
    <div class="weight-container">
        <p>you started the : {userInfo.start_date}</p>
    </div>
    <div class="goal-container">
        <p>your goal is to {userInfo.goal}</p>
    </div>
    <div class="BMI-container">
        <p>your start BMI is: <BMI weight={userInfo.start_weight} height={userInfo.height}/></p>
    </div>
    <div class="activity-level-container">
        <p>your activity level is set to: {userInfo.activity_level}  </p>
    </div>

    <div class="age-container">
     <Age birthday={userInfo.birthday}/>
    </div>
{:else}
        <!-- modal til start info - if user don't have a calorie_goal yet -->
    <div class="calorie-container">
        <Modal bind:showModal>
            {#snippet header()}
                <h2>
                    Get started!
                    <small><em>input your informations here</em></small>
                </h2>
            {/snippet}

            <StartInfo />
        </Modal>
    </div>
{/if}

<!-- styling -->
<style>
  
</style>
