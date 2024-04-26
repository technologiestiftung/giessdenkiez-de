import React from "react";

export const ColorLegend: React.FC = () => {
	return (
		<svg
			width="56"
			height="57"
			viewBox="0 0 56 57"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="transition ease-in-out duration-500 group origin-center"
		>
			<ellipse
				cx="27.5745"
				cy="35.7948" // 39.7948
				rx="12.5745"
				ry="8.79484"
				fill="#9D9C9C"
				className="transition ease-in-out duration-500 group-hover:translate-y-[4px]"
			/>
			<ellipse
				cx="27.5745"
				cy="30.7948" // 31.7948
				rx="12.5745"
				ry="8.79484"
				fill="#FD9531"
				className="transition ease-in-out duration-500 group-hover:translate-y-[1px]"
			/>
			<ellipse
				cx="27.5745"
				cy="25.7948"
				rx="12.5745"
				ry="8.79484"
				fill="#FDE725"
				className="transition ease-in-out duration-500 group-hover:-translate-y-[2px]"
			/>
			<ellipse
				cx="27.5745"
				cy="20.7948"
				rx="12.5745"
				ry="8.79484"
				fill="#63F3AA"
				className="transition ease-in-out duration-500 group-hover:-translate-y-[5px]"
			/>
		</svg>
	);
};
