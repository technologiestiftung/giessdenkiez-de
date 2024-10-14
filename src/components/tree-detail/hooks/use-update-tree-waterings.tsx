import * as mapboxgl from "mapbox-gl";

/* eslint-disable-next-line no-shadow */
enum UpdateAction {
	ADD = "ADD",
	REMOVE = "REMOVE",
}

function getTodaysWaterings(
	featureState: { [p: string]: unknown } | null | undefined,
) {
	if (!featureState || !featureState.todays_waterings) {
		return 0;
	}

	if (typeof featureState.todays_waterings === "string") {
		return parseInt(featureState.todays_waterings);
	}

	if (typeof featureState.todays_waterings === "number") {
		return featureState.todays_waterings;
	}

	console.error(
		"could not parse featureState.todays_watering:",
		featureState.todays_waterings,
	);

	return 0;
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

	const todaysWateringAmount = getTodaysWaterings(featureState);

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
