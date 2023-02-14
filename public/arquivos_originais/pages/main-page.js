import CriaEventStateChange from "./event-url.js";

const objPages = [
	{ label: "Brigadeiros", handle: redirectToBrigadeiros },
	{ label: "Cupcakes", handle: redirectToCupcakes },
	{ label: "Doces", handle: redirectToDoces },
];

export default function Principal() {
	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Alpha Doceria";
	div.appendChild(h1);

	objPages.forEach((element) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = element.label;
		btn.onclick = element.handle; //btn.onclick = redirectToAnotherPage;
		div.appendChild(btn);
	});

	return div;
}

/* function redirectToAnotherPage(event) {
	const path = "/" + event.target.textContent.toLowerCase();
	const eventStateChange = CriaEventStateChange(path);
	window.dispatchEvent(eventStateChange);
} */

/*--------------------------------------------*/
function redirectToBrigadeiros() {
	const eventStateChange = CriaEventStateChange("/brigadeiros");
	window.dispatchEvent(eventStateChange);
}

function redirectToCupcakes() {
	const eventStateChange = CriaEventStateChange("/cupcakes");
	window.dispatchEvent(eventStateChange);
}

function redirectToDoces() {
	const eventStateChange = CriaEventStateChange("/doces");
	window.dispatchEvent(eventStateChange);
}
