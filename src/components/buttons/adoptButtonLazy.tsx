import React, { useState, lazy } from "react";
import { useAdoptTree } from "../tree-detail/hooks/use-adopt-tree";
import {
	HeartIcon,
	HeartIconFillState,
	HeartIconState,
} from "../icons/heart-icon";
import { useAuthStore } from "../../auth/auth-store";
import { useI18nStore } from "../../i18n/i18n-store";
import { useErrorStore } from "../../error/error-store";

export interface AdoptButtonLazyProps {
	treeId: string;
}

const getIsAdopted = async (
	treeId: string,
	access_token: string | undefined,
	userID: string,
	handleError: (message: string, error?: any) => void,
) => {
	try {
		const adoptUrl = `${
			import.meta.env.VITE_API_ENDPOINT
		}/get/istreeadopted?uuid=${user?.id}&id=${treeId}`;
		const res = await fetch(adoptUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${access_token}`,
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) {
			handleError(i18n.treeDetail.adoptErrorMessage);
			return;
		}
		const json = await res.json();
		isAdopted = json.data;
	} catch (error) {
		handleError(i18n.treeDetail.adoptErrorMessage, error);
	}
};

export const AdoptButtonLazy: React.FC<AdoptButtonLazyProps> = ({ treeId }) => {
	const [heartHovered, setHeartHovered] = useState(false);
	const { adoptTree, unadoptTree } = useAdoptTree(treeId);

	const access_token = useAuthStore((store) => store).session?.access_token;
	const user = useAuthStore((store) => store).session?.user;
	const i18n = useI18nStore().i18n();
	const handleError = useErrorStore().handleError;

	// const { refreshAdoptedTreesInfo } = useAuthStore();

	const LazyComponent = lazy(async (): Promise<{ default: () => React.FC }> => {
		let isAdopted = await getIsAdopted(
			treeId,
			access_token,
			user?.id,
			handleError,
		);

		return {
			default: () => {
				return (
					<div
						key={treeId}
						className="shadow-gdk-soft flex flex-col gap-3 rounded-2xl border-2 p-4"
					>
						<InternalAnchorLink href={`/map?treeId=${treeId}`} label={name} />
						<div className="-mt-4 self-end">
							<button
								type="button"
								onClick={async () => {
									if (!isAdopted) {
										await adoptTree();
										return;
									}

									await unadoptTree();
								}}
								onMouseEnter={() => setHeartHovered(true)}
								onMouseLeave={() => setHeartHovered(false)}
							>
								<HeartIcon
									state={
										heartHovered ? HeartIconState.Hover : HeartIconState.Default
									}
									fillState={
										isAdopted
											? HeartIconFillState.Filled
											: HeartIconFillState.Empty
									}
								/>
							</button>
						</div>
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
			},
		};
	});

	return <LazyComponent />;
};
