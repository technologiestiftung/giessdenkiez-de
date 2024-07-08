import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

interface SimpleStatsCardProps {
	title: string;
	stat: number;
	loading: boolean;
}

export const SimpleStatsCard: React.FC<SimpleStatsCardProps> = ({
	title,
	stat,
	loading,
}) => {
	const { formatNumber } = useI18nStore();
	return (
		<div className="flex flex-col rounded-2xl p-3 md:p-4 border md:border-2 w-full text-left gap-2 md:gap-3">
			<>
				{loading && (
					<div className="text-4xl font-bold w-full bg-slate-100 h-12 rounded-lg animate-pulse" />
				)}
				{!loading && (
					<div className="text-2xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold">
						{formatNumber(stat)}
					</div>
				)}
				<div className="text-xl font-semibold">{title}</div>
			</>
		</div>
	);
};
