declare global {
  interface Window {
    _mtm: any[];
  }
}

export function trackInteraction(eventName: string) {
  window._mtm.push(['feedback', 'feedback', eventName]);
}
