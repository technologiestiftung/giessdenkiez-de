import React from "react";
import * as d3 from "d3";
import { defaultWaterFillColor, hoverWaterFillColor } from "../chart-colors";
import { Monthly } from "../../../store/types";
import { useStatsStore } from "../../../store/stats-store";

interface WateringBarsProps {
	last3Years: Monthly[];
	xScale: d3.ScaleBand<string>;
	yScale: d3.ScaleLinear<number, number>;
	svgMargin: { top: number; right: number; bottom: number; left: number };
	setHoveredMonth: React.Dispatch<React.SetStateAction<Monthly | undefined>>;
	hoveredMonth: Monthly | undefined;
	formatMonth: (date: string) => string;
}

export const WateringBars: React.FC<WateringBarsProps> = ({
	last3Years,
	xScale,
	yScale,
	svgMargin,
	setHoveredMonth,
	hoveredMonth,
	formatMonth,
}) => {
	const { chartHeight: height } = useStatsStore();

	return (
		<>
			{last3Years.map((monthly) => (
				<rect
					key={monthly.month}
					className={"bar"}
					x={xScale(formatMonth(monthly.month)) || 0}
					y={yScale(monthly.totalSum) - svgMargin.bottom}
					rx={3}
					ry={3}
					width={xScale.bandwidth()}
					height={height - yScale(monthly.totalSum)}
					fill={
						hoveredMonth && hoveredMonth.month === monthly.month
							? hoverWaterFillColor
							: defaultWaterFillColor
					}
					onMouseLeave={() => setHoveredMonth(undefined)}
					onMouseEnter={() => setHoveredMonth(monthly)}
					onClick={() => setHoveredMonth(monthly)}
				></rect>
			))}
		</>
	);
};
