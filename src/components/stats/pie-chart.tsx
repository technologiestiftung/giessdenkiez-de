import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface PieChartProps {
	data: { label: string; value: number }[];
	width: number;
	height: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, width, height }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const radius = Math.min(width, height) / 2;
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		const pie = d3
			.pie<{ label: string; value: number }>()
			.value((d) => d.value);

		const arc = d3
			.arc<d3.PieArcDatum<{ label: string; value: number }>>()
			.innerRadius(0)
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
	}, [data, width, height]);

	return <svg ref={svgRef}></svg>;
};
