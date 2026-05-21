
<!-- // BMR for men:
mens_BMR = 88,362 + (13,397 * weight_in_kg) + (4,799 * height_in_cm) - (5,677 * age_in_years);

// BMR for women:
womens_BMR = 447,593 + (9,247 * weight_in_kg) + (3,098 * height_in_cm) - (4,33 * age_in_years);

// BMR for other genders:
other_genders_BMR = 267,98 + (11,3 * weight_in_kg) + (3,949 * height_in_cm) - (5 * age_in_years);


TDEE = BMR * activity_level;

// for weightloss:
daily_calorie_goal = TDEE - 500 kcal

// for maintanence:
daily_calorie_goal = TDEE

// for weightgain:
daily_calorie_goal = TDEE + 500 kcal -->

<script>
import Age from "./Age.svelte";

export let weight;
export let height;
export let gender;
export let activity_level;
export let birthday;
export let goal;


function calculateAge(birthday) {

    if (!birthday) return 0;
    
    const birthdayDate = new Date(birthday);
    const today = new Date();
    
    let age = today.getFullYear() - birthdayDate.getFullYear();

    const monthDifference = today.getMonth() - birthdayDate.getMonth();
    const dayDiff = today.getDate() - birthdayDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDiff < 0)) {
        age --;
    }
    return age
}


function calculateBMR() {

    const age = calculateAge(birthday);

    if (!gender) return null;
    if (gender == 'female') return (447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age));
    if (gender == 'male') return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
    return (267.98 + (11.3 * weight) + (3.949 * height) - (5 * age));
}

function calculateTDEE() {
    if (!activity_level) return null;
    if (activity_level == 'low') return (calculateBMR() * 1.2);
    if (activity_level == 'moderate') return (calculateBMR() * 1.375);
    if (activity_level == 'high') return (calculateBMR() * 1.55);
    if (activity_level == 'very_high') return (calculateBMR() * 1.725);
}

function getDailyCalorieGoal() {
    if (!goal) return null;
    if (goal == 'loose_weight') return (calculateTDEE() - 500);
    if (goal == 'maintain_weight') return calculateTDEE();
    if (goal == 'gain_weight') return (calculateTDEE + 500);
}

</script>

<div>
{getDailyCalorieGoal()}
</div>