import React from "react";

interface ExternalAnchorLinkProps {
	href: string;
	label: string;
	target?: string;
	rel?: string;
}

export const ExternalAnchorLink: React.FC<ExternalAnchorLinkProps> = ({
	href,
	label,
	target = "_blank",
	rel = "noopener noreferrer",
}) => {
	return (
		<a
			className="font-semibold text-blue-600 hover:text-gdk-light-blue"
			href={href}
			target={target}
			rel={rel}
		>
			{label}
		</a>
	);
};
