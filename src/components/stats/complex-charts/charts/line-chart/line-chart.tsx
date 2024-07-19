import * as d3 from "d3";
import React, { useCallback } from "react";
import { useStatsStore } from "../../../store/stats-store";
import { YReferenceLines } from "./y-reference-lines";
import { Area } from "./area";
import { XAxis } from "./x-axis";
import { HoverableBars } from "./hoverable-bars";

/**
 * This line chart displays the yearly average watering amount
 */
export const LineChart: React.FC = () => {
	const {
		chartWidth: width,
		chartHeight: height,
		yearlyAverageAmountPerWatering: yearlyData,
	} = useStatsStore();

	const svgMargin = { top: 25, right: 25, bottom: 30, left: 20 };

	const xScale = useCallback(
		d3
			.scaleTime()
			.domain(d3.extent(yearlyData, (d) => new Date(d.year)) as [Date, Date])
			.range([svgMargin.left, width - svgMargin.right]),
		[yearlyData, width, svgMargin],
	);
	const yScale = useCallback(
		d3
			.scaleLinear()
			.domain([
				0,
				d3.max(yearlyData, (d) => d.averageAmountPerWatering) as number,
			])
			.nice()
			.range([height, svgMargin.bottom]),
		[yearlyData, height, svgMargin],
	);

	return (
		<div className="relative" id="area-container">
			<svg width={width} height={height}>
				<YReferenceLines yScale={yScale} svgMargin={svgMargin} />
				<Area xScale={xScale} yScale={yScale} svgMargin={svgMargin} />
				<XAxis xScale={xScale} svgMargin={svgMargin} />
				<HoverableBars xScale={xScale} yScale={yScale} svgMargin={svgMargin} />
			</svg>
		</div>
	);
};
