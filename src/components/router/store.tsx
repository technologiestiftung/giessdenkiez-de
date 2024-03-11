import { create } from "zustand";
import { trackPageView } from "../matomo/utils/matomo";
import { URLSearchParams } from "url";

interface URLState {
  url: URL;
  setPathname: (url: string) => void;
  setSearchParams: (searchParams: URLSearchParams) => void;
}

export const useUrlState = create<URLState>()((set, get) => ({
  url: new URL(window.location.href),

  setPathname: (pathname) => {
    const url = new URL(get().url);
    url.pathname = pathname;
    url.search = "";

    set({ url });

    window.history.pushState({}, "", url);
    trackPageView();
  },

  setSearchParams: (searchParams: URLSearchParams) => {
    const url = new URL(get().url);
    url.search = searchParams.toString();

    set({ url });

    window.history.pushState({}, "", url);
    trackPageView();
  },

  setSearchParams: (searchParams: URLSearchParams) => {
    const url = new URL(get().url);
    url.search = searchParams.toString();

    set({ url });

    window.history.pushState({}, "", url);
    trackPageView();
  },
}));
