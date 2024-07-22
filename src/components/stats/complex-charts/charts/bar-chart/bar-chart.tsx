import React, { useCallback, useMemo } from "react";
import * as d3 from "d3";
import { useStatsStore } from "../../../store/stats-store";
import { Monthly } from "../../../store/types";
import { IndicatorLine } from "./indicator-line";
import { HoveringBars } from "./hovering-bars";
import { RainLine } from "./rain-line";
import { TemperatureLine } from "./temperature-line";
import { WateringBars } from "./watering-bars";
import { XAxis } from "./x-axis";
import { Legend } from "./legend";

/**
 * This bar chart displays the monthly watering amount,
 * the average temperature and the total rainfall
 */
export const BarChart: React.FC = () => {
	const {
		orderedMonthlyWaterings,
		monthlyWeather: weatherData,
		chartWidth: width,
		chartHeight: height,
	} = useStatsStore();

	const [hoveredMonth, setHoveredMonth] = React.useState<Monthly | undefined>();

	const svgMargin = { top: 0, right: 30, bottom: 30, left: 20 };
	const last3Years = useMemo(
		() => orderedMonthlyWaterings.slice(-3 * 12),
		[orderedMonthlyWaterings],
	);

	const formatMonth = useCallback((date: string) => {
		return `${date.split("-")[1]}.${date.split("-")[0]}`;
	}, []);

	const xScale = useCallback(
		d3
			.scaleBand()
			.domain(last3Years.map((d) => formatMonth(d.month)))
			.range([svgMargin.left, width - svgMargin.right])
			.padding(0.2),
		[last3Years, width, svgMargin],
	);

	const yScale = useCallback(
		d3
			.scaleLinear()
			.domain([0, d3.max(last3Years, (d) => d.totalSum) || 0])
			.nice()
			.range([height, svgMargin.bottom]),
		[last3Years, height, svgMargin],
	);

	const weatherXScale = useCallback(
		d3
			.scaleTime()
			.domain(d3.extent(weatherData, (d) => new Date(d.month)) as [Date, Date])
			.range([svgMargin.left, width - svgMargin.right]),
		[weatherData, width, svgMargin],
	);

	return (
		<div className="relative" id="bar-container">
			<svg width={width} height={height}>
				<IndicatorLine svgMargin={svgMargin} yScale={yScale} />

				<HoveringBars
					xScale={xScale}
					last3Years={last3Years}
					svgMargin={svgMargin}
					setHoveredMonth={setHoveredMonth}
					hoveredMonth={hoveredMonth}
					formatMonth={formatMonth}
				/>

				<RainLine weatherXScale={weatherXScale} svgMargin={svgMargin} />

				<TemperatureLine weatherXScale={weatherXScale} svgMargin={svgMargin} />

				<WateringBars
					xScale={xScale}
					yScale={yScale}
					last3Years={last3Years}
					svgMargin={svgMargin}
					setHoveredMonth={setHoveredMonth}
					hoveredMonth={hoveredMonth}
					formatMonth={formatMonth}
				/>

				<XAxis xScale={xScale} svgMargin={svgMargin} last3Years={last3Years} />
			</svg>

			<Legend hoveredMonth={hoveredMonth} formatMonth={formatMonth} />
		</div>
	);
};
