import React from "react";

// eslint-disable-next-line no-shadow
export enum HeartIconState {
	Default,
	Hover,
}

// eslint-disable-next-line no-shadow
export enum HeartIconFillState {
	Empty,
	Filled,
}

interface HeartIconProps {
	state: HeartIconState;
	fillState: HeartIconFillState;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ state, fillState }) => {
	if (state === HeartIconState.Hover) {
		return (
			<div>
				<img
					src="/images/heart-icon-hover.svg"
					alt="Tree Icon"
					width={24}
					height={24}
				/>
			</div>
		);
	}

	if (fillState === HeartIconFillState.Filled) {
		return (
			<div>
				<img
					src="/images/heart-icon-filled.svg"
					alt="Tree Icon"
					width={24}
					height={24}
				/>
			</div>
		);
	}

	return (
		<div>
			<img
				src="/images/heart-icon.svg"
				alt="Tree Icon"
				width={24}
				height={24}
			/>
		</div>
	);
};
