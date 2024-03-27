import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Pump, usePumpStore } from "./use-pump-store";

export function useHoveredPump(map: mapboxgl.Map | undefined) {
	const [hoveredPump, setHoveredPump] = usePumpStore((store) => [
		store.hoveredPump,
		store.setHoveredPump,
	]);

	const hoveredPumpRef = useRef<Pump | undefined>(undefined);

	useEffect(() => {
		if (!map) {
			return;
		}

		if (hoveredPumpRef.current) {
			map.setFilter("pumps-highlight", ["==", "id", ""]);
		}

		if (hoveredPump) {
			map.setFilter("pumps-highlight", ["==", "id", hoveredPump.id]);
		}

		hoveredPumpRef.current = hoveredPump;
	}, [hoveredPump]);

	return { hoveredPump, setHoveredPump, hoveredPumpRef };
}
