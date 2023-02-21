import CriaEventStateChange from "./event-url.js";

/*@autor:letonio - Tentando criar o primeiro SPA*/

export function PrincipalTeste() {
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
	<div id="background-space">
		<main class="main-landing-page flex-center-center">
			<div class="container-total flex-center-center">
				<h2 id="main-tittle">GODPEDIA</h2>
				<p id="subtittle">novos tempos, novos deuses...</p>
				<button class="button-see-more" id="button">ver mais</button>
			</div>
		</main>
	</div>
	`;

    return div;
}

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}
