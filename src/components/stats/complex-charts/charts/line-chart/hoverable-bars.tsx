import React, { MouseEvent, useState } from "react";
import { defaultLabelColor, hoverWaterFillColor } from "../chart-colors";
import * as d3 from "d3";
import { useStatsStore } from "../../../store/stats-store";

interface HoverableBarsProps {
	xScale: d3.ScaleTime<number, number, never>;
	yScale: d3.ScaleLinear<number, number, never>;
	svgMargin: { top: number; right: number; bottom: number; left: number };
}

export const HoverableBars: React.FC<HoverableBarsProps> = ({
	xScale,
	yScale,
	svgMargin,
}) => {
	const { chartHeight: height, yearlyAverageAmountPerWatering: yearlyData } =
		useStatsStore();
	const [hoveredYear, setHoveredYear] = useState<string | undefined>(undefined);

	const mouseMoveHandler = (
		e: MouseEvent<SVGRectElement, globalThis.MouseEvent>,
	) => {
		const containerDiv = document.getElementById("area-container");
		if (!containerDiv || !e.currentTarget) {
			return;
		}

		setHoveredYear(e.currentTarget.dataset.year);
	};

	const mouseOutHandler = () => {
		setHoveredYear(undefined);
	};

	const mouseClickHandler = (
		e: MouseEvent<SVGRectElement, globalThis.MouseEvent>,
	) => {
		mouseMoveHandler(e);
	};

	return (
		<>
			{yearlyData.map((d) => (
				<React.Fragment key={d.year}>
					<rect
						className="barHover"
						x={xScale(new Date(d.year)) - 1.5}
						y={
							yScale(d.averageAmountPerWatering) -
							svgMargin.bottom +
							svgMargin.top
						}
						width={3}
						height={height - yScale(d.averageAmountPerWatering) - svgMargin.top}
						fill={
							hoveredYear && hoveredYear === d.year
								? hoverWaterFillColor
								: "transparent"
						}
						opacity={0.5}
						data-year={d.year}
						stroke="transparent"
						strokeWidth={70}
						onMouseLeave={mouseOutHandler}
						onMouseEnter={mouseMoveHandler}
						onClick={mouseClickHandler}
					></rect>
					<text
						className="bar-title"
						textAnchor="middle"
						x={xScale(new Date(d.year))}
						y={yScale(d.averageAmountPerWatering) - svgMargin.bottom + 13}
						fill={
							hoveredYear && hoveredYear === d.year
								? defaultLabelColor
								: "transparent"
						}
					>
						{Math.round(d.averageAmountPerWatering)} l
					</text>
				</React.Fragment>
			))}
		</>
	);
};
