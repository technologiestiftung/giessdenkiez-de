import React, { useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { TertiaryButton } from "../../buttons/tertiary";
import { TreeCard } from "./tree-card";
import { useAuthStore } from "../../../auth/auth-store";
import { AdoptedTreeIcon } from "../../icons/adopted-tree-icon";
import { Skeleton } from "../../skeleton/skeleton";

export interface AdoptedTreesWrapperProps {
	sectionTitle?: string;
}

export const AdoptedTreesWrapper: React.FC<
	AdoptedTreesWrapperProps & React.HTMLAttributes<HTMLDivElement>
> = ({ sectionTitle, ...props }) => {
	return (
		<div className="md:shadow-gdk-soft mb-3 md:rounded-2xl md:border-2 md:p-7">
			<h2 className="text-2xl font-semibold">{sectionTitle}</h2>
			{props.children}
		</div>
	);
};

export const AdoptedTrees: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const [showAllTrees, setshowAllTrees] = useState(false);
	const { adoptedTreesInfo } = useAuthStore();

	const maxTrees =
		adoptedTreesInfo?.length ?? 0 > 3 ? 4 : adoptedTreesInfo?.length ?? 0;

	switch (adoptedTreesInfo) {
		case null:
			return (
				<AdoptedTreesWrapper
					sectionTitle={i18n.navbar.profile.overview.adoptedTrees}
				>
					<div className="mt-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
						<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[182px] justify-between" />
						<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[182px] justify-between" />
						<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[182px] justify-between" />
						<Skeleton className="shadow-gdk-soft rounded-2xl border-2 p-4 h-[182px] justify-between" />
					</div>
				</AdoptedTreesWrapper>
			);
		default:
			switch (adoptedTreesInfo.length) {
				case 0:
					return (
						<AdoptedTreesWrapper
							sectionTitle={i18n.navbar.profile.overview.adoptedTrees}
						>
							<div className="mt-7 shadow-gdk-soft flex flex-row rounded-2xl border-2 p-4 lg:w-3/6 gap-3 ">
								<div className="text-gdk-white stroke-gdk-gray mt-1">
									<AdoptedTreeIcon />
								</div>
								<p>{i18n.navbar.profile.adoptedTrees.noAdoptedTreesMessage}</p>
							</div>
						</AdoptedTreesWrapper>
					);

				default:
					return (
						<AdoptedTreesWrapper
							sectionTitle={i18n.navbar.profile.overview.adoptedTrees}
						>
							<div className="mt-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
								{!showAllTrees &&
									adoptedTreesInfo
										.slice(0, maxTrees)
										.map((tree) => (
											<TreeCard
												id={tree.id}
												name={tree.artdtsch}
												irrigationAmount={tree.reducedWateringAmount}
												irrigationTimes={tree.trees_watered.length}
												key={tree.id}
											/>
										))}
								{showAllTrees &&
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
										onClick={() => setshowAllTrees(!showAllTrees)}
										label={
											showAllTrees
												? i18n.navbar.profile.adoptedTrees.showLess
												: i18n.navbar.profile.adoptedTrees.showAll
										}
									/>
								</div>
							)}
						</AdoptedTreesWrapper>
					);
			}
	}
};
