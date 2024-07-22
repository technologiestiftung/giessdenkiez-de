import { speciesColors } from "../chart-colors";
import React, { useCallback, useMemo } from "react";
import * as d3 from "d3";
import { TreeSpecies } from "../../../store/types";

interface PiePartsProps {
	radius: number;
	treeSpecies: TreeSpecies[];
	selectedSpecies: TreeSpecies;
	setSelectedSpecies: React.Dispatch<React.SetStateAction<TreeSpecies>>;
}

export const PieParts: React.FC<PiePartsProps> = ({
	radius,
	treeSpecies,
	selectedSpecies,
	setSelectedSpecies,
}) => {
	const innerRadius = radius * 0.65;

	const pieParts = useMemo(
		() =>
			d3
				.pie<TreeSpecies>()
				.value((d) => d.percentage)
				.padAngle(0.015)
				.sort((l, r) => {
					if (l.speciesName === undefined) {
						return Infinity;
					}
					return r.percentage - l.percentage;
				})(treeSpecies),
		[treeSpecies],
	);

	const arc = useCallback(
		d3
			.arc<d3.PieArcDatum<TreeSpecies>>()
			.innerRadius(innerRadius)
			.outerRadius(radius)
			.cornerRadius(5),
		[innerRadius, radius],
	);

	return (
		<>
			{pieParts.map((piePart, index) => {
				return (
					<path
						key={piePart.data.speciesName ?? index}
						className="pie-part"
						d={arc(piePart) ?? ""}
						fill={speciesColors[index]}
						stroke={
							selectedSpecies &&
							selectedSpecies.speciesName === piePart.data.speciesName
								? "#1169EE"
								: "white"
						}
						strokeWidth={2.25}
						transform="scale(0.95)"
						onMouseMove={() => setSelectedSpecies(piePart.data)}
						onClick={() => setSelectedSpecies(piePart.data)}
					></path>
				);
			})}
		</>
	);
};
