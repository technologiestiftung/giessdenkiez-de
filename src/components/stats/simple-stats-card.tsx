import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { InfoIcon } from "../icons/info-icon";

interface SimpleStatsCardProps {
	title: string;
	stat: number;
}

export const SimpleStatsCard: React.FC<SimpleStatsCardProps> = ({
	title,
	stat,
}) => {
	const { formatNumber } = useI18nStore();
	return (
		<div className="flex flex-col rounded-2xl p-2 md:p-4 border md:border-2 w-full text-left gap-3">
			<div className="text-4xl font-bold">{formatNumber(stat)}</div>
			<div className="text-xl font-semibold">{title}</div>
		</div>
	);
};
