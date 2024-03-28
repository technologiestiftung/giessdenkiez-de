import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useTreeStore } from "../../tree-detail/tree-store";
import { useUrlState } from "../../router/store";

export function useSelectedTree(map: mapboxgl.Map | undefined) {
	const [addSearchParam, removeSearchParam] = useUrlState((state) => [
		state.addSearchParam,
		state.removeSearchParam,
	]);

	const [selectedTreeId, setSelectedTreeId] = useTreeStore((store) => [
		store.selectedTreeId,
		store.setSelectedTreeId,
	]);

	const selectedTreeIdRef = useRef<string | undefined>(undefined);

	useEffect(() => {
		if (!map) {
			return;
		}

		if (selectedTreeIdRef.current) {
			map.setFeatureState(
				{
					id: selectedTreeIdRef.current,
					source: "trees",
					sourceLayer: "trees",
				},
				{ select: false },
			);
			removeSearchParam("treeId");
		}

		if (selectedTreeId) {
			map.setFeatureState(
				{
					id: selectedTreeId,
					source: "trees",
					sourceLayer: "trees",
				},
				{ select: true },
			);
			addSearchParam("treeId", selectedTreeId);
		}

		selectedTreeIdRef.current = selectedTreeId;
	}, [selectedTreeId]);

	return { selectedTreeIdRef, setSelectedTreeId };
}
