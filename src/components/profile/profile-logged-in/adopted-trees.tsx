import React, { useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { TertiaryButton } from "../../buttons/tertiary";
import { TreeCard } from "./tree-card";
import { useAuthStore } from "../../../auth/auth-store";

export const AdoptedTrees: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const [showAllTrees, setshowAllTrees] = useState(false);

	const { adoptedTreesInfo } = useAuthStore();

	const maxTrees =
		adoptedTreesInfo?.length ?? 0 > 3 ? 4 : adoptedTreesInfo?.length ?? 0;

	return (
		<div className="md:shadow-gdk-soft mb-3 md:rounded-2xl md:border-2 md:p-7">
			<h2 className="text-2xl font-semibold">
				{i18n.navbar.profile.overview.adoptedTrees}
			</h2>
			{adoptedTreesInfo && (
				<>
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
					{adoptedTreesInfo.length > 3 && (
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
				</>
			)}
			{/* add nudge to adopt for when no trees are adopted */}
		</div>
	);
};
