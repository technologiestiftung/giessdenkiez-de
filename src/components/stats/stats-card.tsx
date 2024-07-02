import React, { useState } from "react";
import { InfoIcon } from "../icons/info-icon";
import { useI18nStore } from "../../i18n/i18n-store";
import ReactCardFlip from "react-card-flip";

interface StatsCardProps {
	title: string;
	hint: string;
	stat: number;
	unit: string;
	titleColor: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
	title,
	hint,
	stat,
	unit,
	titleColor,
	icon,
	children,
}) => {
	const { formatNumber } = useI18nStore();
	const [isFlipped, setIsFlipped] = useState(false);
	return (
		<div className="col-span-1">
			<ReactCardFlip
				isFlipped={isFlipped}
				flipDirection="horizontal"
				containerStyle={{ height: "100%" }}
			>
				<div
					className={`flex flex-col rounded-2xl p-2 md:p-4 border md:border-2 w-full text-left gap-1 h-[100%]`}
				>
					<div className={`flex flex-row justify-between items-center`}>
						<div className="flex flex-row gap-2 text-xl font-semibold">
							{title}
						</div>
						<button
							className={` ${titleColor}`}
							onClick={() => setIsFlipped(!isFlipped)}
						>
							<InfoIcon></InfoIcon>
						</button>
					</div>
					<div
						className={`flex flex-col md:flex-row gap-2 items-baseline ${titleColor}`}
					>
						{icon}
						<span className="text-4xl font-bold">{formatNumber(stat)}</span>
						<span className="text-3xl font-semibold">{unit}</span>
					</div>
					<div className={`text-xl font-semibold ${titleColor}`}>{hint}</div>
					<div className="py-3 flex flex-row justify-center items-center h-fit">
						{children}
					</div>
				</div>
				<div
					className={`flex flex-col rounded-2xl p-2 md:p-4 border md:border-2 w-full text-left gap-1 h-[100%]`}
				>
					<div className={`flex flex-row justify-between items-center`}>
						<div className="flex flex-row gap-2 text-xl font-semibold">
							{title}
						</div>
						<button
							className={` ${titleColor}`}
							onClick={() => setIsFlipped(!isFlipped)}
						>
							zurück
						</button>
					</div>
					<div
						className={`py-3 flex flex-row justify-center items-center h-full`}
					>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
						nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
						erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
						et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet.
					</div>
				</div>
			</ReactCardFlip>
		</div>
	);
};
