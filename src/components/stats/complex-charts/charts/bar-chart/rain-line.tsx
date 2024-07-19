import { defaultWaterFillColor } from "../chart-colors";
import * as d3 from "d3";
import { MonthlyWeather } from "../../../store/types";
import React, { useCallback } from "react";
import { useStatsStore } from "../../../store/stats-store";

interface RainLineProps {
	weatherXScale: d3.ScaleTime<number, number, never>;
	svgMargin: { top: number; right: number; bottom: number; left: number };
}

export const RainLine: React.FC<RainLineProps> = ({
	weatherXScale,
	svgMargin,
}) => {
	const { monthlyWeather: weatherData, chartHeight: height } = useStatsStore();

	const rainYScale = useCallback(
		d3
			.scaleLinear()
			.domain([0, d3.max(weatherData, (d) => d.totalRainfallLiters)] as [
				number,
				number,
			])
			.range([height / 2, 0]),
		[weatherData, height],
	);

	return (
		<>
			<path
				fill="none"
				stroke={defaultWaterFillColor}
				strokeWidth={1.5}
				strokeDasharray="2"
				opacity={0.3}
				d={
					d3
						.line<MonthlyWeather>()
						.x((d) => weatherXScale(new Date(d.month)) + 3)
						.y(
							(d) =>
								height / 2 +
								rainYScale(d.totalRainfallLiters) -
								svgMargin.bottom,
						)(weatherData) ?? ""
				}
			></path>
		</>
	);
};
