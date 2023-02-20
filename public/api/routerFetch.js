//FAZENDO IMPORTS
import {
    addResourcesToTableOfGods,
    addResourcesToGodInfo,
    addResourcesToEditGodPage,
    addResourcesToEditCategoryPage,
} from "../index.js";

import {
    addResourcesToCategoriesPage,
    addResourcesToCategoryChoosed,
    addResourcesToGodChoosed,
    addResourcesToTableOfCategories,
} from "./categories/fetchs_Categories.js";

//------------------------------------------------------------------------
// ADDS RESOURCES TO THE PAGE THA WAS RENDERED ACCORDING URL
//-----------------------------------------------------------------------

export async function addExternalResourcesTo(url, criteria) {
    switch (url) {
        ////case "/":
        ///   addResourcesToPrincipal();
        ///  break;
        // /
        case "/categories":
            return addResourcesToCategoriesPage();
        case "principalteste":
            //this page doesnt have dynamic features
            break;
        case "/categories/:id":
            console.log("PRECISO ADICIONAR RECURSOS NO ID", criteria.id);
            return addResourcesToCategoryChoosed(criteria.id);

        case "/categories/d1":
            return addResourcesToGodChoosed(criteria.godId);
        ///
        //
        //
        //

        case "/tableCategories":
            return addResourcesToTableOfCategories();
        case "/tableGods":
            addResourcesToTableOfGods();
            break;

        case "/godInfo/g1":
            await addResourcesToGodInfo(criteria.godId);
            break;

        case "/editGod/g1":
            addResourcesToEditGodPage(criteria.godId);
            break;
        case "/editCategory":
            addResourcesToEditCategoryPage(criteria.id);
            break;
    }
}
