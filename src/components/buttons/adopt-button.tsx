import React from "react";
import { HeartIcon } from "../icons/heart-icon";
import { useTreeAdoptStore } from "../tree-detail/hooks/use-adopt-tree";

export interface AdoptButtonProps {
	treeId: string;
}

export const AdoptButton: React.FC<AdoptButtonProps> = ({ treeId }) => {
	const { adoptTree, unadoptTree, isAdopted } = useTreeAdoptStore();

	return (
		<button
			type="button"
			onClick={async () => {
				if (!isAdopted(treeId)) {
					await adoptTree(treeId);
					return;
				}
				await unadoptTree(treeId);
			}}
		>
			<HeartIcon isAdopted={isAdopted(treeId)} />
		</button>
	);
};
