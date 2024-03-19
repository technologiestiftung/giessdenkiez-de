import React from "react";
import { TreeAgeInterval } from "./filter-store";

type TreeAgeButtonProps = {
	interval: TreeAgeInterval;
	name: string;
	padding: string;
	onChange: (interval: TreeAgeInterval) => void;
};

const TreeAgeButton: React.FC<TreeAgeButtonProps> = ({
	interval,
	name,
	padding,
	onChange,
}) => {
	return (
		<div
			className={`${interval.enabled && "border-gdk-blue"} border-2 h-full flex flex-col justify-center text-center p-2 rounded-lg bg-[#F7F7F7] hover:cursor-pointer gap-0 p-4`}
			onClick={() => {
				onChange(interval);
			}}
		>
			<div className=" flex flex-col justify-center items-center">
				<img src="/images/tree-icon.svg" className={`${padding} w-[60%]`}></img>
			</div>
			<div className="text-sm font-semibold overflow-hidden">{name}</div>
		</div>
	);
};

export default TreeAgeButton;
