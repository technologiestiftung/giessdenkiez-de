import mapboxgl from "mapbox-gl";
import { create } from "zustand";

interface MapState {
	map: mapboxgl.Map | undefined;
	setMap: (map: mapboxgl.Map | undefined) => void;
	isMapLoaded: boolean;
	setIsMapLoaded: (isMapLoaded: boolean) => void;
}

export const useMapStore = create<MapState>()((set) => ({
	map: undefined,
	setMap: (map: mapboxgl.Map | undefined) => {
		set({ map });
	},
	isMapLoaded: false, // Rename 'mapLoaded' to 'isMapLoaded'
	setIsMapLoaded: (isMapLoaded: boolean) => {
		// Update setter function name
		set({ isMapLoaded });
	},
}));
