import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { QaEntry } from "./qa-entry";
import { SocialShare } from "./social-share";
import { PrimaryButton } from "../buttons/primary";
import { Credits } from "./credits";
import { LanguageToggle } from "../router/languageToggle";
import Markdown from "react-markdown";

export const Info: React.FC = () => {
	const i18n = useI18nStore().i18n();

	return (
		<div className="pointer-events-auto w-full overflow-auto">
			<div className="flex flex-col items-center justify-center ">
				<div className="flex w-[100%] flex-col gap-4 px-1 py-4 md:py-8 md:w-[70%] md:px-4 lg:w-[60%] xl:w-[50%] relative">
					<div className="lg:hidden absolute top-11 right-0 pr-5">
						<LanguageToggle />
					</div>
					<h1 className="p-4 text-4xl font-bold">{i18n.info.infoTitel}</h1>
					<div className="flex flex-col rounded-lg p-4 md:border-2 md:p-8">
						<div>
							<QaEntry
								key="head-qa"
								question={i18n.info.about.head.question}
								answer={i18n.info.about.head.answer}
								isLast={false}
								isInitiallyExpanded={true}
							>
								<div className="py-2">
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
									<Markdown className={"[&>p>a]:underline [&>p]:pt-1 pt-2"}>
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
								>
									{idx === 1 && (
										<div className="p-4">
											<Credits />
										</div>
									)}
								</QaEntry>
							</React.Fragment>
						))}
						<div className={`w-full pt-4 text-xl`}>{i18n.info.faq.title}</div>
						<div className={`w-full text-gdk-gray`}>
							{i18n.info.faq.description}
						</div>
						{i18n.info.faq.qa.map((item, idx) => (
							<React.Fragment key={`info-faq-item-${idx}`}>
								<QaEntry
									question={item.question}
									answer={item.answer}
									isLast={idx === i18n.info.faq.qa.length - 1}
									isInitiallyExpanded={false}
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
