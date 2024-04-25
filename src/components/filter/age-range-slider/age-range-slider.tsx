import React from "react";
import { ChangeEvent } from "react";
import { useFilterStore } from "../filter-store";
import { useI18nStore } from "../../../i18n/i18n-store";

export const INITIAL_MIN = 0;
export const INITIAL_MAX = 200;

export const AgeRangeSlider: React.FC = () => {
	const { treeAgeRange, setTreeAgeRange } = useFilterStore();
	const i18n = useI18nStore().i18n();

	return (
		<div className="flex flex-col w-full gap-6">
			<div className="flex flex-row justify-between font-semibold text-lg">
				<div>{i18n.filter.treeAgeTitle}</div>
				<div>
					{treeAgeRange.min}-{treeAgeRange.max}
					{treeAgeRange.max === 200 ? "+" : ""} {i18n.filter.years}
				</div>
			</div>
			<div className="relative">
				<input
					type="range"
					min={INITIAL_MIN}
					max={INITIAL_MAX}
					value={treeAgeRange.min}
					step={10}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+event.target.value, treeAgeRange.max - 10);
						event.target.value = value.toString();
						setTreeAgeRange(value, treeAgeRange.max);
					}}
					// slider-thumb styles are defined in index.css since stlyles are too long with thumb declerations
					className={`w-full h-0 absolute border border-gdk-light-gray 
                     rounded-lg appearance-none pointer-events-none slider-thumb 
                     ${treeAgeRange.min > INITIAL_MAX - 10 ? "thumb-50" : "thumb-30"}
                   `}
				/>
				<input
					type="range"
					min={INITIAL_MIN}
					max={INITIAL_MAX}
					value={treeAgeRange.max}
					step={10}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+event.target.value, treeAgeRange.min + 10);
						event.target.value = value.toString();
						setTreeAgeRange(treeAgeRange.min, value);
					}}
					className={`w-full h-0 absolute translate-y-[1px] rounded-lg 
					appearance-none pointer-events-none slider-thumb thumb-40
                   `}
				/>
			</div>
		</div>
	);
};
