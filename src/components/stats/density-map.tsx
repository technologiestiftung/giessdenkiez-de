/* eslint-disable max-lines */
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	defaultLabelColor,
	densityHighColor,
	densityLowColor,
} from "./chart-colors";

interface DensityMapProps {
	data: { lat: number; lng: number; amount: number }[];
	width: number;
	height: number;
	legend?: string;
}

interface DataPoint {
	lat: number;
	lng: number;
	amount: number;
}

export const DensityMap: React.FC<DensityMapProps> = ({
	data,
	width,
	height,
	legend,
}) => {
	const svgMargin = { top: 0, right: 0, bottom: 50, left: 0 };
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
		if (data && berlinDistricsPaths) {
			const parsedData = data
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

			const svg = d3
				.select(svgRef.current)
				.attr("width", width)
				.attr("height", height);

			svg.selectAll("*").remove();

			svg.selectAll("path.district").remove();
			svg.selectAll("path.contours").remove();

			const x = d3.scaleLinear().domain([0, width]).range([0, width]);
			const y = d3.scaleLinear().domain([0, height]).range([0, height]);

			const densityData = d3
				.contourDensity<DataPoint>()
				.x((d) => x(d.lng))
				.y((d) => y(d.lat))
				.size([width, height])
				.weight(() => 1)
				.bandwidth(4)
				.thresholds(30)(parsedData);

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

			svg
				.selectAll("path.contours")
				.data(densityData)
				.enter()
				.append("path")
				.attr("d", d3.geoPath(d3.geoIdentity().scale(1)))
				.attr("fill", (_, i) =>
					d3.interpolateRgb(densityLowColor, densityHighColor)(i / 10),
				)
				.attr("opacity", 0.1);

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
				.style("stop-opacity", 0.25);
			linearGradient
				.append("stop")
				.attr("offset", "100%")
				.style("stop-color", densityHighColor)
				.style("stop-opacity", 0.8);

			// add legend to svg with gradient
			svg
				.append("rect")
				.attr("fill", "url(#legendGradient)")
				.attr("x", innerWidth / 4)
				.attr("y", height - 40)
				.attr("width", innerWidth / 2)
				.attr("height", 6)
				.attr("rx", 3)
				.attr("ry", 20);

			svg
				.append("text")
				.attr("x", innerWidth / 2)
				.attr("y", height - 5)
				.attr("fill", defaultLabelColor)
				.attr("text-anchor", "middle")
				.text(`${legend}`)
				.attr("font-size", "14px");

			svg.selectAll("text").attr("font-family", "IBM");
		}
	}, [height, width, data, berlinDistricsPaths]);

	return <svg id="density-container" ref={svgRef}></svg>;
};
