import { redirectToCategoryChoosed } from "../pages/cards_god_from_categ.js";
import { addUniqueEventListener } from "./event-listener.js";

export function RenderButtonBack(categoryId){
    const root =  document.querySelector("#root");
    const btnBack = document.createElement("button");
    
    btnBack.classList.add("btn-back-cards");
    btnBack.innerHTML = "Voltar";
    addUniqueEventListener(btnBack, "click", () =>  {
        comeBackCategory(categoryId)
    })
    root.appendChild(btnBack);
}
//RenderButtonBack(categoriesList[currentIndexCategory].id)
function comeBackCategory(categoryId){
    redirectToCategoryChoosed(categoryId);
}