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
	const page = objRotas.getPage(url);
	history.pushState({}, "", url);
	root.innerHTML = "";
	root.appendChild(page);
});
