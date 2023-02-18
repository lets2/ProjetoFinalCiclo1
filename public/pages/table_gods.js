import CriaEventStateChange from "./event-url.js";

/*@author:filipe - coauthor: Letônio*/

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
					
				</tbody>
			</table>
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
