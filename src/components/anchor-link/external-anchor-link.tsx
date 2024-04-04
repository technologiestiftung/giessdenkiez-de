import React from "react";

interface ExternalAnchorLinkProps {
	href: string;
	label: string;
	children?: React.ReactNode;
	target?: string;
	rel?: string;
}

export const ExternalAnchorLink = ({
	href,
	label,
	children,
	target = "_blank",
	rel = "noopener noreferrer",
}: ExternalAnchorLinkProps) => {
	return (
		<a
			className="font-semibold text-blue-600 hover:text-gdk-light-blue"
			href={href}
			target={target}
			rel={rel}
		>
			{label}
			{children}
		</a>
	);
};
