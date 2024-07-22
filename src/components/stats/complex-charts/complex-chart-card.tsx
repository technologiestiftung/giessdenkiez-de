import React, { useState } from "react";
import { InfoIcon } from "../../icons/info-icon";
import { useI18nStore } from "../../../i18n/i18n-store";
import ReactCardFlip from "react-card-flip";
import { Skeleton } from "../../skeleton/skeleton";
import Markdown from "react-markdown";
import { ExternalAnchorLink } from "../../anchor-link/external-anchor-link";
import { useStatsStore } from "../store/stats-store";

interface ComplexChartCardProps {
	title: string;
	hint: string;
	stat: number;
	unit: string;
	titleColor: string;
	icon: React.ReactNode;
	backContent: string;
	children: React.ReactNode;
	legend?: string;
}

export const ComplexChartCard: React.FC<ComplexChartCardProps> = ({
	title,
	hint,
	stat,
	unit,
	titleColor,
	icon,
	backContent,
	children,
	legend,
}) => {
	const { formatNumber } = useI18nStore();
	const i18n = useI18nStore().i18n();
	const { loading } = useStatsStore();

	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<div className="col-span-1 w-full">
			<ReactCardFlip
				isFlipped={isFlipped}
				flipDirection="horizontal"
				containerStyle={{ height: "100%" }}
			>
				<div
					className={`flex flex-col rounded-2xl p-4 border md:border-2 w-full text-left h-[100%] min-h-[480px]`}
				>
					<div className={`flex flex-row justify-between items-center`}>
						<div className="flex flex-row gap-2 text-xl font-semibold pb-2">
							{title}
						</div>
						<button
							className={`text-gdk-blue hover:text-gdk-light-blue pb-2`}
							onClick={() => setIsFlipped(!isFlipped)}
						>
							<InfoIcon></InfoIcon>
						</button>
					</div>
					{loading && <Skeleton className="h-full my-2 rounded-lg" />}
					{!loading && (
						<>
							<div
								className={`flex flex-row gap-2 items-baseline ${titleColor}`}
							>
								{icon}
								<span className="text-4xl font-bold">{formatNumber(stat)}</span>
								<span className="text-3xl font-semibold">{unit}</span>
							</div>
							<div className={`text-xl  ${titleColor} min-h-[60px]`}>
								{hint}
							</div>
							<div
								className="flex flex-row justify-center items-center h-fit"
								id="stats-card-container"
							>
								{children}
							</div>
							<div className={`flex justify-center text-sm ${titleColor}`}>
								{legend}
							</div>
						</>
					)}
				</div>
				<div
					className={`flex flex-col rounded-2xl p-4 border md:border-2 w-full text-left gap-1 h-[100%] min-h-[480px]`}
				>
					<div className={`flex flex-row justify-between items-center`}>
						<div className="flex flex-row gap-2 text-xl font-semibold">
							{title}
						</div>
						<button
							className={`text-gdk-blue hover:text-gdk-light-blue font-semibold`}
							onClick={() => setIsFlipped(!isFlipped)}
						>
							{i18n.stats.backToFront}
						</button>
					</div>
					<div className={`py-1 flex flex-row items-start h-full`}>
						<Markdown
							// @ts-expect-error typing too complex
							components={{ a: ExternalAnchorLink }}
							className={"[&>p]:pt-2"}
						>
							{backContent}
						</Markdown>
					</div>
				</div>
			</ReactCardFlip>
		</div>
	);
};
