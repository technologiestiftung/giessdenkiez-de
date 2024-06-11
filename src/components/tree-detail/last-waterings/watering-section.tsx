import React from "react";
import { TreeWateringData } from "../tree-types";
import { WateringCard } from "./watering-card";
import { ContactDialog } from "../tree-water-needs/contact-dialog";

interface WateringSectionProps {
	title: string;
	noWateringsHint: string;
	waterings: TreeWateringData[];
}

export const WateringSection: React.FC<WateringSectionProps> = ({
	title,
	noWateringsHint,
	waterings,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<ContactDialog />
			<div className="text-xl font-semibold text-gdk-light-gray">{title}</div>
			{waterings.length === 0 && <div>{noWateringsHint}</div>}
			<div className="flex flex-col gap-4">
				{waterings.map((wateringData, idx) => (
					<div key={`watering-${idx}`}>
						<WateringCard wateringData={wateringData} />
					</div>
				))}
			</div>
		</div>
	);
};
