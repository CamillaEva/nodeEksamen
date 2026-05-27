<script>
import { caloriesInfo, userInfo } from "../stores/AuthStore.js";
   

</script>


<h2>Kcals</h2>

<div class="container">
<p>You have used </p>
<p class="value">{$caloriesInfo.usedCalories} kcal</p>
<p>out of your daily calorie goal: </p>
<p class="value">{$userInfo.calorie_goal} kcal</p>
 
<p> you have reached </p>
<p class="value"> {$caloriesInfo.percentage} % </p>
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
