import React from "react";
import { InternalAnchorLink } from "../../../anchor-link/internal-anchor-link";
import { useFilterStore } from "../../../filter/filter-store";
import { useI18nStore } from "../../../../i18n/i18n-store.ts";

export interface AdoptedTreesCardProps {
	sectionTitle?: string;
}

export const AdoptedTreesCard: React.FC<
	AdoptedTreesCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({ sectionTitle, ...props }) => {
	const { setAreOnlyMyAdoptedTreesVisible } = useFilterStore();
	const i18n = useI18nStore().i18n();

	return (
		<div className="md:shadow-gdk-soft mb-3 md:rounded-2xl md:border-2 md:p-7">
			<div className="flex items-center w-full justify-between">
				<h2 className="text-2xl font-semibold">{sectionTitle}</h2>
				<InternalAnchorLink
					href="/map"
					onClick={() => setAreOnlyMyAdoptedTreesVisible(true)}
					label={i18n.navbar.profile.overview.showOnMap}
					className="text-end"
				/>
			</div>
			{props.children}
		</div>
	);
};
