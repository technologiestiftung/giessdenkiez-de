import React, { useMemo } from "react";
import { formatDate } from "date-fns";
import * as d3 from "d3";
import { useStatsStore } from "../../../store/stats-store";

interface XAxisProps {
	svgMargin: { top: number; right: number; bottom: number; left: number };
	xScale: d3.ScaleTime<number, number, never>;
}

export const XAxis: React.FC<XAxisProps> = ({ svgMargin, xScale }) => {
	const {
		chartWidth: width,
		chartHeight: height,
		yearlyAverageAmountPerWatering: yearlyData,
	} = useStatsStore();

	const tickValues = useMemo(
		() => yearlyData.map((d) => new Date(d.year)),
		[yearlyData],
	);
	const xAxis = useMemo(
		() => tickValues.map((d) => xScale(d)),
		[tickValues, xScale],
	);
	const xAxisLabels = useMemo(
		() => tickValues.map((d) => formatDate(d as Date, "yyyy")),
		[tickValues, xScale],
	);

	return (
		<>
			<g
				transform={`translate(0, ${height - svgMargin.bottom})`}
				fontSize="10"
				textAnchor="middle"
			>
				<line
					stroke="currentColor"
					x1={svgMargin.left}
					x2={width - svgMargin.right}
				></line>
				{xAxis.map((x, i) => (
					<g
						key={x}
						className="tick"
						opacity="1"
						transform={`translate(${x}, 0)`}
					>
						<line y2="6" stroke="currentColor"></line>
						<text fill="#0A4295" y="9" dy="0.71em" fontFamily="IBM">
							{xAxisLabels[i]}
						</text>
					</g>
				))}
			</g>
		</>
	);
};
