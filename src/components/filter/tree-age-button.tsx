import React, { useState } from "react";
import SwitchButton from "../buttons/switch-button";

type TreeAgeButtonProps = {
	name: string;
	padding: string;
	onChange: () => void;
};

const TreeAgeButton: React.FC<TreeAgeButtonProps> = ({ name, padding }) => {
	const [isEnabled, setIsEnabled] = useState(false);
	return (
		<div
			className={`h-full flex flex-col justify-center text-center p-2 rounded-lg bg-[#F7F7F7] hover:cursor-pointer gap-2`}
		>
			<img src="/images/tree-icon.svg" className={`${padding}`}></img>
			<div className="text-lg font-bold">{name}</div>
		</div>
	);
};

export default TreeAgeButton;
