import React from "react";
import { useUrlState } from "../router/store";

interface InternalAnchorLinkProps {
	href: string;
	label?: string;
	target?: string;
	/**
	 * this onClick is not meant to replace the default behavior of the anchor tag
	 * it is meant to extend it, e.g. also change the state of the application
	 */
	onClick?: () => void;
}

export const InternalAnchorLink: React.FC<InternalAnchorLinkProps> = ({
	href,
	label,
	target,
	onClick,
}) => {
	const { setPathname } = useUrlState();

	return (
		<a
			className="font-semibold text-blue-600 hover:text-gdk-light-blue"
			href={href}
			target={target}
			onClick={(e) => {
				e.preventDefault();

				/**
				 * this onClick is not meant to replace the default behavior of the anchor tag
				 * it is meant to extend it, e.g. also change the state of the application
				 */
				if (typeof onClick === "function") {
					onClick();
				}

				setPathname(href);
			}}
		>
			{label}
		</a>
	);
};
