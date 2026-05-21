<script>

export let weight;
export let height;

function calculateBMI() {
    return (weight/Math.pow(height / 100, 2)).toFixed(1);
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

<div>
{#if weight && height}
    {calculateBMI()}
    <p>you are in the bmi category: {getBMICategory()}</p>
{/if}
</div>