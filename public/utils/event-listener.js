const eventCache = new WeakMap();

/**
 * @template {keyof HTMLElementEventMap} K
 * @param {Element} element
 * @param {K} eventName
 * @param {(this: Element, ev: HTMLElementEventMap[K]) => any} eventHandler
 */
export function addUniqueEventListener(element, eventName, eventHandler) {
    if (!eventCache.has(element)) {
        eventCache.set(element, {});
    }

    const previousEventHandler = eventCache.get(element)[eventName];
    console.log(previousEventHandler);
    if (previousEventHandler) {
        element.removeEventListener(eventName, previousEventHandler);
    }

    eventCache.get(element)[eventName] = eventHandler;
    element.addEventListener(eventName, eventHandler);
}
