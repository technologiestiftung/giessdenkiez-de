// src/components/BarChart.tsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BarChartProps {
	data: { name: string; value: number }[];
	width: number;
	height: number;
	xLabel: string;
	yLabel: string;
	xTickFrequency?: number; // Optional prop to specify tick frequency
}

export const BarChart: React.FC<BarChartProps> = ({
	data,
	width,
	height,
	xLabel,
	yLabel,
	xTickFrequency,
}) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const margin = { top: 20, right: 30, bottom: 50, left: 50 };

	const last3Years = data.slice(-3 * 12);

	useEffect(() => {
		const svg = d3
			.select(svgRef.current)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Set up scales
		const xScale = d3
			.scaleBand()
			.domain(last3Years.map((d) => d.name))
			.range([0, width])
			.padding(0.1);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(last3Years, (d) => d.value) || 0])
			.nice()
			.range([height, 0]);

		// Clear previous content
		svg.selectAll("*").remove();

		svg
			.selectAll(".bartwo")
			.data(last3Years)
			.enter()
			.append("rect")
			.attr("class", "bartwo")
			.attr("x", (d) => xScale(d.name) || 0)
			.attr("y", (d) => yScale(d.value))
			.attr("rx", 3)
			.attr("ry", 3)
			.attr("width", xScale.bandwidth())
			.attr("height", (d) => height - yScale(d.value))
			.attr("fill", "#336CC0");

		// Add x-axis
		const xAxis = svg
			.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(
				d3.axisBottom(xScale).tickValues(
					xScale.domain().filter(function (d, i) {
						return (
							i === 0 ||
							i === last3Years.length - 1 ||
							i === Math.floor(last3Years.length / 2)
						);
					}),
				),
			);

		// Add x-axis label
		xAxis
			.append("text")
			.attr("x", width / 2)
			.attr("y", margin.bottom - 10)
			.attr("fill", "black")
			.attr("text-anchor", "middle")
			.text("Monatswerte in Liter");
	}, [last3Years, height, width, xLabel, yLabel, xTickFrequency]);

	return <svg ref={svgRef}></svg>;
};
