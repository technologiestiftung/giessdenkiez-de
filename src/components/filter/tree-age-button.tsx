import React from "react";
import { TreeAgeInterval } from "./filter-store";
import { TreeIconThinner } from "../icons/tree-icon-thinner";

type TreeAgeButtonProps = {
	interval: TreeAgeInterval;
	name: string;
	size: string;
	onChange: (interval: TreeAgeInterval) => void;
};

export const TreeAgeButton: React.FC<TreeAgeButtonProps> = ({
	interval,
	name,
	size,
	onChange,
}) => {
	return (
		<div
			className={`${
				interval.enabled && "border-gdk-blue"
			} border-2 h-full flex flex-col justify-center text-center p-2 rounded-lg bg-[#F7F7F7] hover:cursor-pointer gap-2`}
			onClick={() => {
				onChange(interval);
			}}
		>
			<div className="flex flex-col justify-center items-center text-gdk-dark-green">
				<TreeIconThinner className={size} />
			</div>
			<div className="text-sm font-semibold overflow-hidden">{name}</div>
		</div>
	);
};
