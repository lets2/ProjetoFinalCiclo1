//@author:filipe
export async function addResourcesToGodChoosed(godId) {
    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}/`
        );
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        console.log("Resultado da requisição VER GOD DETAILS:", objContent);
        const godInformation = objContent.data[0];

        //INSERIR OS DADOS DO DEUS NA PÁGINA
        const container_data = document.querySelector("#container-god-img");
        container_data.innerHTML = "";
        container_data.innerHTML = `
            <div id="container-god-img">
            <div class="flex-col-center" id="div-img-god">
                <div>
                    <img src="../assets/images/gods/${godInformation.src_img}" alt="" />
                </div>
            </div>
            <div class="flex-col-center container-god-text">
                <h1 class="god-text-title">${godInformation.name}</h1>
                <h2 class="god-text-subtitle">${godInformation.status}</h2>
                <p class="god-text-description">
                ${godInformation.resume}
                </p>
            </div>`;
        return godInformation;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

//@author:filipe
export async function addResourcesToTableOfGods() {
    //
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
        const dataCategories = objContentCateg.data;

        const responseGods = await fetch(`http://localhost:8080/godstable/`);
        console.log("STATUS:", responseGods.status);
        if (responseGods.status !== 200 && responseGods.status !== 201)
            throw "[erro] Houve um problema na requisicao das categorias!";

        const objContentGods = await responseGods.json();
        const dataGods = objContentGods.data;

        return { dataCategories, dataGods };
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }

    //There is a Select Tag above the table,
    //need to be fill with categories
    //the main idea is later to allow filtering the table
    //elements by category when the change event is activated
}

//@author:filipe
export async function addResourcesToGodInfo(godId) {
    //CRIAR UM OBJETO COM OS DADOS DO DEUS
    /*Fetch request*/
    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}/`
        );
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        console.log("Resultado da requisição VER GOD INFO:", objContent);

        const godInformation = objContent.data[0];

        const container_data = document.querySelector("#container-see-god");
        container_data.innerHTML = "";
        container_data.innerHTML = `
            <div class="flex-col-center" id="box-img-see-god">
                <div id="img-god">
                    <img src="../assets/images/gods/${godInformation.src_img}" alt="" />
                </div>
                <div id="box-btns" class="flex-row-between">
                    <button id="edit-god-button" class="buttons"><img src="../assets/icons/edit.svg" alt=""></button>
                    <button id="delete-god-button" class="buttons"><img src="../assets/icons/mdi_trash.svg" alt=""></button>
                    <button id="back-god-button" class="buttons"><img id="testeDaImg"src="../assets/icons/back-arrow-icon-white.svg" alt=""></button>
                    
                </div>
            </div>  
            <form action="" class="flex-col-center">
                <div class="flex-col-center" id="box-inputs-see-god">
                    <div id="box-tittle" class="flex-col-center">
                        <h2>${godInformation.name}</h2>
                        <h4>${godInformation.status}</h4>
                    </div>
                    <div>
                        <h5 id="tittle-description">Resumo</h5>
                        <p>${godInformation.resume}</p>
                    </div>
                </div>
            </form>
            `;

        return godInformation;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }

    //GOD INFO IS THE PAGE WITH PENCIL AND TRASH DO EDIT AND DELETE GOD
}

export async function addResourcesToEditGodPage(godId) {
    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}/`
        );
        console.log("STATUS EDIT:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        console.log("Resultado da requisição EDIT PAGE:", objContent);

        const godInformation = objContent.data[0];
        console.log(godInformation, "GOD IN=FOOOO");

        return godInformation;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}
