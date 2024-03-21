import React from "react";

export interface SecondaryButtonProps {
	label: string | React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
	label,
	onClick,
	disabled,
}) => {
	return (
		<button
			className={`bg-gdk-white outline-gdk-blue text-gdk-blue enabled:hover:bg-gdk-light-blue hover:text-gdk-white 
      disabled:outline-gdk-light-gray disabled:text-gdk-light-gray  
	  my-2 lg:my-4 flex  h-[51px] w-fit items-center justify-center rounded-[10px] px-8 py-3.5 font-semibold outline outline-2`}
			disabled={disabled}
			onClick={onClick}
		>
			<span className="flex flex-row  items-center gap-3">{label}</span>
		</button>
	);
};
