import React from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";
import Markdown from "react-markdown";

export const MapAttribution: React.FC = () => {
	const i18n = useI18nStore().i18n();

	const links = [
		i18n.map.attribution.mapbox,
		i18n.map.attribution.openStreetMap,
		i18n.map.attribution.improve,
		i18n.map.attribution.feedback,
		i18n.map.attribution.imprint,
		i18n.map.attribution.privacy,
	];

	return (
		<div className="pointer-events-auto max-w-56 text-end text-xs sm:max-w-80 md:max-w-full pb-[4.7rem] pr-2 lg:pb-2 flex flex-row flex-wrap justify-end gap-x-[3px]">
			{links
				.map<React.ReactNode>((link) => (
					<a
						href={link.href}
						key={link.label}
						target="_blank"
						rel="noopener noreferrer"
						className=" text-gray-600 hover:text-gdk-light-gray underline"
					>
						<Markdown className={"block"}>{link.label}</Markdown>
					</a>
				))
				.reduce((prev, curr) => [prev, " - ", curr])}
		</div>
	);
};
