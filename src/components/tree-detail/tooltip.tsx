import React from "react";
import Markdown from "react-markdown";

interface TooltipProps {
	title: string;
	content: string;
}
const Tooltip: React.FC<TooltipProps> = ({ title, content }) => {
	return (
		<div
			className="shadow-gdk-hard flex w-[300px] flex-col gap-2 rounded-lg bg-gdk-white p-4"
			id="adopt-tree-dialog"
		>
			<div className="font-bold">{title}</div>
			<Markdown>{content}</Markdown>
		</div>
	);
};

export default Tooltip;
