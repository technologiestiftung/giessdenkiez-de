import React, { useCallback } from "react";
import * as d3 from "d3";
import { temperatureFillColor } from "../chart-colors";
import { MonthlyWeather } from "../../../store/types";
import { useStatsStore } from "../../../store/stats-store";

interface TemperatureLineProps {
	weatherXScale: d3.ScaleTime<number, number, never>;
	svgMargin: { top: number; right: number; bottom: number; left: number };
}

export const TemperatureLine: React.FC<TemperatureLineProps> = ({
	weatherXScale,
	svgMargin,
}) => {
	const { monthlyWeather: weatherData, chartHeight: height } = useStatsStore();

	const temperatureYScale = useCallback(
		d3
			.scaleLinear()
			.domain([0, d3.max(weatherData, (d) => d.averageTemperatureCelsius)] as [
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
				stroke={temperatureFillColor}
				strokeWidth={1.5}
				opacity={0.3}
				d={
					d3
						.line<MonthlyWeather>()
						.x((d) => weatherXScale(new Date(d.month)) + 3)
						.y(
							(d) =>
								height / 2 +
								temperatureYScale(d.averageTemperatureCelsius) -
								svgMargin.bottom,
						)(weatherData) ?? ""
				}
			></path>
		</>
	);
};
