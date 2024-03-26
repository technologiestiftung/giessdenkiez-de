import React, { Suspense } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { AdoptButtonLazy } from "../../buttons/adoptButtonLazy";
import { InternalAnchorLink } from "../../anchor-link/internal-anchor-link";
import { Skeleton } from "../../skeleton/skeleton";

export interface TreeCardProps {
	id: string;
	name: string;
	irrigationAmount: number;
	irrigationTimes: number;
}

export const TreeCard: React.FC<TreeCardProps> = ({
	id,
	name,
	irrigationAmount,
	irrigationTimes,
}) => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();

	return (
		<Suspense fallback={<Skeleton className="bg-red-300" />}>
			<AdoptButtonLazy treeId={id}></AdoptButtonLazy>
		</Suspense>
	);
};
