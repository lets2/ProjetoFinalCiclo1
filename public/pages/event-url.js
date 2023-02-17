export default function CriaEventStateChange(
    urlParameter,
    indexParameter = null
) {
    const eventStateChange = new CustomEvent("onstatechange", {
        detail: { url: urlParameter, index: indexParameter },
    });

    return eventStateChange;
}
