import React from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { Skeleton } from "../../skeleton/skeleton";

interface SimpleStatsCardProps {
	title: string;
	stat: number;
	loading: boolean;
}

export const SimpleStatCard: React.FC<SimpleStatsCardProps> = ({
	title,
	stat,
	loading,
}) => {
	const { formatNumber } = useI18nStore();
	return (
		<div className="flex flex-col rounded-2xl p-4 border md:border-2 w-full text-left gap-2 md:gap-3">
			<>
				{loading && <Skeleton className="w-full h-10 rounded-lg" />}
				{!loading && (
					<div className="text-4xl  font-bold">{formatNumber(stat)}</div>
				)}
				<div className="text-xl font-semibold">{title}</div>
			</>
		</div>
	);
};
