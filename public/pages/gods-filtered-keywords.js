import CriaEventStateChange from "./event-url.js";

/*@autor:filipe*/

export function GodSFilteredByKeywords() {
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
      <div id="container-page-keywords-test">
        
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
