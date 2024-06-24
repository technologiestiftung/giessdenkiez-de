import * as d3 from "d3";
import React, { useEffect, useState } from "react";

interface DensityMapProps {
	width: number;
	height: number;
}

export const DensityMap: React.FC<DensityMapProps> = ({ width, height }) => {
	const [berlinDistricsPaths, setBerlinDistricsPaths] = useState<string[]>([]);

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

	return (
		<svg width={width} height={height}>
			{berlinDistricsPaths.map((path, index) => (
				<path
					key={index}
					d={path}
					stroke="#ffffff"
					strokeWidth={2}
					fill="#E2E2E2"
				/>
			))}
		</svg>
	);
};
