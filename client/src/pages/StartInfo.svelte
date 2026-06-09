<script>
    import { fetchPost } from "../util/fetchUtil.js";
    import { getDailyCalorieGoal } from "../util/calorieCalculatorUtil.js";

    const { onSubmit = () => {} } = $props();

    let birthday = $state("");
    let gender = $state("");
    let height = $state("");
    let start_weight = $state("");
    let activity_level = $state("");
    let goal = $state("");

    async function handleSubmitInfoForm() {

        // ----- calculatin calorie goal -----
        const calorie_goal = getDailyCalorieGoal(
            parseFloat(start_weight),
            parseInt(height),
            gender,
            activity_level,
            birthday,
            goal,
        );

        const response = await fetchPost("/api/startInfo", {
            birthday,
            gender,
            height: parseInt(height),
            activity_level,
            goal,
            start_weight: parseFloat(start_weight),
            // formats any date as YYYY-MM-DD
            start_date: new Date().toISOString().split("T")[0],
            calorie_goal,
        });

        const result = await response.json();

        if (result?.success) {
            await onSubmit();
        } else {
            alert(result?.error || "Something went wrong");
        }
    }
</script>

<div class="startInfo-wrapper">
    <div class="input-box">
        <input type="date" bind:value={birthday} required />
    </div>
    <div class="select-box">
        <select bind:value={gender} required>
            <option class="placeholder-text" value="" disabled selected
                >Gender</option
            >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non_binary">Non-binary</option>
            <option value="transgender">Transgender</option>
            <option value="genderfluid">Genderfluid</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
            <option value="other">Other</option>
        </select>
    </div>
    <div class="input-box">
        <input
            type="number"
            bind:value={height}
            placeholder="Height in cm"
            required
        />
    </div>
    <div class="input-box">
        <input
            type="number"
            bind:value={start_weight}
            placeholder="Start weight in kgs"
            required
        />
    </div>
    <div class="select-box">
        <select bind:value={activity_level} required>
            <option class="placeholder-text" value="" disabled selected
                >choose an activity level</option
            >
            <option value="low">Low activity</option>
            <option value="moderate">Moderate activity</option>
            <option value="high"> High activity</option>
            <option value="very_high">Very high activity</option>
        </select>
    </div>
    <div class="select-box">
        <select bind:value={goal} required>
            <option class="placeholder-text" value="" disabled selected
                >Goal</option
            >
            <option value="lose_weight">Lose Weight</option>
            <option value="maintain_weight">Maintain Weight</option>
            <option value="gain_weight">Gain Weight</option>
        </select>
    </div>

    <button type="button" class="start-button" onclick={handleSubmitInfoForm}>
        Start my journey
    </button>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }

    .startInfo-wrapper {
        width: 600px;
        height: 550px;
        background-color: rgba(236, 144, 144, 0.151);
        border: 2px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        color: #fff;
        border-radius: 10px;
        padding: 30px 40px;
        justify-self: center;
        background-color: #fdf0e6;
        border: 2px solid #321900;
    }

    .startInfo-wrapper .input-box {
        width: 100%;
        height: 50px;
        background: transparent;
        margin: 15px 0;
    }

    .input-box input {
        width: 100%;
        height: 100%;
        background-color: rgba(244, 177, 177, 0.55);
        border: none;
        outline: none;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 40px;
        font-size: 16px;
        color: #321900;
        padding: 10px 45px 10px 20px;
    }

    .input-box input::placeholder {
        color: #321900;
    }

    .startInfo-wrapper .select-box {
        width: 100%;
        height: 50px;
        background: transparent;
        margin: 15px 0;
    }

    .select-box select {
        width: 100%;
        height: 100%;
        background-color: rgba(244, 177, 177, 0.55);
        border: none;
        outline: none;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 40px;
        font-size: 16px;
        color: #321900;
        padding: 10px 45px 10px 20px;
    }

    .placeholder-text {
        color: rgba(50, 25, 0, 0.2);
    }

    .start-button {
        width: 100%;
        height: 45px;
        background: #f4b1b1;
        border: none;
        outline: none;
        border-radius: 40px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        font-size: 16px;
        color: #321900;
        font-weight: 600;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
</style>
