export function trackInteraction(eventName: string) {
  window._paq.push(["trackEvent", "button", eventName]);
}

export function trackPageView() {
  window._paq.push(["trackPageView"]);
}
