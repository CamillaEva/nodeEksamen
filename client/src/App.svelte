<script>
    import { handleLogout } from "./util/logoutUtil.js";

    //================== Stores =====================

    import { user } from "./stores/AuthStore.js";

    //================== pages =====================

    import Login from "./pages/Login.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import About from "./pages/About.svelte";
    import Contact from "./pages/Contact.svelte";
    import Register from "./pages/Register.svelte";
    import Settings from "./pages/Settings.svelte";

    //================== Components =====================

    import Footer from "./components/Footer.svelte";

    //================== Routes =====================

    import { Router, Link, Route } from "svelte-routing";
</script>

<div class="layout-container">
    <Router>
        <nav>
            {#if $user}
                <Link to="/">
                    <button on:click={handleLogout} class="header-button">
                        Logout
                    </button>
                </Link>
                <Link to="/dashboard"
                    ><button class="header-button">Dashboard</button></Link
                >
                <Link to="/about"
                    ><button class="header-button">About</button></Link
                >
                <Link to="/contact"
                    ><button class="header-button">Contact</button></Link
                >
                <Link to="/settings"
                    ><button class="header-button">Settings</button></Link
                >
            {/if}
        </nav>

        <div class="links">
            <Route path="/"><Login /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/dashboard"><Dashboard /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/settings"><Settings /></Route>
            <Route path="/register"><Register /></Route>
        </div>

        <Footer />
    </Router>
</div>

<style>
    nav {
        top: 0;
        left: 0;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 100px;

        padding: 20px 0px;

        background: transparent;

        z-index: 1000;
    }

    .layout-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .links {
        flex: 1;
    }
</style>
