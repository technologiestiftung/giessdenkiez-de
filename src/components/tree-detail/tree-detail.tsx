import React, { useEffect, useMemo } from "react";
import { CloseIcon } from "../icons/close-icon";
import { useUrlState } from "../router/store";
import { useFetchTreeData } from "./hooks/use-fetch-tree-data";
import { TreeAge } from "./tree-age";
import { TreeAdoptCard } from "./tree-adopt-card";
import { useTreeStore } from "./stores/tree-store";
import { useI18nStore } from "../../i18n/i18n-store";
import { TreeWaterNeed } from "./tree-water-needs/tree-water-needs";
import { TreeWaterNeedUnknown } from "./tree-water-needs/tree-water-need-unknown";
import { TreeAgeClassification } from "./tree-types";
import { useTreeAgeClassification } from "./hooks/use-tree-age-classification";
import { LastWaterings } from "./last-waterings/last-waterings";
import { ProblemCard } from "./problem-card";
import { TreeFlier } from "./tree-flier";
import { Loading } from "../loading/loading";
import { TreeIcon } from "../icons/tree-icon";

export const TreeDetail: React.FC = () => {
	const i18n = useI18nStore().i18n();

	const [url, removeSearchParam] = useUrlState((state) => [
		state.url,
		state.removeSearchParam,
	]);
	const { selectedTreeId, setSelectedTreeId } = useTreeStore();

	const treeId = url.searchParams.get("treeId");
	if (!treeId) {
		return null;
	}

	useEffect(() => {
		if (treeId && treeId !== selectedTreeId) {
			setSelectedTreeId(treeId);
		}
	}, [treeId]);

	const { setTreeCoreData, treeCoreData, treeWateringData } = useTreeStore();

	useFetchTreeData(treeId);

	const { treeAge, treeAgeClassification } =
		useTreeAgeClassification(treeCoreData);
	const treeTypeInfo = useMemo(() => {
		return i18n.treeDetail.treeTypeInfos.find(
			(treeType) => treeType.id === treeCoreData?.gattungdeutsch,
		);
	}, [treeCoreData, i18n]);

	return (
		<div className="pointer-events-auto h-full bg-white rounded-l shadow-gdk-hard-up flex w-[100vw] flex-col gap-4 overflow-scroll p-5 lg:w-[400px] lg:min-w-[400px]">
			<a
				href="/map"
				className="flex flex-row justify-end"
				onClick={(e) => {
					e.preventDefault();
					removeSearchParam("treeId");
					setTreeCoreData(undefined);
					setSelectedTreeId(undefined);
				}}
			>
				<CloseIcon />
			</a>

			<div className="flex flex-row items-center gap-1">
				<TreeIcon />
				<div className="text-xl font-bold">{i18n.treeDetail.title}</div>
			</div>
			{treeCoreData ? (
				<div className="flex flex-col">
					<TreeAdoptCard
						treeData={treeCoreData}
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
							treeData={treeCoreData}
							treeAgeClassification={treeAgeClassification}
							treeWateringData={treeWateringData}
						/>
					)}
					{(treeAgeClassification === TreeAgeClassification.UNKNOWN ||
						treeAgeClassification === TreeAgeClassification.SENIOR) && (
						<TreeWaterNeedUnknown
							treeData={treeCoreData}
							treeAgeClassification={treeAgeClassification}
							treeWateringData={treeWateringData}
						/>
					)}
					{treeCoreData &&
						treeAgeClassification !== TreeAgeClassification.BABY && (
							<LastWaterings treeWateringData={treeWateringData} />
						)}
					<ProblemCard />
				</div>
			) : (
				<Loading loadingText={i18n.loading.treeLoading} />
			)}
		</div>
	);
};
