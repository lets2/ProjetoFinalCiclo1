//@author:filipe
export async function addResourcesToGodChoosed(godId) {
    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}/`
        );

        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        const godInformation = objContent.data[0];

        const container_data = document.querySelector("#container-god-img");
        container_data.innerHTML = "";
        container_data.innerHTML = `
            <div id="container-god-img">
            <div class="flex-col-center" id="div-img-god">
                <div>
                    <img src="../assets/uploads/${godInformation.src_img}" alt="" />
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
    try {
        const responseCategories = await fetch(
            `http://localhost:8080/categories/`
        );

        if (
            responseCategories.status !== 200 &&
            responseCategories.status !== 201
        )
            throw "[erro] Houve um problema na requisicao das categorias!";

        const objContentCateg = await responseCategories.json();
        const dataCategories = objContentCateg.data;
        const responseGods = await fetch(`http://localhost:8080/godstable/`);

        if (responseGods.status !== 200 && responseGods.status !== 201)
            throw "[erro] Houve um problema na requisicao das categorias!";

        const objContentGods = await responseGods.json();
        const dataGods = objContentGods.data;

        return { dataCategories, dataGods };
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

//@author:filipe
export async function addResourcesToGodInfo(godId) {
    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}/`
        );

        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        const godInformation = objContent.data[0];

        const container_data = document.querySelector("#container-see-god");
        container_data.innerHTML = "";
        container_data.innerHTML = `
            <div class="flex-col-center" id="box-img-see-god">
                <div id="img-god">
                    <img src="../assets/uploads/${godInformation.src_img}" alt="" />
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

        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        const godInformation = objContent.data[0];

        return godInformation;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

/*GET GODS FILTERED BY SEARCH BAR PARAMETER*/

export async function getResourcesFromGodsFiltered(_parametroDePesquisa) {
    try {
        const response = await fetch(
            `http://localhost:8080/searchgods?strings=${_parametroDePesquisa}`
        );
        console.log("RESPOSTA DA REQUISIÇÃO SEARCH GODS:", response.status);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("Requisição de BARRA DE PESQUISA deu certo:", resJson);
        //displayWarning(resJson.message); //deu tudo  certo
        // CASO DÊ CERTO A REQUISIÇÃO SALVO NO VETOR DE GODS FILTRADOS
        // E CHAMO O REDIRECT:
        //godsFilteredArrayGlobal =
        const arrayFiltered = resJson.data;

        return arrayFiltered;
        /// console.log("ARRAY FILTRADO:", arrayFiltered.length);
        ///  if (arrayFiltered.length === 0) {
        ///      displayWarning("Nenhum item correspondente, tente outra busca!");
        ///       redirectToAllGods(false); //filtered:false;
        ///   } else {
        ///      godsFilteredArrayGlobal = arrayFiltered;
        ///       redirectToAllGods(true); //filtered:true;
        ///   }
    } catch (error) {
        console.log(error);
    }
}
