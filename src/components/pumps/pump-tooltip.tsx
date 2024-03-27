import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { Pump } from "../map/hooks/use-pump-store";

interface PumpTooltipProps {
	pump: Pump;
}

export const PumpTooltip: React.FC<PumpTooltipProps> = ({ pump }) => {
	const i18n = useI18nStore().i18n();

	// The "status" in the OpenStreetMap property is German, so we need to translate it
	const statusMap = {
		funktionsfähig: i18n.pumps.working,
		defekt: i18n.pumps.defect,
		unbekannt: i18n.pumps.unknown,
	};

	return (
		<div
			style={{
				position: "absolute",
				left: pump.x,
				top: pump.y - 5,
				transform: "translate(-50%, -100%)",
			}}
			className="p-6 bg-white rounded-lg flex flex-col gap-2 shadow-gdk-hard min-w-[300px]"
		>
			<div className="border-b-2 pb-2">
				<div className="font-bold text-lg">{i18n.pumps.title}</div>
				<div className="">{pump.address}</div>
			</div>
			<div className="border-b-2 py-2">
				<div className="flex flex-row justify-between">
					<div className="font-bold">{i18n.pumps.status}</div>
					<div className="">
						{statusMap[pump.status as keyof typeof statusMap]}
					</div>
				</div>
				<div className="flex flex-row justify-between">
					<div className="font-bold">{i18n.pumps.lastCheck}</div>
					<div className="">{pump.lastCheck}</div>
				</div>
			</div>
			<div className="text-sm pt-2">
				<a className="underline" href="">
					{i18n.pumps.update}
				</a>
			</div>
		</div>
	);
};
