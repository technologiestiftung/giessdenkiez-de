import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import { useMapSetup } from "./hooks/use-map-setup";
import MapAttribution from "./map-attribution";
import { useHoveredPump } from "./hooks/use-hovered-pump";
import { PumpTooltip } from "../pumps/pump-tooltip";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const Map: React.FC = () => {
	const mapContainer = useRef<HTMLDivElement | null>(null);

	useMapSetup(mapContainer);

	const { hoveredPump } = useHoveredPump();

	return (
		<div className="grid grid-cols-1 grid-rows-1">
			<div className="pointer-events-none z-[1000] col-start-1 row-start-1 flex items-end justify-end">
				<MapAttribution />
			</div>
			<div ref={mapContainer} className="col-start-1 row-start-1 h-screen" />
			{hoveredPump && <PumpTooltip pump={hoveredPump} />}
		</div>
	);
};

export default Map;
