import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface DonutChartProps {
	data: { label: string; value: number }[];
	width: number;
	height: number;
	innerRadiusRatio: number; // Ratio of inner radius to the outer radius
}

export const DonutChart: React.FC<DonutChartProps> = ({
	data,
	width,
	height,
	innerRadiusRatio,
}) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const radius = Math.min(width, height) / 2;
		const innerRadius = radius * innerRadiusRatio;
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		const pie = d3
			.pie<{ label: string; value: number }>()
			.value((d) => d.value);

		const arc = d3
			.arc<d3.PieArcDatum<{ label: string; value: number }>>()
			.innerRadius(innerRadius)
			.outerRadius(radius);

		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${width / 2},${height / 2})`);

		svg
			.selectAll("path")
			.data(pie(data))
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", (d) => color(d.data.label))
			.attr("stroke", "white")
			.attr("stroke-width", 2);
	}, [data, width, height, innerRadiusRatio]);

	return <svg ref={svgRef}></svg>;
};
