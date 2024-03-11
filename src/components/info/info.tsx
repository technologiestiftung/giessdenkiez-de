import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import QaEntry from "./qa-entry";
import SocialShare from "./social-share";
import PrimaryButton from "../buttons/primary";

const Info: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <div className="pointer-events-auto w-full overflow-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-[100%] flex-col gap-4 px-0 py-8 md:w-[70%] md:px-4 lg:w-[60%] xl:w-[50%]">
          <h1 className="p-4 text-4xl font-bold">Info</h1>

          <div className="flex flex-col gap-4 rounded-lg p-4 md:border-2 md:p-8">
            <div>
              <QaEntry
                key="head-qa"
                question={i18n.info.about.head.question}
                answer={i18n.info.about.head.answer}
                isLast={false}
                isInitiallyExpanded={true}
                children={
                  <div className="py-2">
                    <PrimaryButton
                      label={"Slack Community"}
                      onClick={() => {
                        window.open(
                          "https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ",
                          "_blank",
                        );
                      }}
                      disabled={false}
                    />
                  </div>
                }
              />
            </div>

            {i18n.info.about.qa.map((item, idx) => (
              <QaEntry
                question={item.question}
                answer={item.answer}
                key={`info-about-item-${idx}`}
                isLast={idx === i18n.info.about.qa.length - 1}
                isInitiallyExpanded={false}
                children={undefined}
              />
            ))}
            <div className={`w-full pt-4 text-xl`}>{i18n.info.faq.title}</div>
            <div className={`text-gdk-gray w-full`}>
              {i18n.info.faq.description}
            </div>
            {i18n.info.faq.qa.map((item, idx) => (
              <QaEntry
                question={item.question}
                answer={item.answer}
                key={`info-about-item-${idx}`}
                isLast={idx === i18n.info.faq.qa.length - 1}
                isInitiallyExpanded={false}
                children={undefined}
              />
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

export default Info;
