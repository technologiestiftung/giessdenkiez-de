import React from "react";

export interface TertiaryDestructiveButtonProps {
	label: string | React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

export const TertiaryDestructiveButton: React.FC<
	TertiaryDestructiveButtonProps
> = ({ label, onClick, disabled }) => {
	return (
		<button
			className={`hover:text-bg-gdk-light-blue enabled:hover:text-gdk-light-red" p-y-3.5
      flex h-[51px] w-fit items-center justify-center rounded-[10px] font-semibold text-gdk-dark-red 
      enabled:hover:text-gdk-light-red disabled:text-gdk-light-gray
        `}
			disabled={disabled}
			onClick={onClick}
		>
			<span className="flex flex-row  items-center gap-3">{label}</span>
		</button>
	);
};
