/* eslint-disable max-lines */
import React, { useEffect } from "react";
import { LanguageToggle } from "../router/languageToggle";
import { useI18nStore } from "../../i18n/i18n-store";
import Markdown from "react-markdown";
import { ExternalAnchorLink } from "../anchor-link/external-anchor-link";
import { SimpleStats } from "./simple-stats/simple-stats";
import { useStatsStore } from "./store/stats-store";
import { ComplexCharts } from "./complex-charts/complex-charts";

export const Stats: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { refreshStats, onResize } = useStatsStore();

	useEffect(() => {
		refreshStats();
	}, []);

	useEffect(() => {
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<div className="pointer-events-auto w-full overflow-auto">
			<div className="flex flex-col items-center justify-center ">
				<div className="flex w-[100%] flex-col md:gap-4 px-1 py-8 md:py-16 md:w-[90%] md:px-4 lg:w-[800px] xl:w-[800px] 2xl:w-[1000px] relative">
					<div className="lg:hidden absolute top-6 md:top-14 mt-1 right-0 pr-5">
						<LanguageToggle />
					</div>
					<div className="flex flex-row">
						<h1 className="px-4 md:px-0 text-4xl font-semibold pb-2 md:pb-4">
							{i18n.stats.title}
						</h1>
					</div>
					<div className="flex flex-col rounded-2xl px-4 pb-4 md:border-2 md:p-8 gap-8">
						<h2 className="text-2xl font-semibold">{i18n.stats.subtitle}</h2>
						<div className="flex flex-col gap-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<SimpleStats />
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<ComplexCharts />

								<div className="px-4 flex flex-col md:self-end md:text-end">
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-1 pt-2 md:pt-4"}
									>
										{i18n.info.about.head.feedback}
									</Markdown>
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-1 py-4"}
									>
										{i18n.stats.gdKSalesPitch}
									</Markdown>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
