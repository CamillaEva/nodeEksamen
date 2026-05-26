<script>
import { userInfo } from "../stores/AuthStore.js";



    //her kan vi regne ud hvor mange calorier der er blevet brugt ud af målet? 
    const usedCalories = 800;
    const percentage = ((usedCalories/$userInfo?.calorie_goal)*100).toFixed(2);

</script>


<h2>Kcals</h2>

<div class="container">
<p>You have used </p>
<p class="value">{usedCalories} kcal</p>
<p>out of your daily calorie goal: </p>
<p class="value">{$userInfo.calorie_goal} kcal</p>
 
<p> you have reached </p>
<p class="value"> {percentage} % </p>
<p>of your daily goal</p>
</div>


<style>

    .value {
        font-weight: bold;
        font-size: 20px;
    }

    .container {
        margin-top: 30px;
    }


</style>
