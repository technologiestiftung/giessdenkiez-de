import React from "react";
import { TreeSpecies } from "../../../store/types";

interface TreeLeafImageProps {
	selectedSpecies: TreeSpecies;
	radius: number;
}

const UNKNOWN_SPECIES_IMAGE_IDENTIFIER = "UNBEKANNT";

export const TreeLeafImage: React.FC<TreeLeafImageProps> = ({
	selectedSpecies,
	radius,
}) => {
	return (
		<>
			<image
				className={"leaf-image"}
				xlinkHref={`images/leafs/${
					selectedSpecies.speciesName ?? UNKNOWN_SPECIES_IMAGE_IDENTIFIER
				}.png`}
				x={0}
				y={0}
				width={radius * 0.8}
				height={radius * 0.8}
				transform={`translate(${(-radius * 0.8) / 2}, ${(-radius * 0.8) / 2})`}
			></image>
		</>
	);
};
