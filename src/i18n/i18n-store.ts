import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Content } from "./content-types";
import { de } from "./de";
import { en } from "./en";
import { useUrlState } from "../components/router/store";

interface LocalizedContent {
	en: Content;
	de: Content;
}

const localizedContent = { de: de, en: en } as LocalizedContent;

interface I18NState {
	language: string;
	setLanguage: (language: string) => void;
	formatNumber: (number: number, round?: boolean) => string;
	formatDate: (date: Date) => string;
	i18n: () => Content;
}

export const useI18nStore = create<I18NState>()(
	persist(
		(set, get) => ({
			language: new URL(window.location.href).searchParams.get("lang") ?? "de",
			setLanguage: (language: string) => {
				useUrlState.getState().addSearchParam("lang", language);
				set({ language });
			},
			formatNumber: (number: number, round?: boolean) => {
				if (round) {
					return new Intl.NumberFormat(get().language).format(
						Math.round(number),
					);
				}
				return new Intl.NumberFormat(get().language).format(number);
			},
			formatDate: (date: Date) => {
				return date.toLocaleDateString(get().language, {
					dateStyle: "full",
				});
			},
			i18n: () => {
				return (
					localizedContent[get().language as keyof LocalizedContent] ??
					localizedContent["de"]
				);
			},
		}),
		{ name: "i18n-store" },
	),
);
