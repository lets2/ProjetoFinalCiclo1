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
		<div class="container-page-gods hidden flex-row-between">
			<div class="left-zone">
				<img class="cards-gods card1"  alt="Cartão 1">
			</div>
			<div class="middle-zone">
				<img class="cards-gods card2"  alt="Cartão 2">
				<img class="cards-gods card3"  alt="Cartão 3">
			</div>
			<div class="right-zone">
				<h2 class="phrase"><span>Deuses da Natureza</span></h2>
				<img class="cards-gods card4" alt="Cartão 4">
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
