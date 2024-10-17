import React from "react";

interface MailIconProps {
	color?: string;
	hoverColor?: string;
}

export const MailIcon: React.FC<MailIconProps> = ({ color, hoverColor }) => {
	return (
		<div
			className={`${
				color && hoverColor
					? `text-${color} hover:text-${hoverColor}`
					: `text-gdk-blue hover:text-gdk-light-blue`
			}`}
		>
			<svg
				width="30"
				height="25"
				viewBox="0 0 30 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M25.4 2H4.6C3.16406 2 2 3.16406 2 4.6V20.2C2 21.6359 3.16406 22.8 4.6 22.8H25.4C26.8359 22.8 28 21.6359 28 20.2V4.6C28 3.16406 26.8359 2 25.4 2Z"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M28 5.89941L16.339 13.3094C15.9377 13.5609 15.4736 13.6942 15 13.6942C14.5264 13.6942 14.0623 13.5609 13.661 13.3094L2 5.89941"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};
