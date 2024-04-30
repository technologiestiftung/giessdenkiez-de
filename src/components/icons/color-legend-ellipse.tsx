import React from "react";

interface ColorLegendEllipseProps {
	className?: string;
}

export const ColorLegendEllipse: React.FC<ColorLegendEllipseProps> = ({
	className,
}) => {
	return (
		<svg
			width="27"
			height="18"
			viewBox="0 0 27 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<ellipse
				cx="13.5071"
				cy="8.79484"
				rx="12.5745"
				ry="8.79484"
				fill="currentColor"
			/>
		</svg>
	);
};
