import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useFilterStore } from "../filter-store";
import { useI18nStore } from "../../../i18n/i18n-store";

export const INITIAL_MIN = 0;
export const INITIAL_MAX = 200;

export const AgeRangeSlider: React.FC = () => {
	const { treeAgeRange, setTreeAgeRange } = useFilterStore();

	const [min, setMin] = useState(treeAgeRange.min);
	const [max, setMax] = useState(treeAgeRange.max);

	const i18n = useI18nStore().i18n();

	const resetAgeSlider = () => {
		setMin(INITIAL_MIN);
		setMax(INITIAL_MAX);
	};

	useEffect(() => {
		if (treeAgeRange.min === INITIAL_MIN && treeAgeRange.max === INITIAL_MAX) {
			resetAgeSlider();
		}
	}, [treeAgeRange]);

	return (
		<div className="flex flex-col w-full gap-6">
			<div className="flex flex-row justify-between font-semibold text-lg">
				<div>{i18n.filter.treeAgeTitle}</div>
				<div>
					{min}-{max}
					{max === 200 ? "+" : ""} {i18n.filter.years}
				</div>
			</div>
			<div className="relative">
				<input
					type="range"
					min={INITIAL_MIN}
					max={INITIAL_MAX}
					value={min}
					step={10}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+event.target.value, max - 10);
						setMin(value);
						event.target.value = value.toString();
						setTreeAgeRange(value, max);
					}}
					// slider-thumb styles are defined in index.css since stlyles are too long with thumb declerations
					className={`w-full h-0 absolute border border-gdk-light-gray 
                     rounded-lg appearance-none pointer-events-none slider-thumb 
                     ${min > INITIAL_MAX - 10 ? "thumb-50" : "thumb-30"}
                   `}
				/>
				<input
					type="range"
					min={INITIAL_MIN}
					max={INITIAL_MAX}
					value={max}
					step={10}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+event.target.value, min + 10);
						setMax(value);
						event.target.value = value.toString();
						setTreeAgeRange(min, value);
					}}
					className={`w-full h-0 absolute translate-y-[1px] rounded-lg 
					appearance-none pointer-events-none slider-thumb thumb-40
                   `}
				/>
			</div>
		</div>
	);
};
