import mapboxgl from "mapbox-gl";

// TODO: find a reliable way to determine if the map is ready to accept "easeTo" or "setFeatureState" events
export const fireNowIfReadyOrLater = (map: mapboxgl.Map, fire: () => void) => {
	if (map.isStyleLoaded()) {
		fire();
	} else {
		map.once("styledata", () => {
			fire();
		});
		map.once("idle", () => {
			fire();
		});
	}
};
