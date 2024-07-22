import React, { useState } from "react";
import { useStatsStore } from "../../../store/stats-store";
import { TreeSpecies } from "../../../store/types";
import { PieParts } from "./pie-parts";
import { TreeNameLabel } from "./tree-name-label";
import { TreeLeafImage } from "./tree-leaf-image";

/**
 * This donut chart shows the distribution of tree species in the dataset.
 */
export const DonutChart: React.FC = () => {
	const {
		orderedTreeSpecies: treeSpecies,
		chartWidth: width,
		chartHeight: height,
	} = useStatsStore();

	const [selectedSpecies, setSelectedSpecies] = useState<TreeSpecies>(
		treeSpecies[0],
	);

	const svgMargin = { top: 0, right: 0, bottom: 30, left: 0 };
	const innerHeight = height - svgMargin.top - svgMargin.bottom;
	const radius = Math.min(width, height) / 2.5;

	return (
		<svg width={width} height={innerHeight}>
			<g transform={`translate(${width / 2},${height / 2 - 30})`}>
				<PieParts
					radius={radius}
					treeSpecies={treeSpecies}
					selectedSpecies={selectedSpecies}
					setSelectedSpecies={setSelectedSpecies}
				/>
				<TreeNameLabel selectedSpecies={selectedSpecies} />
				<TreeLeafImage selectedSpecies={selectedSpecies} radius={radius} />
			</g>
		</svg>
	);
};
