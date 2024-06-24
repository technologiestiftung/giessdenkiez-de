import React from "react";

interface SimpleStatsCardProps {
	title: string;
	stat: string;
}

export const SimpleStatsCard: React.FC<SimpleStatsCardProps> = ({
	title,
	stat,
}) => {
	return (
		<div className="flex flex-col rounded-2xl px-4 pb-4 md:border-2 md:p-8 w-full text-left">
			<div className="text-4xl font-bold">{stat}</div>
			<div className="text-xl font-semibold">{title}</div>
		</div>
	);
};
