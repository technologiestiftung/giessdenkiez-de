import React, { useState } from "react";
import { ColorLegend } from "../icons/color-legend-icon";
import { ColorLegendClose } from "../icons/color-legend-close-icon";
import { ColorLegendEllipse } from "../icons/color-legend-ellipse";

export const LegendButton: React.FC = () => {
	const [isLegendOpen, setIsLegendOpen] = useState(false);

	return (
		<div className="flex flex-col gap-1">
			{isLegendOpen && (
				<div className="flex flex-row justify-between items-center gap-3 bg-gdk-white/75 rounded-3xl p-4">
					<div className="flex flex-col gap-4">
						<ColorLegendEllipse className="text-gdk-neon-green" />
						<ColorLegendEllipse className="text-[#FDE725]" />
						<ColorLegendEllipse className="text-gdk-orange" />
						<ColorLegendEllipse className="text-gdk-tree-gray" />
					</div>
					<div className="flex flex-col gap-2.5 font-semibold">
						<div>Versorgte Bäume</div>
						<div>Mäßig versorgte Bäume</div>
						<div>Gießbedürftige Bäume</div>
						<div>nicht dem Filter entsprechend</div>
					</div>
				</div>
			)}
			<button
				className={`bg-gdk-white shadow-gdk-hard w-[56px] h-[56px] rounded-full 
            flex items-center justify-center pointer-events-auto z-10
            text-gdk-gray hover:text-gdk-light-gray`}
				type="button"
				onClick={() => {
					setIsLegendOpen(!isLegendOpen);
				}}
			>
				{!isLegendOpen ? <ColorLegend /> : <ColorLegendClose />}
			</button>
		</div>
	);
};
