import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/

export function EditGod() {
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
		<!-- @author: Gabriela-->
		<div class="flex-row-center" id="container-edit-god">
			<div class="flex-col-center" id="box-img-god">
				<div id="edit-page-god-img">
					<img id="preview-img-god" src="../assets/images/games-god.jpg" alt="">
				</div>
				<input id="insert-file-btn" type="file" name="file" accept="image/png, image/jpeg, image/jpg">
				<label for="insert-file-btn" class="custom-file-upload">Escolha um arquivo</label>
				<p id="message-input-file"></p>
			</div>
			<div action="" class="flex-col-center" id="form-add-god">
				<div class="flex-col-center" id="box-inputs-edit-god">
					
					<select name="filter-category" id="select-filter-category"  class="input-add-god">
                        <option value="1">Escolha uma categoria</option>
                        <option value="2">Deuses da Tecnologia</option>
                        <option value="3">Deuses da Alimentação</option>
                        <option value="4">Deuses do Caos</option>
                        <option value="5">Health</option>
                    </select>


					<input id="edit-page-god-input-name" class="input-edit-god" type="text" placeholder="Nome">
					<input id="edit-page-god-input-status" class="input-edit-god" type="text" placeholder="Status">
					<textarea id="edit-page-god-input-resume" class="input-edit-god" type="text"  name="edit-page-god-input-resume" cols="38" rows="10" placeholder="Resumo"></textarea>
				</div>
				<div class="flex-row-between" id="box-buttons">
					<button class="cancel-button btns-edit-god" id="cancel-edit-god">Cancelar</button>
					<button class="btns-edit-god" id="update-god-button">Atualizar</button>
					
				</div>
			</div>
		</div>
	</main>
	<footer></footer>
	`;
    return div;
}

export function redirectToEditGodPage(godId) {
    const eventStateChange = CriaEventStateChange("/editGod/g1", {
        godId: godId,
    });
    window.dispatchEvent(eventStateChange);
}

//Adicionando funcoes que colocam informacoes no edit god page

//EDIT GOD PAGE, FUNCOES COMECAM AQUI

export function inserirElementosNaEditGodPage(godObj) {
    const containerImgGod = document.querySelector("#edit-page-god-img");
    containerImgGod.innerHTML = `
    <img id= "preview-img-god" src="../assets/uploads/${godObj.src_img}" alt="">
    `;

    const inputEditGodName = document.querySelector(
        "#edit-page-god-input-name"
    );
    inputEditGodName.value = godObj.name;

    const inputEditGodStatus = document.querySelector(
        "#edit-page-god-input-status"
    );
    inputEditGodStatus.value = godObj.status;

    const inputEditGodResume = document.querySelector(
        "#edit-page-god-input-resume"
    );
    inputEditGodResume.value = godObj.resume;

    //add um dataset com o id do deus para usos futuros;
    const containerEditGodInformation = document.querySelector(
        "#container-edit-god"
    );
    containerEditGodInformation.dataset.godId = godObj.id;
}

//COMEÇA AQUI
import { categoriesList, addEventsToHeader, displayWarning } from "../index.js";

export function addSelectWithCategoriesInGodsPage(categoryIdThisGod = false) {
    const selectElement = document.querySelector("#select-filter-category");
    selectElement.innerHTML = ""; //clear any previous content

    addOptionToSelectInGodsPage(selectElement, {
        value: "choose",
        text: "Escolha uma categoria",
        currentId: categoryIdThisGod,
    });

    categoriesList.forEach((category) => {
        addOptionToSelectInGodsPage(selectElement, {
            value: category.id,
            text: category.name,
            currentId: categoryIdThisGod,
        });
    });
}

function addOptionToSelectInGodsPage(_select, _paramOption) {
    const option = document.createElement("option");
    option.value = _paramOption.value; //add category id from db
    option.innerHTML = _paramOption.text;
    if (_paramOption.value === "choose") {
        option.disabled = true;
        //option.selected = true;
    }
    if (_paramOption.value === _paramOption.currentId) {
        option.selected = true; //Para cada option, vai olhar option.value, se for
        //igual ao deus que vais er editado, entãocoloca como selected
    }
    _select.appendChild(option);
}

//ADICIONANDO EVENTOS:

//COMECA AQUI A FUNCAO DE ADD EVENTO NA EDIT GOD PAGE

/*@author:Gabriela - coauthor: Letônio*/
/* Add eventos na página que mostra as informacoes para editar deuses*/
import { redirectToTableEditGods } from "./table_gods.js";
import { addUniqueEventListener } from "../utils/event-listener.js";

export function addEventsToEditGodPages() {
    addEventsToHeader();

    const cancelGodBtn = document.querySelector("#cancel-edit-god");
    addUniqueEventListener(cancelGodBtn, "click", () => {
        redirectToTableEditGods();
    });
    const updateGodBtn = document.querySelector("#update-god-button");
    addUniqueEventListener(updateGodBtn, "click", async () => {
        //atualizar informações de um deus;
        const godId = document.querySelector("#container-edit-god").dataset
            .godId;
        const editSuccess = await updateGodInformationInDatabase(godId);
        console.log("FLAG DE SUCESSO EDIT:", editSuccess);
        if (editSuccess) {
            redirectToTableEditGods();
        }
    });
}

//atualiza database
async function updateGodInformationInDatabase(godId) {
    const formData = getGodInputInformations(godId);

    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}`,
            {
                method: "PUT",
                body: formData,
            }
        );

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();

        displayWarning(resJson.message); //deu tudo  certo
        //Se deu tudo certo, o modal acima mostra uma mensagem de sucesso e retorna true
        return true;
        //
    } catch (error) {
        console.log(error);
        return false; //Não obteve sucesso ao tentar editar, logo não podera ir para tabela
    }
}

///
function getGodInputInformations(godId) {
    let obj = {};

    const inputNameUpdate = document.querySelector(
        "#edit-page-god-input-name"
    ).value;

    const inputStatusUpdate = document.querySelector(
        "#edit-page-god-input-status"
    ).value;

    const inputResumeUpdate = document.querySelector(
        "#edit-page-god-input-resume"
    ).value;

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Add image to FormData
    formData.append("file", fileInput.files[0]);

    const categoryId = document.querySelector("#select-filter-category").value;

    // Add strings to FormData
    formData.append("name", inputNameUpdate);
    formData.append("status", inputStatusUpdate);
    formData.append("resume", inputResumeUpdate);
    formData.append("categoryId", categoryId);

    return formData;
}
