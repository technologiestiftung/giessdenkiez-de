import React from "react";
import { useI18nStore } from "../../../../../i18n/i18n-store";
import { Monthly } from "../../../store/types";
import { useStatsStore } from "../../../store/stats-store";

interface LegendProps {
	formatMonth: (date: string) => string;
	hoveredMonth: Monthly | undefined;
}
export const Legend: React.FC<LegendProps> = ({
	hoveredMonth,
	formatMonth,
}) => {
	const { monthlyWeather: weatherData } = useStatsStore();
	const { formatNumber } = useI18nStore();
	const i18n = useI18nStore().i18n();

	return (
		<>
			{hoveredMonth && (
				<div className="absolute left-0 top-1.5 p-1.5 bg-white/75 border shadow-sm rounded-md pointer-events-none">
					<div className="flex flex-col text-sm ">
						<div className="font-bold">{formatMonth(hoveredMonth.month)}</div>
						<div className="text-gdk-dark-blue">
							{formatNumber(hoveredMonth.totalSum)} l{" "}
							{i18n.stats.wateringBehaviorStat.watered}
						</div>
						<div className="text-gdk-dark-blue opacity-40">
							{Math.round(
								weatherData.filter((d) => d.month === hoveredMonth.month)[0]
									.totalRainfallLiters,
							)}
							{" mm "}
							{i18n.stats.wateringBehaviorStat.rain}
						</div>
						<div className="text-gdk-orange opacity-80">
							Ø{" "}
							{Math.round(
								weatherData.filter((d) => d.month === hoveredMonth.month)[0]
									.averageTemperatureCelsius,
							)}
							{" °C"}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
