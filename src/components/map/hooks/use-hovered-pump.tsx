import mapboxgl from "mapbox-gl";
import { create } from "zustand";

export interface Pump {
	id: number;
	status: string;
	address: string;
	lastCheck: string;
	x: number;
	y: number;
}

interface HoveredPumpState {
	hoveredPump: Pump | undefined;
	setHoveredPump: (pump: Pump | undefined) => void;
	mapboxFeatureToPump: (
		map: mapboxgl.Map,
		feature: mapboxgl.MapboxGeoJSONFeature,
		event: mapboxgl.MapMouseEvent,
	) => Pump | undefined;
}

export const useHoveredPump = create<HoveredPumpState>((set) => ({
	hoveredPump: undefined,
	setHoveredPump: (pump) => set({ hoveredPump: pump }),
	mapboxFeatureToPump: (map, feature, event) => {
		if (!feature.properties) {
			return undefined;
		}

		const pixelCoords = map.project(feature.geometry.coordinates);
		const xPixel = pixelCoords.x;
		const yPixel = pixelCoords.y;

		return {
			id: feature.properties.id as number,
			status: feature.properties["pump:status"] as string,
			address: feature.properties["addr:full"] as string,
			lastCheck: feature.properties["check_date"] as string,
			x: xPixel, //event.point.x,
			y: yPixel, //event.point.y,
		};
	},
}));
