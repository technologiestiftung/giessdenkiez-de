import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { TreeAgeIcon } from "../icons/tree-age-icon";

interface TreeAgeProps {
	treeAge: number | undefined;
}

export const TreeAge: React.FC<TreeAgeProps> = ({ treeAge }) => {
	const i18n = useI18nStore().i18n();
	return (
		<div className="flex flex-row items-center justify-between border-b-2 py-8 text-xl font-bold">
			<div className="flex flex-row items-center gap-1">
				<TreeAgeIcon />
				<div className="">{i18n.treeDetail.ageTitle}</div>
			</div>
			{treeAge !== undefined && treeAge !== null ? (
				<div>
					<span data-testid="age">{treeAge}</span>{" "}
					{i18n.treeDetail.age(treeAge)}
				</div>
			) : (
				<div>{i18n.treeDetail.ageUnknown}</div>
			)}
		</div>
	);
};
