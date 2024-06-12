import React from "react";
import { SpinnerIcon } from "../icons/spinner-icon";

export interface PrimaryButtonProps {
	label: string | React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit";
	isLoading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
	isLoading = false,
}) => {
	return (
		<button
			className={`
      my-2 lg:my-4 flex h-[51px] w-full items-center justify-center rounded-[10px] bg-gdk-blue px-8 font-semibold 
      text-gdk-white hover:bg-gdk-light-blue disabled:bg-gdk-light-gray sm:w-fit`}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			<div className={`-translate-x-3 ${isLoading ? "flex" : "hidden"}`}>
				<SpinnerIcon />
			</div>
			<span className="flex flex-row items-center gap-3">{label}</span>
		</button>
	);
};
