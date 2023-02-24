//NOVOS IMPORTS E DIVISÃO DAS PÁGINAS

import { addExternalResourcesTo } from "./api/routerFetch.js";
import { addUniqueEventListener } from "./utils/event-listener.js";

//-------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------

import {
    redirectToCategoryChoosed,
    redirectToLoginAdmPage,
    redirectToGodDetailsPage,
    redirectToLogoutPage,
    redirectToMenuAdmPage,
    redirectToTableEditCategories,
    redirectToTableEditGods,
    redirectToAddGodPage,
    redirectToGodInfoPage,
    redirectToEditGodPage,
    redirectToMenu,
    redirectToAddCategory,
    redirectToEditCategory,
} from "./pages/main-page.js";
import { redirectToAllCategories } from "./pages/cards_god_from_categ.js";

import GeraObjComRotas from "./pages/router.js";

//Global variables for dataset replacement and fetishes
let categoriesList = [];
let currentIndexCategory; //
let godsOfACategory = [];

//------------------------------------------------------------------------
// RENDER INITIAL PAGE (LANDING PAGE)
//------------------------------------------------------------------------

const root = document.querySelector("#root");

const objRotas = GeraObjComRotas();
const page = objRotas.getPage("/");

root.innerHTML = "";
root.appendChild(page);

addExternalResourcesTo("/");
addEventsRelatedTo("/"); //call relateds events to page/url

//------------------------------------------------------------------------
// LISTENER TO HEAR WHEN ONSTATECHANGE CUSTOM EVENT IS DISPATCH
//-----------------------------------------------------------------------

addUniqueEventListener(window, "onstatechange", async (event) => {
    const url = event.detail.url;
    const criteria = event.detail.criteria; //o valor padrão de criteria={}, se diferente de null implia q

    const page = objRotas.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
    console.log("URL:", url, "Criteria:", criteria);

    const respostaIndex = await addExternalResourcesTo(url, criteria);

    chamaFuncaoEspecificaPelaUrl(url, respostaIndex);

    // addLinesCategoryTable(respostaIndex);
    addEventsRelatedTo(url); //call relateds events to page/url
});

function chamaFuncaoEspecificaPelaUrl(url, respostaIndex) {
    switch (url) {
        case "/categories":
            categoriesList = respostaIndex; //nesse caso respostaIndex = lista de categorias
            renderCurrentCategoryOnCategoriesPage(categoriesList);
            break;
        case "/categories/:id":
            godsOfACategory = respostaIndex; //nesse caso respostaIndex = lista de deuses de cat. especif.
            insertImages(godsOfACategory);
            if (godsOfACategory) {
                insertCategoryName(godsOfACategory[0].name_category);
            } else {
                insertCategoryName("Essa categoria não possui deuses ainda!");
            }

            break;
        case "/categories/d1":
            break;
        case "/tableCategories":
            categoriesList = respostaIndex; //respostaIndex tem a lista de categorias
            addLinesCategoryTable(categoriesList);
            break;
        case "/tableGods":
            categoriesList = respostaIndex.dataCategories;
            addSelectWithCategories(respostaIndex.dataCategories);
            addLinesGodTable(respostaIndex.dataGods);
            console.log(categoriesList, "categoreis")
            break;
        case "/godInfo/g1":
            testAddElements(respostaIndex);
            break;
        case "/editGod/g1":
            testInserirElementosNaEditGodPage(respostaIndex);
            addSelectWithCategoriesInGodsPage();
            break;
        case "/editCategory":
            insertChoosedCategoryTempleImg(); //function to show preview
            testInserirElementosNaEditCategoryPage(respostaIndex);
            break;
        case "/addCategory":
            insertChoosedCategoryTempleImg(); //function to show preview
            break;
        case "/addGod":
            insertChoosedGodImg();
            addSelectWithCategoriesInGodsPage();
    }
}

// author: Gabriela
function addLinesCategoryTable(data) {
    const thead = document.querySelector("#thead-categories");
    thead.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        thead.innerHTML += `<tr id="catline0${i}">
                    <td>${data[i].name}</td>
                    <td><img class="edit-btn" src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
                    <td><img class="delete-btn" src="../assets/icons/trash-black.svg" alt="trash icon"></td>
                </tr>`;
        const lineTable = document.querySelector(`#catline0${i}`); //get line by #id
        lineTable.dataset.id = data[i].id;
    }

    //Chama funcao para add eventos nos botoes de LAPIS/PENCIL;
    adicionaEventosNosLapis();
}

function adicionaEventosNosLapis() {
    /*EVENTOS RELACIONADOS a EDITAR CATEGORIA BOTAO!!!!*/
    const listaDeImagensDeLapis = document.querySelectorAll(".edit-btn");

    listaDeImagensDeLapis.forEach((imgLapis) => {
        addUniqueEventListener(imgLapis, "click", (event) => {
            const catId = event.target.parentNode.parentNode.dataset.id;
            redirectToEditCategory(catId);
        });
    });
    /*EVENTOS REALCIONADO A EXCLUIR CATEGORIA BOTAO!!!!!11*/
    const listaDeImagensDeLixeira = document.querySelectorAll(".delete-btn");

    listaDeImagensDeLixeira.forEach((imgLixeira) => {
        addUniqueEventListener(imgLixeira, "click", (event) => {
            const catId = event.target.parentNode.parentNode.dataset.id;

            deleteCategoryFromDatabase(catId);
            redirectToTableEditCategories();
        });
    });
}

async function deleteCategoryFromDatabase(id) {
    try {
        const response = await fetch(
            `http://localhost:8080/categoriestable/${id}/`,
            {
                method: "DELETE",
            }
        );

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("DELETE CATEGORY deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo

        const container_data = document.querySelector("#container-see-god");
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

// @author: Gabriela
function addLinesGodTable(data) {
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

function addSelectWithCategories(dataCategories) {
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

function renderCurrentCategoryOnCategoriesPage(categories) {
    let index;
    const quantify = categories.length;
    if (quantify % 2) {
        index = Math.floor(quantify / 2);
    } else Math.floor(quantify / 2) - 1;
    index = 2; /*@author:letonio - posteriormente, retirar essa linha!!*/
    currentIndexCategory = 2; //Variavel global
    renderImgCategory(
        currentIndexCategory,
        quantify,
        categories[currentIndexCategory].id,
        categories[currentIndexCategory].name,
        categories[currentIndexCategory].src
    );

    renderBallsBelowImg(currentIndexCategory, quantify);
}

function renderImgCategory(
    categoryIndex,
    categoryQuantify,
    categoryId,
    categoryName,
    categorySrc
) {
    const imagem = document.querySelector("#temple");
    const categoryTitle = document.querySelector(".temple-legend");
    imagem.setAttribute("src", `./assets/uploads/${categorySrc}`);
    categoryTitle.innerText = categoryName;
}

function renderBallsBelowImg(index, quantify) {
    //create balls-based on index-position-image
    const containerCircles = document.querySelector(".container-circles");
    containerCircles.innerHTML = ""; //Limpa o conteúdo
    for (let i = 0; i < quantify; i++) {
        const circle = document.createElement("button");
        circle.classList.add("circle");
        if (i === index) {
            circle.classList.add("circle-orange");
        }
        containerCircles.appendChild(circle);
    }
}

function insertImages(arrayGods) {
    const cardsGods = document.querySelector("#box-cards-gods-overflow");
    let div = "";
    cardsGods.innerHTML = "";
    if (arrayGods) {
        for (let i = 0; i < arrayGods.length; i++) {
            div = `<div class="flex-center-center">
                <img class="cards-gods" id = "god-${arrayGods[i].id}" data-god-id=${arrayGods[i].id} src = "../assets/uploads/${arrayGods[i].src_img}"  alt="Cartão 2">
            </div>
            `;
            cardsGods.innerHTML += div;
        }
    }
}

function insertCategoryName(nameCategory) {
    document.querySelector(".phrase").innerHTML = nameCategory;
}

function testInserirElementosNaEditGodPage(godObj) {
    const containerImgGod = document.querySelector("#edit-page-god-img");
    containerImgGod.innerHTML = `
    <img src="../assets/uploads/${godObj.src_img}" alt="">
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

function testAddElements(godObj) {
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

function testInserirElementosNaEditCategoryPage(catInformation) {
    const inputCatEditName = document.querySelector("#input-cat-edit-name");
    // const inputCatEditColor = document.querySelector("#input-cat-edit-color");
    inputCatEditName.value = catInformation.name;
    // inputCatEditColor.value = catInformation.hex_color;
    //
    const containerEditCategory = document.querySelector(
        "#container-edit-category"
    );
    containerEditCategory.dataset.id = catInformation.id; //add-set
}

//------------------------------------------------------------------------
// ADDS EVENTS TO THE PAGE THAT WAS RENDERED ACCORDING URL
//-----------------------------------------------------------------------

function addEventsRelatedTo(url) {
    switch (url) {
        /*case "/":
            addEventsToPrincipal();
            break;*/
        case "/":
            addEventsToMainPageTest();
            break;
        case "/categories":
            //addEventsToCategoriesPage() === addEventsToPrincipal();
            addEventsToCategoriesPage();
            break;
        case "/categories/:id":
            addEventsToCategorySelected();
            break;
        case "/login":
            addEventsToAdmLoginPage();
            break;
        case "/categories/d1":
            addEventsToGodDetailsPage();
            break;
        case "/adm/a1":
            addEventsToAdmMenuPage();
            break;
        case "/tableCategories":
            addEventsToCategoryTablePage();
            break;
        case "/tableGods":
            addEventsToGodTablePage();
            break;
        case "/addGod":
            addEventsToAddNewGodPage();
            // insertChoosedGodImg();
            // addSelectWithCategoriesInGodsPage();
            break;
        case "/godInfo/g1":
            addEventsToAdmGodInfoPage();
            break;
        case "/editGod/g1":
            addEventsToEditGodPages();
            break;
        case "/menu":
            addEventsToMenuPage();
            break;
        case "/addCategory":
            addEventsToAddCategoryPage();
            break;
        case "/editCategory":
            addEventsToEditCategoryPage();
            break;
    }
}

/*Events related to the categories page < [] >  */
export function addEventsToCategoriesPage() {
    /*Add event to the current temple displayed on Page*/
    const containerTemples = document.querySelector(".container-temples");
    addUniqueEventListener(containerTemples, "click", () => {
        redirectToCategoryChoosed(categoriesList[currentIndexCategory].id);
    });

    /*change arrow color on hover*/
    let arrowLeft = document.querySelector(".category-arrow-left");

    addUniqueEventListener(arrowLeft, "mouseenter", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-left-orange.svg"
        );
    });
    addUniqueEventListener(arrowLeft, "mouseout", (event) => {
        event.target.setAttribute("src", "./assets/icons/arrow-left-white.svg");
    });

    addUniqueEventListener(arrowLeft, "click", () => {
        const templeImage = document.querySelector("#temple");

        if (currentIndexCategory > 0) {
            currentIndexCategory = currentIndexCategory - 1;
            updateTempleContent(currentIndexCategory);
        }
    });

    const arrowRight = document.querySelector(".category-arrow-right");

    addUniqueEventListener(arrowRight, "mouseover", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-orange.svg"
        );
    });
    addUniqueEventListener(arrowRight, "mouseout", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-white.svg"
        );
    });

    addUniqueEventListener(arrowRight, "click", () => {
        const templeImage = document.querySelector("#temple");
        if (currentIndexCategory < categoriesList.length - 1) {
            //
            currentIndexCategory = currentIndexCategory + 1;
            //
            updateTempleContent(currentIndexCategory);
        }
    });

    addEventsToHeader();
}

/*@author:letonio - criando uma página principal de teste*/
function addEventsToMainPageTest() {
    addEventsToHeader(); //estou colocando com header para testar
    const seeMoreButton = document.querySelector(".button-see-more");
    addUniqueEventListener(seeMoreButton, "click", () => {
        redirectToAllCategories();
    });
}

function updateTempleContent(newIndex) {
    const quantify = categoriesList.length;
    renderImgCategory(
        newIndex,
        quantify,
        categoriesList[newIndex].id,
        categoriesList[newIndex].name,
        categoriesList[newIndex].src
    );

    renderBallsBelowImg(newIndex, quantify);
}

/*eevents related to the page of the chosen category*/
function addEventsToCategorySelected() {
    console.log(godsOfACategory, "GODSOF");
    addEventsToHeader();
    eventosAdicionadosEmCadaCartao(godsOfACategory);
}

/*events related to the adm login page*/
function addEventsToAdmLoginPage() {
    addEventsToHeader();
    adicionaEventoNoBotaoDeLogin();
}

function adicionaEventoNoBotaoDeLogin() {
    const buttonLogin = document.querySelector("#login-logo-button");
    addUniqueEventListener(buttonLogin, "click", async () => {
        try {
            const username = document.querySelector("#input-username").value;
            const password = document.querySelector("#input-password").value;
            await tentaFazerLogin(username, password);
            redirectToMenuAdmPage();
        } catch (error) {
            alert("Houve esse problema", error);
        }
        //redirectToMenuAdmPage();
    });
}

//change name function
async function tentaFazerLogin(_username, _password) {
    const objBody = {
        name: _username,
        password: _password,
    };
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(objBody),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (response.status !== 200 && response.status !== 201) {
        throw "[erro] ao tentar fazer login!";
    }
    const jsonData = await response.json();
    console.log("LOGIN - JSON OBTIDO:", jsonData);
}

/*@author:filipe - coauthor: Letônio*/
/*events related to the Gods description page*/
function addEventsToGodDetailsPage() {
    addEventsToHeader();
}

/*events added on the home page card of the chosen category*/
function eventosAdicionadosEmCadaCartao(godsOfCategory) {
    if (godsOfCategory) {
        for (let i = 0; i < godsOfCategory.length; i++) {
            let godCard = document.querySelector(
                `#god-${godsOfCategory[i].id}`
            );
            console.log(godCard.id, "AAAA");
            addUniqueEventListener(godCard, "click", () => {
                redirectToGodDetailsPage(godCard.dataset.godId);
            });
        }
    }
}

/*@author:filipe - coauthor: Letônio*/
/*Events added to the administrator menu*/
function addEventsToAdmMenuPage() {
    addEventsToHeader();

    const objMenuAdm = [
        { label: "#edit-profile", handle: redirectToTableEditCategories },
        { label: "#change-password", handle: redirectToTableEditCategories },
        { label: "#edit-categories", handle: redirectToTableEditCategories },
        { label: "#edit-gods", handle: redirectToTableEditGods },
        //{ label: "#logout", handle: redirectToLoginAdmPage },//vou modificar o redirect
        { label: "#logout", handle: redirectToLogoutPage },
    ];

    objMenuAdm.forEach((element) => {
        const menuOption = document.querySelector(element.label);
        addUniqueEventListener(menuOption, "click", () => {
            element.handle();
        });
    });
}

/*@author:filipe - coauthor: gabriela*/
/*Adicionando eventos na página que tem uma tabela de categorias*/

function addEventsToCategoryTablePage() {
    addEventsToHeader();
    //addLinesCategoryTable();
    /*insere evento no botao de add categoria*/

    const btnAddCategory = document.querySelector("#create-new-category");

    addUniqueEventListener(btnAddCategory, "click", () => {
        redirectToAddCategory();
    });
}

/*@author:filipe - coauthor: Letônio*/
/*Adicionando eventos na página que tem uma tabela de deuses*/
function addEventsToGodTablePage() {
    addEventsToHeader();
    //addLinesGodTable();
    /*insere evento no botão de adicionar um novo deus*/
    const buttonAddGod = document.querySelector("#create-new-god");
    addUniqueEventListener(buttonAddGod, "click", () => {
        redirectToAddGodPage();
    });

    /*Insere evento na tabela, caso o usuario clique numa linha da tabela
	de deuses aparece uma página para detalhamento e edicao
	referente aquele elemento*/

    const tbodyElement = document.querySelector("tbody");
    addUniqueEventListener(tbodyElement, "click", (event) => {
        console.log("TARGET:", event.target.parentNode);
        const rowElement = event.target.parentNode;
        if (event.target.parentNode.tagName === "TR") {
            const godId = rowElement.dataset.godId;
            console.log("LINHA664 - GODEVENT:", godId);
            redirectToGodInfoPage(godId);
        }
    });

    /*
Testando
*/
}

/*@author:Gabriela - coauthor: Letônio*/
/*Add eventos na página que tem a opcao de adicionar um novo deus*/
function addEventsToAddNewGodPage() {
    addEventsToHeader();
    /*evento nos botoes de adicionar e cancelar*/
    const cancelButton = document.querySelector(".cancel-button");
    const addGodButton = document.querySelector("#add-god-button");
    addUniqueEventListener(cancelButton, "click", () => {
        redirectToTableEditGods();
    });
    addUniqueEventListener(addGodButton, "click", () => {
        addNewGodInDatabase();
        //Antes de redirecionar devemos adicionar o novo deus
        redirectToTableEditGods();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
/*Add eventos na página que mostra infos sobre deuses (inclusive editar/excluir)*/

/*
Sobre essa função ai abaixo: Ela foi escrita primiro
e a ideia era armazenar nela os eventos na pagina de informações sobre um deus
incluindo evento de editar e excluir.
No entando, durante o desenvovimento, por algum motivo nao estava
funcionando os eventos listener, como resultado
acabou-se sendo criada outra funcao similar, cujo o nome é:
testAddElements(godObj) linha 326
Ai ela recebe um objeto contendo todas as informações sobre o deus
que foi clicado e exibe na tela a tela de info,
ai acabou que ficou duplicado alguns negocios,
então para corrigir isso, optu-se por COMENTAR o conteúdo da funcao abaixo!
e manter apenas a que esta na linha 326

*/

function addEventsToAdmGodInfoPage() {
    addEventsToHeader();
}

/*@author:Gabriela - coauthor: Letônio*/
/* Add eventos na página que mostra as informacoes para editar deuses*/
function addEventsToEditGodPages() {
    addEventsToHeader();

    const cancelGodBtn = document.querySelector("#cancel-edit-god");
    addUniqueEventListener(cancelGodBtn, "click", () => {
        redirectToTableEditGods();
    });
    const updateGodBtn = document.querySelector("#update-god-button");
    addUniqueEventListener(updateGodBtn, "click", () => {
        //atualizar informações de um deus;
        const godId = document.querySelector("#container-edit-god").dataset
            .godId;
        updateGodInformationInDatabase(godId);
        redirectToTableEditGods();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos no menu lateral
function addEventsToMenuPage() {
    addEventsToHeader();
    const pageIcon = document.querySelector("#home-page");
    addUniqueEventListener(pageIcon, "click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        ///redirectToMyPrincipal();
        redirectToAllCategories();
    });

    const godIcon = document.querySelector("#gods-page");
    addUniqueEventListener(godIcon, "click", () => {
        redirectToGodDetailsPage();
    });

    const categoriesIcon = document.querySelector("#categories-page");
    addUniqueEventListener(categoriesIcon, "click", () => {
        //redirectToMyPrincipal();
        redirectToAllCategories();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos na página de adicionar categoria
function addEventsToAddCategoryPage() {
    addEventsToHeader();
    const btnCancel = document.querySelector("#Cancelar");
    addUniqueEventListener(btnCancel, "click", () => {
        redirectToTableEditCategories();
    });
    const btnAddCategory = document.querySelector("#Adicionar");
    addUniqueEventListener(btnAddCategory, "click", async () => {
        await addNewCategoryInDatabase();
        redirectToTableEditCategories();
    });
}

async function addNewGodInDatabase() {
    const newNameGod = document.querySelector("#new-name-god").value;
    const newStatusGod = document.querySelector("#new-status-god").value;
    const newResumeGod = document.querySelector("#new-resume-god").value;

    //const srcExample = "exampleGod.png";
    // const categoryId = "1"; //Precisamos modificar a página para receber categoria também
    const categoryId = document.querySelector("#select-filter-category").value;
    console.log("OLHA O ID DA CATEGORIA QUE ESCOLHI", categoryId);
    console.log(
        "OLHA O NOME DA CATEGORIA QUE ESCOLHI",
        document.querySelector("#select-filter-category").innerText
    );

    //Tentando fazer a adicão de arquivo:
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Adiciona a imagem ao FormData
    formData.append("file", fileInput.files[0]);

    // Adiciona as 4 strings ao FormData
    formData.append("name", newNameGod);
    formData.append("status", newStatusGod);
    formData.append("resume", newResumeGod);
    formData.append("categoryId", categoryId);

    try {
        const response = await fetch("http://localhost:8080/godstable", {
            method: "POST",
            body: formData,
            //headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log(error);
    }
}
//

function getCategoryInputInformations(id) {
    //provavelmente apagarei esse obj, já qu tudo está sendo armazenado no formdata
    let obj = {};

    const inputNameUpdate = document.querySelector(
        "#input-cat-edit-name"
    ).value;

    const inputColorUpdate = document.querySelector(
        "#select-color-category"
    ).value;

    obj.src = "ExampleTemple.png";

    //MOntando o formData para fazer a edição de categoria:
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Adiciona a imagem ao FormData
    formData.append("file", fileInput.files[0]);

    // Adiciona as 4 strings ao FormData
    formData.append("name", inputNameUpdate);
    formData.append("hexColor", inputColorUpdate);

    return formData;
}

//

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
        console.log("Requisição de EDIT GOD deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log(error);
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

/*@author:letonio - Adiciona no Banco de dados a categoria Deus*/

async function addNewCategoryInDatabase() {
    const newCategoryName = document.querySelector("#new-name-category").value;

    const newColorHexFormat = document.querySelector(
        "#select-color-category"
    ).value;

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Add image to FormData
    formData.append("file", fileInput.files[0]);

    // Add strings to FormData
    formData.append("name", newCategoryName);
    formData.append("hexColor", newColorHexFormat);

    try {
        const response = await fetch("http://localhost:8080/categoriestable", {
            method: "POST",
            body: formData,
        });

        console.log("TESTE RESPOSTA OBTIDA AO ENVIAR CATEGORIA:", response);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log(error);
    }
}

function displayWarning(_message) {
    alert(_message);
}

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos na página de editar categoria
function addEventsToEditCategoryPage() {
    addEventsToHeader();
    const btnCancel = document.querySelector("#Cancelar");
    addUniqueEventListener(btnCancel, "click", () => {
        redirectToTableEditCategories();
    });
    //
    // #Adicionar;
    const btnEditCategory = document.querySelector("#Atualizar");
    addUniqueEventListener(btnEditCategory, "click", () => {
        //
        //pegar o id que está armazenado num data-set
        const id = document.querySelector("#container-edit-category").dataset
            .id;
        updateCategoryInformationInDatabase(id);

        redirectToTableEditCategories();
    });
}
//

async function updateCategoryInformationInDatabase(id) {
    const formData = getCategoryInputInformations(id);

    //FETCH

    try {
        const response = await fetch(
            `http://localhost:8080/categoriestable/${id}`,
            {
                method: "PUT",
                body: formData,
            }
        );
        console.log("RESPOSTA DA REQUISIÇÃO EDIT CATEGORY:", response.status);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("Requisição de EDIT CATEGORY deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log(error);
    }
}

function insertChoosedGodImg() {
    const fileBtn = document.querySelector("#insert-file-btn");
    const previewImg = document.querySelector("#preview-img-god");
    const message = document.querySelector("#message-input-file");

    addUniqueEventListener(fileBtn, "change", (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            previewImg.src = url;
            message.innerHTML = file.name;
        } else {
            message.innerHTML = "Nenhum arquivo escolhido";
        }
    });
}

/*CATEGORY IMAGE PREVIEW */
function insertChoosedCategoryTempleImg() {
    const fileBtn = document.querySelector("#insert-file-btn");
    const previewImg = document.querySelector("#preview-img-god");
    const message = document.querySelector("#message-input-file");

    addUniqueEventListener(fileBtn, "change", (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            previewImg.src = url;
            message.innerHTML = file.name;
            console.log("fileBTN", file.name);
        } else {
            message.innerHTML = "Nenhum arquivo escolhido";
        }
    });
}

function addSelectWithCategoriesInGodsPage() {
    const selectElement = document.querySelector("#select-filter-category");
    selectElement.innerHTML = ""; //clear any previous content

    addOptionToSelectInGodsPage(selectElement, {
        value: "choose",
        text: "Escolha uma categoria",
    });

    categoriesList.forEach((category) => {
        addOptionToSelectInGodsPage(selectElement, {
            value: category.id,
            text: category.name,
        });
    });
}

function addOptionToSelectInGodsPage(_select, _paramOption) {
    const option = document.createElement("option");
    option.value = _paramOption.value; //add category id from db
    option.innerHTML = _paramOption.text;
    _select.appendChild(option);
}

/*********************************************/
/*events that are added to every header
/*********************************************/

function addEventsToHeader() {
    /*Click on Logo GodPedia redirect to Categories Page*/

    const logo = document.querySelector("#logo");

    addUniqueEventListener(logo, "click", () => {
        redirectToAllCategories();
    });

    /*Add event to PROFILE ICON, redirect to Login Adm Page*/
    const profileIcon = document.querySelector("#profile-icon");

    addUniqueEventListener(profileIcon, "click", () => {
        redirectToLoginAdmPage();
    });

    const menuIcon = document.querySelector("#menu-icon");

    addUniqueEventListener(menuIcon, "click", () => {
        redirectToMenu();
    });
}

// TESTANDO FUNCIOONALIDADE DO SCROLL

document.addEventListener("keydown", function (event) {
    if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "PageDown" ||
        event.key === "PageUp"
    ) {
        event.preventDefault();
        window.scrollBy(
            0,
            event.key === "ArrowDown" || event.key === "PageDown" ? 100 : -100
        );
    }
});
