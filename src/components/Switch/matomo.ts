declare global {
  interface Window {
    _mtm: any[];
  }
}

export function trackClick() {
  window._mtm.push(['feedback', 'feedback', 'clickedButton']);
}
