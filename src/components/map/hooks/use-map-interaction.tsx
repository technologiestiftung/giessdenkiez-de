import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { useFilterStore } from "../../filter/filter-store";
import { useHoveredPump } from "./use-hovered-pump";
import { useSelectedPump } from "./use-selected-pump";

export function useMapInteraction(map: mapboxgl.Map | undefined) {
	const { hideFilterView } = useFilterStore();

	const { setSelectedPump } = useSelectedPump(map);
	const { setHoveredPump } = useHoveredPump(map);

	useEffect(() => {
		if (!map) {
			return;
		}

		map.on("click", () => {
			setHoveredPump(undefined);
			setSelectedPump(undefined);
			hideFilterView();
		});
	}, [map]);
}
