import mapboxgl from "mapbox-gl";

/* eslint-disable-next-line no-shadow */
enum UpdateAction {
	ADD = "ADD",
	REMOVE = "REMOVE",
}

/* eslint-disable-next-line max-params */
function updateTreeWaterings(
	map: mapboxgl.Map | undefined,
	treeId: string,
	amount: number,
	updateAction: UpdateAction,
) {
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
}

export const addTodayWatering = (
	map: mapboxgl.Map | undefined,
	treeId: string,
	amount: number,
) => {
	updateTreeWaterings(map, treeId, amount, UpdateAction.ADD);
};

export const removeTodayWatering = (
	map: mapboxgl.Map | undefined,
	treeId: string,
	amount: number,
) => {
	updateTreeWaterings(map, treeId, amount, UpdateAction.REMOVE);
};
