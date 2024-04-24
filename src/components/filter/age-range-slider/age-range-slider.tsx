import React from "react";
import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";

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

	// Convert to percentage
	const getPercent = useCallback(
		(value: number) => Math.round(((value - min) / (max - min)) * 100),
		[min, max],
	);

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
				<div>Alterspanne der Bäume</div>
				<div>
					{minVal}-{maxVal}
					{maxVal === 200 ? "+" : ""} Jahre
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
					className={`w-full h-0 absolute  border border-gdk-light-gray z-0
                     rounded-lg appearance-none pointer-events-none
                     ${minVal > max - 100 ? "[&::-webkit-slider-thumb]:z-50" : "[&::-webkit-slider-thumb]:z-30"}
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:active:scale-110
					 [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:duration-200
                     [&::-webkit-slider-thumb]:h-[30px] [&::-webkit-slider-thumb]:w-[30px] 
                     [&::-webkit-slider-thumb]:rounded-full  [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:bg-gdk-white [&::-webkit-slider-thumb]:outline 
                     [&::-webkit-slider-thumb]:outline-2 [&::-webkit-slider-thumb]:outline-gray-300
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
					className={`w-full h-0 absolute border-gdk-light-gray z-0
                     rounded-lg appearance-none pointer-events-none [&::-webkit-slider-thumb]:z-40
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:active:scale-110
					 [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:duration-200
                     [&::-webkit-slider-thumb]:h-[30px] [&::-webkit-slider-thumb]:w-[30px] 
                     [&::-webkit-slider-thumb]:rounded-full  [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:bg-gdk-white [&::-webkit-slider-thumb]:outline 
                     [&::-webkit-slider-thumb]:outline-2 [&::-webkit-slider-thumb]:outline-gray-300
                   `}
				/>
			</div>
		</div>
	);
};
