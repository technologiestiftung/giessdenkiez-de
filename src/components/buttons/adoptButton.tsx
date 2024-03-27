import React, { useState } from "react";
import {
	HeartIcon,
	HeartIconFillState,
	HeartIconState,
} from "../icons/heart-icon";
import { useTreeAdoptStore } from "../tree-detail/hooks/use-adopt-tree";

export interface AdoptButtonProps {
	treeId: string;
}

export const AdoptButton: React.FC<AdoptButtonProps> = ({ treeId }) => {
	const [heartHovered, setHeartHovered] = useState(false);
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
			onMouseEnter={() => setHeartHovered(true)}
			onMouseLeave={() => setHeartHovered(false)}
		>
			<HeartIcon
				state={heartHovered ? HeartIconState.Hover : HeartIconState.Default}
				fillState={
					isAdopted(treeId)
						? HeartIconFillState.Filled
						: HeartIconFillState.Empty
				}
			/>
		</button>
	);
};
