import CriaEventStateChange from "./event-url.js";

const objPages = [
    { label: "Brigadeiros", handle: redirectToBrigadeiros },
    { label: "Cupcakes", handle: redirectToCupcakes },
    { label: "Doces", handle: redirectToDoces },
];
/*
export default function Principal() {
	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Alpha Doceria";
	div.appendChild(h1);

	objPages.forEach((element) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = element.label;
		btn.onclick = element.handle; //btn.onclick = redirectToAnotherPage;
		div.appendChild(btn);
	});

	return div;
}
*/

/*@autor:letonio - Tentando criar o primeiro SPA*/

export function GodInfo() {
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
	<div class="flex-row-center" id="container-see-god">
		<div class="flex-col-center" id="box-img-god">
			<div id="img-god">
				<img src="../assets/images/games-god.jpg" alt="">
			</div>
			<div id="box-btns" class="flex-row-between">
				<button id="edit-god-button" class="buttons"><img src="../assets/icons/edit.svg" alt=""></button>
				<button id="delete-god-button" class="buttons"><img src="../assets/icons/mdi_trash.svg" alt=""></button>
			</div>
		</div>
		<form action="" class="flex-col-center">
			<div class="flex-col-center" id="box-inputs">
				<div id="box-tittle" class="flex-col-center">
					<h2>Fulano</h2>
					<h4>Deus dos jogos</h4>
				</div>
				<div>
					<h5>Resumo</h5>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eius minima eum non, soluta a beatae qui libero molestiae fugit. Voluptatem explicabo vel quaerat iusto? Praesentium aperiam officiis voluptates. Ut!</p>
				</div>
			</div>
		</form>
	</div>
</main>
<footer></footer>
	`;

    /*
    document.addEventListener("DOMContentLoaded", () => {
        const logo = document.querySelector("#logo");
        console.log("ENTROU AQUI externo category!!!");
        console.log("existe:", logo);
        logo.addEventListener("click", () => {
            console.log("entrou no interno da categoria!");
            redirectToMyPrincipal();
        });
    });
	*/

    /*

	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Alpha Doceria";
	div.appendChild(h1);

	objPages.forEach((element) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = element.label;
		btn.onclick = element.handle; //btn.onclick = redirectToAnotherPage;
		div.appendChild(btn);
	});
*/
    return div;
}

/* function redirectToAnotherPage(event) {
	const path = "/" + event.target.textContent.toLowerCase();
	const eventStateChange = CriaEventStateChange(path);
	window.dispatchEvent(eventStateChange);
} */

/*--------------------------------------------*/
function redirectToBrigadeiros() {
    const eventStateChange = CriaEventStateChange("/brigadeiros");
    window.dispatchEvent(eventStateChange);
}

function redirectToCupcakes() {
    const eventStateChange = CriaEventStateChange("/cupcakes");
    window.dispatchEvent(eventStateChange);
}

function redirectToDoces() {
    const eventStateChange = CriaEventStateChange("/doces");
    window.dispatchEvent(eventStateChange);
}

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}
