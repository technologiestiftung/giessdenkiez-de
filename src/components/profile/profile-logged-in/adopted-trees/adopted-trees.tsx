import React, { useState } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { TertiaryButton } from "../../../buttons/tertiary";
import { TreeCard } from "./tree-card";
import { useAuthStore } from "../../../../auth/auth-store";
import { AdoptedTreeIcon } from "../../../icons/adopted-tree-icon";
import { Skeleton } from "../../../skeleton/skeleton";
import { AdoptedTreesCard } from "./adoptedTreesCard";

export const AdoptedTrees: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const [areAllTreesVisible, setAreAllTreesVisible] = useState(false);
	const { adoptedTreesInfo } = useAuthStore();

	if (adoptedTreesInfo === null) {
		return (
			<AdoptedTreesCard
				sectionTitle={i18n.navbar.profile.overview.adoptedTrees}
			>
				<div className="mt-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
					<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[176px] justify-between" />
					<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[176px] justify-between" />
					<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[176px] justify-between" />
					<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[176px] justify-between" />
				</div>
			</AdoptedTreesCard>
		);
	}

	if (adoptedTreesInfo.length === 0) {
		return (
			<AdoptedTreesCard
				sectionTitle={i18n.navbar.profile.overview.adoptedTrees}
			>
				<div className="mt-7 shadow-gdk-soft flex flex-row rounded-2xl border-2 p-4 lg:w-3/6 gap-3 ">
					<div className="text-gdk-white stroke-gdk-gray mt-1">
						<AdoptedTreeIcon />
					</div>
					<p>{i18n.navbar.profile.adoptedTrees.noAdoptedTreesMessage}</p>
				</div>
			</AdoptedTreesCard>
		);
	}

	return (
		<AdoptedTreesCard sectionTitle={i18n.navbar.profile.overview.adoptedTrees}>
			<div className="mt-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
				{!areAllTreesVisible &&
					adoptedTreesInfo
						.slice(0, 4)
						.map((tree) => (
							<TreeCard
								id={tree.id}
								name={tree.artdtsch}
								irrigationAmount={tree.reducedWateringAmount}
								irrigationTimes={tree.trees_watered.length}
								key={tree.id}
							/>
						))}
				{areAllTreesVisible &&
					adoptedTreesInfo.map((tree) => (
						<TreeCard
							id={tree.id}
							name={tree.artdtsch}
							irrigationAmount={tree.reducedWateringAmount}
							irrigationTimes={tree.trees_watered.length}
							key={tree.id}
						/>
					))}
			</div>
			{adoptedTreesInfo.length > 4 && (
				<div className=" pointer-events-auto flex justify-center pt-8">
					<TertiaryButton
						onClick={() => setAreAllTreesVisible(!areAllTreesVisible)}
						label={
							areAllTreesVisible
								? i18n.navbar.profile.adoptedTrees.showLess
								: i18n.navbar.profile.adoptedTrees.showAll
						}
					/>
				</div>
			)}
		</AdoptedTreesCard>
	);
};
