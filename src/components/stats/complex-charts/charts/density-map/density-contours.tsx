import React, { useCallback, useMemo } from "react";
import * as d3 from "d3";
import { densityHighColor, densityLowColor } from "../chart-colors";
import { useStatsStore } from "../../../store/stats-store";

interface DensityContoursProps {
	projection: d3.GeoProjection;
}

interface DataPoint {
	lat: number;
	lng: number;
	amount: number;
}

export const DensityContours: React.FC<DensityContoursProps> = ({
	projection,
}) => {
	const { chartWidth: width, chartHeight: height, gdkStats } = useStatsStore();
	const wateringData = gdkStats?.waterings || [];

	const xScale = useCallback(
		d3.scaleLinear().domain([0, width]).range([0, width]),
		[width],
	);
	const yScale = useCallback(
		d3.scaleLinear().domain([0, height]).range([0, height]),
		[height],
	);

	const wateringProjections = useMemo(
		() =>
			wateringData
				.map((d) => {
					const projected = projection([d.lng, d.lat]);
					if (!projected) {
						return null;
					}
					return {
						lat: projected[1],
						lng: projected[0],
						amount: d.amount,
					};
				})
				.filter((d) => d !== null) as DataPoint[],
		[wateringData, projection],
	);

	const densityContours = useMemo(
		() =>
			d3
				.contourDensity<DataPoint>()
				.x((d) => xScale(d.lng))
				.y((d) => yScale(d.lat))
				.size([width, height])
				.weight(() => 1)
				.bandwidth(4)
				.thresholds(30)(wateringProjections),
		[xScale, yScale, width, height, wateringProjections],
	);

	return (
		<>
			{densityContours.map((contour, index) => (
				<path
					key={index}
					d={d3.geoPath(d3.geoIdentity().scale(1))(contour) ?? ""}
					fill={d3.interpolateRgb(
						densityLowColor,
						densityHighColor,
					)(index / 10)}
					opacity={0.15}
				/>
			))}
		</>
	);
};
