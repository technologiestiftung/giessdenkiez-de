import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

export const Banner: React.FC = () => {
	const banner = useI18nStore().i18n().banner;

	return (
		<div className="pointer-events-auto flex w-full justify-center bg-blue-600 px-4 py-2 text-center text-sm text-white shadow-gdk-hard">
			<p>
				{banner.textBefore}
				<a
					href={banner.programLink.href}
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold underline"
				>
					{banner.programLink.label}
				</a>
				{banner.textAfter}
			</p>
		</div>
	);
};
