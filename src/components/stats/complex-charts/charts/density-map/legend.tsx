import React from "react";
import { densityHighColor, densityLowColor } from "../chart-colors";
import { useStatsStore } from "../../../store/stats-store";

export const Legend: React.FC = () => {
	const { chartWidth: width, chartHeight: height } = useStatsStore();

	return (
		<>
			<defs>
				<linearGradient id="legendGradient" x1="0%" x2="100%" y1="0%" y2="0%">
					<stop offset="0%" stopColor={densityLowColor} stopOpacity={0.2} />
					<stop offset="100%" stopColor={densityHighColor} stopOpacity={1} />
				</linearGradient>
			</defs>
			<rect
				fill="url(#legendGradient)"
				x={width / 6}
				y={height - 10}
				width={width / 1.5}
				height={6}
				rx={3}
			></rect>
		</>
	);
};
