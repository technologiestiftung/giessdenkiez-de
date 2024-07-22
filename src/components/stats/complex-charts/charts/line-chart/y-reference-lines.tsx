import React from "react";
import * as d3 from "d3";
import { useI18nStore } from "../../../../../i18n/i18n-store";
import { defaultLabelColor, indicatorLineColor } from "../chart-colors";
import { useStatsStore } from "../../../store/stats-store";

interface YReferenceLinesProps {
	yScale: d3.ScaleLinear<number, number, never>;
	svgMargin: { top: number; right: number; bottom: number; left: number };
}

const firstYReferenceLineValue = 30;
const secondYReferenceLineValue = 50;

export const YReferenceLines: React.FC<YReferenceLinesProps> = ({
	yScale,
	svgMargin,
}) => {
	const { formatNumber } = useI18nStore();
	const { chartWidth: width } = useStatsStore();

	return (
		<>
			{[firstYReferenceLineValue, secondYReferenceLineValue].map(
				(yReferenceLineValue) => (
					<React.Fragment key={yReferenceLineValue}>
						<line
							x1={svgMargin.left}
							y1={
								yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom
							}
							x2={width - svgMargin.right}
							y2={
								yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom
							}
							stroke={indicatorLineColor}
							strokeWidth={1}
						/>
						<text
							x={width - svgMargin.right + 5}
							y={
								yScale(yReferenceLineValue) +
								svgMargin.top -
								svgMargin.bottom +
								2.5
							}
							textAnchor="start"
							fill={defaultLabelColor}
							fontSize="12px"
							fontFamily={"IBM"}
						>
							{formatNumber(yReferenceLineValue)} l
						</text>
					</React.Fragment>
				),
			)}
		</>
	);
};
