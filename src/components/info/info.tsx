import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { QaEntry } from "./qa-entry";
import { SocialShare } from "./social-share";
import { PrimaryButton } from "../buttons/primary";
import { Credits } from "./credits";
import { LanguageToggle } from "../router/languageToggle";
import Markdown from "react-markdown";
import { ExternalAnchorLink } from "../anchor-link/external-anchor-link";

export const Info: React.FC = () => {
	const i18n = useI18nStore().i18n();

	return (
		<div className="pointer-events-auto w-full overflow-auto">
			<div className="flex flex-col items-center justify-center ">
				<div className="flex w-[100%] flex-col md:gap-4 px-1 py-8 md:py-16 md:w-[70%] md:px-4 lg:w-[60%] xl:w-[50%] relative">
					<div className="lg:hidden absolute top-6 md:top-14 mt-1 right-0 pr-5">
						<LanguageToggle />
					</div>
					<div className="flex flex-row">
						<h1 className="px-4 md:px-0 text-4xl font-semibold pb-2 md:pb-4">
							{i18n.info.infoTitel}
						</h1>
					</div>
					<div className="flex flex-col rounded-lg px-4 pb-4 md:border-2 md:p-8">
						<div>
							<QaEntry
								key="head-qa"
								question={i18n.info.about.head.question}
								answer={i18n.info.about.head.answer}
								isLast={false}
								isInitiallyExpanded={true}
							>
								<div className="py-2 pr-2 md:pr-6">
									<Markdown
										className={"[&>p]:pt-1 pt-4 text-2xl font-semibold"}
									>
										{i18n.info.about.head.aboutUsTitle}
									</Markdown>
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-1 pt-2 "}
									>
										{i18n.info.about.head.aboutUsAnswer}
									</Markdown>
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-2 py-2"}
									>
										{i18n.info.about.head.press}
									</Markdown>
									<div className="w-full pt-4 pb-4">
										<Credits />
									</div>
									<Markdown
										className={"[&>p]:pt-1 pt-4 text-2xl font-semibold"}
									>
										{i18n.info.about.head.communityTitle}
									</Markdown>
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-1 pt-2 pb-2"}
									>
										{i18n.info.about.head.communityAnswer}
									</Markdown>
									<PrimaryButton
										label={i18n.info.about.head.slackButton}
										onClick={() => {
											window.open(
												"https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ",
												"_blank",
											);
										}}
										disabled={false}
									/>
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-1 pt-2"}
									>
										{i18n.info.about.head.feedback}
									</Markdown>
								</div>
							</QaEntry>
						</div>

						{i18n.info.about.qa.map((item, idx) => (
							<React.Fragment key={`info-about-item-${idx}`}>
								<QaEntry
									question={item.question}
									answer={item.answer}
									key={`info-about-item-${idx}`}
									isLast={idx === i18n.info.about.qa.length - 1}
									isInitiallyExpanded={false}
								></QaEntry>
							</React.Fragment>
						))}
						<div className={`text-2xl font-semibold w-full pt-6 border-t-2`}>
							{i18n.info.faq.title}
						</div>
						<div className={`w-full mt-4 text-gdk-gray pb-6 border-b-2 pr-6`}>
							{i18n.info.faq.description}
						</div>
						{i18n.info.faq.qa.map((item, idx) => (
							<React.Fragment key={`info-faq-item-${idx}`}>
								<QaEntry
									question={item.question}
									answer={item.answer}
									isLast={idx === i18n.info.faq.qa.length - 1}
									isInitiallyExpanded={false}
									isFAQEntry={true}
								/>
							</React.Fragment>
						))}
						<div className="pt-8">
							<SocialShare />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
