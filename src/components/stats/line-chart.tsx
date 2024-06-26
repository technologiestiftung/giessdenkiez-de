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
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		svg.selectAll("*").remove(); // Clear any previous content

		const x = d3
			.scaleTime()
			.domain(d3.extent(data, (d) => d.date) as [Date, Date])
			.range([0, width]);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) as number])
			.nice()
			.range([height, 0]);

		const area = d3
			.area<{ date: Date; value: number }>()
			.x(function (d) {
				return x(d.date);
			})
			.y0((d) => y(d.value))
			.y1(function (d) {
				return y(0);
			})
			.curve(d3.curveBasis);

		const g = svg.append("g");

		// add the area
		g.append("path")
			.datum(data)
			.attr("class", "area")
			.attr("d", area)
			.attr("fill", "#336CC0");
	}, [data, width, height]);

	return <svg ref={svgRef}></svg>;
};
