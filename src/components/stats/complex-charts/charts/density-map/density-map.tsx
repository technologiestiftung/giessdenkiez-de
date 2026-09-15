import * as d3 from "d3";
import React, { useCallback } from "react";
import { useStatsStore } from "../../../store/stats-store";
import { useBerlinDistrictsGeojson } from "./hooks/use-berlin-districts-geojson";
import { BerlinDistrictPaths } from "./berlin-district-paths";
import { DensityContours } from "./density-contours";
import { Legend } from "./legend";

/**
 * This density map chart highlights the distribution of the waterings.
 */
export const DensityMap: React.FC = () => {
	const { chartWidth: width, chartHeight: height } = useStatsStore();
	const berlinDistrictsGeoJson = useBerlinDistrictsGeojson();

	const svgMargin = { top: 0, right: 0, bottom: 5, left: 0 };
	const innerHeight = height - svgMargin.top - svgMargin.bottom;

	const scale = width < height ? width / 0.012 : height / 0.012;

	const projection = useCallback(
		d3
			.geoMercator()
			.center([13.4, 52.5])
			.translate([width / 2, innerHeight / 2])
			.scale(scale),
		[width, height, scale],
	);

	/**
	 * `chartWidth` starts at 0 and is only set once `onResize` finds the chart
	 * container, which does not exist while the stats are still loading. Drawing
	 * in that frame collapses every coordinate onto the projection's translate
	 * and can emit paths with NaN, which Chromium reports as an invalid `d`.
	 */
	if (!width) {
		return <svg width={width} height={height} />;
	}

	return (
		<svg width={width} height={height}>
			<BerlinDistrictPaths
				projection={projection}
				berlinDistrictsGeoJson={berlinDistrictsGeoJson}
			/>

			<DensityContours projection={projection} />

			<Legend />
		</svg>
	);
};
