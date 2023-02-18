import CriaEventStateChange from "./event-url.js";

/*@autor:letonio */

export function Login() {
    const div = document.createElement("div");

    div.innerHTML = `
	<header class="flex-row-between">
        <div class="header-items flex-row-between">
            <img id="logo" src="../assets/icons/logo-godpedia.png" alt="">
            <div class="container-search flex-row-center">
               <input class="search-input" type="text"> 
               <img class="search-icon" src="../assets/icons/search.svg" alt="">
            </div>
        </div>
        <div class="header-items flex-row-between">
            <img id="profile-icon" src="../assets/icons/profile.svg" alt="">
            <img id="menu-icon" src="../assets/icons/menu.svg" alt="">
        </div>
    </header>
    <main>
        <div class="container-carousel flex-center-center">

            <div class="login-background flex-col-center">
                <img id="user-icon" src="../assets/icons/user-icon.svg"  alt="">
                <div class="login-password flex-col-center">
                    <div class="email">
                        <div class="back-email flex-center-center">
                            <img id="Vector-user" src="../assets/icons/Vector-user.svg" alt="">
                        </div>
                            <input type="text" placeholder="Email" >
                    </div>
                    <div class="password">
                        <div class="back-password flex-center-center">
                            <img id="cadeado" src="../assets/icons/cadeado.svg" alt="">
                        </div>
                        <input type="text" placeholder="Password">
                    </div>
                </div>
    
                    <div class="login-logo flex-center-center">
                        <button id="login-logo-button" type="submit">LOGIN</button>
                    </div>      
            </div>
            
        </div>
        

    </main>
    <footer></footer>
	`;

    return div;
}

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}
