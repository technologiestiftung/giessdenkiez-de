import React, { useState } from "react";
import { useAdoptTree } from "../tree-detail/hooks/use-adopt-tree";
import {
	HeartIcon,
	HeartIconFillState,
	HeartIconState,
} from "../icons/heart-icon";
import { HeartIcon2 } from "../icons/heart-icon2";

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

{
	/* <button
className={`
my-4 flex h-[51px] w-full items-center justify-center rounded-[10px] bg-gdk-blue px-8 font-semibold 
text-gdk-white hover:bg-gdk-light-blue disabled:bg-gdk-light-gray sm:w-fit`}
disabled={disabled}
onClick={onClick}
type={type}
>
<span className="flex flex-row items-center gap-3">{label}</span>
</button> */
}
