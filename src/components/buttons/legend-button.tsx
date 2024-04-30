import React, { useState } from "react";
import { ColorLegend } from "../icons/color-legend-icon";
import { ColorLegendClose } from "../icons/color-legend-close-icon";
import { ColorLegendEllipse } from "../icons/color-legend-ellipse";
import { useI18nStore } from "../../i18n/i18n-store";

export const LegendButton: React.FC = () => {
	const [isLegendOpen, setIsLegendOpen] = useState(false);
	const i18n = useI18nStore().i18n();

	return (
		<div className="flex flex-col gap-1">
			{isLegendOpen && (
				<div className="flex flex-row justify-between items-center gap-3 bg-gdk-white/75 rounded-3xl p-4">
					<div className="flex flex-col gap-4">
						<ColorLegendEllipse className="text-gdk-neon-green" />
						<ColorLegendEllipse className="text-gdk-tree-yellow" />
						<ColorLegendEllipse className="text-gdk-tree-orange" />
						<ColorLegendEllipse className="text-gdk-tree-gray" />
					</div>
					<div className="flex flex-col gap-2.5 font-semibold">
						<div>{i18n.legend.greenTrees}</div>
						<div>{i18n.legend.yellowTrees}</div>
						<div>{i18n.legend.orangeTrees}</div>
						<div>{i18n.legend.grayTrees}</div>
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
				title={i18n.legend.title}
			>
				{!isLegendOpen ? <ColorLegend /> : <ColorLegendClose />}
			</button>
		</div>
	);
};
