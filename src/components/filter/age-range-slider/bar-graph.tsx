import React, { useMemo } from "react";
import { BarItem } from "./bar-item";
import { treeAgeGrouped } from "./tree-age-grouped";

export const calculateBarPercentage = (
	input: number,
	data: Array<{ count: number }>,
) => {
	const maxCount = Math.max(...data.map((item) => item.count));
	return `${Math.round((input / maxCount) * 100)}%`;
};

export interface BarGraphProps {
	min: number;
	max: number;
}

export const BarGraph: React.FC<BarGraphProps> = ({ min, max }) => {
	const treeAgeData = treeAgeGrouped;

	// trees with 200+ years are grouped together and displayed as one bar
	const accumulatedTreeAgeData = useMemo(() => {
		const filteredData = treeAgeData.filter((ageGroup) => ageGroup.alter < 200);
		const accumulatedCount = treeAgeData
			.filter((ageGroup) => ageGroup.alter >= 200)
			.reduce((accumulator, ageGroup) => accumulator + ageGroup.count, 0);
		const newData = [
			{ pflanzjahr_grouped: 1820, alter: 200, count: accumulatedCount },
			...filteredData,
		];
		return newData;
	}, [treeAgeData]);

	const barItems = useMemo(() => {
		return accumulatedTreeAgeData.map((ageGroup) => ({
			isActive: ageGroup.alter >= min && ageGroup.alter <= max,
			barPercentage: calculateBarPercentage(
				ageGroup.count,
				accumulatedTreeAgeData,
			),
		}));
	}, [accumulatedTreeAgeData, min, max]);

	const yAxisLabelHeight = useMemo(() => {
		return calculateBarPercentage(100000, accumulatedTreeAgeData);
	}, [accumulatedTreeAgeData]);

	return (
		<div className="w-full h-[100px] relative">
			<div className="flex flex-row gap-0.5 w-full h-full">
				<div
					className="w-full border border-[#DDDDDD] z-0 absolute"
					style={{ bottom: yAxisLabelHeight }}
				></div>
				<p className="text-[#DDDDDD] -translate-y-0.5 font-semibold">100k</p>
				{barItems.reverse().map((ageGroup, idx) => (
					<BarItem
						key={idx}
						barPercentage={ageGroup.barPercentage}
						isActive={ageGroup.isActive}
					/>
				))}
			</div>
			<div className="flex w-full justify-between pt-6 text-gdk-light-gray font-semibold">
				<span className="">0</span>
				<span>200+</span>
			</div>
		</div>
	);
};
