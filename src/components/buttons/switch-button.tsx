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
				isEnabled
					? "border-gdk-blue justify-end"
					: "border-[#989898] justify-start"
			} disabled:border-[#BBBDBF] `}
			disabled={isDisabled}
		>
			<div
				className={`w-5 h-5 rounded-full ${
					isEnabled ? "bg-gdk-blue" : "bg-[#989898]"
				} ${isDisabled ? "bg-[#BBBDBF]" : ""} m-1`}
			></div>
		</button>
	);
};
