import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { speciesColors, speciesLabelColor } from "./chart-colors";
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
	const svgMargin = { top: 0, right: 0, bottom: 30, left: 0 };
	const innerWidth = width;
	const innerHeight = height - svgMargin.top - svgMargin.bottom;

	const UNKNOWN_SPECIES_IMAGE_IDENTIFIER = "UNBEKANNT";

	const [selectedSpecies, setSelectedSpecies] = useState<TreeSpecies | null>(
		treeSpecies[0],
	);

	const svgRef = useRef<SVGSVGElement | null>(null);

	const formattedSpecies = (speciesName?: string) => {
		if (!speciesName) {
			return "Andere";
		}
		return (
			speciesName.charAt(0).toUpperCase() + speciesName.slice(1).toLowerCase()
		);
	};

	useEffect(() => {
		// SVG size setup
		d3.select(svgRef.current).selectAll("*").remove();
		const svg = d3
			.select(svgRef.current)
			.attr("width", innerWidth)
			.attr("height", innerHeight)
			.append("g")
			.attr("transform", `translate(${width / 2},${height / 2 - 30})`);

		// Pie chart setup
		const radius = Math.min(width, height) / 2.5;
		const innerRadius = radius * 0.65;
		const pie = d3.pie<TreeSpecies>().value((d) => d.percentage);
		const arc = d3
			.arc<d3.PieArcDatum<TreeSpecies>>()
			.innerRadius(innerRadius)
			.outerRadius(radius);

		svg.select("g").selectAll("*").remove();

		// add pie chart to svg
		svg
			.selectAll("path")
			.data(
				pie.padAngle(0.015).sort((l, r) => {
					if (l.speciesName === undefined) {
						return Infinity;
					}
					return r.percentage - l.percentage;
				})(treeSpecies),
			)
			.enter()
			.append("path")
			.attr("d", arc.cornerRadius(5))
			.attr("fill", (_, i) => speciesColors[i])
			.attr("stroke", (d) => {
				if (
					selectedSpecies &&
					d.data.speciesName === selectedSpecies.speciesName
				) {
					return "#1169EE";
				}
				return "white";
			})
			.attr("stroke-width", 2.25)
			.on("mousemove", (d) => {
				const leaf = d.target.__data__.data;
				setSelectedSpecies(leaf);
			})
			.on("click", (d) => {
				const leaf = d.target.__data__.data;
				setSelectedSpecies(leaf);
			})
			.attr("transform", "scale(0.95)")
			.attr("class", "pie-part");

		// add species label and image to svg
		if (selectedSpecies) {
			svg
				.append("text")
				.attr("x", 0)
				.attr("y", height / 2 - 10)
				.attr("fill", speciesLabelColor)
				.attr("text-anchor", "middle")
				.attr("font-weight", "bold")
				.text(
					`${formattedSpecies(selectedSpecies.speciesName)} ${Math.round(selectedSpecies.percentage)}%`,
				)
				.attr("font-size", "20px");

			const imageName =
				selectedSpecies.speciesName ?? UNKNOWN_SPECIES_IMAGE_IDENTIFIER;
			const imageSize = radius * 0.8;
			svg
				.append("image")
				.attr("xlink:href", `images/leafs/${imageName}.png`)
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", imageSize)
				.attr("height", imageSize)
				.attr("transform", `translate(${-imageSize / 2}, ${-imageSize / 2})`)
				.attr("class", "leaf-image");
		}
	}, [selectedSpecies, treeSpecies, width, height]);

	return <svg id="svg-container" ref={svgRef}></svg>;
};
