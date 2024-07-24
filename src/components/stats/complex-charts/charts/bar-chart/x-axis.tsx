import React, { useMemo } from "react";
import * as d3 from "d3";
import { defaultLabelColor } from "../chart-colors";
import { useStatsStore } from "../../../store/stats-store";
import { Monthly } from "../../../store/types";

interface XAxis {
	xScale: d3.ScaleBand<string>;
	last3Years: Monthly[];
	svgMargin: { top: number; right: number; bottom: number; left: number };
}

export const XAxis: React.FC<XAxis> = ({ xScale, last3Years, svgMargin }) => {
	const { chartWidth: width, chartHeight: height } = useStatsStore();

	const xAxis = useMemo(
		() =>
			xScale.domain().filter((_, i) => {
				return (
					i === 0 ||
					i === last3Years.length - 1 ||
					i === Math.floor(last3Years.length / 2)
				);
			}),
		[xScale, last3Years],
	);

	return (
		<>
			<g
				transform={`translate(0, ${height - svgMargin.bottom})`}
				fontSize="10"
				fontFamily="sans-serif"
				textAnchor="middle"
			>
				<line
					stroke="currentColor"
					x1={svgMargin.left}
					x2={width - svgMargin.right}
				></line>
				{xAxis.map((month) => (
					<g
						key={month}
						className={"tick"}
						opacity={"1"}
						transform={`translate(${(xScale(month) ?? 0) + 3}, 0)`}
					>
						<line y2={"6"} stroke={"currentColor"}></line>
						<text fill={defaultLabelColor} fontFamily={"IBM"} y="9" dy="0.71em">
							{month}
						</text>
					</g>
				))}
			</g>
		</>
	);
};
