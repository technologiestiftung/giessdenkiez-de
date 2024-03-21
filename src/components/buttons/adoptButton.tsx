import React, { useState } from "react";
import { useAdoptTree } from "../tree-detail/hooks/use-adopt-tree";
import {
	HeartIcon,
	HeartIconFillState,
	HeartIconState,
} from "../icons/heart-icon";

export interface AdoptButtonProps {
	treeId: string;
}

export const AdoptButton: React.FC<AdoptButtonProps> = ({ treeId }) => {
	const [heartHovered, setHeartHovered] = useState(false);
	const { adoptTree, unadoptTree, isAdopted } = useAdoptTree(treeId);
	return (
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
				state={heartHovered ? HeartIconState.Hover : HeartIconState.Default}
				fillState={
					isAdopted ? HeartIconFillState.Filled : HeartIconFillState.Empty
				}
			/>
		</button>
	);
};
