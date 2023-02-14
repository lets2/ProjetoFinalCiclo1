import Principal from "./main-page.js";
import Brigadeiros from "./brigadeiros-page.js";
import Cupcakes from "./cupcakes-page.js";
import Doces from "./doces-page.js";

export default function GeraObjComRotas() {
	const objRotas = {
		"/": Principal(),
		"/brigadeiros": Brigadeiros(),
		"/cupcakes": Cupcakes(),
		"/doces": Doces(),
		getPage: function (url) {
			return this[url];
		},
	};
	return objRotas;
}
