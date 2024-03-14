import mapboxgl from "mapbox-gl";
import { create } from "zustand";

interface MapState {
	map: mapboxgl.Map | undefined;
	setMap: (map: mapboxgl.Map | undefined) => void;
}

export const useMapStore = create<MapState>()((set) => ({
	map: undefined,
	setMap: (map: mapboxgl.Map | undefined) => {
		set({ map });
	},
}));
