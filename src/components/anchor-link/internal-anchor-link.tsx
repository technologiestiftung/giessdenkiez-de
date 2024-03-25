import React from "react";
import { useUrlState } from "../router/store";

interface InternalAnchorLinkProps {
	href: string;
	label?: string;
	target?: string;
}

export const InternalAnchorLink: React.FC<InternalAnchorLinkProps> = ({
	href,
	label,
	target,
}) => {
	const { setPathname } = useUrlState();

	return (
		<a
			className="font-semibold text-blue-600 hover:text-gdk-light-blue"
			href={href}
			target={target}
			onClick={(e) => {
				e.preventDefault();
				setPathname(href);
			}}
		>
			{label}
		</a>
	);
};
