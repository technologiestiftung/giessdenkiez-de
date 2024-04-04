import React from "react";

export interface AdoptedTreesCardProps {
	sectionTitle?: string;
}

export const AdoptedTreesCard: React.FC<
	AdoptedTreesCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({ sectionTitle, ...props }) => {
	return (
		<div className="md:shadow-gdk-soft mb-3 md:rounded-2xl md:border-2 md:p-7">
			<h2 className="text-2xl font-semibold">{sectionTitle}</h2>
			{props.children}
		</div>
	);
};
