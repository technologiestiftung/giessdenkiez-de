/* eslint-disable max-lines */
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

interface DensityMapProps {
	data: { lat: number; lng: number; amount: number }[];
	width: number;
	height: number;
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
}) => {
	const svgMargin = { top: 0, right: 0, bottom: 50, left: 0 };
	const innerWidth = width;
	const innerHeight = height - svgMargin.top - svgMargin.bottom;
	const svgRef = useRef<SVGSVGElement>(null);
	const [berlinDistricsPaths, setBerlinDistricsPaths] = useState<string[]>();
	const projection = d3
		.geoMercator()
		.center([13.4, 52.5])
		.translate([innerWidth / 2, innerHeight / 2])
		.scale(innerHeight / 0.01);

	useEffect(() => {
		const fetchData = async () => {
			const berlinBezirkeRaw = await fetch(import.meta.env.VITE_BEZIRKE_URL);
			const berlinBezirke = await berlinBezirkeRaw.json();
			const geoGenerator = d3.geoPath().projection(projection);
			const districtPaths = berlinBezirke.features.map(
				(feature: d3.GeoPermissibleObjects) => {
					return geoGenerator(feature);
				},
			);

			setBerlinDistricsPaths(districtPaths);
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

			const densityDataTmp = d3
				.contourDensity<DataPoint>()
				.x((d) => x(d.lng))
				.y((d) => y(d.lat))
				.size([width, height])
				.weight(() => 1)
				.bandwidth(4)
				.thresholds(30)(parsedData);

			if (berlinDistricsPaths) {
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
			}

			svg
				.selectAll("path.contours")
				.data(densityDataTmp)
				.enter()
				.append("path")
				.attr("d", d3.geoPath(d3.geoIdentity().scale(1)))
				.attr("fill", (d, i) => d3.interpolateRgb("#FD9531", "#336CC0")(i / 10))
				.attr("stroke", "#000")
				.attr("stroke-width", 0)
				.attr("opacity", 0.1);

			// Draw the color interpolated legend
			const numSegments = 100;
			const interpolateWidth = innerWidth / 1.5;
			const interpolateScale = d3
				.scaleLinear()
				.domain([0, numSegments])
				.range([0, interpolateWidth]);
			const colorInterpolator = d3.interpolateRgb("#FD9531", "#336CC0");
			for (let i = 0; i < numSegments; i++) {
				const xStart = interpolateScale(i);
				const xEnd = interpolateScale(i + 1);
				svg
					.append("line")
					.attr("x1", xStart)
					.attr("y1", height - 30)
					.attr("x2", xEnd)
					.attr("y2", height - 30)
					.attr("stroke", colorInterpolator(i / numSegments))
					.attr("stroke-width", 6)
					.attr("opacity", 0.5)
					.attr(
						"transform",
						`translate(${(innerWidth - interpolateWidth) / 2}, 0)`,
					);
			}

			svg
				.append("text")
				.attr("x", innerWidth / 2)
				.attr("y", height - 5)
				.attr("fill", "#0A4295")
				.attr("text-anchor", "middle")
				.text("Anzahl der Gießungen")
				.attr("font-size", "14px");

			svg.selectAll("text").attr("font-family", "IBM");
		}
	}, [height, width, data, berlinDistricsPaths]);

	return <svg id="density-container" ref={svgRef}></svg>;
};
