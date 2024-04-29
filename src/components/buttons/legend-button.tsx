import React, { useState } from "react";
import { ColorLegend } from "../icons/color-legend-icon";
import { ColorLegendClose } from "../icons/color-legend-close-icon";
import { ColorLegendEllipse } from "../icons/color-legend-ellipse";

export const LegendButton: React.FC = () => {
	const [isLegendOpen, setIsLegendOpen] = useState(false);

	return (
		<div className="flex flex-col relative w-full">
			{/* {isLegendOpen && (
				<div className="absolute z-0 bottom-0">
					<div className="flex flex-row">
						<div>
							<ColorLegendExpanded />
						</div>
						<div className="flex flex-col justify-between pl-2 pt-3 pb-[65px] font-semibold ">
							<span>
								Versorgte Bäume
								<br />
							</span>
							<span>
								Mäßig versorgte Bäume <br />
							</span>
							<span>
								Gießbedürftige Bäume <br />
							</span>
							<span>nicht dem Filter entsprechend</span>
						</div>
					</div>
				</div>
			)} */}

			<div className="flex flex-col  relative">
				{isLegendOpen && (
					<div className="flex flex-row gap-2">
						<div className="flex flex-col justify-between items-center gap-4 bg-gdk-white w-[56px] py-4 rounded-full">
							<ColorLegendEllipse className="text-[#63F3AA]" />
							<ColorLegendEllipse className="text-[#FDE725]" />
							<ColorLegendEllipse className="text-[#FD9531]" />
							<ColorLegendEllipse className="text-[#9D9C9C]" />
						</div>
						<div className="flex flex-col justify-between items-start gap-2 py-4 font-semibold">
							<div className="drop-shadow-white shadow-gdk-hard">
								Versorgte Bäume
							</div>
							<div>Mäßig versorgte Bäume</div>
							<div>Gießbedürftige Bäume</div>
							<div>nicht dem Filter entsprechend</div>
						</div>
					</div>
				)}
				<button
					className={`bg-gdk-white shadow-gdk-hard w-[56px] h-[56px] rounded-full 
            flex items-center justify-center pointer-events-auto z-10
            text-gdk-gray hover:text-gdk-light-gray`}
					type="button"
					onClick={() => {
						setIsLegendOpen(!isLegendOpen);
					}}
				>
					{!isLegendOpen ? <ColorLegend /> : <ColorLegendClose />}
				</button>
			</div>
		</div>
	);
};
