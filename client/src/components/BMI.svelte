<script>
    export let weight;
    export let height;

    function calculateBMI() {
        return (weight / Math.pow(height / 100, 2)).toFixed(1);
    }

    function getBMICategory() {
        const bmi = calculateBMI();
        if (!bmi) return null;
        if (bmi < 18.5) return "underweight";
        if (bmi < 25) return "normalweight";
        if (bmi < 30) return "overweight";
        return "obese";
    }
</script>

<div class="container">
    {#if weight && height}
        <p>Your start BMI is:</p>
        <p class="value">{calculateBMI()}</p>
        <p>you are in the bmi category:</p>
        <p class="value">{getBMICategory()}</p>
    {/if}
</div>

<style>
    .value {
        font-weight: bold;
    }

    .container {
        margin-top: 30px;
    }
</style>
