import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import ChevronDown from "../icons/chevron-down";
import ChevronRight from "../icons/chevron-right";

interface TreeFlierProps {
	info: string;
}

const TreeFlier: React.FC<TreeFlierProps> = ({ info }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const i18n = useI18nStore().i18n();

	return (
		<div className="gap-4p-4 flex flex-col border-b-2 pb-5 pt-10">
			<button
				className="flex flex-row items-center justify-between  pb-4 text-xl font-bold"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className="">{i18n.treeDetail.treeTypeInfoTitle}</div>

				<div className="text-gdk-blue">
					{isExpanded ? (
						<ChevronDown></ChevronDown>
					) : (
						<ChevronRight></ChevronRight>
					)}
				</div>
			</button>
			{isExpanded && <div>{info}</div>}
		</div>
	);
};

export default TreeFlier;
