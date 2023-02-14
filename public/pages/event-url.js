export default function CriaEventStateChange(urlParameter) {
	const eventStateChange = new CustomEvent("onstatechange", {
		detail: { url: urlParameter },
	});

	return eventStateChange;
}
