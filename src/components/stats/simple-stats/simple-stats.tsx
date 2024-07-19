import React from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { SimpleStatCard } from "./simple-stat-card";
import { useStatsStore } from "../store/stats-store";

export const SimpleStats: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { gdkStats, loading } = useStatsStore();

	const simpleStats = [
		{ title: i18n.stats.streetTrees, stat: gdkStats?.numTrees || 0 },
		{ title: i18n.stats.publicPumps, stat: gdkStats?.numPumps || 0 },
		{
			title: i18n.stats.activeUsers,
			stat: gdkStats?.numActiveUsers || 0,
		},
	];

	return (
		<>
			{simpleStats.map(({ title, stat }) => (
				<SimpleStatCard
					key={title}
					title={title}
					stat={stat}
					loading={loading}
				/>
			))}
		</>
	);
};
