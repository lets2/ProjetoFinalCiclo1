import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/

export function EditCategory() {
    const div = document.createElement("div");

    div.innerHTML = `
	<header class="flex-row-between">
        <div class="header-items flex-row-between">
            <img id="logo" src="../assets/icons/logo-godpedia.png" alt="">
            <div class="container-search flex-row-center">
               <input class="search-input" type="text"> 
               <img class="search-icon" src="../assets/icons/search.svg" alt="">
            </div>
        </div>
        <div class="header-items flex-row-between">
            <img id="profile-icon" src="../assets/icons/profile.svg" alt="">
            <img id="menu-icon" src="../assets/icons/menu.svg" alt="">
        </div>
    </header>
    <main>
        <div class="container-carousel flex-center-center">

            <div class="retangulo">
            </div>

            <div id="container-edit-category" class="p3-background flex-col-justify-center"> 

                <div class="nome-categoria cor-categoria flex-col-center">

                    <input id="input-cat-edit-name" type="text" placeholder="Nome da categoria">
                    <input id="input-cat-edit-color" type="text" placeholder="Cor da categoria">
                    <select name="select-color-category" id="select-color-category">
                        <option value="#140A3D" selected disabled>Cor:</option>
                        <option value="#140A3D">Azul escuro</option>
                        <option value="#0B264F">Azul claro</option>
                        <option value="#024324">Verde</option>
                        <option value="#ff8e01">Laranja</option>
                        <option value="#815604">Amarelo</option>
                        <option value="#931212">Vermelho</option>   
                        <option value="#6C0000">Vinho</option>
                        <option value="#43064E">Roxo</option>
                        <option value="#000000">Preto</option>
                    </select>
                    <div>
                        <img id="preview-img-god" src="../assets/images/exampleTemple.png" alt="">
                    </div>
                    
                    <input id="insert-file-btn" type="file" name="file" accept="image/png, image/jpeg, image/jpg">
                    <label for="insert-file-btn" class="custom-file-upload">Escolha um arquivo</label>
                    <p id="message-input-file"></p>

                </div>

                <div class="button-cancelar button-adicionar flex-row-between">

                    <button id="Cancelar" type="submit">Cancelar</button>
                    <button id="Atualizar" type="submit">Atualizar</button>

                </div>
            </div>
        </div>
    </main>
    <footer></footer>
	`;

    return div;
}

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}
