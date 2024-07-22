import React from "react";
import * as d3 from "d3";
import { defaultLabelColor, indicatorLineColor } from "../chart-colors";
import { useI18nStore } from "../../../../../i18n/i18n-store";
import { useStatsStore } from "../../../store/stats-store";

interface IndicatorLineProps {
	svgMargin: { top: number; right: number; bottom: number; left: number };
	yScale: d3.ScaleLinear<number, number, never>;
}

export const IndicatorLine: React.FC<IndicatorLineProps> = ({
	svgMargin,
	yScale,
}) => {
	const { formatNumber } = useI18nStore();
	const i18n = useI18nStore().i18n();
	const { chartWidth: width } = useStatsStore();

	const yReferenceLineValue = 100000;

	return (
		<>
			<line
				x1={svgMargin.left}
				x2={width - svgMargin.right}
				y1={yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom}
				y2={yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom}
				stroke={indicatorLineColor}
				strokeWidth={1}
			></line>
			<text
				x={width - svgMargin.right + 3}
				y={yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom - 2}
				textAnchor="start"
				fill={defaultLabelColor}
				fontSize="12px"
			>
				{`${formatNumber(yReferenceLineValue / 1000)}k`}
			</text>
			<text
				x={width - svgMargin.right + 3}
				y={yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom + 11}
				textAnchor="start"
				fill={defaultLabelColor}
				fontSize="12px"
			>
				{i18n.stats.wateringBehaviorStat.unit}
			</text>
		</>
	);
};
