<script>
    

</script>


 <div class="calorie-container">
        <p>Add calories:</p>
    </div>

    <div class="input-button">
        <input
            type="number"
            placeholder="input new weight"
        />

        <div>
            <button onclick={handleAddCalories}>
                <img
                    src="/images/add.png"
                    height="20px"
                    alt="add-calories-button"
                />
            </button>
        </div>
    </div>

<style>
   .calorie-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 40px;
        justify-content: center;
    }

  /*   .value {
        font-weight: bolder;
        font-size: 40px;
    } */

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
