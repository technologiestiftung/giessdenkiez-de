import React from "react";
import { adoptionsFillColor } from "./chart-colors";

interface AdoptionsChartProps {
	veryThirstyAdoptionsRate: number;
	legend?: string;
}

export const AdoptionsChart: React.FC<AdoptionsChartProps> = ({
	veryThirstyAdoptionsRate,
	legend,
}) => {
	return (
		<div className="w-full">
			<div className="w-full grid grid-cols-1 grid-rows-">
				<div
					style={{ backgroundColor: adoptionsFillColor }}
					className={`w-full h-7  opacity-[30%] rounded-full row-start-1 col-start-1`}
				></div>
				<div
					style={{
						width: `${veryThirstyAdoptionsRate}%`,
						backgroundColor: adoptionsFillColor,
					}}
					className={`h-7 rounded-full row-start-1 col-start-1`}
				></div>
				<div style={{ color: adoptionsFillColor }} className={` text-4xl pt-2`}>
					↑
				</div>
				<div
					style={{ color: adoptionsFillColor }}
					className={`text-[${adoptionsFillColor}] text-xl pt-2`}
				>
					<span className="font-bold">{veryThirstyAdoptionsRate}% </span>
					{legend}
				</div>
			</div>
		</div>
	);
};
