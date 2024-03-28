import React from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { InternalAnchorLink } from "../../../anchor-link/internal-anchor-link";
import { HeartIcon } from "../../../icons/heart-icon";
import { useTreeAdoptStore } from "../../../tree-detail/hooks/use-adopt-tree";

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
	const { unadoptTree } = useTreeAdoptStore();

	return (
		<div
			key={id}
			className="shadow-gdk-soft flex flex-col gap-3 rounded-2xl border-2 p-4 justify-between"
		>
			<InternalAnchorLink href={`/map?treeId=${id}&zoom=20`} label={name} />
			<div className="-mt-4 self-end">
				<button
					type="button"
					onClick={async () => {
						await unadoptTree(id);
					}}
				>
					<HeartIcon isAdopted={true} />
				</button>
			</div>

			<div>
				<hr className="mb-3"></hr>
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
		</div>
	);
};
