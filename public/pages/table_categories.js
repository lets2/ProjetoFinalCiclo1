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

export function TableCategories() {
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
	<div class="container-content flex-col-center">
		   
		<button id="create-new-category">Criar um nova categoria</button>

		<div class="container-table">
			<table id="table-categories">
				<thead>
					<tr>
						<th>CATEGORIA</th>
						<th>EDITAR</th>
						<th>APAGAR</th>
					</tr>
				</thead>
				<tbody id="thead-categories">
					<tr>
						<td>TECNOLOGIA</td>
						<td><img src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
						<td><img src="../assets/icons/trash-black.svg" alt="trash icon"></td>
					</tr>
					<tr>
						<td>LOREM LOREM</td>
						<td><img src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
						<td><img src="../assets/icons/trash-black.svg" alt="trash icon"></td>
					</tr>
					<tr>
						<td>TECNOLOGIA</td>
						<td><img src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
						<td><img src="../assets/icons/trash-black.svg" alt="trash icon"></td>
					</tr>
					<tr>
						<td>LOREM LOREM</td>
						<td><img src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
						<td><img src="../assets/icons/trash-black.svg" alt="trash icon"></td>
					</tr>
					<tr>
						<td>LOREM LOREM</td>
						<td><img src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
						<td><img src="../assets/icons/trash-black.svg" alt="trash icon"></td>
					</tr>
				   
					
				</tbody>
			</table>
		</div>
	  
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
