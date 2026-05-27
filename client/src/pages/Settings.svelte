<script>
    import { userInfo } from "../stores/AuthStore.js";
</script>

<div class="weight-container">
    <p>you started the : {$userInfo?.start_date}</p>
</div>
<div>
    <p>your activity level is set to: {$userInfo?.activity_level}</p>
</div>
