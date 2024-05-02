import React, { useMemo } from "react";
import { BarItem } from "./bar-item";
import { getMaxCount, getTreesGroupByAge } from "./tree-age-grouped";

const TREES_GROUPED_BY_AGE = getTreesGroupByAge();
const MAX_COUNT = getMaxCount();

export const calculateBarPercentage = (input: number, maxCount: number) => {
	return `${Math.round((input / maxCount) * 100)}%`;
};

export interface BarGraphProps {
	min: number;
	max: number;
}

export const BarGraph: React.FC<BarGraphProps> = ({ min, max }) => {
	const barItems = useMemo(() => {
		return TREES_GROUPED_BY_AGE.map((ageGroup) => ({
			isActive: ageGroup.alter >= min && ageGroup.alter <= max,
			barPercentage: calculateBarPercentage(ageGroup.count, MAX_COUNT),
			id: ageGroup.alter,
		})).reverse();
	}, [min, max]);

	const yAxisLabelHeight = calculateBarPercentage(100000, MAX_COUNT);

	return (
		<div className="w-full h-[90px] relative">
			<div className="flex flex-row gap-0.5 w-full h-full">
				<div
					className="w-full border border-[#DDDDDD] z-0 absolute"
					style={{ bottom: yAxisLabelHeight }}
				></div>
				<span className="text-[#DDDDDD] -translate-y-0.5 font-semibold absolute right-0">
					100k
				</span>
				{barItems.map((ageGroup) => (
					<BarItem
						key={ageGroup.id}
						barPercentage={ageGroup.barPercentage}
						isActive={ageGroup.isActive}
					/>
				))}
			</div>
			<div className="flex w-full justify-between pt-4 text-gdk-light-gray font-semibold">
				<span className="">0</span>
				<span>200+</span>
			</div>
		</div>
	);
};
