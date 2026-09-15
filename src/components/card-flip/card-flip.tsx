import React from "react";

interface CardFlipProps {
	/** False shows the front, true shows the back. */
	isFlipped: boolean;
	children: [React.ReactNode, React.ReactNode];
}

const faceStyles: React.CSSProperties = {
	backfaceVisibility: "hidden",
	WebkitBackfaceVisibility: "hidden",
	height: "100%",
	left: 0,
	top: 0,
	transformStyle: "preserve-3d",
	transition: "0.6s",
	width: "100%",
};

/**
 * Flips between its two children around the vertical axis.
 *
 * Only the visible face is positioned `relative`, so it keeps driving the
 * height of the card while the hidden one is taken out of the flow.
 */
export const CardFlip: React.FC<CardFlipProps> = ({
	isFlipped,
	children: [front, back],
}) => (
	<div style={{ height: "100%" }}>
		<div
			style={{
				height: "100%",
				width: "100%",
				position: "relative",
				perspective: "1000px",
			}}
		>
			<div
				data-testid="card-flip-front"
				style={{
					...faceStyles,
					position: isFlipped ? "absolute" : "relative",
					transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
					zIndex: 2,
				}}
			>
				{front}
			</div>
			<div
				data-testid="card-flip-back"
				style={{
					...faceStyles,
					position: isFlipped ? "relative" : "absolute",
					transform: `rotateY(${isFlipped ? 0 : -180}deg)`,
					zIndex: isFlipped ? 2 : 1,
				}}
			>
				{back}
			</div>
		</div>
	</div>
);
