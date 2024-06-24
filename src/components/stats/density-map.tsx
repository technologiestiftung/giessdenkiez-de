import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

interface DensityMapProps {
	data: any;
	width: number;
	height: number;
}

export const DensityMap: React.FC<DensityMapProps> = ({
	width,
	height,
	data,
}) => {
	const svgRef = useRef<SVGSVGElement>(null);

	const [berlinDistricsPaths, setBerlinDistricsPaths] = useState();
	const [densityPaths, setDensityPaths] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const berlinBezirkeRaw = await fetch(
				"http://localhost:5173/data/berlin_bezirke.geojson",
			);
			const berlinBezirke = await berlinBezirkeRaw.json();

			const projection = d3
				.geoMercator()
				.center([13.4, 52.5])
				.translate([width / 2, height / 2])
				.scale(width / 0.013);

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
			console.log("Render density map");

			const parsedData = data.map((d) => ({
				lat: d.lat,
				lng: d.lng,
				amount: d.amount,
			}));

			// Set up the SVG element
			const svg = d3
				.select(svgRef.current)
				.attr("width", width)
				.attr("height", height);

			svg.selectAll("path").remove();

			if (berlinDistricsPaths) {
				// Render Berlin district paths
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

			// Set up scales
			const x = d3
				.scaleLinear()
				.domain(d3.extent(parsedData, (d) => d.lng) as [number, number])
				.range([0, width]);

			const y = d3
				.scaleLinear()
				.domain(d3.extent(parsedData, (d) => d.lat) as [number, number])
				.range([height, 0]);

			// Generate contours
			const densityDataTmp = d3
				.contourDensity()
				.x((d) => x(d.lng))
				.y((d) => y(d.lat))
				.size([width, height])
				.weight((d) => d.amount)(parsedData);

			setDensityPaths(densityDataTmp);

			svg
				.selectAll("path")
				.data(densityDataTmp)
				.enter()
				.append("path")
				.attr("d", d3.geoPath(d3.geoIdentity().scale(1)))
				.attr("fill", (d, i) => d3.interpolateViridis(i / 30))
				.attr("stroke", "#000")
				.attr("stroke-width", 0)
				.attr("opacity", 0.1);
		}
	}, [data, berlinDistricsPaths]);

	return <svg width={width} height={height} ref={svgRef}></svg>;
};
