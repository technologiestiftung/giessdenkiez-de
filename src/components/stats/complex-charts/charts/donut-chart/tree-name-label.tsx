import React from "react";
import { speciesLabelColor } from "../chart-colors";
import { Content } from "../../../../../i18n/content-types";
import { TreeSpecies } from "../../../store/types";
import { useStatsStore } from "../../../store/stats-store";
import { useI18nStore } from "../../../../../i18n/i18n-store";

interface TreeNameLabelProps {
	selectedSpecies: TreeSpecies;
}

export const TreeNameLabel: React.FC<TreeNameLabelProps> = ({
	selectedSpecies,
}) => {
	const { chartHeight: height } = useStatsStore();
	const i18n = useI18nStore().i18n();

	return (
		<>
			<text
				x={0}
				y={height / 2 - 10}
				fill={speciesLabelColor}
				textAnchor="middle"
				fontWeight="bold"
				fontSize="20px"
			>{`${getFormattedSpeciesName(
				selectedSpecies.speciesName,
				i18n,
			)} ${Math.round(selectedSpecies.percentage)}%`}</text>
		</>
	);
};

function getFormattedSpeciesName(
	speciesName: string | undefined,
	i18n: Content,
): string {
	if (!speciesName) {
		return i18n.stats.treeSpeciesStat.other;
	}

	return (
		speciesName.charAt(0).toUpperCase() + speciesName.slice(1).toLowerCase()
	);
}
