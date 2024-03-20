import React from "react";
import { useI18nStore } from "../../../i18n/i18n-store";

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
		<div
			key={id}
			className="shadow-gdk-soft flex flex-col gap-3 rounded-2xl border-2 p-4 "
		>
			<a
				className="py-2 font-semibold text-blue-600 hover:text-gdk-light-blue"
				href={`/map?treeId=${id}`}
			>
				{name}
			</a>
			<button className="-mt-4 self-end">
				<img src="/images/icon-filled-heart.svg" alt="" />
			</button>
			<hr />
			<div className="flex gap-2 font-medium">
				<div className="flex flex-col gap-3">
					<img src="images/icon-watering-can.svg" alt="" className="" />
					<img src="images/icon-drop.svg" alt="" className="ml-1 w-5" />
				</div>

				<div className="mt-1 flex flex-col gap-3">
					<span>
						{formatNumber(irrigationTimes)}{" "}
						{i18n.navbar.profile.adoptedTrees.irrigationTimes}
					</span>
					<span>
						{formatNumber(irrigationAmount)}{" "}
						{i18n.navbar.profile.adoptedTrees.irrigationAmount}
					</span>
				</div>
			</div>
		</div>
	);
};
