import mapboxgl from "mapbox-gl";

/* eslint-disable-next-line no-shadow */
enum UpdateAction {
	ADD = "ADD",
	REMOVE = "REMOVE",
}

export function useUpdateTreeWaterings(map?: mapboxgl.Map) {
	const updateTreeWaterings = (
		treeId: string,
		amount: number,
		updateAction: UpdateAction,
	) => {
		const featureState = map?.getFeatureState({
			id: treeId,
			source: "trees",
			sourceLayer: "trees",
		});

		const todaysWateringAmount = featureState
			? parseInt(featureState.todays_waterings ?? 0)
			: 0;

		const todaysWateringSum =
			updateAction === UpdateAction.ADD
				? todaysWateringAmount + amount
				: todaysWateringAmount - amount;

		map?.setFeatureState(
			{
				id: treeId,
				source: "trees",
				sourceLayer: "trees",
			},
			{ todays_waterings: todaysWateringSum },
		);
	};

	const addTodayWatering = (treeId: string, amount: number) => {
		updateTreeWaterings(treeId, amount, UpdateAction.ADD);
	};

	const removeTodayWatering = (treeId: string, amount: number) => {
		updateTreeWaterings(treeId, amount, UpdateAction.REMOVE);
	};

	return { addTodayWatering, removeTodayWatering };
}
