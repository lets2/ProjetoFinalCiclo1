import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/

export function EditGod() {
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
<main class="flex-center-center">
	<!-- @author: Gabriela-->
	<div class="flex-row-center" id="container-edit-god">
		<div class="flex-col-center" id="box-img-god">
			<div>
				<img src="../assets/images/games-god.jpg" alt="">
			</div>
			<button class="btns-edit-god" id="change-img-btn">Mudar imagem</button>
		</div>
		<form action="" class="flex-col-center">
			<div class="flex-col-center" id="box-inputs-edit-god">
				<input class="input-edit-god" type="text" placeholder="Nome">
				<input class="input-edit-god" type="text" placeholder="Status">
				<input class="input-edit-god" id="input-resume-edit-god"type="text" placeholder="Resumo">
			</div>
			<div class="flex-row-between" id="box-buttons">
				<button class="cancel-button btns-edit-god" id="cancel-edit-god">Cancelar</button>
				<button class="btns-edit-god" id="update-god-button">Atualizar</button>
			</div>
		</form>
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
