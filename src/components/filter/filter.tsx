import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import { TreeAgeIntervalIdentifier, useFilterStore } from "./filter-store";
import { FilterSwitch } from "./filter-switch";
import { TreeAgeButton } from "./tree-age-button";

interface FilterProps {
	onFilterChange: () => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
	const i18n = useI18nStore().i18n();

	const {
		treeAgeIntervals,
		toggleTreeAgeInterval,
		isPumpsVisible,
		setShowPumps,
		isTreeWaterNeedVisible,
		setShowWaterNeedTrees,
		resetFilters,
	} = useFilterStore();

	const paddingMap = {
		[TreeAgeIntervalIdentifier.Young]: {
			size: "w-6 h-6",
			label: i18n.filter.youngTrees,
		},
		[TreeAgeIntervalIdentifier.Medium]: {
			size: "w-8 h-8",
			label: i18n.filter.mediumTrees,
		},
		[TreeAgeIntervalIdentifier.Old]: {
			size: "w-10 h-10",
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
								setShowPumps(!isPumpsVisible);
							}}
							isEnabled={isPumpsVisible}
						/>
						<FilterSwitch
							name={i18n.filter.waterNeedTrees}
							onToggle={() => {
								setShowWaterNeedTrees(!isTreeWaterNeedVisible);
							}}
							isEnabled={isTreeWaterNeedVisible}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2 w-full">
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
										size={paddingMap[interval.identifier].size}
										interval={interval}
									/>
								</div>
							);
						})}
					</div>
				</div>

				<div className="flex flex-row justify-between gap-4">
					<SecondaryButton label={i18n.filter.reset} onClick={resetFilters} />
					<PrimaryButton label={i18n.filter.show} onClick={onFilterChange} />
				</div>
			</div>
		</div>
	);
};
