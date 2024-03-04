import { create } from "zustand";
import { trackPageView } from "../matomo/utils/matomo";

interface URLState {
  url: URL;
  setPathname: (url: string) => void;
}

export const useUrlState = create<URLState>()((set, get) => ({
  url: new URL(window.location.href),

  setPathname: (pathname) => {
    const url = new URL(get().url);
    url.pathname = pathname;

    set({ url });

    window.history.pushState({}, "", url);
    trackPageView();
  },
}));
