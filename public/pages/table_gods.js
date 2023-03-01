import CriaEventStateChange from "./event-url.js";

/*@author:filipe - coauthor: Letônio*/

export function TableGods() {
    const div = document.createElement("div");

    div.innerHTML = `
	<header class="flex-row-between">
        <div class="header-items flex-row-center logo-search">
            <img id="logo" src="../assets/icons/logo-godpedia.png" alt="">
            <div class="container-search flex-row-center">
            <input class="search-input" type="text"> 
            <div class="search">
                    <img class="search-icon" src="../assets/icons/search.svg" alt="">
            </div>
            </div>
        </div>
        <div class="header-items flex-row-end menu-icon-div">
            <img id="profile-icon" src="../assets/icons/profile.svg" alt="">
            <img id="menu-icon" src="../assets/icons/menu.svg" alt="">
        </div>
    </header>
    
<main class="flex-center-center">
	<div class="container-content-gods flex-col-center">
		<div class="container-filters flex-row-around">
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

/*@author:Filipe - coauthor: Letônio*/
export function redirectToTableEditGods() {
    const eventStateChange = CriaEventStateChange("/tableGods");
    window.dispatchEvent(eventStateChange);
}

//ADICIONANDO FUNCAO QUE PEGA OS DADOS QUE PRECISAM SER INSERIDOS
//NA TABELA E NO SELECT E ADICIONA!!

//COMECA AQUI AS COISAS DE TABELA DE DEUSES
// @author: Gabriela
export function addLinesGodTable(data) {
    const thead = document.querySelector("#thead-gods");
    thead.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        thead.innerHTML += `<tr id="line0${i}">
                    <td>${data[i].name}</td>
                    <td>${data[i].status}</td>
                    <td>${data[i].name_category}</td>
                </tr>`;
        const lineTable = document.querySelector(`#line0${i}`); //get line by #id
        lineTable.dataset.godId = data[i].id;
    }
}

export function addSelectWithCategories(dataCategories) {
    const selectElement = document.querySelector("#filter-category");
    selectElement.innerHTML = ""; //clear any previous content

    addOptionToSelect(selectElement, {
        value: "choose",
        text: "Escolha uma categoria",
    });

    dataCategories.forEach((category) => {
        addOptionToSelect(selectElement, {
            value: category.id,
            text: category.name,
        });
    });
    addOptionToSelect(selectElement, {
        value: "all",
        text: "Mostrar todas as categorias",
    });
}

function addOptionToSelect(_select, _paramOption) {
    const option = document.createElement("option");
    option.value = _paramOption.value; //add category id from db
    option.innerHTML = _paramOption.text;
    _select.appendChild(option);
}

// ADICIONANDO OS EVENTOS RELACIONADOS A TABELA DE DEUSES

/*@author:filipe - coauthor: Letônio*/
/*Adicionando eventos na página que tem uma tabela de deuses*/
import { addEventsToHeader } from "../index.js";
import { addUniqueEventListener } from "../utils/event-listener.js";
import { redirectToAddGodPage } from "./add-god.js";
import { redirectToGodInfoPage } from "./adm-god-info.js";

export function addEventsToGodTablePage() {
    addEventsToHeader();
    //addLinesGodTable();
    //*insere evento no botão de adicionar um novo deus
    const buttonAddGod = document.querySelector("#create-new-god");
    addUniqueEventListener(buttonAddGod, "click", () => {
        redirectToAddGodPage();
    });

    /// Insere evento na tabela, caso o usuario clique numa linha da tabela
    ///	de deuses aparece uma página para detalhamento e edicao
    ///referente aquele elemento

    const tbodyElement = document.querySelector("tbody");
    addUniqueEventListener(tbodyElement, "click", (event) => {
        const rowElement = event.target.parentNode;
        if (event.target.parentNode.tagName === "TR") {
            const godId = rowElement.dataset.godId;

            redirectToGodInfoPage(godId);
        }
    });
}
