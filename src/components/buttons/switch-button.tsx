import React, { useState } from "react";

type SwitchButtonProps = {
	onChange: (enabled: boolean) => void;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({ onChange }) => {
	const [isEnabled, setIsEnabled] = useState(true);
	return (
		<button
			onClick={() => {
				setIsEnabled(!isEnabled);
				onChange(isEnabled);
			}}
			className={`w-14 h-8 bg-white rounded-full border-2 flex flex-row ${isEnabled ? "border-gdk-blue justify-end" : "border-[#989898] justify-start"}`}
		>
			<div
				className={`w-5 h-5 rounded-full ${isEnabled ? "bg-gdk-blue" : "bg-[#989898]"} m-1`}
			></div>
		</button>
	);
};

export default SwitchButton;
