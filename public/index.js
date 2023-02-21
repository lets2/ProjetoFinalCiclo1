//NOVOS IMPORTS E DIVISÃO DAS PÁGINAS

import { addExternalResourcesTo } from "./api/routerFetch.js";

//-------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------

import {
    redirectToCategoryChoosed,
    redirectToLoginAdmPage,
    redirectToGodDetailsPage,
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
import { redirectToAllCategories } from "./pages/categories-page.js";

import GeraObjComRotas from "./pages/router.js";

//------------------------------------------
//------------------------------------------
//------------------------------------------
//Variveis globais para substituicão do dataset e fetchs
let catId = "";
let godId = "";
let categoriesList = [];
let currentIndexCategory; //
let godsOfACategory = [];
let godsList = [];
//

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

window.addEventListener("onstatechange", async (event) => {
    const url = event.detail.url;
    const criteria = event.detail.criteria; //o valor padrão de criteria={}, se diferente de null implia q

    const page = objRotas.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
    console.log("URL:", url, "Criteria:", criteria);

    const respostaIndex = await addExternalResourcesTo(url, criteria);
    console.log("RESPOSTA VINDO DO FETCH", respostaIndex);
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
            insertCategoryName(godsOfACategory[0].name_category);
            break;
        case "/categories/d1":
            break;
        case "/tableCategories":
            categoriesList = respostaIndex; //respostaIndex tem a lista de categorias
            addLinesCategoryTable(categoriesList);
            break;
        case "/tableGods":
            addSelectWithCategories(respostaIndex.dataCategories);
            addLinesGodTable(respostaIndex.dataGods);
            break;
        case "/godInfo/g1":
            console.log(respostaIndex, "repo");
            testAddElements(respostaIndex);
            break;
        case "/editGod/g1":
            testInserirElementosNaEditGodPage(respostaIndex);
            break;
        case "/editCategory":
            testInserirElementosNaEditCategoryPage(respostaIndex);
            break;
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

        //it is important to save the identifier for future queries
    }
    //return thead;
    //Chama funcao para add eventos nos botoes de LAPIS/PENCIL;
    adicionaEventosNosLapis();
}

function adicionaEventosNosLapis() {
    /*EVENTOS REALCIONADO A EDITAR CATEGORIA BOTAO!!!!!11*/
    const listaDeImagensDeLapis = document.querySelectorAll(".edit-btn");
    console.log(
        "AQUI ESTA A LISTA DE IMAGENS DOS LAPIS DA CATEGORIA",
        listaDeImagensDeLapis
    );
    listaDeImagensDeLapis.forEach((imgLapis) => {
        imgLapis.addEventListener("click", (event) => {
            const catId = event.target.parentNode.parentNode.dataset.id;
            console.log("ZZZZZZZZ LAPIS OLHA O DATASET DELE:", catId);
            redirectToEditCategory(catId);
        });
    });
    /*EVENTOS REALCIONADO A EXCLUIR CATEGORIA BOTAO!!!!!11*/
    const listaDeImagensDeLixeira = document.querySelectorAll(".delete-btn");
    console.log(" LISTA DE LIXEIRAS DA CATEGORIA", listaDeImagensDeLixeira);
    listaDeImagensDeLixeira.forEach((imgLixeira) => {
        imgLixeira.addEventListener("click", (event) => {
            const catId = event.target.parentNode.parentNode.dataset.id;

            deleteCategoryFromDatabase(catId);
            redirectToTableEditCategories();
        });
    });
}

async function deleteCategoryFromDatabase(id) {
    try {
        const response = await fetch(
            `http://localhost:8080/categoriestableDelete/${id}/`,
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
        //it is important to save the identifier for future queries
    }
    console.log(thead, "esse");
    //return thead;
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
    console.log("Pegou tudo que eu queria:", categories);
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
    ////imagem.dataset.index = categoryIndex; //adiciona um atributo personalizado dataset a imagem
    ///// imagem.dataset.quantify = categoryQuantify; //adiciona um atributo personalizado dataset a imagem
    ////imagem.dataset.id = categoryId; //adiciona um atributo personalizado dataset a imagem

    //dessa forma é possível manter no elemento a posicao daquele elemento no array
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
    console.log(arrayGods);
    const cardsGods = document.querySelectorAll(".cards-gods");
    cardsGods.forEach((element, index) => {
        element.setAttribute(
            "src",
            `../assets/uploads/${arrayGods[index].src_img}`
        );
        //save in img god a dataset with god id
        element.dataset.godId = arrayGods[index].id;
    });
}

function insertCategoryName(nameCategory) {
    console.log(nameCategory);
    document.querySelector(".phrase").innerHTML = nameCategory;
}

function testInserirElementosNaEditGodPage(godObj) {
    const containerImgGod = document.querySelector("#edit-page-god-img");
    containerImgGod.innerHTML = `
    <img src="./public/assets/uploads/${godObj.src_img}" alt="">
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

//ZONA DE TESTES

function testAddElements(godObj) {
    //esse codigo eh o que bota o evento no botao de edicao
    const updateGodButton = document.querySelector("#edit-god-button");

    console.log("SELECIONOU O CONTAINER DA IMAGEM:", updateGodButton);
    updateGodButton.addEventListener("click", () => {
        console.log("CLICOU DENTRO DO EVENTO DE ATUALIZAR DEUS!");
        redirectToEditGodPage(godObj.id);
    });

    ///esse codigo eh o que bota o evento no botao BACK #back-god-button
    const backGodButton = document.querySelector("#back-god-button");

    console.log("SELECIONOU O CONTAINER DA IMAGEM:", backGodButton);
    backGodButton.addEventListener("click", () => {
        console.log("CLICOU DENTRO DO EVENTO DE DELETAR DEUS!");
        redirectToTableEditGods();
    });

    // esse codigo que exclui o deus
    const deleteGodButton = document.querySelector("#delete-god-button");

    console.log("SELECIONOU O CONTAINER DA IMAGEM:", deleteGodButton);
    deleteGodButton.addEventListener("click", () => {
        console.log(
            "CLICOU DENTRO DO EVENTO DE DELETAR DEUS!com essa",
            godObj.id
        );
        deleteGodFromDatabase(godObj.id);
        redirectToTableEditGods();
    });
}

async function deleteGodFromDatabase(godId) {
    try {
        const response = await fetch(
            `http://localhost:8080/godstableDelete/${godId}/`,
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
        console.log("Requisição de DELTE GOD deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo

        const container_data = document.querySelector("#container-see-god");
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

function testInserirElementosNaEditCategoryPage(catInformation) {
    const inputCatEditName = document.querySelector("#input-cat-edit-name");
    const inputCatEditColor = document.querySelector("#input-cat-edit-color");
    inputCatEditName.value = catInformation.name;
    inputCatEditColor.value = catInformation.hex_color;
    //
    const containerEditCategory = document.querySelector(
        "#container-edit-category"
    );
    containerEditCategory.dataset.id = catInformation.id; //add-set
}

//input-cat-edit-name
//input-cat-edit-color

/////----------------------------------------------------------SONA DE TESTES

//ZONA DE TESTES

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
    containerTemples.addEventListener("click", () => {
        console.log(
            "QUER MOSTRAR DADOS DESSA CATEGORIAS:",
            categoriesList[currentIndexCategory].id
        );
        ///const id = containerTemples.childNodes[1].dataset.id;
        redirectToCategoryChoosed(categoriesList[currentIndexCategory].id);
    });

    /*change arrow color on hover*/
    const arrowLeft = document.querySelector(".category-arrow-left");

    arrowLeft.addEventListener("mouseover", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-left-orange.svg"
        );
    });
    arrowLeft.addEventListener("mouseout", (event) => {
        event.target.setAttribute("src", "./assets/icons/arrow-left-white.svg");
    });

    arrowLeft.addEventListener("click", () => {
        const templeImage = document.querySelector("#temple");
        console.log("Olha o valor do indiceATUAL:", currentIndexCategory);
        if (currentIndexCategory > 0) {
            currentIndexCategory = currentIndexCategory - 1;
            updateTempleContent(currentIndexCategory);
        }
    });

    const arrowRight = document.querySelector(".category-arrow-right");

    arrowRight.addEventListener("mouseover", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-orange.svg"
        );
    });
    arrowRight.addEventListener("mouseout", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-white.svg"
        );
    });

    arrowRight.addEventListener("click", () => {
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
    seeMoreButton.addEventListener("click", () => {
        //redirectToMyPrincipal();//antigo
        redirectToAllCategories();
    });
}

function updateTempleContent(newIndex) {
    console.log("valor de newIndex:", newIndex);
    //try {
    // const response = await fetch(`http://localhost:8080/categories/`);
    //   console.log("STATUS:", response.status);
    //   if (response.status !== 200 && response.status !== 201)
    //    throw "[erro] Houve um problema na requisicao!";

    // const objContent = await response.json();
    //const categories = objContent.data;
    /// renderCategoriesOnMainPage(objContent.data);
    const quantify = categoriesList.length;
    renderImgCategory(
        newIndex,
        quantify,
        categoriesList[newIndex].id,
        categoriesList[newIndex].name,
        categoriesList[newIndex].src
    );
    //renderImgCategory(newclId, objContent.data.name, objContent.data.src);
    //found-out total balls
    //const quantify = document.querySelectorAll(".circle").length;
    renderBallsBelowImg(newIndex, quantify);
    //} catch (error) {
    //    console.log("Erro durante o fetch:", error);
    //}
}

/*eevents related to the page of the chosen category*/
function addEventsToCategorySelected() {
    addEventsToHeader();
    eventosAdicionadosEmCadaCartao();
}

/*events related to the adm login page*/
function addEventsToAdmLoginPage() {
    addEventsToHeader();
    adicionaEventoNoBotaoDeLogin();
}

function adicionaEventoNoBotaoDeLogin() {
    const buttonLogin = document.querySelector("#login-logo-button");
    buttonLogin.addEventListener("click", () => {
        redirectToMenuAdmPage();
    });
}

/*@author:filipe - coauthor: Letônio*/
/*events related to the Gods description page*/
function addEventsToGodDetailsPage() {
    addEventsToHeader();
}

/*events added on the home page card of the chosen category*/
function eventosAdicionadosEmCadaCartao() {
    for (let i = 1; i <= 4; i++) {
        let godCard = document.querySelector(`.card${i.toString()}`);

        godCard.addEventListener("click", () => {
            redirectToGodDetailsPage(godCard.dataset.godId);
        });
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
        { label: "#logout", handle: redirectToLoginAdmPage },
    ];

    objMenuAdm.forEach((element) => {
        const menuOption = document.querySelector(element.label);
        menuOption.addEventListener("click", () => {
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

    btnAddCategory.addEventListener("click", () => {
        redirectToAddCategory();
    });
    /*
    console.log("CHAMOU A FUNCAO DE ADD EVENTOS NO LAPIS");

    const btnEditCategory = document.querySelectorAll(".edit-btn");
    for (let i = 0; i < btnEditCategory.length; i++) {
        btnEditCategory[i].addEventListener("click", () => {
            console.log("ESTÁ FUNCIONANDO O EVENTO");

            redirectToEditCategory();
        });
    }
    */
}

/*@author:filipe - coauthor: Letônio*/
/*Adicionando eventos na página que tem uma tabela de deuses*/
function addEventsToGodTablePage() {
    addEventsToHeader();
    //addLinesGodTable();
    /*insere evento no botão de adicionar um novo deus*/
    const buttonAddGod = document.querySelector("#create-new-god");
    buttonAddGod.addEventListener("click", () => {
        redirectToAddGodPage();
    });

    /*Insere evento na tabela, caso o usuario clique numa linha da tabela
	de deuses aparece uma página para detalhamento e edicao
	referente aquele elemento*/

    const tbodyElement = document.querySelector("tbody");
    tbodyElement.addEventListener("click", (event) => {
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
    cancelButton.addEventListener("click", () => {
        redirectToTableEditGods();
    });
    addGodButton.addEventListener("click", () => {
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
    /*Add eventos para quando clicam em EDITAR E EXCLUIR */

    /*
    const editGodButton = document.querySelector("#edit-god-button");
    console.log(
        "ENTROU NO EVENTO DE ADICIONAR ALGO NO BOTAO DE EDIT",
        editGodButton
    );
    editGodButton.addEventListener("click", () => {
        console.log("ACESSOU O EVENTO DO BOTÃO DE CLICK");
        //const godId = 
        redirectToEditGodPage();
    });

    //back-god-button
    //add eventos para voltar pra página anterior, caso não queira editar
    const backGodButton = document.querySelector("#back-god-button");
    console.log("BOTÃO DE VOLTAR:", backGodButton);
    backGodButton.addEventListener("click", () => {
        console.log("Voltamos para a página anterior de edição de deuses");
        redirectToTableEditGods();
    });
    */
}

/*@author:Gabriela - coauthor: Letônio*/
/* Add eventos na página que mostra as informacoes para editar deuses*/
function addEventsToEditGodPages() {
    addEventsToHeader();

    const changeImg = document.querySelector("#change-img-btn");
    changeImg.addEventListener("click", () => {
        redirectToTableEditGods();
    });

    const cancelGodBtn = document.querySelector("#cancel-edit-god");
    cancelGodBtn.addEventListener("click", () => {
        redirectToTableEditGods();
    });
    const updateGodBtn = document.querySelector("#update-god-button");
    updateGodBtn.addEventListener("click", () => {
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
    pageIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        ///redirectToMyPrincipal();
        redirectToAllCategories();
    });

    const godIcon = document.querySelector("#gods-page");
    godIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToGodDetailsPage();
    });

    const categoriesIcon = document.querySelector("#categories-page");
    categoriesIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        //redirectToMyPrincipal();
        redirectToAllCategories();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos na página de adicionar categoria
function addEventsToAddCategoryPage() {
    addEventsToHeader();
    const btnCancel = document.querySelector("#Cancelar");
    btnCancel.addEventListener("click", () => {
        redirectToTableEditCategories();
    });
    const btnAddCategory = document.querySelector("#Adicionar");
    btnAddCategory.addEventListener("click", async () => {
        await addNewCategoryInDatabase();
        redirectToTableEditCategories();
    });
}

async function addNewGodInDatabase() {
    const newNameGod = document.querySelector("#new-name-god").value;
    const newStatusGod = document.querySelector("#new-status-god").value;
    const newResumeGod = document.querySelector("#new-resume-god").value;

    //const srcExample = "exampleGod.png";
    const categoryId = "1"; //Precisamos modificar a página para receber categoria também

    //--------------------------
    //
    //

    //
    /////////////
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

    ////

    //
    /*
    const newGod = {
        name: newNameGod,
        status: newStatusGod,
        resume: newResumeGod,
        categoryId: categoryId,
        src: srcExample,
    };
    */
    try {
        const response = await fetch("http://localhost:8080/godstablecreate", {
            method: "POST",
            body: formData,
            //headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        /*
        const response = await fetch(
            "http://localhost:8080/godstablecreate",
            {
                method: "POST",
                body: JSON.stringify(newCategory),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        );
        */
        console.log("RESPOSTA DA REQUISIÇÃO ADD GOD:", response.status);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("Requisição de ADD GOD deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log(error);
    }
}
//

function getCategoryInputInformations(id) {
    let obj = {};

    const inputNameUpdate = document.querySelector("#input-cat-edit-name");
    obj.name = inputNameUpdate.value;

    const inputColorUpdate = document.querySelector("#input-cat-edit-color");
    obj.hexColor = inputColorUpdate.value;

    obj.src = "ExampleTemple.png";

    console.log("CRIADO CERTINHO DO CATEGORI:", obj);
    return obj;
}

//

async function updateGodInformationInDatabase(godId) {
    const objUpdateGod = getGodInputInformations(godId);

    //FAZER O FETCH

    try {
        const response = await fetch(
            `http://localhost:8080/godstableEdit/${godId}`,
            {
                method: "PUT",
                body: JSON.stringify(objUpdateGod),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        );
        console.log("RESPOSTA DA REQUISIÇÃO ADD GOD:", response.status);

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

///

function getGodInputInformations(godId) {
    let obj = {};

    const inputNameUpdate = document.querySelector("#edit-page-god-input-name");
    obj.name = inputNameUpdate.value;

    const inputStatusUpdate = document.querySelector(
        "#edit-page-god-input-status"
    );
    obj.status = inputStatusUpdate.value;

    const inputResumeUpdate = document.querySelector(
        "#edit-page-god-input-resume"
    );
    obj.resume = inputResumeUpdate.value;

    obj.src = "ExampleGod.png";
    obj.categoryId = "1";
    console.log("CRIADO CERTINHO:", obj);
    return obj;
}

/*@author:letonio - Adiciona no Banco de dados a categoria Deus*/

async function addNewCategoryInDatabase() {
    const newCategoryName = document.querySelector("#new-name-category").value;
    const newColorHexFormat = document.querySelector(
        "#new-color-category"
    ).value;
    //////const srcExample = "exampleTemple.png";

    /////////////
    //Tentando fazer a adicão de arquivo:
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Adiciona a imagem ao FormData
    formData.append("file", fileInput.files[0]);

    // Adiciona as 4 strings ao FormData
    formData.append("name", newCategoryName);
    formData.append("hexColor", newColorHexFormat);

    ////
    /*   const newCategory = {
        name: newCategoryName,
        src: srcExample,
        hexColor: newColorHexFormat,
    };
*/
    try {
        const response = await fetch(
            "http://localhost:8080/categoriestablecreate",
            {
                method: "POST",
                body: formData,
                //headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        );

        /*
        const response = await fetch(
            "http://localhost:8080/categoriestablecreate",
            {
                method: "POST",
                body: JSON.stringify(newCategory),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        );
        */
        console.log("TESTE RESPOSTA OBTIDA AO ENVIAR CATEGORIA:", response);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("olha o JSON:", resJson);
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
    btnCancel.addEventListener("click", () => {
        redirectToTableEditCategories();
    });
    //
    // #Adicionar;
    const btnEditCategory = document.querySelector("#Atualizar");
    btnEditCategory.addEventListener("click", () => {
        // Adicionar aquia função que faz o fetch pra adicionar
        //
        //
        //pegar o id que está armazenado num data-set
        const id = document.querySelector("#container-edit-category").dataset
            .id;
        updateCategoryInformationInDatabase(id);

        //////
        redirectToTableEditCategories();
    });
}
//

async function updateCategoryInformationInDatabase(id) {
    const objUpdateCategory = getCategoryInputInformations(id);
    //FAZER O FETCH

    try {
        const response = await fetch(
            `http://localhost:8080/categoriestableEdit/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(objUpdateCategory),
                headers: { "Content-type": "application/json; charset=UTF-8" },
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

//
/*
async function updateCategoryInformationInDatabase(godId) {
    const objUpdateGod = getCategoryInputInformations(godId);

    //FAZER O FETCH

    try {
        const response = await fetch(
            `http://localhost:8080/godstableEdit/${godId}`,
            {
                method: "PUT",
                body: JSON.stringify(objUpdateGod),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        );
        console.log("RESPOSTA DA REQUISIÇÃO ADD GOD:", response.status);

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
*/
//
/*
async function updateGodInformationInDatabase(godId) {
    const objUpdateGod = getGodInputInformations(godId);

    //FAZER O FETCH

    try {
        const response = await fetch(
            `http://localhost:8080/godstableEdit/${godId}`,
            {
                method: "PUT",
                body: JSON.stringify(objUpdateGod),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        );
        console.log("RESPOSTA DA REQUISIÇÃO ADD GOD:", response.status);

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


*/

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
//FIM DA ZONA DE EDICOES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
//--------------------------------------------------------------------------

/*********************************************/
/*eventos que são adicionados em todo header*/
/*********************************************/

function addEventsToHeader() {
    /*Click on Logo GodPedia redirect to Categories Page*/

    const logo = document.querySelector("#logo");

    logo.addEventListener("click", () => {
        //redirectToMyPrincipal();
        redirectToAllCategories();
    });

    /*Add event to PROFILE ICON, redirect to Login Adm Page*/
    const profileIcon = document.querySelector("#profile-icon");

    profileIcon.addEventListener("click", () => {
        redirectToLoginAdmPage();
    });

    const menuIcon = document.querySelector("#menu-icon");

    menuIcon.addEventListener("click", () => {
        redirectToMenu();
    });
}
