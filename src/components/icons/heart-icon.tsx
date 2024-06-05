import React from "react";

interface HeartIconProps {
	isAdopted: boolean;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ isAdopted }) => {
	return (
		<div
			className={`${
				isAdopted
					? "text-gdk-purple stroke-gdk-purple hover:text-transparent hover:stroke-gdk-light-gray"
					: "text-transparent stroke-gdk-light-gray hover:stroke-gdk-purple"
			} hover:pointer-events-auto`}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 34 29"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M25.2179 22.0022C21.3283 25.3926 17.3478 27.5617 17 27.746C16.6522 27.5617 12.6717 25.3927 8.78213 22.0022C4.7955 18.5272 1.25034 14.0676 1.25 9.36747C1.25263 7.21729 2.1119 5.15473 3.64125 3.63251C5.1708 2.1101 7.24579 1.25262 9.41138 1.25C12.1825 1.25019 14.5449 2.43026 16.0021 4.36201L17 5.68488L17.9979 4.36201C19.4551 2.43026 21.8175 1.25019 24.5886 1.25C26.7542 1.25262 28.8292 2.1101 30.3587 3.63251C31.8883 5.1549 32.7476 7.21776 32.75 9.36821C32.7493 14.068 29.2043 18.5274 25.2179 22.0022Z"
					fill="currentColor"
					stroke="inherit"
					strokeWidth="2.5"
				/>
			</svg>
		</div>
	);
};
