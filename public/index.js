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

window.addEventListener("onstatechange", (event) => {
    const url = event.detail.url;
    const criteria = event.detail.criteria; //o valor padrão de criteria={}, se diferente de null implia q
    console.log("DISPAROU E A URL EH", url);
    const page = objRotas.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
    console.log("criteria:", criteria);
    addExternalResourcesTo(url, criteria);
    addEventsRelatedTo(url); //call relateds events to page/url
});

//------------------------------------------------------------------------
// ADDS RESOURCES TO THE PAGE THA WAS RENDERED ACCORDING URL
//-----------------------------------------------------------------------

export function addExternalResourcesTo(url, criteria) {
    switch (url) {
        /*case "/":
            addResourcesToPrincipal();
            break;
            */
        case "/categories":
            addResourcesToCategoriesPage();
            break;
        case "principalteste":
            //this page doesnt have dynamic features
            break;
        case "/categories/:id":
            console.log("PRECISO ADICIONAR RECURSOS NO ID", criteria.id);
            addResourcesToCategoryChoosed(criteria.id);
            break;
        case "/tableCategories":
            addResourcesToTableOfCategories();
            break;
        case "/tableGods":
            addResourcesToTableOfGods();
            break;
        case "/categories/d1":
            addResourcesToGodChoosed();
            break;
        case "/godInfo/g1":
            addResourcesToGodInfo();
            break;
    }
}

async function addResourcesToTableOfCategories() {
    try {
        const response = await fetch(`http://localhost:8080/categories/`);
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        console.log("Olha o resultado de clicar com uma seta:", objContent);
        const categories = objContent.data;
        /// renderCategoriesOnMainPage(objContent.data);
        // const quantify = categories.length;

        addLinesCategoryTable(categories);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
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
}

async function addResourcesToTableOfGods() {
    /*
    const dataGods = [
        {
            id: "0",
            name: "Zapilson",
            status: "Deus da comunicação",
            category: "tecnologia",
        },
        {
            id: "1",
            name: "Zefa",
            status: "Deusa da coxinha",
            category: "comida",
        },
        {
            id: "2",
            name: "Juninho play",
            status: "Deus do estilo",
            category: "primordiais",
        },
        {
            id: "3",
            name: "Manoel Gomes",
            status: "Deus da música",
            category: "primordiais",
        },
        {
            id: "4",
            name: "Zapilson",
            status: "Deus da comunicação",
            category: "tecnologia",
        },
    ];

    */
    try {
        const responseCategories = await fetch(
            `http://localhost:8080/categories/`
        );
        console.log("STATUS:", responseCategories.status);
        if (
            responseCategories.status !== 200 &&
            responseCategories.status !== 201
        )
            throw "[erro] Houve um problema na requisicao das categorias!";

        const objContentCateg = await responseCategories.json();
        console.log(
            "Olha o resultado de clicar com uma seta:",
            objContentCateg
        );
        const dataCategories = objContentCateg.data;
        /// renderCategoriesOnMainPage(objContent.data);
        // const quantify = categories.length;

        /*HTTP REQUEST TO GET ALL THE GODS DATA */

        const responseGods = await fetch(`http://localhost:8080/godstable/`);
        console.log("STATUS:", responseGods.status);
        if (responseGods.status !== 200 && responseGods.status !== 201)
            throw "[erro] Houve um problema na requisicao das categorias!";

        const objContentGods = await responseGods.json();
        console.log("Olha o resultado de clicar com uma seta:", objContentGods);
        const dataGods = objContentGods.data;

        addSelectWithCategories(dataCategories);
        addLinesGodTable(dataGods);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }

    //There is a Select Tag above the table,
    //need to be fill with categories
    //the main idea is later to allow filtering the table
    //elements by category when the change event is activated
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
        lineTable.dataset.id = data[i].id;
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

/*Usando fetch para pegar as imagens da página;*/
async function addResourcesToCategoriesPage() {
    try {
        const response = await fetch("http://localhost:8080/categories");
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";
        const vetordedeuses = [
            { nome: "fulano", status: "zap" },
            { nome: "fulano", status: "zap" },
        ];
        const objContent = await response.json();
        // renderCategoriesOnMainPage(objContent.data);
        renderCurrentCategoryOnCategoriesPage(objContent.data);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

function renderCurrentCategoryOnCategoriesPage(categories) {
    console.log("Pegou tudo que eu queria:", categories);
    let index;
    const quantify = categories.length;
    if (quantify % 2) {
        index = Math.floor(quantify / 2);
    } else Math.floor(quantify / 2) - 1;
    index = 2; /*@author:letonio - posteriormente, retirar essa linha!!*/
    renderImgCategory(
        index,
        quantify,
        categories[index].id,
        categories[index].name,
        categories[index].src
    );

    renderBallsBelowImg(index, quantify);
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
    imagem.setAttribute("src", `./assets/images/temples/${categorySrc}`);
    imagem.dataset.index = categoryIndex; //adiciona um atributo personalizado dataset a imagem
    imagem.dataset.quantify = categoryQuantify; //adiciona um atributo personalizado dataset a imagem
    imagem.dataset.id = categoryId; //adiciona um atributo personalizado dataset a imagem

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

/*add resource as páginas escolhdas*/
async function addResourcesToCategoryChoosed(id) {
    try {
        const response = await fetch(
            `http://localhost:8080/categories/${id}/all`
        );
        console.log("STATUS DA RESPOSTA DO FETCH:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";

        const objContent = await response.json();
        console.log("Esse é o resultado vindo do backend:", objContent);
        console.log("Esse é o resultado vindo do backend:", objContent.data);

        const nameCategory = objContent.data[0].name_category;
        const arrayGods = objContent.data;
        console.log("Meu array de deuses:", arrayGods);
        insertImages(arrayGods);
        insertCategoryName(nameCategory);

        //apos inserir tudo se esta'tudo okay então faz aparecer a tela
        document
            .querySelector(".container-page-gods")
            .classList.remove("hidden");
        //// renderCategoriesOnMainPage(objContent.data);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

function insertImages(arrayGods) {
    console.log(arrayGods);
    const cardsGods = document.querySelectorAll(".cards-gods");
    cardsGods.forEach((element, index) => {
        element.setAttribute(
            "src",
            `../assets/images/gods/${arrayGods[index].src_img}`
        );
    });
}

function insertCategoryName(nameCategory) {
    console.log(nameCategory);
    document.querySelector(".phrase").innerHTML = nameCategory;
}

//@author:filipe
function addResourcesToGodChoosed(){
    //CRIAR UM OBJETO COM OS DADOS DO DEUS
    const gods = {"id":"01","name":"Zoo","src":"../images/gods/cat03--god04-natu.jpg","resume":"O deus da transformação",
    "category_name":"Deuses da natureza", "description": "Há muito tempo, no reino dos deuses, existia um deus chamado Zoo, o Deus da Transformação. Ele era um deus muito poderoso, mas também muito solitário, pois ninguém queria se aproximar dele com medo de ser transformado em uma criatura."};

    //INSERIR OS DADOS DO DEUS NA PÁGINA
    const container_data = document.querySelector("#container-god-img");
    container_data.innerHTML = "";
    container_data.innerHTML = `
    <div id="container-god-img">
    <div class="flex-col-center" id="div-img-god">
        <div>
            <img src="../assets/images/${gods.src}" alt="" />
        </div>
    </div>
    <div class="flex-col-center container-god-text">
        <h1 class="god-text-title">${gods.name}</h1>
        <h2 class="god-text-subtitle">${gods.resume}</h2>
        <p class="god-text-description">
          ${gods.description}
        </p>
    </div>`;
}
//@author:filipe
function addResourcesToGodInfo(){
    //CRIAR UM OBJETO COM OS DADOS DO DEUS
    const gods = {"id":"01","name":"Zoo","src":"../images/gods/cat03--god04-natu.jpg","resume":"O deus da transformação",
    "category_name":"Deuses da natureza", "description": "Há muito tempo, no reino dos deuses, existia um deus chamado Zoo, o Deus da Transformação. Ele era um deus muito poderoso, mas também muito solitário, pois ninguém queria se aproximar dele com medo de ser transformado em uma criatura."};

    //INSERIR OS DADOS DO DEUS NA PÁGINA
    const container_data = document.querySelector("#container-see-god");
    container_data.innerHTML = "";
    container_data.innerHTML = `
        <div class="flex-col-center" id="box-img-see-god">
			<div id="img-god">
                <img src="../assets/images/${gods.src}" alt="" />
			</div>
			<div id="box-btns" class="flex-row-between">
				<button id="edit-god-button" class="buttons"><img src="../assets/icons/edit.svg" alt=""></button>
				<button id="delete-god-button" class="buttons"><img src="../assets/icons/mdi_trash.svg" alt=""></button>
			</div>
		</div>
		<form action="" class="flex-col-center">
			<div class="flex-col-center" id="box-inputs-see-god">
				<div id="box-tittle" class="flex-col-center">
					<h2>${gods.name}</h2>
					<h4>${gods.resume}</h4>
				</div>
				<div>
					<h5 id="tittle-description">Resumo</h5>
					<p>${gods.description}</p>
				</div>
			</div>
		</form>
`
}

//------------------------------------------------------------------------
// ADDS EVENTS TO THE PAGE THAT WAS RENDERED ACCORDING URL
//-----------------------------------------------------------------------

function addEventsRelatedTo(url) {
    console.log("vamos ver a url:", url);
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
            "Category id, saved on dataset.id:",
            containerTemples.childNodes[1].dataset.id
        );
        const id = containerTemples.childNodes[1].dataset.id;
        redirectToCategoryChoosed(id);
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
        console.log("Olha o valor de dataset:", templeImage.dataset.id);
        if (parseInt(templeImage.dataset.index) > 0) {
            const newIndex = parseInt(templeImage.dataset.index) - 1;
            updateTempleContent(newIndex);
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
        if (
            parseInt(templeImage.dataset.index) <
            parseInt(templeImage.dataset.quantify) - 1
        ) {
            const newIndex = parseInt(templeImage.dataset.index) + 1;
            updateTempleContent(newIndex);
        }
    });

    addEventsToHeader();
}

/*@author:letonio - criando uma página principal de teste*/
function addEventsToMainPageTest() {
    addEventsToHeader(); //estou colocando com header para testar
    const seeMoreButton = document.querySelector(".button-see-more");
    console.log("Criou o evento");
    seeMoreButton.addEventListener("click", () => {
        //redirectToMyPrincipal();//antigo
        console.log("Entrou no evento de click no botão!");
        redirectToAllCategories();
    });
}

async function updateTempleContent(newIndex) {
    console.log("valor de newIndex", newIndex);
    try {
        const response = await fetch(`http://localhost:8080/categories/`);
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        console.log("Olha o resultado de clicar com uma seta:", objContent);
        const categories = objContent.data;
        /// renderCategoriesOnMainPage(objContent.data);
        const quantify = categories.length;
        renderImgCategory(
            newIndex,
            quantify,
            categories[newIndex].id,
            categories[newIndex].name,
            categories[newIndex].src
        );
        //renderImgCategory(newclId, objContent.data.name, objContent.data.src);
        //found-out total balls
        //const quantify = document.querySelectorAll(".circle").length;
        renderBallsBelowImg(newIndex, quantify);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
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
            redirectToGodDetailsPage();
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
        console.log("Pagina do menu, evento procura elemento");
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

    const btnEditCategory = document.querySelectorAll(".edit-btn");
    for (let i = 0; i < btnEditCategory.length; i++) {
        btnEditCategory[i].addEventListener("click", () => {
            redirectToEditCategory();
        });
    }
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
    const trList = document.querySelectorAll("tbody tr");
    trList.forEach((trElement) => {
        trElement.addEventListener("click", (event) => {
            const tdElement = event.target;
            console.log("essse eh o alvo:", tdElement);
            console.log("tag do parent:", tdElement.parentNode.tagName);

            if (tdElement.parentNode.tagName === "TR") {
                const rowIdGod = tdElement.parentNode.id;
                console.log("Olha a ID dessa linha:", rowIdGod);
                redirectToGodInfoPage("idDoDeus"); /*posteriormente isso sera*/
            }
        });
    });
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
function addEventsToAdmGodInfoPage() {
    addEventsToHeader();
    /*Add eventos para quando clicam em EDITAR E EXCLUIR */
    const editGodButton = document.querySelector("#edit-god-button");
    editGodButton.addEventListener("click", () => {
        redirectToEditGodPage();
    });
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
    const newResumeGod = document.querySelector("#new-name-god").value;

    const srcExample = "exampleGod.png";
    const categoryId = "4"; //Precisamos modificar a página para receber categoria também

    const newGod = {
        name: newNameGod,
        status: newStatusGod,
        resume: newResumeGod,
        categoryId: categoryId,
        src: srcExample,
    };

    try {
        const response = await fetch("http://localhost:8080/godstablecreate", {
            method: "POST",
            body: JSON.stringify(newGod),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
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

/*@author:letonio - Adiciona no Banco de dados o novo Deus*/

async function addNewCategoryInDatabase() {
    const newCategoryName = document.querySelector("#new-name-category").value;
    const newColorHexFormat = document.querySelector(
        "#new-color-category"
    ).value;
    const srcExample = "exampleTemple.png";

    const newCategory = {
        name: newCategoryName,
        src: srcExample,
        hexColor: newColorHexFormat,
    };

    try {
        const response = await fetch(
            "http://localhost:8080/categoriestablecreate",
            {
                method: "POST",
                body: JSON.stringify(newCategory),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }
        );
        console.log("Olha a resposta response:", response);

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
    const btnEditCategory = document.querySelector("#Adicionar");
    btnEditCategory.addEventListener("click", () => {
        redirectToTableEditCategories();
    });
}
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
