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
import { redirectToMyPrincipal } from "./pages/category-page.js";

import GeraObjComRotas from "./pages/router.js";

const root = document.querySelector("#root");
const objRotas = GeraObjComRotas();

//inicia
const page = objRotas.getPage("/");
root.innerHTML = "";
root.appendChild(page);

//ouvir evento de "onstatechange"
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
    addEventsRelatedTo(url); //chama os eventos relacionados aquela página
});

/***************************************************
@AUTHOR:LETONIO VOu adicionar muitos recursos fetch
***************************************************
*/
/*index ou é nulo ou é um valor que aponta pra algo como a categoria*/
export function addExternalResourcesTo(url, criteria) {
    switch (url) {
        case "/":
            addResourcesToPrincipal();
            break;
        case "/category/:id":
            console.log("PRECISO ADICIONAR RECURSOS NO ID", criteria.id);
            addResourcesToCategoryChoosed(criteria.id);
            break;
        case "/tableCategories":
        /*criar uma função que adiciona n-linhas no elemento tbody;
                depende do tamanho do array de objetos que estiver na funcao
                */
        /*function addRecursoNaTabelaDeCategorias(){
                const arrayCategorias=[{id:"d1",name:"Caos"},{id:"d2",name:"saude"}];
                criar uma funcao que percorre esse array, acessa o campo name, e adciona
                uma linha na tabela com o name.
               }*/
        case "/godInfo/g1":
            /* criar uma funcao que acessa o array procura o god com aquele index
                e adiciona as informacoes dele, por exemplo
                */
            break;
    }
}

// author: Gabriela
function addLinesCategoryTable() {
    const data = [
        {
            id_category: 1,
            nome: "tecnologia",
        },
        {
            id_category: 2,
            nome: "saúde",
        },
        {
            id_category: 3,
            nome: "natureza",
        },
        {
            id_category: 4,
            nome: "primordiais",
        },
        {
            id_category: 5,
            nome: "comida",
        },
    ];

    const thead = document.querySelector("#thead-categories");
    thead.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        thead.innerHTML += `<tr>
                    <td>${data[i].nome}</td>
                    <td><img class="edit-btn" src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
                    <td><img class="delete-btn" src="../assets/icons/trash-black.svg" alt="trash icon"></td>
                </tr>`;
    }
    return thead;
}
// author: Gabriela
function addLinesGodTable() {
    const data = [
        {
            nome: "Zapilson",
            status: "Deus da comunicação",
            category: "tecnologia",
        },
        {
            nome: "Zefa",
            status: "Deusa da coxinha",
            category: "comida",
        },
        {
            nome: "Juninho play",
            status: "Deus do estilo",
            category: "primordiais",
        },
        {
            nome: "Manoel Gomes",
            status: "Deus da música",
            category: "primordiais",
        },
        {
            nome: "Zapilson",
            status: "Deus da comunicação",
            category: "tecnologia",
        },
    ];

    const thead = document.querySelector("#thead-gods");
    thead.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        thead.innerHTML += `<tr id="line0${data[i]}">
                    <td>${data[i].nome}</td>
                    <td>${data[i].status}</td>
                    <td>${data[i].category}</td>
                </tr>`;
    }
    console.log(thead, "esse");
    return thead;
}

/*{ /*funçao falsa de addRecusre prineicpal }*/
/*{ function addRecPrincipal() {
    const conteudo = { img: "lets.jpg", name: "deustal" };

    //pra chegar nisso eu preciso de um objeto conteudo = {}, ou um array = []
    adicionaConteudoNoHTML(conteudo);
}*/

/*apagar esse codigo acima depois!!!*/

/*Usando fetch para pegar as imagens da página;*/
async function addResourcesToPrincipal() {
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
        renderCategoriesOnMainPage(objContent.data);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

function renderCategoriesOnMainPage(categories) {
    console.log("Pegou tudo que eu queria:", categories);
    let index;
    const quantify = categories.length;
    if (quantify % 2) {
        index = Math.floor(quantify / 2);
    } else Math.floor(quantify / 2) - 1;
    index = 2;
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

/************************************************************s
@AUTHOR:LETONIO VOU ADICIONAR UM MONTE DE EVENTOS AQUI DE ACORDO COM A PÁGINA
************************************************************/

function addEventsRelatedTo(url) {
    console.log("vamos ver a url:", url);
    switch (url) {
        case "/":
            addEventsToPrincipal();
            break;
        case "/category/:id":
            eventosDaCategoriaEscolhida();
            break;
        case "/login":
            eventosDoLoginDeAdm();
            break;
        case "/category/d1":
            eventosDosDetalhesDoDeus();
            break;
        case "/adm/a1":
            eventosDoMenuDeAdm();
            break;
        case "/tableCategories":
            adicionaEventosNaPaginaDaTabelaCategorias();
            break;
        case "/tableGods":
            adicionaEventosNaPaginaDaTabelaGods();
            break;
        case "/addGod":
            adicionarEventosNaPaginaDeAdicaoDeDeus();
            break;
        case "/godInfo/g1":
            adicionarEventosNaPaginaDeGodInfo();
            break;
        case "/editGod/g1":
            adicionarEventosNaPaginaDeEdicaoDeDeus();
            break;
        case "/menu":
            adicionarEventosNoMenu();
            break;
        case "/addCategory":
            adicionarEventosAddCateg();
            break;
        case "/editCategory":
            adicionarEventosEditCateg();
            break;
    }
}

/*Eventos relacionados a página principal*/
export function addEventsToPrincipal() {
    /////console.log("ADICIONA LISTENER NO BOTÃO GIGANTE!");

    /*Adiciona evento ao templo que está sendo mostrad nesse momento*/
    const containerTemples = document.querySelector(".container-temples");
    containerTemples.addEventListener("click", (event) => {
        //// console.log("ATIVOU EVENTO E VA RENDERIZARNOVA PAGINA");
        console.log(
            "Quando clica no container, pega o index que está em dataset.id:"
        );
        console.log(
            "Olha o valor do index quando clica no container",
            containerTemples.childNodes[1].dataset.id
        );
        const id = containerTemples.childNodes[1].dataset.id;
        redirectToCategoryChoosed(id);
    });

    /*add evento para mudar imagem das setas*/
    const arrowLeft = document.querySelector(".category-arrow-left");
    //// console.log("OLHA A SETA", arrowLeft);
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
    //////console.log("OLHA A SETA", arrowRight);
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

    eventosAdicionadosNoHeader();
}

async function updateTempleContent(newIndex) {
    console.log("valor de newIndex", newIndex);
    try {
        const response = await fetch(`http://localhost:8080/categories/`);
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante o cadastro! Tente novamente!";

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
        console.log("QUantidade", quantify);
        renderBallsBelowImg(newIndex, quantify);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

/*eventos relacionados a pagina da categoria escolhida*/
function eventosDaCategoriaEscolhida() {
    eventosAdicionadosNoHeader();
    eventosAdicionadosEmCadaCartao();
}
/*eventos relacionados a pagina de login do adm*/
function eventosDoLoginDeAdm() {
    eventosAdicionadosNoHeader();
    adicionaEventoNoBotaoDeLogin();
}
function adicionaEventoNoBotaoDeLogin() {
    const buttonLogin = document.querySelector("#login-logo-button");
    buttonLogin.addEventListener("click", () => {
        redirectToMenuAdmPage();
    });
}

/*@author:filipe - coauthor: Letônio*/
/*eventos relacionados a página com a descrição dos deuses*/
function eventosDosDetalhesDoDeus() {
    eventosAdicionadosNoHeader();
}

/*eventos adicionados em casa cartao da pagina da categoria escolhida*/
function eventosAdicionadosEmCadaCartao() {
    for (let i = 1; i <= 4; i++) {
        let godCard = document.querySelector(`.card${i.toString()}`);
        //////  console.log("ENtrou no for", godCard);
        godCard.addEventListener("click", () => {
            redirectToGodDetailsPage();
        });
    }
}

/*@author:filipe - coauthor: Letônio*/
/*Eventos adicionados no menu do administrador*/
function eventosDoMenuDeAdm() {
    eventosAdicionadosNoHeader();

    console.log("Entrou na página do menu e esta add evento!");

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
function adicionaEventosNaPaginaDaTabelaCategorias() {
    eventosAdicionadosNoHeader();
    addLinesCategoryTable();
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
function adicionaEventosNaPaginaDaTabelaGods() {
    eventosAdicionadosNoHeader();
    addLinesGodTable();
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
function adicionarEventosNaPaginaDeAdicaoDeDeus() {
    eventosAdicionadosNoHeader();
    /*evento nos botoes de adicionar e cancelar*/
    const cancelButton = document.querySelector(".cancel-button");
    const addGodButton = document.querySelector("#add-god-button");
    cancelButton.addEventListener("click", () => {
        redirectToTableEditGods();
    });
    addGodButton.addEventListener("click", () => {
        redirectToTableEditGods();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
/*Add eventos na página que mostra infos sobre deuses (inclusive editar/excluir)*/
function adicionarEventosNaPaginaDeGodInfo() {
    eventosAdicionadosNoHeader();
    /*Add eventos para quando clicam em EDITAR E EXCLUIR */
    const editGodButton = document.querySelector("#edit-god-button");
    editGodButton.addEventListener("click", () => {
        redirectToEditGodPage();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
/* Add eventos na página que mostra as informacoes para editar deuses*/
function adicionarEventosNaPaginaDeEdicaoDeDeus() {
    eventosAdicionadosNoHeader();

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
function adicionarEventosNoMenu() {
    eventosAdicionadosNoHeader();
    const pageIcon = document.querySelector("#home-page");
    pageIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToMyPrincipal();
    });

    const godIcon = document.querySelector("#gods-page");
    godIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToGodDetailsPage();
    });

    const categoriesIcon = document.querySelector("#categories-page");
    categoriesIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToMyPrincipal();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos na página de adicionar categoria
function adicionarEventosAddCateg() {
    eventosAdicionadosNoHeader();
    const btnCancel = document.querySelector("#Cancelar");
    btnCancel.addEventListener("click", () => {
        redirectToTableEditCategories();
    });
    const btnAddCategory = document.querySelector("#Adicionar");
    btnAddCategory.addEventListener("click", () => {
        redirectToTableEditCategories();
    });
}

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos na página de editar categoria
function adicionarEventosEditCateg() {
    eventosAdicionadosNoHeader();
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

function eventosAdicionadosNoHeader() {
    /*adiciona evento de clicar na logo e ir para a principal*/
    ////////console.log("ADICIONA LISTENER NA LOGO!");
    const logo = document.querySelector("#logo");
    logo.addEventListener("click", () => {
        ///////console.log("ATIVOU EVENTO E VA RENDERIZAR a principal");
        redirectToMyPrincipal();
    });
    /*adiciona evento para ir para página de login*/
    /*Adiciona evento para o PROFILE ICON PERFIL*/
    const profileIcon = document.querySelector("#profile-icon");
    profileIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToLoginAdmPage();
    });

    const menuIcon = document.querySelector("#menu-icon");
    menuIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToMenu();
    });
}
