import * as mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useTreeStore } from "../../tree-detail/stores/tree-store";
import { useUrlState } from "../../router/store";
import { useShallow } from "zustand/react/shallow";

export function useSelectedTree(map: mapboxgl.Map | undefined) {
	const [addSearchParam, removeSearchParam] = useUrlState(
		useShallow((state) => [state.addSearchParam, state.removeSearchParam]),
	);

	const [selectedTreeId, setSelectedTreeId] = useTreeStore(
		useShallow((store) => [store.selectedTreeId, store.setSelectedTreeId]),
	);

	const selectedTreeIdRef = useRef<string | undefined>(undefined);

	const setSelectState = (id: string, isSelected: boolean) => {
		if (!map) {
			return;
		}

		if (map.isStyleLoaded()) {
			map.setFeatureState(
				{
					id: id,
					source: "trees",
					sourceLayer: "trees",
				},
				{ select: isSelected },
			);
		} else {
			map.on("styledata", () => {
				map.setFeatureState(
					{
						id: id,
						source: "trees",
						sourceLayer: "trees",
					},
					{ select: isSelected },
				);
			});
		}

		if (isSelected) {
			addSearchParam("treeId", id);
		} else {
			removeSearchParam("treeId");
		}
	};

	useEffect(() => {
		if (!map) {
			return;
		}

		if (selectedTreeIdRef.current) {
			setSelectState(selectedTreeIdRef.current, false);
		}

		if (selectedTreeId) {
			setSelectState(selectedTreeId, true);
		}

		selectedTreeIdRef.current = selectedTreeId;
	}, [selectedTreeId]);

	return { selectedTreeIdRef, setSelectedTreeId };
}
