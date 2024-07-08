import React, { useEffect, useState } from "react";
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
	onResize: (width: number) => void;
	loading: boolean;
	children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
	title,
	hint,
	stat,
	unit,
	titleColor,
	icon,
	onResize,
	loading,
	children,
}) => {
	const { formatNumber } = useI18nStore();
	const [isFlipped, setIsFlipped] = useState(false);

	const onInternalResize = () => {
		const container = document.getElementById("stats-card-container");
		if (container) {
			const width = container.offsetWidth;
			onResize(width);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", onInternalResize);
		onInternalResize();
		return () => {
			window.removeEventListener("resize", onInternalResize);
		};
	}, [loading]);

	return (
		<div className="col-span-1">
			<ReactCardFlip
				isFlipped={isFlipped}
				flipDirection="horizontal"
				containerStyle={{ height: "100%" }}
			>
				<div
					className={`flex flex-col rounded-2xl p-3 md:p-4 border md:border-2 w-full text-left gap-1 h-[100%] min-h-[500px]`}
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
					{loading && (
						<div className="w-full h-full flex p-2">
							<div className="bg-slate-100 w-full h-full rounded-lg animate-pulse"></div>
						</div>
					)}
					{!loading && (
						<>
							<div
								className={`flex flex-row gap-2 items-baseline ${titleColor}`}
							>
								{icon}
								<span className="text-4xl font-bold">{formatNumber(stat)}</span>
								<span className="text-3xl font-semibold">{unit}</span>
							</div>
							<div
								className={`text-xl font-semibold ${titleColor} min-h-[60px]`}
							>
								{hint}
							</div>
							<div
								className="py-3 flex flex-row justify-center items-center h-fit"
								id="stats-card-container"
							>
								{children}
							</div>
						</>
					)}
				</div>
				<div
					className={`flex flex-col rounded-2xl p-2 md:p-4 border md:border-2 w-full text-left gap-1 h-[100%] min-h-[500px]`}
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
