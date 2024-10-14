import React from "react";
import Markdown from "react-markdown";
import { useI18nStore } from "../../../../i18n/i18n-store";

export const WaterProgressCircleWinter: React.FC = () => {
	const i18n = useI18nStore().i18n();
	return (
		<div className="flex flex-row items-center justify-center gap-4 stroke-gdk-groundwater-blue relative">
			<svg width={180} height={180}>
				<circle
					cx={90}
					cy={90}
					r={81}
					fill="none"
					stroke="currentStroke"
					strokeWidth="15"
				></circle>
			</svg>
			<div className="absolute text-xl text-center w-52">
				<Markdown className="m-12">
					{i18n.treeDetail.waterNeed.winterNeedsNoWater}
				</Markdown>
			</div>
		</div>
	);
};
