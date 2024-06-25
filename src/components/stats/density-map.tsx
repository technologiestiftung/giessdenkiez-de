import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

interface DensityMapProps {
	data: any;
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
	const svgRef = useRef<SVGSVGElement>(null);
	const [berlinDistricsPaths, setBerlinDistricsPaths] = useState();
	const projection = d3
		.geoMercator()
		.center([13.4, 52.5])
		.translate([width / 2, height / 2])
		.scale(width / 0.015);

	useEffect(() => {
		const fetchData = async () => {
			const berlinBezirkeRaw = await fetch(
				"http://localhost:5173/data/berlin_bezirke.geojson",
			);
			const berlinBezirke = await berlinBezirkeRaw.json();

			const geoGenerator = d3.geoPath().projection(projection);

			const districtPaths = berlinBezirke.features.map((feature) => {
				return geoGenerator(feature);
			});

			setBerlinDistricsPaths(districtPaths);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (data && berlinDistricsPaths) {
			const parsedData = data.map((d) => ({
				lat: projection([d.lng, d.lat])[1],
				lng: projection([d.lng, d.lat])[0],
				amount: d.amount,
			}));

			const svg = d3
				.select(svgRef.current)
				.attr("width", width)
				.attr("height", height);

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
		}
	}, [height, width, data, berlinDistricsPaths]);

	return <svg id="density-container" ref={svgRef}></svg>;
};
