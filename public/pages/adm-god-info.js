import CriaEventStateChange from "./event-url.js";

/*@author:letonio - Tentando criar o primeiro SPA*/

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
		<div class="flex-col-center" id="box-img-see-god">
			<div id="img-god">
				<img src="../assets/uploads/games-god.jpg" alt="">
			</div>
			<div id="box-btns" class="flex-row-between">
				<button id="edit-god-button" class="buttons"><img src="../assets/icons/edit.svg" alt=""></button>
				<button id="delete-god-button" class="buttons"><img src="../assets/icons/mdi_trash.svg" alt=""></button>
				<button id="back-god-button" class="buttons"><img src="../assets/icons/back-arrow-icon-white.svg" alt=""></button>
			</div>
		</div>
		<form action="" class="flex-col-center">
			<div class="flex-col-center" id="box-inputs-see-god">
				<div id="box-tittle" class="flex-col-center">
					<h2>Fulano</h2>
					<h4>Deus dos jogos</h4>
				</div>
				<div>
					<h5 id="tittle-description">Resumo</h5>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eius minima eum non, soluta a beatae qui libero molestiae fugit. Voluptatem explicabo vel quaerat iusto? Praesentium aperiam officiis voluptates. Ut!</p>
				</div>
			</div>
		</form>
	</div>
</main>
<footer></footer>
	`;

    return div;
}

/*@author:Gabriela - coauthor: Letônio*/

export function redirectToGodInfoPage(godId) {
    const eventStateChange = CriaEventStateChange("/godInfo/g1", {
        godId: godId,
    });
    window.dispatchEvent(eventStateChange);
}

//AS FUNCOES ABAIXO ADICIONAM EVENTOS E CONTEUDO A PAGINA DE GOD INFO,
//BASEADOS NO OBJETO QUE RECEBERAM

//COMACE AQUI A GOD INFO
import { addUniqueEventListener } from "../utils/event-listener.js";
import { redirectToEditGodPage } from "./edit-god.js";
import { redirectToTableEditGods } from "./table_gods.js";
import { displayWarning, addEventsToHeader } from "../index.js";

export function addElementsToGodInfoPage(godObj) {
    //esse codigo eh o que bota o evento no botao de edicao
    const updateGodButton = document.querySelector("#edit-god-button");

    addUniqueEventListener(updateGodButton, "click", () => {
        redirectToEditGodPage(godObj.id);
    });

    //event on back button
    const backGodButton = document.querySelector("#back-god-button");

    addUniqueEventListener(backGodButton, "click", () => {
        redirectToTableEditGods();
    });

    // delete a god
    const deleteGodButton = document.querySelector("#delete-god-button");

    addUniqueEventListener(deleteGodButton, "click", () => {
        deleteGodFromDatabase(godObj.id);
        redirectToTableEditGods();
    });
}

async function deleteGodFromDatabase(godId) {
    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}/`,
            {
                method: "DELETE",
            }
        );
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("Requisição de DELETE GOD deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo

        const container_data = document.querySelector("#container-see-god");
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

//Adicionar outros eventos

export function addEventsToAdmGodInfoPage() {
    addEventsToHeader();
}
