import React from "react";

interface BarItemProps {
	barPercentage: string;
	isActive: boolean;
}

export const BarItem: React.FC<BarItemProps> = ({
	barPercentage,
	isActive,
}) => {
	return (
		<>
			<div
				className={`flex-1 z-10 self-end rounded-t ${isActive ? "bg-gdk-bar-blue" : "bg-gdk-lighter-gray"}`}
				style={{ height: barPercentage }}
			></div>
		</>
	);
};
