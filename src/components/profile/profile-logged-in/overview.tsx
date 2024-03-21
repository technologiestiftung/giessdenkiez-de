import React from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useAuthStore } from "../../../auth/auth-store";
import { AdoptedTreeIcon } from "../../icons/adopted-tree-icon";

export const Overview: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();

	const { adoptedTrees, adoptedTreesInfo } = useAuthStore();

	const wateringAmountTotal = adoptedTreesInfo?.reduce(
		(acc, tree) => acc + tree.reducedWateringAmount,
		0,
	);

	const wateringCountTotal = adoptedTreesInfo?.reduce(
		(acc, tree) => acc + tree.trees_watered.length,
		0,
	);

	return (
		<div className="md:shadow-gdk-soft mb-3 md:rounded-2xl md:border-2 md:p-7">
			<h2 className="text-2xl font-semibold">
				{i18n.navbar.profile.overview.subtitle}
			</h2>

			<div className="mt-7 flex flex-col gap-3 lg:flex-row ">
				<div className="shadow-gdk-soft  flex flex-col justify-between gap-3 lg:min-w-36 rounded-2xl border-2 p-4 font-semibold">
					{i18n.navbar.profile.overview.liter}
					<span className="flex items-baseline gap-x-5 text-5xl font-medium">
						<img src="images/icon-drop.svg" alt="" className="w-5" />
						{formatNumber(wateringAmountTotal)}
					</span>
				</div>

				<div className="flex gap-3">
					<div className="shadow-gdk-soft flex w-full flex-col justify-between gap-3 lg:min-w-36 rounded-2xl border-2 p-4 font-semibold">
						{i18n.navbar.profile.overview.adoptedTrees}
						<span className="flex items-baseline gap-x-5 text-5xl font-medium">
							<div className="text-gdk-purple stroke-none">
								<AdoptedTreeIcon />
							</div>
							{formatNumber(adoptedTrees?.length)}
						</span>
					</div>

					<div className="shadow-gdk-soft flex w-full flex-col justify-between gap-3 lg:min-w-36 rounded-2xl border-2 p-4 font-semibold">
						{i18n.navbar.profile.overview.irrigations}
						<span className="flex items-baseline gap-x-5 text-5xl font-medium">
							<img src="images/icon-watering-can.svg" alt="" className="" />
							{formatNumber(wateringCountTotal)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
