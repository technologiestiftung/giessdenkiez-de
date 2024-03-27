import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import { MapAttribution } from "./map-attribution";
import { useHoveredPump } from "./hooks/use-hovered-pump";
import { PumpTooltip } from "../pumps/pump-tooltip";
import { useSelectedPump } from "./hooks/use-selected-pump";
import { useMapStore } from "./map-store";
import { useMapSetup } from "./hooks/use-map-setup";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

export const Map: React.FC = () => {
	const mapContainer = useRef<HTMLDivElement | null>(null);

	useMapSetup(mapContainer);

	const { map } = useMapStore();

	const selectedPump = useSelectedPump(map).selectedPump;
	const hoveredPump = useHoveredPump(map).hoveredPump;
	const highlightedPump = selectedPump ?? hoveredPump;

	return (
		<div className="grid grid-cols-1 grid-rows-1">
			<div className="pointer-events-none z-[1000] col-start-1 row-start-1 flex items-end justify-end">
				<MapAttribution />
			</div>
			<div ref={mapContainer} className="col-start-1 row-start-1 h-screen" />
			{highlightedPump && <PumpTooltip pump={highlightedPump} />}
		</div>
	);
};
