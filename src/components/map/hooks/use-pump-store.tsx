import * as mapboxgl from "mapbox-gl";
import { create } from "zustand";

export interface Pump {
	id: number;
	status: string;
	address: string;
	lastCheck: string;
	x: number;
	y: number;
	lat: number;
	lng: number;
}

interface PumpStore {
	selectedPump: Pump | undefined;
	setSelectedPump: (pump: Pump | undefined) => void;
	hoveredPump: Pump | undefined;
	setHoveredPump: (pump: Pump | undefined) => void;
	mapboxFeatureToPump: (
		map: mapboxgl.Map,
		feature: mapboxgl.MapboxGeoJSONFeature,
	) => Pump | undefined;
	updatePumpPosition: (map: mapboxgl.Map, pump: Pump) => Pump;
}

export const usePumpStore = create<PumpStore>((set) => ({
	selectedPump: undefined,
	setSelectedPump: (pump) => set({ selectedPump: pump }),
	hoveredPump: undefined,
	setHoveredPump: (pump) => set({ hoveredPump: pump }),
	mapboxFeatureToPump: (map, feature) => {
		if (!feature.properties) {
			return undefined;
		}

		//@ts-expect-error no types for geometry.coordinates
		const coordinates = feature.geometry.coordinates;
		const pixelCoords = map.project(coordinates);
		const xPixel = pixelCoords.x;
		const yPixel = pixelCoords.y;

		return {
			id: feature.properties.id as number,
			status: feature.properties["pump:status"] as string,
			address: feature.properties["addr:full"] as string,
			lastCheck: feature.properties["check_date"] as string,
			x: xPixel,
			y: yPixel,
			lat: coordinates[1],
			lng: coordinates[0],
		};
	},
	updatePumpPosition: (map, pump) => {
		const pixelCoords = map.project([pump.lng, pump.lat]);
		const xPixel = pixelCoords.x;
		const yPixel = pixelCoords.y;

		return {
			...pump,
			x: xPixel,
			y: yPixel,
		};
	},
}));
