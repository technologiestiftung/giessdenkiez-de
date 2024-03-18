import React from "react";
import FilterSwitch from "./filter-switch";
import TreeAgeButton from "./tree-age-button";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import { useI18nStore } from "../../i18n/i18n-store";

interface FilterProps {
	onFilterChange: () => void;
	onFilterReset: () => void;
}
const Filter: React.FC<FilterProps> = ({ onFilterChange, onFilterReset }) => {
	const i18n = useI18nStore().i18n();
	return (
		<div className="flex flex-row w-full justify-center pointer-events-auto">
			<div
				className={`flex flex-col lg:drop-shadow-md bg-white rounded-lg p-4 lg:p-6 gap-6 w-full`}
			>
				<div className="flex flex-col gap-2">
					<div className="font-bold text-xl">{i18n.filter.title}</div>
					<div className="flex flex-col gap-2">
						<FilterSwitch name={i18n.filter.publicPumps} onChange={() => {}} />
						<FilterSwitch
							name={i18n.filter.waterNeedTrees}
							onChange={() => {}}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2 w-full md:w-[50%] lg:w-full">
					<div className="font-bold text-xl">{i18n.filter.treeAge}</div>
					<div className="flex flex-row gap-2">
						<div className="w-[33%]">
							<TreeAgeButton
								onChange={() => {}}
								name={i18n.filter.youngTrees}
								padding="p-3 lg:p-4"
							/>
						</div>
						<div className="w-[33%]">
							<TreeAgeButton
								onChange={() => {}}
								name={i18n.filter.mediumTrees}
								padding="p-2 lg:p-3"
							/>
						</div>
						<div className="w-[33%]">
							<TreeAgeButton
								onChange={() => {}}
								name={i18n.filter.oldTrees}
								padding="p-1 lg:p-2"
							/>
						</div>
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
