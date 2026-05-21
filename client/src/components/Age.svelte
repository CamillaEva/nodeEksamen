<script>

export let birthday;

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

</script>

<p> {calculateAge(birthday)} </p>