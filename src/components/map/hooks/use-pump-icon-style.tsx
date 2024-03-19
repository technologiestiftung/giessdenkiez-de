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
			[13, 0.1],
			[15, 0.2],
			[18, 0.3],
			[22, 0.8],
		],
	};

	return {
		unselectedPumpIcon,
		selectedPumpIcon,
		pumpIconSize,
	};
}
