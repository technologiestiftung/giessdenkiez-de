import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { PrimaryButton } from "../buttons/primary";
import { SecondaryButton } from "../buttons/secondary";
import { TreeAgeIntervalIdentifier, useFilterStore } from "./filter-store";
import { FilterSwitch } from "./filter-switch";
import { TreeAgeButton } from "./tree-age-button";
import { TertiaryButton } from "../buttons/tertiary";

export const Filter: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { hideFilterView } = useFilterStore();

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
			size: "w-7.5 h-7.5",
			label: i18n.filter.mediumTrees,
		},
		[TreeAgeIntervalIdentifier.Old]: {
			size: "w-9 h-9",
			label: i18n.filter.oldTrees,
		},
	};

	return (
		<div className="flex flex-row w-full justify-center pointer-events-auto">
			<div
				className={`flex flex-col shadow-gdk-hard-up sm:shadow-gdk-hard bg-none sm:bg-white rounded-lg p-4 sm:p-6 gap-6 sm:gap-6 w-full`}
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

				<div className="flex flex-col sm:flex-row justify-between">
					<div className="flex self-center">
						<TertiaryButton label={i18n.filter.reset} onClick={resetFilters} />
					</div>
					<PrimaryButton label={i18n.filter.show} onClick={hideFilterView} />
				</div>
			</div>
		</div>
	);
};
