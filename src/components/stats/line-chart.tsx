import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface LineChartProps {
	data: { date: Date; value: number }[];
	width: number;
	height: number;
}

export const LineChart: React.FC<LineChartProps> = ({
	data,
	width,
	height,
}) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const margin = { top: 20, right: 30, bottom: 30, left: 40 };
		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		svg.selectAll("*").remove(); // Clear any previous content

		const x = d3
			.scaleTime()
			.domain(d3.extent(data, (d) => d.date) as [Date, Date])
			.range([0, innerWidth]);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) as number])
			.nice()
			.range([innerHeight, 0]);

		const line = d3
			.line<{ date: Date; value: number }>()
			.x((d) => x(d.date))
			.y((d) => y(d.value));

		const g = svg
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		g.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#1169EE")
			.attr("stroke-width", 3)
			.attr("d", line);
	}, [data, width, height]);

	return <svg ref={svgRef}></svg>;
};
