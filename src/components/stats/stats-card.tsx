import React from "react";
import { InfoIcon } from "../icons/info-icon";
import { useI18nStore } from "../../i18n/i18n-store";

interface StatsCardProps {
	title: string;
	hint: string;
	stat: number;
	unit: string;
	titleColor: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
	title,
	hint,
	stat,
	unit,
	titleColor,
	icon,
	children,
}) => {
	const { formatNumber } = useI18nStore();
	return (
		<div
			className={`flex flex-col rounded-2xl p-2 md:p-4 border md:border-2 w-full text-left gap-1`}
		>
			<div className={`flex flex-row justify-between items-center`}>
				<div className="flex flex-row gap-2 text-xl font-semibold">{title}</div>
				<div className={` ${titleColor}`}>
					<InfoIcon></InfoIcon>
				</div>
			</div>
			<div
				className={`flex flex-col md:flex-row gap-2 items-baseline ${titleColor}`}
			>
				{icon}
				<span className="text-4xl font-bold">{formatNumber(stat)}</span>
				<span className="text-3xl font-semibold">{unit}</span>
			</div>
			<div className={`text-xl font-semibold ${titleColor}`}>{hint}</div>
			<div className="py-3">{children}</div>
		</div>
	);
};
