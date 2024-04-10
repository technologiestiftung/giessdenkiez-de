import React from "react";
import { SpinnerIcon } from "../icons/spinner-icon";

export interface PrimaryButtonProps {
	label: string | React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit";
	isLoading?: boolean;
}

export const PrimaryDestructiveLoadingButton: React.FC<PrimaryButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	isLoading = false,
}) => {
	return (
		<button
			className={`text-gdk-white bg-gdk-dark-red hover:bg-gdk-light-red disabled:bg-gdk-light-gray 
		my-4 flex  h-[51px] w-[120px] items-center justify-center rounded-[10px] px-8 py-3.5 font-semibold`}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			<div className={`-translate-x-2 ${isLoading ? "flex" : "hidden"}`}>
				<SpinnerIcon />
			</div>
			<span className="flex flex-row items-center gap-3">{label}</span>
		</button>
	);
};
