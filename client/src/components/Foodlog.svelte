<script>
    import { onMount } from "svelte";
    import { caloriesInfo, userInfo } from "../stores/AuthStore.js";
    import { fetchGet, fetchPost } from "../util/fetchUtil.js";

    let calories = 0;
    let usedCalories = 0;
    let calorieList = [];

    async function getCalories() {
        const result = await fetchGet("/api/calories");

        usedCalories = result.totalCalories;
        calorieList = result.calorieList;

        const percentage = (
            (usedCalories / $userInfo.calorie_goal) *
            100
        ).toFixed(0);

        caloriesInfo.set({
            usedCalories: usedCalories,
            percentage: percentage,
        });
    }

    async function handleAddCalories() {
        if (calories > 0) {
            await fetchPost("/api/calories", {
                calories: Number(calories),
            });

            calories = 0;

            await getCalories();
        }
    }

    onMount(async () => {
        await getCalories();
    });
</script>

<div class="calorie-container">
    <p>Add calories:</p>
</div>

<div class="input-button">
    <input type="number" placeholder="input calories" bind:value={calories} />

    <div>
        <button onclick={handleAddCalories}>
            <img
                src="/images/add.png"
                height="20px"
                alt="add-calories-button"
            />
        </button>
    </div>
</div>

<h3>Today's calories</h3>
<div class="list-container">
    <ul class="list">
        {#each calorieList as item}
            <li>{item.calories} kcal</li>
        {/each}
    </ul>
</div>

<style>
    .calorie-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 40px;
        justify-content: center;
    }

    button {
        background-color: transparent;
        border-color: transparent;
        margin-top: 20px;
        cursor: pointer;
    }

    input {
        width: 40%;
        height: 20px;
        background: #ec8e8e;
        border-radius: 40px;
        color: #321900;
        cursor: pointer;
        font-weight: 600;
        border: 2px solid #321900;
        margin-top: 20px;
    }

    .input-button {
        display: flex;
        justify-content: center;
    }

    .list,
    h3 {
        color: #321900;
    }
</style>
