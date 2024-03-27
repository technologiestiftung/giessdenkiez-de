import React, { useMemo } from "react";
import { CloseIcon } from "../icons/close-icon";
import { useUrlState } from "../router/store";
import { useFetchTreeData } from "./hooks/use-fetch-tree-data";
import { TreeAge } from "./tree-age";
import { TreeAdoptCard } from "./tree-adopt-card";
import { useTreeStore } from "./tree-store";
import { useI18nStore } from "../../i18n/i18n-store";
import { TreeWaterNeed } from "./tree-water-needs";
import { TreeWaterNeedUnknown } from "./tree-water-need-unknown";
import { TreeAgeClassification } from "./tree-types";
import { useTreeAgeClassification } from "./hooks/use-tree-age-classification";
import { LastWaterings } from "./last-waterings";
import { ProblemCard } from "./problem-card";
import { TreeFlier } from "./tree-flier";
import { useFetchTreeWateringData } from "./hooks/use-fetch-tree-watering-data";

export const TreeDetail: React.FC = () => {
	const i18n = useI18nStore().i18n();

	const [url, removeSearchParam] = useUrlState((state) => [
		state.url,
		state.removeSearchParam,
	]);
	const treeId = url.searchParams.get("treeId");
	if (!treeId) {
		return null;
	}
	const setSelectedTreeId = useTreeStore((store) => store.setSelectedTreeId);

	const { setTreeData } = useTreeStore();
	const { treeData } = useFetchTreeData(treeId);
	const { treeWateringData, fetchWateringData } =
		useFetchTreeWateringData(treeData);

	const { treeAge, treeAgeClassification } = useTreeAgeClassification(treeData);
	const treeTypeInfo = useMemo(() => {
		return i18n.treeDetail.treeTypeInfos.find(
			(treeType) => treeType.id === treeData?.gattungdeutsch,
		);
	}, [treeData, i18n]);

	return (
		<div className="pointer-events-auto h-full bg-white flex w-[100vw] flex-col gap-4 overflow-scroll p-4 lg:w-[400px] lg:min-w-[400px]">
			<a
				href="/map"
				className="flex flex-row justify-end"
				onClick={(e) => {
					e.preventDefault();
					removeSearchParam("treeId");
					setTreeData(undefined);
					setSelectedTreeId(undefined);
				}}
			>
				<CloseIcon />
			</a>

			<div className="flex flex-row items-center gap-2">
				<img
					src="/images/tree-icon.svg"
					alt="Tree Icon"
					width={36}
					height={36}
				/>
				<div className="text-xl font-bold">{i18n.treeDetail.title}</div>
			</div>
			{treeData && (
				<div className="flex flex-col">
					<TreeAdoptCard
						treeData={treeData}
						treeAgeClassification={treeAgeClassification}
					/>
					{treeTypeInfo && (
						<TreeFlier info={treeTypeInfo.description}></TreeFlier>
					)}
					<TreeAge treeAge={treeAge} />
					{(treeAgeClassification === TreeAgeClassification.BABY ||
						treeAgeClassification === TreeAgeClassification.JUNIOR ||
						treeAgeClassification === TreeAgeClassification.GROWNUP) && (
						<TreeWaterNeed
							treeData={treeData}
							treeAgeClassification={treeAgeClassification}
							treeWateringData={treeWateringData}
							onTreeWatered={async () => {
								await fetchWateringData();
							}}
						/>
					)}
					{(treeAgeClassification === TreeAgeClassification.UNKNOWN ||
						treeAgeClassification === TreeAgeClassification.SENIOR) && (
						<TreeWaterNeedUnknown
							treeData={treeData}
							treeAgeClassification={treeAgeClassification}
							treeWateringData={treeWateringData}
							onTreeWatered={async () => {
								await fetchWateringData();
							}}
						/>
					)}
					{treeData && treeAgeClassification !== TreeAgeClassification.BABY && (
						<LastWaterings treeWateringData={treeWateringData} />
					)}
					<ProblemCard />
				</div>
			)}
		</div>
	);
};
