/* eslint-disable max-lines */
import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import { useMapStore } from "../map-store";
import { useTreeCircleStyle } from "./use-tree-circle-style";
import { useMapConstants } from "./use-map-constants";
import { useMapTreesInteraction } from "./use-map-trees-interaction";
import { useMapPumpsInteraction } from "./use-map-pumps-interaction";
import { useFilterStore } from "../../filter/filter-store";
import { usePumpIconStyle } from "./use-pump-icon-style";
import { useMapInteraction } from "./use-map-interaction";

export function useMapSetup(
	mapContainer: React.MutableRefObject<HTMLDivElement | null>,
) {
	const {
		MAP_PITCH_DEGREES,
		MAP_MIN_ZOOM_LEVEL,
		MAP_MAX_ZOOM_LEVEL,
		MAP_INITIAL_ZOOM_LEVEL,
		MAP_CENTER_LNG,
		MAP_CENTER_LAT,
		MAP_PUMP_IMAGE_ICONS,
		MAP_LOCATION_ZOOM_LEVEL,
	} = useMapConstants();

	const { map, setMap, setIsMapLoaded } = useMapStore();

	useMapTreesInteraction(map);
	useMapPumpsInteraction(map);
	useMapInteraction(map);

	const {
		circleRadius,
		circleOpacity,
		circleStrokeColor,
		circleColor,
		circleStrokeWidth,
	} = useTreeCircleStyle();

	const { selectedPumpIcon, unselectedPumpIcon, pumpIconSize } =
		usePumpIconStyle();

	const isPumpsVisible = useFilterStore((store) => store.isPumpsVisible);

	useEffect(() => {
		if (!mapContainer.current) {
			return;
		}

		const initializedMap = new mapboxgl.Map({
			container: mapContainer.current,
			style: import.meta.env.VITE_MAPBOX_STYLE_URL,
			center: [MAP_CENTER_LNG, MAP_CENTER_LAT],
			zoom: MAP_INITIAL_ZOOM_LEVEL,
			minZoom: MAP_MIN_ZOOM_LEVEL,
			maxZoom: MAP_MAX_ZOOM_LEVEL,
			pitch: MAP_PITCH_DEGREES,
		});

		initializedMap.on("load", async () => {
			initializedMap.addSource("trees", {
				type: "vector",
				url: import.meta.env.VITE_MAPBOX_TREES_TILESET_URL,
				promoteId: "id",
			});

			initializedMap.addLayer({
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

			Promise.all(
				MAP_PUMP_IMAGE_ICONS.map(
					(img) =>
						new Promise<void>((resolve) => {
							initializedMap.loadImage(img.url, function (error, image) {
								if (error || !image) {
									return;
								}
								initializedMap.addImage(img.id, image);
								resolve();
							});
						}),
				),
			).then(() => {
				initializedMap.addSource("pumps", {
					type: "geojson",
					data: import.meta.env.VITE_MAP_PUMPS_SOURCE_URL,
					promoteId: "id",
				});

				initializedMap.addLayer({
					id: "pumps",
					type: "symbol",
					source: "pumps",
					layout: {
						"icon-allow-overlap": true,
						"icon-anchor": "top",
						visibility: isPumpsVisible ? "visible" : "none",
						"icon-image": unselectedPumpIcon,
						"icon-size": pumpIconSize,
					},
				});

				initializedMap.addLayer({
					id: "pumps-highlight",
					type: "symbol",
					source: "pumps",
					filter: ["==", "id", ""],
					layout: {
						"icon-allow-overlap": true,
						"icon-anchor": "top",
						visibility: isPumpsVisible ? "visible" : "none",
						"icon-image": selectedPumpIcon,
						"icon-size": pumpIconSize,
					},
				});
			});
			setIsMapLoaded(true);
		});

		const geoLocateControl = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},
			// Draw an arrow next to the location dot to indicate which direction the device is heading.
			showUserHeading: true,
			showAccuracyCircle: false,
		});
		geoLocateControl.on("geolocate", function (e) {
			const { coords } = e as {
				coords: { longitude: number; latitude: number };
			};

			initializedMap.easeTo({
				center: [coords.longitude, coords.latitude],
				zoom: MAP_LOCATION_ZOOM_LEVEL,
				pitch: MAP_PITCH_DEGREES,
			});
		});
		initializedMap.addControl(geoLocateControl, "bottom-left");
		initializedMap.addControl(
			new mapboxgl.NavigationControl({ showCompass: false, showZoom: true }),
			"bottom-left",
		);

		setMap(initializedMap);
	}, [mapContainer]);
}
