/* eslint-disable max-lines */
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { densityHighColor, densityLowColor } from "./chart-colors";

interface DensityMapProps {
	wateringData: { lat: number; lng: number; amount: number }[];
	width: number;
	height: number;
}

interface DataPoint {
	lat: number;
	lng: number;
	amount: number;
}

export const DensityMap: React.FC<DensityMapProps> = ({
	wateringData,
	width,
	height,
}) => {
	const svgMargin = { top: 0, right: 0, bottom: 5, left: 0 };
	const innerWidth = width;
	const innerHeight = height - svgMargin.top - svgMargin.bottom;
	const svgRef = useRef<SVGSVGElement>(null);
	const [berlinBezirke, setBerlinBezirke] = useState<string[]>();

	const projection = useMemo(() => {
		const scale = width < height ? width / 0.012 : height / 0.012;
		return d3
			.geoMercator()
			.center([13.4, 52.5])
			.translate([innerWidth / 2, innerHeight / 2])
			.scale(scale);
	}, [width, height]);

	const berlinDistricsPaths = useMemo(() => {
		if (!berlinBezirke) {
			return [];
		}
		const geoGenerator = d3.geoPath().projection(projection);
		// @ts-expect-error features is missing in type definition
		const paths = berlinBezirke.features.map(
			(feature: d3.GeoPermissibleObjects) => geoGenerator(feature),
		);
		return paths as string[];
	}, [berlinBezirke, projection]);

	useEffect(() => {
		const fetchData = async () => {
			const berlinBezirkeRaw = await fetch(import.meta.env.VITE_BEZIRKE_URL);
			const berlinBezirkeParsed = await berlinBezirkeRaw.json();
			setBerlinBezirke(berlinBezirkeParsed);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (wateringData && berlinDistricsPaths) {
			const parsedData = wateringData
				.map((d) => {
					const projected = projection([d.lng, d.lat]);
					if (!projected) {
						return null;
					}
					return {
						lat: projected[1],
						lng: projected[0],
						amount: d.amount,
					};
				})
				.filter((d) => d !== null) as DataPoint[];

			// SVG size setup
			const svg = d3
				.select(svgRef.current)
				.attr("width", width)
				.attr("height", height);

			svg.selectAll("*").remove();
			svg.selectAll("path.district").remove();
			svg.selectAll("path.contours").remove();

			// Scaling functions for watering amount data
			const x = d3.scaleLinear().domain([0, width]).range([0, width]);
			const y = d3.scaleLinear().domain([0, height]).range([0, height]);

			// generate density contour with watering data
			const densityData = d3
				.contourDensity<DataPoint>()
				.x((d) => x(d.lng))
				.y((d) => y(d.lat))
				.size([width, height])
				.weight(() => 1)
				.bandwidth(4)
				.thresholds(30)(parsedData);

			// Add Berlin districts to svg
			svg
				.selectAll("path.district")
				.data(berlinDistricsPaths)
				.enter()
				.append("path")
				.attr("class", "district")
				.attr("d", (d) => d)
				.attr("fill", "#e2e2e2")
				.attr("stroke", "#ffffff")
				.attr("stroke-width", 1);

			// Add density map to svg
			svg
				.selectAll("path.contours")
				.data(densityData)
				.enter()
				.append("path")
				.attr("d", d3.geoPath(d3.geoIdentity().scale(1)))
				.attr("fill", (_, i) =>
					d3.interpolateRgb(densityLowColor, densityHighColor)(i / 10),
				)
				.attr("opacity", 0.15);

			// linear gradient for legend
			const linearGradient = svg
				.append("defs")
				.append("linearGradient")
				.attr("id", "legendGradient")
				.attr("x1", "0%")
				.attr("x2", "100%")
				.attr("y1", "0%")
				.attr("y2", "0%");
			linearGradient
				.append("stop")
				.attr("offset", "0%")
				.style("stop-color", densityLowColor)
				.style("stop-opacity", 0.2);
			linearGradient
				.append("stop")
				.attr("offset", "100%")
				.style("stop-color", densityHighColor)
				.style("stop-opacity", 1);

			// add legend to svg with gradient
			svg
				.append("rect")
				.attr("fill", "url(#legendGradient)")
				.attr("x", innerWidth / 6)
				.attr("y", height - 10)
				.attr("width", innerWidth / 1.5)
				.attr("height", 6)
				.attr("rx", 3);

			svg.selectAll("text").attr("font-family", "IBM");
		}
	}, [height, width, wateringData, berlinDistricsPaths]);

	return <svg id="density-container" ref={svgRef}></svg>;
};
