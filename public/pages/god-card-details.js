import CriaEventStateChange from "./event-url.js";

/*@autor:filipe*/

export function GodChoosed() {
    const div = document.createElement("div");

    div.innerHTML = `
	<header class="flex-row-between">
      <div class="header-items flex-row-between">
        <img id="logo" src="../assets/icons/logo-godpedia.png" alt="" />
        <div class="container-search flex-row-center">
          <input class="search-input" type="text" />
          <img class="search-icon" src="../assets/icons/search.svg" alt="" />
        </div>
      </div>
      <div class="header-items flex-row-between">
        <img id="profile-icon" src="../assets/icons/profile.svg" alt="" />
        <img id="menu-icon" src="../assets/icons/menu.svg" alt="" />
      </div>
    </header>
    <main class="flex-center-center">
      <!-- @author: Daniel-->
      <div id="container-god-img">
        <div class="flex-col-center" id="div-img-god">
            <div>
                <img src="../assets/images/games-god.jpg" alt="" />
            </div>
        </div>
        <div class="flex-col-center container-god-text">
            <h1 class="god-text-title">Game God</h1>
            <h2 class="god-text-subtitle">Deus dos Jogos</h2>
            <p class="god-text-description">
              Lorem ipsum dolor sit amet. Est itaque nihil est eveniet pariatur
              et aliquam impedit ut quia explicabo. Ut nihil architecto aut
              minus earum et consectetur dolores nam alias pe Lorem ipsum dolor
              sit amet. Est itaque nihil est eveniet pariatur et aliquam impedit
              ut quia explicabo. Ut nihil architecto aut minus earum et
              consectetur dolores nam alias pe
            </p>
        </div>
      </div>
    </main>
    <footer></footer>
	`;

    return div;
}

export function redirectToGodDetailsPage(godId) {
    const eventStateChange = CriaEventStateChange("/categories/d1", {
        godId: godId,
    });
    window.dispatchEvent(eventStateChange);
}
