<script>
    import toastr from 'toastr';
    import { fetchPost } from '../util/fetchUtil.js';

    let username = "";

    let password = "";

    let email = "";

    async function handleSignUp(event) {
        event.preventDefault();
        const response = await fetchPost("/api/register", { username, email, password });

        if (response.ok) {
            toastr.info("User created successfully!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } else {
            const result = await response?.json();
            toastr.warning("could not create user.");
        }
    }
</script>

<div class="background">
    <div class="signUp-wrapper">
        <form onsubmit={handleSignUp}>
            <h1>Sign Up</h1>
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
                    bind:value={email}
                    type="email"
                    placeholder="email"
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

            <button type="submit" class="signUp-button">Sign Up</button>

            <div class="login-link">
                <p>
                    already have an account?
                    <a href="/">Login</a>
                </p>
            </div>
        </form>
    </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }

    .background {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: url("/images/background.png") no-repeat;
        background-size: cover;
        background-position: center;
    }

    .signUp-wrapper {
        width: 400px;
        height: 440px;
        background-color: rgba(236, 144, 144, 0.151);
        border: 2px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        color: #fff;
        border-radius: 10px;
        padding: 30px 40px;
    }

    .signUp-wrapper h1 {
        font-size: 36px;
        text-align: center;
    }

    .signUp-wrapper .input-box {
        width: 100%;
        height: 50px;
        background: transparent;
        margin: 30px 0;
    }

    .input-box input {
        width: 100%;
        height: 100%;
        background-color: rgba(244, 177, 177, 0.55);
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

    .signUp-button {
        width: 100%;
        height: 45px;
        background: #f4b1b1;
        border: none;
        outline: none;
        border-radius: 40px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        font-size: 16px;
        color: #321900;
        font-weight: 600;
    }

    h1 {
        color: #321900;
    }

    .signUp-wrapper .login-link {
        font-size: 14.5px;
        text-align: center;
        margin: 20px 0 15px;
        color: #321900;
    }

    .login-link p a {
        color: #321900;
        text-decoration: none;
        font-weight: 600;
    }

    .login-link p a:hover {
        text-decoration: underline;
    }
</style>
