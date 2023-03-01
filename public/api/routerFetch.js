//FAZENDO IMPORTS
import {
    addResourcesToCategoriesPage,
    addResourcesToCategoryChoosed,
    addResourcesToTableOfCategories,
    addResourcesToEditCategoryPage,
} from "./categories/fetchs_Categories.js";

import {
    addResourcesToGodChoosed,
    addResourcesToTableOfGods,
    addResourcesToGodInfo,
    addResourcesToEditGodPage,
    getResourcesFromGodsFiltered,
} from "./gods/fetchs_Gods.js";

//------------------------------------------------------------------------
// ADDS RESOURCES TO THE PAGE THA WAS RENDERED ACCORDING URL
//-----------------------------------------------------------------------

export async function addExternalResourcesTo(url, criteria) {
    switch (url) {
        case "/categories":
            return addResourcesToCategoriesPage();

        case "/categories/:id":
            return addResourcesToCategoryChoosed(criteria.id);
        case "/login":
            if (criteria.releaseCookie) {
                await removeCookieDoNavegador();
            }
            return;
        case "/categories/d1":
            return addResourcesToGodChoosed(criteria.godId);

        case "/tableCategories":
            return addResourcesToTableOfCategories(criteria);
        case "/tableGods":
            return addResourcesToTableOfGods(criteria);

        case "/godInfo/g1":
            return await addResourcesToGodInfo(criteria.godId);

        case "/editGod/g1":
            return addResourcesToEditGodPage(criteria.godId);

        case "/editCategory":
            return await addResourcesToEditCategoryPage(criteria.id);
        case "/allGods":
            const arrayWithGodsFiltered = await getResourcesFromGodsFiltered(
                criteria.parametroDePesquisa
            );
            if (arrayWithGodsFiltered.length === 0) {
                return await addResourcesToTableOfGods(criteria);
            } else {
                return arrayWithGodsFiltered;
            }

        default:
            return null;
    }
}

//Provavelmente essa funcao de remover cookie fará parte
//de um modulo de fetch_users, que estará relacionado com os usuários
//por enquanto deixarei por aqui
async function removeCookieDoNavegador() {
    try {
        const response = fetch("/logout", {
            method: "DELETE",
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
        console.log("COOKIE, AO TENTAR REMOVER DEU ERRO", error);
    }
}
