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

    //================== Components =====================

    import Footer from "./components/Footer.svelte";

    //================== Routes =====================

    import { Router, Link, Route } from "svelte-routing";
    import StartInfo from "./pages/StartInfo.svelte";


</script>

<div class="layout-container">
    <Router>
        <nav>
            {#if $user}
                <Link to="/">
                    <button on:click={handleLogout} class="logout-btn">
                        Logout
                    </button>
                </Link>
                <Link to="/dashboard"><button>Dashboard</button></Link>
                <Link to="/about"><button>About</button></Link>
                <Link to="/contact"><button>Contact</button></Link>
                <Link to="/startInfo"><button>Start Info</button></Link>
            {/if}
        </nav>

        <div class="links">
            <Route path="/"><Login /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/dashboard"><Dashboard /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/register"><Register/></Route>
            <Route path="/startInfo"><StartInfo/></Route>
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

        padding: 20px;

        background: transparent;

        z-index: 1000;
    }

 /*    a {
        text-decoration: none;
    }

    h4 {
        color: #F9C5C4;
        font-size: 18px;
        transition: 0.2s;
    }

    h4:hover {
        color: #f0f2f6;
    }
 */
    .layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.links {
    flex: 1;
}

/* footer {
    margin-top: auto;
} */
</style>
