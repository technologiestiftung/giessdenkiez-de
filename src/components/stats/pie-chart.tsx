import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface DonutChartProps {
	data: { label: string; value: number }[];
	width: number;
	height: number;
	innerRadiusRatio: number; // Ratio of inner radius to the outer radius
}

interface Leaf {
	label: string;
	value: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
	data,
	width,
	height,
	innerRadiusRatio,
}) => {
	const colors = [
		"#07964E",
		"#B6DD83",
		"#45AC95",
		"#237B5A",
		"#DEE25E",
		"#99B766",
		"#8E982C",
		"#7E7B22",
		"#CFB739",
		"#B1B89C",
		"#A3A69C",
	];
	const [selectedLeaf, setSelectedLeaf] = useState<Leaf | null>(data[0]);

	const svgRef = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		d3.select(svgRef.current).selectAll("*").remove();

		const radius = Math.min(width, height) / 2;
		const innerRadius = radius * innerRadiusRatio;

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

		svg.select("g").selectAll("*").remove();

		svg
			.selectAll("path")
			.data(pie.padAngle(0.01)(data))
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", (d, i) => colors[i % colors.length])
			.attr("stroke", (d) => {
				if (selectedLeaf && d.data.label === selectedLeaf.label) {
					return "#1169EE";
				}
				return "white";
			})
			.attr("stroke-width", 2)
			.on("click", (d) => {
				const leaf = d.target.__data__.data;
				setSelectedLeaf(leaf);
			})
			.attr("transform", "scale(0.95)")
			.attr("class", "pie-part");

		if (selectedLeaf) {
			svg
				.append("text")
				.attr("x", 0)
				.attr("y", 25)
				.attr("fill", "#07964E")
				.attr("text-anchor", "middle")
				.text(selectedLeaf.label || "Unbekannt")
				.attr("font-size", "12px");

			svg
				.append("text")
				.attr("x", 0)
				.attr("y", 39)
				.attr("fill", "#07964E")
				.attr("text-anchor", "middle")
				.attr("font-weight", "bold")
				.text(Math.round(selectedLeaf.value) + "%")
				.attr("font-size", "12px");
		}

		if (selectedLeaf && selectedLeaf.label !== "") {
			svg
				.append("image")
				.attr("xlink:href", `images/leafs/${selectedLeaf.label}.png`)
				.attr("x", -60 / 2)
				.attr("y", -50)
				.attr("width", 60)
				.attr("height", 60)
				.attr("class", "leaf-image");
		}
	}, [selectedLeaf, data, width, height, innerRadiusRatio]);

	return <svg id="svg-container" ref={svgRef}></svg>;
};
