import React from "react";
import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";
import { useFilterStore } from "../filter-store";
import { useI18nStore } from "../../../i18n/i18n-store";

interface AgeRangeSliderProps {
	min: number;
	max: number;
	onChange: ({ min, max }: { min: number; max: number }) => void;
}

export const AgeRangeSlider: React.FC<AgeRangeSliderProps> = ({
	min,
	max,
	onChange,
}) => {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef<HTMLInputElement>(null);
	const maxValRef = useRef<HTMLInputElement>(null);
	const range = useRef<HTMLDivElement>(null);

	const { treeAgeRange } = useFilterStore();
	const i18n = useI18nStore().i18n();

	// Convert to percentage
	const getPercent = useCallback(
		(value: number) => Math.round(((value - min) / (max - min)) * 100),
		[min, max],
	);

	const resetAgeSlider = () => {
		setMinVal(min);
		setMaxVal(max);
	};

	useEffect(() => {
		if (treeAgeRange.min === min && treeAgeRange.max === max) {
			resetAgeSlider();
		}
	}, [treeAgeRange]);

	// Set width of the range to decrease from the left side
	useEffect(() => {
		if (maxValRef.current) {
			const minPercent = getPercent(minVal);
			const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

			if (range.current) {
				range.current.style.left = `${minPercent}%`;
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [minVal, getPercent]);

	// Set width of the range to decrease from the right side
	useEffect(() => {
		if (minValRef.current) {
			const minPercent = getPercent(+minValRef.current.value);
			const maxPercent = getPercent(maxVal);

			if (range.current) {
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [maxVal, getPercent]);

	// Get min and max values when their state changes
	useEffect(() => {
		onChange({ min: minVal, max: maxVal });
	}, [minVal, maxVal]);

	return (
		<div className="flex flex-col w-full gap-6">
			<div className="flex flex-row justify-between font-semibold text-lg">
				<div>{i18n.filter.treeAgeTitle}</div>
				<div>
					{minVal}-{maxVal}
					{maxVal === 200 ? "+" : ""} {i18n.filter.years}
				</div>
			</div>
			<div className="relative">
				<input
					type="range"
					min={min}
					max={max}
					value={minVal}
					ref={minValRef}
					step={10}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+event.target.value, maxVal - 1);
						setMinVal(value);
						event.target.value = value.toString();
					}}
					// slider-thumb styles are defined in index.css since stlyles are too long with thumb declerations
					className={`w-full h-0 absolute border border-gdk-light-gray 
                     rounded-lg appearance-none pointer-events-none slider-thumb 
                     ${minVal > max - 10 ? "thumb-50" : "thumb-30"}
                   `}
				/>
				<input
					type="range"
					min={min}
					max={max}
					value={maxVal}
					ref={maxValRef}
					step={10}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+event.target.value, minVal + 1);
						setMaxVal(value);
						event.target.value = value.toString();
					}}
					className={`w-full h-0 absolute translate-y-[1px] rounded-lg 
					appearance-none pointer-events-none slider-thumb thumb-40
                   `}
				/>
			</div>
		</div>
	);
};
