import React, { useState } from "react";

type TreeAgeButtonProps = {
	name: string;
	padding: string;
	onChange: () => void;
};

const TreeAgeButton: React.FC<TreeAgeButtonProps> = ({ name, padding }) => {
	const [isSelected, setIsSelected] = useState(true);
	return (
		<div
			className={`${isSelected && "border-gdk-blue"} border-2 h-full flex flex-col justify-center text-center p-2 rounded-lg bg-[#F7F7F7] hover:cursor-pointer gap-0 p-4`}
			onClick={() => {
				setIsSelected(!isSelected);
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
