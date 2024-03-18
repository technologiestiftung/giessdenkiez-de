import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import { TreeAgeIntervalIdentifier, useFilterStore } from "./filter-store";
import FilterSwitch from "./filter-switch";
import TreeAgeButton from "./tree-age-button";

interface FilterProps {
	onFilterChange: () => void;
	onFilterReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, onFilterReset }) => {
	const i18n = useI18nStore().i18n();

	const {
		treeAgeIntervals,
		toggleTreeAgeInterval,
		showPumps,
		setShowPumps,
		showWaterNeedTrees,
		setShowWaterNeedTrees,
	} = useFilterStore();

	const paddingMap = {
		[TreeAgeIntervalIdentifier.Young]: {
			padding: "p-3 lg:p-4",
			label: i18n.filter.youngTrees,
		},
		[TreeAgeIntervalIdentifier.Medium]: {
			padding: "p-2 lg:p-3",
			label: i18n.filter.mediumTrees,
		},
		[TreeAgeIntervalIdentifier.Old]: {
			padding: "p-1 lg:p-2",
			label: i18n.filter.oldTrees,
		},
	};

	return (
		<div className="flex flex-row w-full justify-center pointer-events-auto">
			<div
				className={`flex flex-col lg:drop-shadow-md bg-white rounded-lg p-4 lg:p-6 gap-6 w-full`}
			>
				<div className="flex flex-col gap-2">
					<div className="font-bold text-xl">{i18n.filter.title}</div>
					<div className="flex flex-col gap-2">
						<FilterSwitch
							name={i18n.filter.publicPumps}
							onToggle={() => {
								setShowPumps(!showPumps);
							}}
							isEnabled={showPumps}
						/>
						<FilterSwitch
							name={i18n.filter.waterNeedTrees}
							onToggle={() => {
								setShowWaterNeedTrees(!showWaterNeedTrees);
							}}
							isEnabled={showWaterNeedTrees}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2 w-full md:w-[50%] lg:w-full">
					<div className="font-bold text-xl">{i18n.filter.treeAge}</div>
					<div className="flex flex-row gap-2">
						{treeAgeIntervals.map((interval, index) => {
							return (
								<div key={`interval-${index}`} className="w-[33%]">
									<TreeAgeButton
										onChange={() => {
											toggleTreeAgeInterval(interval);
										}}
										name={paddingMap[interval.identifier].label}
										padding={paddingMap[interval.identifier].padding}
										interval={interval}
									/>
								</div>
							);
						})}
					</div>
				</div>

				<div className="flex flex-row justify-between gap-4">
					<SecondaryButton label={i18n.filter.reset} onClick={onFilterReset} />
					<PrimaryButton label={i18n.filter.show} onClick={onFilterChange} />
				</div>
			</div>
		</div>
	);
};

export default Filter;
