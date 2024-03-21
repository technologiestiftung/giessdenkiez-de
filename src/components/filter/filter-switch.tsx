import React from "react";
import { SwitchButton } from "../buttons/switch-button";

type FilterSwitchProps = {
	name: string;
	isEnabled: boolean;
	onToggle: () => void;
};

export const FilterSwitch: React.FC<FilterSwitchProps> = ({
	name,
	onToggle,
	isEnabled,
}) => {
	return (
		<div className="w-full flex flex-row items-center justify-between py-2 px-4 lg:p-4 border-2 rounded-lg bg-[#FAFAFA] border-[#DDDDDD]">
			<div className="text-base lg:text-lg font-semibold">{name}</div>
			<div>
				<SwitchButton onToggle={onToggle} isEnabled={isEnabled} />
			</div>
		</div>
	);
};
