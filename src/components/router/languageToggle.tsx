import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

export const LanguageToggle: React.FC = () => {
	const { setLanguage, language } = useI18nStore();

	const nonActiveLanguage = language === "en" ? "de" : "en";

	const switchLanguage = () => {
		setLanguage(nonActiveLanguage);
		console.log("clicked");
	};

	return (
		<button
			className=" bg-gdk-white h-[51px] w-[51px] rounded-full justify-center items-center hover:text-gdk-light-gray text-gdk-gray flex "
			onClick={switchLanguage}
		>
			<p className=" font-semibold hover:underline text-lg">
				{nonActiveLanguage.toUpperCase()}
			</p>
		</button>
	);
};
