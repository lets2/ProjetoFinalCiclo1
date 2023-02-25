import CriaEventStateChange from "./event-url.js";

/*@autor:Gabriela */

export function AllGodsPage() {
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
		<div class="container-all-gods-page flex-center-center">
            <div id="box-all-gods">
                <div id="box-all-gods-overflow">
                                    
                </div>
            </div>
		</div>
	</main>
	<footer></footer>
	`;

    return div;
}

export function redirectToAllCategories() {
    console.log("caiu na função dessa página q dispara o evento")
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}