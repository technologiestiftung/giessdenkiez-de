import React from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { InternalAnchorLink } from "../../../anchor-link/internal-anchor-link";
import { HeartIcon } from "../../../icons/heart-icon";
import { useTreeAdoptStore } from "../../../tree-detail/stores/adopt-tree-store";
import { WateringCanIcon } from "../../../icons/watering-can-icon";
import { DropIcon } from "../../../icons/drop-icon";

export interface TreeCardProps {
	id: string;
	name: string;
	totalWateringVolume: number;
	totalWateringCount: number;
}

export const TreeCard: React.FC<TreeCardProps> = ({
	id,
	name,
	totalWateringVolume,
	totalWateringCount,
}) => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();
	const { unadoptTree } = useTreeAdoptStore();

	return (
		<div
			key={id}
			className="shadow-gdk-soft flex flex-col gap-3 rounded-2xl border-2 py-4 px-3.5 justify-between"
		>
			<div className="flex justify-between">
				<InternalAnchorLink href={`/map?treeId=${id}&zoom=20`} label={name} />
				<div className="pl-1">
					<button
						type="button"
						onClick={async () => {
							await unadoptTree(id);
						}}
					>
						<HeartIcon isAdopted={true} />
					</button>
				</div>
			</div>

			<div>
				<hr className="mb-3"></hr>
				<div className="flex gap-2 font-medium">
					<div className="flex flex-col gap-3">
						<div className="text-gdk-dark-green">
							<WateringCanIcon />
						</div>
						<div className="text-gdk-watering-blue">
							<DropIcon />
						</div>
					</div>

					<div className="mt-1 flex flex-col gap-3">
						<span>
							{formatNumber(totalWateringCount)}{" "}
							{i18n.navbar.profile.adoptedTrees.irrigationTimes}
						</span>
						<span>
							{formatNumber(totalWateringVolume)}{" "}
							{i18n.navbar.profile.adoptedTrees.irrigationAmount}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
