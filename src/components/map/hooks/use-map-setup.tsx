import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import { useMapStore } from "../map-store";
import { useCirclePaint } from "./use-circle-paint";
import { useMapConstants } from "./use-map-constants";
import { useMapInteraction } from "./use-map-interaction";

export function useMapSetup(
	mapContainer: React.MutableRefObject<HTMLDivElement | null>,
) {
	const {
		MAP_PITCH_DEGREES,
		MAP_MIN_ZOOM_LEVEL,
		MAP_INITIAL_ZOOM_LEVEL,
		MAP_CENTER_LNG,
		MAP_CENTER_LAT,
	} = useMapConstants();

	const { map, setMap } = useMapStore();
	useMapInteraction(map);

	const {
		circleRadius,
		circleOpacity,
		circleStrokeColor,
		circleColor,
		circleStrokeWidth,
	} = useCirclePaint();

	useEffect(() => {
		if (!mapContainer.current) {
			return;
		}

		const map = new mapboxgl.Map({
			container: mapContainer.current!,
			style: import.meta.env.VITE_MAPBOX_STYLE_URL,
			center: [MAP_CENTER_LNG, MAP_CENTER_LAT],
			zoom: MAP_INITIAL_ZOOM_LEVEL,
			minZoom: MAP_MIN_ZOOM_LEVEL,
			pitch: MAP_PITCH_DEGREES,
		});

		map.on("load", () => {
			map.addSource("trees", {
				type: "vector",
				url: import.meta.env.VITE_MAPBOX_TREES_TILESET_URL,
				promoteId: "id",
			});

			map.addLayer({
				id: "trees",
				type: "circle",
				source: "trees",
				"source-layer": import.meta.env.VITE_MAPBOX_TREES_TILESET_LAYER,
				interactive: true,
				paint: {
					"circle-pitch-alignment": "map",
					"circle-radius": circleRadius,
					"circle-opacity": circleOpacity,
					"circle-stroke-color": circleStrokeColor,
					"circle-color": circleColor,
					"circle-stroke-width": circleStrokeWidth,
				},
			});
		});

		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				// When active the map will receive updates to the device's location as it changes.
				trackUserLocation: true,
				// Draw an arrow next to the location dot to indicate which direction the device is heading.
				showUserHeading: true,
				showAccuracyCircle: false,
			}),
			"bottom-left",
		);
		map.addControl(
			new mapboxgl.NavigationControl({ showCompass: false, showZoom: true }),
			"bottom-left",
		);

		setMap(map);
	}, [mapContainer]);
}
