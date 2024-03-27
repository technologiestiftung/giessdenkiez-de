import { Expression } from "mapbox-gl";

export function usePumpIconStyle() {
	const unselectedPumpIcon = [
		"match",
		["get", "pump:status"],
		"funktionsfähig",
		"pump_functioning_unselected",
		"defekt",
		"pump_not_functioning_unselected",
		"pump_not_functioning_unselected",
	] as Expression;

	const selectedPumpIcon = [
		"match",
		["get", "pump:status"],
		"funktionsfähig",
		"pump_functioning_selected",
		"defekt",
		"pump_not_functioning_selected",
		"pump_not_functioning_selected",
	] as Expression;

	const pumpIconSize = {
		base: 0.1,
		stops: [
			[14, 0.1],
			[16, 0.4],
			[18, 0.6],
			[20, 0.8],
			[22, 1.0],
		],
	};

	return {
		unselectedPumpIcon,
		selectedPumpIcon,
		pumpIconSize,
	};
}
