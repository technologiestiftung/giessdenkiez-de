import React, { useEffect, useRef, useState } from "react";
import { Pump } from "../map/hooks/use-hovered-pump";

interface PumpTooltipProps {
	pump: Pump;
}

export const PumpTooltip: React.FC<PumpTooltipProps> = ({ pump }) => {
	return (
		<div
			style={{
				position: "absolute",
				left: pump.x,
				top: pump.y - 5,
				transform: "translate(-50%, -100%)",
			}}
			className="p-6 bg-white rounded-lg flex flex-col gap-2 shadow-gdk-hard"
		>
			<div className="border-b-2 pb-2">
				<div className="font-bold text-lg">Öffentliche Straßenpumpe</div>
				<div className="">{pump.address}</div>
			</div>
			<div className="border-b-2 py-2">
				<div className="flex flex-row justify-between">
					<div className="font-bold">Status</div>
					<div className="">{pump.status}</div>
				</div>
				<div className="flex flex-row justify-between">
					<div className="font-bold">Letzter Check</div>
					<div className="">{pump.lastCheck}</div>
				</div>
			</div>
			<div className="text-sm pt-2">
				<a className="underline" href="">
					Status in OpenStreetMap aktualisieren
				</a>
			</div>
		</div>
	);
};
