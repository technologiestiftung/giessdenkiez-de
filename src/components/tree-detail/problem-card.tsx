import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { ExternalAnchorLink } from "../anchor-link/external-anchor-link";
import { AttentionIcon } from "../icons/attention-icon";

export const ProblemCard: React.FC = () => {
	const i18n = useI18nStore().i18n();

	return (
		<div className="mt-8 flex flex-col gap-2 rounded-lg border-2 p-4">
			<div className="flex flex-col justify-start gap-4">
				<div className="flex flex-row gap-2 text-xl">
					<div className="text-gdk-dark-red flex self-center">
						<AttentionIcon />
					</div>
					<div className="font-bold">{i18n.treeDetail.problem.title}</div>
				</div>
				<div className="flex flex-col gap-2">
					<div>{i18n.treeDetail.problem.description}</div>
					<div>
						<ExternalAnchorLink
							href="https://ordnungsamt.berlin.de/frontend/meldungNeu/wo"
							label={i18n.treeDetail.problem.link}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
