import mapboxgl from "mapbox-gl";
import { create } from "zustand";

interface URLState {
  map: mapboxgl.Map | undefined;
  setMap: (map: mapboxgl.Map | undefined) => void;
}

export const useMapStore = create<URLState>()((set, get) => ({
  map: undefined,
  setMap: (map: mapboxgl.Map | undefined) => {
    set({ map });
  },
}));
