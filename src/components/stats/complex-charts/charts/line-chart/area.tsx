import { defaultWaterFillColor } from "../chart-colors";
import React, { useMemo } from "react";
import * as d3 from "d3";
import { Yearly } from "../../../store/types";
import { useStatsStore } from "../../../store/stats-store";

interface AreaProps {
	xScale: d3.ScaleTime<number, number, never>;
	yScale: d3.ScaleLinear<number, number, never>;
	svgMargin: { top: number; right: number; bottom: number; left: number };
}

export const Area: React.FC<AreaProps> = ({ xScale, yScale, svgMargin }) => {
	const { yearlyAverageAmountPerWatering: yearlyData } = useStatsStore();

	const areaPath = useMemo(
		() =>
			d3
				.area<Yearly>()
				.x((d) => xScale(new Date(d.year)))
				.y0(
					(d) =>
						yScale(d.averageAmountPerWatering) -
						svgMargin.bottom +
						svgMargin.top,
				)
				.y1(() => yScale(0) - svgMargin.bottom)
				.curve(d3.curveBumpX)(yearlyData),
		[xScale, yScale, svgMargin],
	);

	return (
		<>
			<path
				className="area"
				d={areaPath ?? ""}
				fill={defaultWaterFillColor}
			></path>
		</>
	);
};
