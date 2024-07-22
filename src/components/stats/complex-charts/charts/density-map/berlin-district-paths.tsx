import React, { useMemo } from "react";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";

interface BerlinDistrictPaths {
	berlinDistrictsGeoJson: FeatureCollection | null;
	projection: d3.GeoProjection;
}

export const BerlinDistrictPaths: React.FC<BerlinDistrictPaths> = ({
	berlinDistrictsGeoJson,
	projection,
}) => {
	const berlinDistrictsPaths = useMemo(() => {
		if (!berlinDistrictsGeoJson) {
			return [];
		}

		const geoGenerator = d3.geoPath().projection(projection);

		return berlinDistrictsGeoJson.features.map(
			(feature: d3.GeoPermissibleObjects) => geoGenerator(feature),
		);
	}, [berlinDistrictsGeoJson, projection]);

	return (
		<>
			{berlinDistrictsPaths.map((path, i) => (
				<path
					key={i}
					className="district"
					d={path ?? ""}
					fill="#e2e2e2"
					stroke="#ffffff"
					strokeWidth={1}
				/>
			))}
		</>
	);
};
