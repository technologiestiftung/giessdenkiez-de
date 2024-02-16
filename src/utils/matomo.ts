declare global {
  interface Window {
    _paq: any[];
  }
}

export function trackInteraction(eventName: string) {
  window._paq.push(['trackEvent', 'button', eventName]);
}
