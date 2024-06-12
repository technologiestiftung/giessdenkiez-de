import React from "react";

export interface SecondaryButtonProps {
	label: string | React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
	type?: "button" | "submit";
}

export const SecondaryDestructiveButton: React.FC<SecondaryButtonProps> = ({
	label,
	onClick,
	disabled,
	type = "button",
}) => {
	return (
		<button
			className={`
			outline-gdk-dark-red bg-gdk-white text-gdk-dark-red 
			enabled:hover:bg-gdk-dark-red hover:text-gdk-white disabled:outline-gdk-light-gray disabled:text-gdk-light-gray 
			my-2 lg:my-4 flex h-[51px] w-full items-center justify-center rounded-[10px] px-8 py-3.5 font-semibold 
			outline outline-2 sm:w-fit`}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			<span className="flex flex-row  items-center gap-3">{label}</span>
		</button>
	);
};
