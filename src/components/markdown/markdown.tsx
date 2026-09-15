import React from "react";
import ReactMarkdown, { Options } from "react-markdown";

interface MarkdownProps extends Options {
	className?: string;
}

/**
 * react-markdown dropped the `className` prop in v10. It used to wrap its
 * output in a `div` carrying that class - and render a plain fragment without
 * it - so this keeps both behaviours in one place instead of adding wrapper
 * elements at every call site.
 */
export const Markdown: React.FC<MarkdownProps> = ({
	className,
	...options
}) => {
	if (!className) {
		return <ReactMarkdown {...options} />;
	}

	return (
		<div className={className}>
			<ReactMarkdown {...options} />
		</div>
	);
};
