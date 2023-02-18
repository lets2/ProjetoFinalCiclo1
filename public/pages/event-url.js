export default function CriaEventStateChange(
    urlParameter,
    criteriaParameter = {}
) {
    const eventStateChange = new CustomEvent("onstatechange", {
        detail: { url: urlParameter, criteria: criteriaParameter },
    });

    return eventStateChange;
}
