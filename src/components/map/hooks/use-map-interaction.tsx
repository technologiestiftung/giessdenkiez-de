import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { useUrlState } from "../../router/store";
import useHoveredTree from "./use-hovered-tree";
import { useMapConstants } from "./use-map-constants";
import useSelectedTree from "./use-selected-tree";
import { useTreeStore } from "../../tree-detail/tree-store";
import { useFilterStore } from "../../filter/filter-store";

export function useMapInteraction(map: mapboxgl.Map | undefined) {
	const { MAP_MAX_ZOOM_LEVEL } = useMapConstants();

	const setSearchParams = useUrlState((state) => state.setSearchParams);

	const { setHoveredTreeId, hoveredTreeIdRef } = useHoveredTree();
	const { setSelectedTreeId, selectedTreeIdRef } = useSelectedTree();

	const { treeData } = useTreeStore();

	const isPumpsVisible = useFilterStore((store) => store.isPumpsVisible);

	useEffect(() => {
		if (!map) {
			return;
		}
		if (map.isStyleLoaded()) {
			map.setLayoutProperty(
				"pumps",
				"visibility",
				isPumpsVisible ? "visible" : "none",
			);
		}
	}, [map, isPumpsVisible]);

	useEffect(() => {
		if (treeData) {
			map?.on("load", () => {
				setSelectedTreeId(treeData.id);
				map.setFeatureState(
					{
						id: treeData.id,
						source: "trees",
						sourceLayer: "trees",
					},
					{ select: true },
				);
				map.easeTo({
					center: [parseFloat(treeData.lat), parseFloat(treeData.lng)],
					zoom: MAP_MAX_ZOOM_LEVEL,
					essential: true,
				});
			});
			return;
		}

		if (selectedTreeIdRef.current) {
			map?.setFeatureState(
				{
					id: selectedTreeIdRef.current,
					source: "trees",
					sourceLayer: "trees",
				},
				{ select: false },
			);
		}
	}, [treeData, map]);

	useEffect(() => {
		if (!map) {
			return;
		}

		map.on("mousemove", "trees", (e) => {
			if (!map || !e.features) {
				return;
			}
			if (e.features?.length === 0) {
				setHoveredTreeId(undefined);
			}
			const treeFeature = e.features[0];
			setHoveredTreeId(treeFeature.id as string);
			map.setFeatureState(treeFeature, { hover: true });
			map.getCanvas().style.cursor = "pointer";
			if (
				hoveredTreeIdRef.current &&
				treeFeature.id !== hoveredTreeIdRef.current
			) {
				map.setFeatureState(
					{
						id: hoveredTreeIdRef.current,
						source: "trees",
						sourceLayer: "trees",
					},
					{ hover: false },
				);
			}
		});

		map.on("click", "trees", (e) => {
			if (!map || !e.features) {
				return;
			}
			if (e.features?.length === 0) {
				setHoveredTreeId(undefined);
			}
			const treeFeature = e.features[0];

			if (selectedTreeIdRef.current) {
				map.setFeatureState(
					{
						id: selectedTreeIdRef.current,
						source: "trees",
						sourceLayer: "trees",
					},
					{ select: false },
				);
			}
			map.setFeatureState(
				{
					id: treeFeature.id as string,
					source: "trees",
					sourceLayer: "trees",
				},
				{ select: true },
			);
			setSelectedTreeId(treeFeature.id as string);
			map.easeTo({
				center: [
					//@ts-ignore
					treeFeature.geometry.coordinates[0],
					//@ts-ignore
					treeFeature.geometry.coordinates[1],
				],
				zoom: MAP_MAX_ZOOM_LEVEL,
				essential: true,
			});
			map.once("moveend", () => {
				setSearchParams(
					new URLSearchParams({ treeId: treeFeature.id as string }),
				);
			});
		});

		map.on("mouseleave", "trees", (_) => {
			if (map && hoveredTreeIdRef.current) {
				map.setFeatureState(
					{
						id: hoveredTreeIdRef.current,
						source: "trees",
						sourceLayer: "trees",
					},
					{ hover: false },
				);
				map.getCanvas().style.cursor = "";
			}
			setHoveredTreeId(undefined);
		});
	}, [map]);
}
