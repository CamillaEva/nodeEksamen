
export function calculateAge(birthday) {

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


export function getDailyCalorieGoal(weight, height, gender, activity_level, birthday, goal) {
    
    // start by calculation BMR (basal metabolic rate)
    const age = calculateAge(birthday);

    let bmr;

    if (gender === 'female') bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age);
    else if (gender === 'male') bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    else bmr = 267.98 + (11.3 * weight) + (3.949 * height) - (5 * age);

    // then getting the TDEE (total daily energy expenditure)

    let tdee;

    if (activity_level === 'low') tdee = bmr * 1.2;
    else if (activity_level === 'moderate') tdee = bmr * 1.375;
    else if (activity_level === 'high') tdee = bmr * 1.55;
    else tdee = bmr * 1.725;
    

    // and here the daily calorie goal:

    if (goal === 'lose_weight') return Math.round(tdee - 500);
    if (goal == 'gain_weight') return Math.round(tdee + 500);
    return Math.round(tdee);
}