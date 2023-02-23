import CriaEventStateChange from "./event-url.js";

/*@autor:letonio - Tentando criar o primeiro SPA*/

export function Category() {
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
		<div class="container-page-gods flex-row-between">
            <div id="box-cards-gods">
                <div id="box-cards-gods-overflow">
                                    
                </div>
            </div>
            <div  class="phrase">
                <h2><span>Deuses da Natureza</span></h2>
            </div>
		</div>
	</main>
	<footer></footer>
	`;

    return div;
}

export function redirectToAllCategories() {
    const eventStateChange = CriaEventStateChange("/categories");
    window.dispatchEvent(eventStateChange);
}