import React from "react";

interface WarningProps {
	label: string;
}
export const Warning: React.FC<WarningProps> = ({ label }) => {
	return (
		<div
			className={`flex w-full items-center gap-2.5 rounded bg-gdk-orange px-3 py-4 text-white`}
		>
			<img src="/images/icon-exclamation-mark.svg" alt="" />
			{label}
		</div>
	);
};
