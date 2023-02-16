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

export function TableGods() {
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
		<div class="container-filters flex-row-around">
		   <select name="filter-category" id="filter-category">
				<option value="1">Escolha uma categoria</option>
				<option value="2">Deuses da Tecnologia</option>
				<option value="3">Deuses da Alimentação</option>
				<option value="4">Deuses do Caos</option>
				<option value="5">Health</option>
		   </select>
		   <button id="create-new-god">Criar um novo Deus</button>
		</div>
		<div class="container-table">
			<table id="table-gods">
				<thead>
					<tr>
						<th>NAME</th>
						<th>STATUS</th>
						<th>CATEGORY</th>
					</tr>
				</thead>
				<tbody id="thead-gods">
					<tr id="line00">
					<td>LUAN GAMEPLAY</td>
					<td>DEUS DOS JOGOS</td>
					<td>TECNOLOGIA</td>
					</tr>
					<tr id="line01">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
					</tr>
					<tr id="line02">
						<td>CARAMELO</td>
						<td>TRANSFORMATION</td>
						<td>VIDA</td>
					</tr>
					<tr id="line03">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
					</tr>
					<tr id="line04">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
					</tr>
					<tr id="line05">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
					</tr>
					<tr id="line06">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
					</tr>
					<tr id="line07">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
					</tr>
					<tr id="line08">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
					</tr>
					<tr id="line10">
						<td>LOREM LOREM</td>
						<td>DEUS IPSUM</td>
						<td>TECNOLOGIA</td>
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
