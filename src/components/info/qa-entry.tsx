import React, { useState } from "react";
import Markdown from "react-markdown";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronRight } from "../icons/chevron-right";
import { ExternalAnchorLink } from "../anchor-link/external-anchor-link";

interface QaEntryProps {
	question: string;
	answer: string;
	isLast: boolean;
	isInitiallyExpanded: boolean;
	children?: React.ReactNode;
	isFAQEntry?: boolean;
}

export const QaEntry: React.FC<QaEntryProps> = ({
	question,
	answer,
	isLast,
	isInitiallyExpanded,
	children,
	isFAQEntry = false,
}) => {
	const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
	return (
		<div className={`w-full ${!isLast && "border-b-2"} py-6`}>
			<button
				className="flex w-full flex-row justify-between gap-2 text-left text-xl"
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
			>
				<div
					className={`font-semibold ${isFAQEntry ? "text-xl" : "text-2xl"} `}
				>
					{question}
				</div>
				<div className="text-gdk-blue">
					{isExpanded ? (
						<ChevronDown></ChevronDown>
					) : (
						<ChevronRight></ChevronRight>
					)}
				</div>
			</button>
			{isExpanded && (
				<div>
					<Markdown
						// @ts-expect-error typing too complex
						components={{ a: ExternalAnchorLink }}
						className="text-gdk-gray mt-4 grid gap-4 pr-2 md:pr-6"
					>
						{answer}
					</Markdown>
					{children}
				</div>
			)}
		</div>
	);
};
