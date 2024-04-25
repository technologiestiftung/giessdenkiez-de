import React from "react";
import { ChangeEvent } from "react";
import { useFilterStore } from "../filter-store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { BarGraph } from "./bar-graph";

export const AgeRangeSlider: React.FC = () => {
	const {
		treeAgeRange,
		setTreeAgeRange,
		initialTreeAgeRangeMin,
		initialTreeAgeRangeMax,
	} = useFilterStore();
	const i18n = useI18nStore().i18n();

	const INITIAL_MIN = initialTreeAgeRangeMin;
	const INITIAL_MAX = initialTreeAgeRangeMax;

	return (
		<div className="flex flex-col w-full gap-6 pb-8 ">
			<div className="flex flex-row justify-between font-semibold text-lg">
				<div>{i18n.filter.treeAgeTitle}</div>
				<div>
					{treeAgeRange.min}-{treeAgeRange.max}
					{treeAgeRange.max === INITIAL_MAX ? "+" : ""} {i18n.filter.years}
				</div>
			</div>
			<div className="relative mx-[12.5px]">
				<div className="w-full justify-center flex self-center items-center">
					<BarGraph min={treeAgeRange.min} max={treeAgeRange.max} />
				</div>
				<div className="w-10/11 justify-center flex self-center items-center">
					<BarGraph min={treeAgeRange.min} max={treeAgeRange.max} />
				</div>
				<input
					type="range"
					min={INITIAL_MIN}
					max={INITIAL_MAX}
					value={treeAgeRange.min}
					step={1}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+event.target.value, treeAgeRange.max - 10);
						event.target.value = value.toString();
						setTreeAgeRange(value, treeAgeRange.max);
					}}
					// slider-thumb styles are defined in index.css since styles are too long with thumb declerations
					className={`w-full h-0 absolute border border-gdk-light-gray z-20 slider-thumb-left
                     rounded-lg appearance-none pointer-events-none slider-thumb thumb-40}
                   `}
				/>
				<input
					type="range"
					min={INITIAL_MIN}
					max={INITIAL_MAX}
					value={treeAgeRange.max}
					step={1}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+event.target.value, treeAgeRange.min + 10);
						event.target.value = value.toString();
						setTreeAgeRange(treeAgeRange.min, value);
					}}
					className={`w-full h-0 absolute translate-y-[1px] rounded-lg 
					appearance-none pointer-events-none slider-thumb z-20 slider-thumb-right
                   `}
				/>
			</div>
		</div>
	);
};
