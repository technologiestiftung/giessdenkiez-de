import React, { useMemo } from "react";
import { adoptionsFillColor } from "./chart-colors";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { useStatsStore } from "../../store/stats-store";

/**
 * This chart shows the number of adopted trees and,
 * among them, the percentage that are very thirsty
 */
export const AdoptionsChart: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { gdkStats } = useStatsStore();

	const veryThirstyAdoptionsRate = useMemo(() => {
		if (!gdkStats) {
			return 0;
		}

		return Math.round(
			(gdkStats.treeAdoptions.veryThirstyCount / gdkStats.treeAdoptions.count) *
				100,
		);
	}, [gdkStats]);

	return (
		<div className="w-full">
			<div className="w-full grid grid-cols-1 grid-rows-">
				<div
					style={{ backgroundColor: adoptionsFillColor }}
					className={`w-full h-7  opacity-[30%] rounded-full row-start-1 col-start-1`}
				></div>
				<div
					style={{
						width: `${veryThirstyAdoptionsRate}%`,
						backgroundColor: adoptionsFillColor,
					}}
					className={`h-7 rounded-full row-start-1 col-start-1`}
				></div>
				<div style={{ color: adoptionsFillColor }} className={` text-4xl pt-2`}>
					↑
				</div>
				<div
					style={{ color: adoptionsFillColor }}
					className={`text-[${adoptionsFillColor}] text-xl pt-2`}
				>
					<span className="font-bold">{veryThirstyAdoptionsRate}% </span>
					{i18n.stats.adoptionStat.legend}
				</div>
			</div>
		</div>
	);
};
