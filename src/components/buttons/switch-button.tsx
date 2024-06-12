import React from "react";

type SwitchButtonProps = {
	isEnabled: boolean;
	onToggle: () => void;
	isDisabled?: boolean;
};

export const SwitchButton: React.FC<SwitchButtonProps> = ({
	isEnabled,
	onToggle,
	isDisabled = false,
}) => {
	return (
		<button
			onClick={() => {
				onToggle();
			}}
			className={`w-14 h-8 bg-white rounded-full border-2 flex flex-row ${
				isEnabled && !isDisabled
					? "border-gdk-blue justify-end"
					: "border-[#989898] justify-start"
			}`}
		>
			<div
				className={`w-5 h-5 rounded-full ${
					isEnabled ? "bg-gdk-blue" : "bg-[#989898]"
				} m-1`}
			></div>
		</button>
	);
};
