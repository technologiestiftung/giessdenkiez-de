import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import ClearIcon from "../icons/clear-icon";
import { useUrlState } from "../router/store";
import QaEntry from "./qa-entry";
import SocialShare from "./social-share";

const Info: React.FC = () => {
  const setPathname = useUrlState((store) => store.setPathname);
  const i18n = useI18nStore().i18n();

  return (
    <div className="pointer-events-auto w-full overflow-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-[100%] flex-col gap-4 px-0 py-8 md:w-[70%] md:px-4 lg:w-[60%] xl:w-[50%]">
          <div className="flex w-full items-center justify-between px-4">
            <h1 className="text-4xl font-bold">Info</h1>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setPathname("/");
              }}
            >
              <ClearIcon />
            </a>
          </div>
          <div className="flex flex-col gap-4 rounded-lg p-4 md:border-2 md:p-8">
            {i18n.info.about.map((item, idx) => (
              <QaEntry
                question={item.question}
                answer={item.answer}
                key={`info-about-item-${idx}`}
                isLast={idx === i18n.info.about.length - 1}
                isInitiallyExpanded={idx === 0}
              ></QaEntry>
            ))}
            <div className={`w-full pt-4 text-xl`}>{i18n.info.faq.title}</div>
            <div className={`w-full text-slate-500`}>
              {i18n.info.faq.description}
            </div>
            {i18n.info.faq.qa.map((item, idx) => (
              <QaEntry
                question={item.question}
                answer={item.answer}
                key={`info-about-item-${idx}`}
                isLast={idx === i18n.info.about.length - 1}
                isInitiallyExpanded={false}
              ></QaEntry>
            ))}
            <div className="pt-8">
              <SocialShare></SocialShare>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
