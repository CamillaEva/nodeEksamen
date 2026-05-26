<script>
    import toastr from "toastr";
    import { fetchPost } from "../util/fetchUtil.js";
    import { user } from "../stores/AuthStore.js";

    let username = $state('');

    let password = $state('');

    async function handleLogin(event) {
        event.preventDefault();
        const result = await fetchPost("/api/login", { username, password });

        if (result.ok) {
            user.set(username);
            toastr.info("login succeeded!");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        } else {
            toastr.warning("error logging in to site.");
        }
    }


</script>

<div class="login-background">
    <div class="login-wrapper">
        <form onsubmit={handleLogin}>
            <h1>Login</h1>
            <div class="input-box">
                <input
                    bind:value={username}
                    type="text"
                    placeholder="Username"
                    required
                />
            </div>
            <div class="input-box">
                <input
                    bind:value={password}
                    type="password"
                    placeholder="password"
                    required
                />
            </div>

            <button type="submit" class="Login-button">Login</button>

            <div class="register-link">
                <p>
                    Don't have an account?
                    <a href="/register">Register</a>
                </p>
            </div>


        
        </form>
    </div>
</div>

<style>


    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }

    .login-background {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: url("/images/background.png") no-repeat;
        background-size: cover;
        background-position: center;
    }

    .login-wrapper {
        width: 400px;
        height: 370px;
        background-color: rgba(236, 144, 144, 0.151);
        border: 2px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        color: #fff;
        border-radius: 10px;
        padding: 30px 40px;
    }

    .login-wrapper h1 {
        font-size: 36px;
        text-align: center;
    }

    .login-wrapper .input-box {
        width: 100%;
        height: 50px;
        background: transparent;
        margin: 30px 0;
    }

    .input-box input {
        width: 100%;
        height: 100%;
        background-color: rgba(244, 177, 177, 0.550);
        border: none;
        outline: none;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 40px;
        font-size: 16px;
        color: #321900;
        padding: 20px 45px 20px 20px;
    }

    .input-box input::placeholder {
        color: 50, 25, 0, 0.2;
    }

    .Login-button {
        width: 100%;
        height: 45px;
        background:#F4B1B1;
        border: none;
        outline: none;
        border-radius: 40px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        font-size: 16px;
        color: #321900;
        font-weight: 600;
    }

     .login-wrapper .register-link {
        font-size: 14.5px;
        text-align: center;
        margin: 20px 0 15px;
        color: #321900;
    }

    .register-link p a {
        color: #321900;
        text-decoration: none;
        font-weight: 600;
    }

    .register-link p a:hover {
        text-decoration: underline;
    }

    h1 {
        color: #321900;
    }


</style>
