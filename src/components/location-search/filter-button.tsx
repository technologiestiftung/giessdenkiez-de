import React from "react";
import { FilterIcon } from "../icons/filter-icon";
import { useFilterStore } from "../filter/filter-store";

export const FilterButton: React.FC = () => {
	const { isSomeFilterActive, getAmountOfActiveFilters, toggleFilterView } =
		useFilterStore();

	return (
		<button
			onClick={toggleFilterView}
			className={`
			p-3 rounded-full bg-white drop-shadow-md w-[56px] h-[56px] flex items-center justify-center 
			${
				isSomeFilterActive()
					? "hover:text-gdk-light-blue text-gdk-blue"
					: "hover:text-gdk-light-gray text-gdk-gray"
			}
			`}
		>
			{isSomeFilterActive() && (
				<div className="relative">
					<div className="absolute -top-9 left-4 rounded-full w-7 h-7 bg-gdk-blue">
						<div className="flex w-full h-full justify-center items-center text-white font-semibold">
							{getAmountOfActiveFilters()}
						</div>
					</div>
				</div>
			)}
			<FilterIcon />
		</button>
	);
};
