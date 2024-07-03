import React from "react";

interface AdoptionsChartProps {
	veryThirstyAdoptionsRate: number;
}

export const AdoptionsChart: React.FC<AdoptionsChartProps> = ({
	veryThirstyAdoptionsRate,
}) => {
	return (
		<div className="w-full">
			<div className="w-full grid grid-cols-1 grid-rows-">
				<div className="w-full h-7 bg-[#660A9C] opacity-[30%] rounded-full row-start-1 col-start-1"></div>
				<div
					style={{ width: `${veryThirstyAdoptionsRate}%` }}
					className={`h-7 bg-[#660A9C] rounded-full row-start-1 col-start-1`}
				></div>
				<div className="text-[#660A9C] text-4xl pt-2">↑</div>
				<div className="text-[#660A9C] text-xl pt-2">
					<span className="font-bold">{veryThirstyAdoptionsRate}%</span> der
					adoptierten Bäume sind besonders durstig.
				</div>
			</div>
		</div>
	);
};
