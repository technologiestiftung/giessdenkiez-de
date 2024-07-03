import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { TreeSpecies } from "./stats";

interface DonutChartProps {
	treeSpecies: TreeSpecies[];
	width: number;
	height: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
	treeSpecies,
	width,
	height,
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
	const [selectedSpecies, setSelectedSpecies] = useState<TreeSpecies | null>(
		treeSpecies[0],
	);

	const svgRef = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		d3.select(svgRef.current).selectAll("*").remove();

		const radius = Math.min(width, height) / 2;
		const innerRadius = radius * 0.65;

		const pie = d3.pie<TreeSpecies>().value((d) => d.percentage);

		const arc = d3
			.arc<d3.PieArcDatum<TreeSpecies>>()
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
			.data(pie.padAngle(0.01)(treeSpecies))
			.enter()
			.append("path")
			.attr("d", arc.cornerRadius(5))
			.attr("fill", (_, i) => colors[i % colors.length])
			.attr("stroke", (d) => {
				if (
					selectedSpecies &&
					d.data.speciesName === selectedSpecies.speciesName
				) {
					return "#1169EE";
				}
				return "white";
			})
			.attr("stroke-width", 2)
			.on("click", (d) => {
				const leaf = d.target.__data__.data;
				setSelectedSpecies(leaf);
			})
			.attr("transform", "scale(0.95)")
			.attr("class", "pie-part");

		if (selectedSpecies) {
			svg
				.append("text")
				.attr("x", 0)
				.attr("y", 70)
				.attr("fill", "#07964E")
				.attr("text-anchor", "middle")
				.text(selectedSpecies.speciesName || "Unbekannt")
				.attr("font-size", "12px");

			svg
				.append("text")
				.attr("x", 0)
				.attr("y", 58)
				.attr("fill", "#07964E")
				.attr("text-anchor", "middle")
				.attr("font-weight", "bold")
				.text(Math.round(selectedSpecies.percentage) + "%")
				.attr("font-size", "12px");

			const imageName =
				selectedSpecies.speciesName !== null
					? selectedSpecies.speciesName
					: "UNBEKANNT";
			const imageScale = 0.4;
			svg
				.append("image")
				.attr("xlink:href", `images/leafs/${imageName}.png`)
				.attr("x", -width * (imageScale / 2))
				.attr("y", -height * (imageScale / 2) - 20)
				.attr("width", width * imageScale)
				.attr("height", width * imageScale)
				.attr("class", "leaf-image");
		}
	}, [selectedSpecies, treeSpecies, width, height]);

	return <svg id="svg-container" ref={svgRef}></svg>;
};
