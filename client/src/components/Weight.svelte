<script>
    import { userInfo } from "../stores/AuthStore.js";
    import { fetchPost } from "../util/fetchUtil.js";

    let newWeight = 0;

    async function handleAddNewWeight() {
        if (newWeight > 0) {
            await fetchPost("/api/weight", {
                newWeight: Number(newWeight),
            });

            userInfo.update((info) => ({
                ...info,
                currentWeight: Number(newWeight),
            }));

            newWeight = 0;
        }
    }

    function getCurrentWeight() {
        if ($userInfo.currentWeight) {
            return $userInfo.currentWeight;
        }

        return $userInfo.start_weight;
    }
    
</script>

<div>
    <h2>Weight</h2>

    <div class="weight-container">
        <p>starting weight:</p>
        <p class="value">{$userInfo?.start_weight} kg</p>
    </div>

    
    <div class="weight-container">
        <p>current weight:</p>
        <p class="value">
        {getCurrentWeight()} kg
        </p>
    </div>

    <div class="input-button">
        <input
            type="number"
            bind:value={newWeight}
            placeholder="input new weight"
        />

        <div>
            <button onclick={handleAddNewWeight}>
                <img
                    src="/images/add.png"
                    height="20px"
                    alt="add-new-weight-button"
                />
            </button>
        </div>
    </div>

    <div class="weight-container">
        <p>difference:</p>
        <p class="value"> {getCurrentWeight() - $userInfo.start_weight} kg</p>
    </div>
</div>

<style>
    .weight-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 40px;
        justify-content: center;
    }

    .value {
        font-weight: bolder;
        font-size: 40px;
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
</style>
