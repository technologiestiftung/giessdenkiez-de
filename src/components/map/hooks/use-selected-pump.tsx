import { useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import { Pump, usePumpStore } from "./use-pump-store";
import { useShallow } from "zustand/react/shallow";

export function useSelectedPump(map: mapboxgl.Map | undefined) {
	const [selectedPump, setSelectedPump] = usePumpStore(
		useShallow((store) => [store.selectedPump, store.setSelectedPump]),
	);

	const selectedPumpRef = useRef<Pump | undefined>(undefined);

	useEffect(() => {
		if (!map) {
			return;
		}
		if (selectedPumpRef.current) {
			map.setFilter("pumps-highlight", ["==", "id", ""]);
		}

		if (selectedPump) {
			map.setFilter("pumps-highlight", ["==", "id", selectedPump.id]);
		}

		selectedPumpRef.current = selectedPump;
	}, [selectedPump]);

	return { selectedPump, setSelectedPump, selectedPumpRef };
}
