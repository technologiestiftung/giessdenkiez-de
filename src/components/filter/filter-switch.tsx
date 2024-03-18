import React, { useState } from "react";
import SwitchButton from "../buttons/switch-button";

type FilterSwitchProps = {
	name: string;
	onChange: () => void;
};

const FilterSwitch: React.FC<FilterSwitchProps> = ({ name }) => {
	const [isEnabled, setIsEnabled] = useState(false);
	return (
		<div className="w-full flex flex-row items-center justify-between p-4 border-2 rounded-lg bg-[#FAFAFA] border-[#DDDDDD]">
			<div className="text-lg font-semibold">{name}</div>
			<div>
				<SwitchButton onChange={() => {}} />
			</div>
		</div>
	);
};

export default FilterSwitch;
