import React from "react";
import * as d3 from "d3";
import { Monthly } from "../../../store/types";
import { hoverWaterFillColor } from "../chart-colors";
import { useStatsStore } from "../../../store/stats-store";

interface HoveringBarsProps {
	last3Years: Monthly[];
	xScale: d3.ScaleBand<string>;
	svgMargin: { top: number; right: number; bottom: number; left: number };
	setHoveredMonth: React.Dispatch<React.SetStateAction<Monthly | undefined>>;
	hoveredMonth: Monthly | undefined;
	formatMonth: (date: string) => string;
}

export const HoveringBars: React.FC<HoveringBarsProps> = ({
	last3Years,
	xScale,
	svgMargin,
	hoveredMonth,
	setHoveredMonth,
	formatMonth,
}) => {
	const { chartHeight: height } = useStatsStore();

	return (
		<>
			{last3Years.map((monthly) => (
				<rect
					key={monthly.month}
					data-month={monthly.month}
					className="barHover"
					x={xScale(formatMonth(monthly.month)) || 0}
					y={-svgMargin.bottom}
					width={xScale.bandwidth() + 1.5}
					height={height}
					fill={
						hoveredMonth && hoveredMonth.month === monthly.month
							? hoverWaterFillColor
							: "transparent"
					}
					opacity={0.1}
					onMouseLeave={() => setHoveredMonth(undefined)}
					onMouseEnter={() => setHoveredMonth(monthly)}
					onClick={() => setHoveredMonth(monthly)}
				></rect>
			))}
		</>
	);
};
