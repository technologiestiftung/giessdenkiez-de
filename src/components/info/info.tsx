import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import ClearIcon from "../icons/clear-icon";
import ChevronRight from "../icons/chevron-right";
import ChevronDown from "../icons/chevron-down";
import Markdown from "react-markdown";
import { useUrlState } from "../router/store";

const Info: React.FC = () => {
  const setPathname = useUrlState((store) => store.setPathname);

  const i18n = useI18nStore().i18n();
  const [collapsedAnswers, setCollapsedAnswers] = useState<string[]>([
    i18n.info.about[0].question,
  ]);

  function toggleCollapseAnswer(question: string): void {
    const found = collapsedAnswers.filter((q) => q === question).length > 0;
    if (found) {
      setCollapsedAnswers((old) => old.filter((q) => q !== question));
    } else {
      setCollapsedAnswers((old) => [...old, question]);
    }
  }

  function isExpanded(question: string): boolean {
    return collapsedAnswers.filter((q) => q === question).length > 0;
  }

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
              <div
                key={`info-about-item-${idx}`}
                className={`w-full ${idx < i18n.info.about.length - 1 && "border-b-2"} py-4`}
              >
                <button
                  className="flex w-full flex-row justify-between text-xl"
                  onClick={() => {
                    toggleCollapseAnswer(item.question);
                  }}
                >
                  <div>{item.question}</div>
                  <div>
                    {isExpanded(item.question) ? (
                      <ChevronDown></ChevronDown>
                    ) : (
                      <ChevronRight></ChevronRight>
                    )}
                  </div>
                </button>
                {isExpanded(item.question) && (
                  <Markdown className="mt-4 grid gap-4 text-slate-500 [&>p>a]:underline">
                    {item.answer}
                  </Markdown>
                )}
              </div>
            ))}
            <div className={`w-full pt-4 text-xl`}>{i18n.info.faq.title}</div>
            <div className={`w-full text-slate-500`}>
              {i18n.info.faq.description}
            </div>
            {i18n.info.faq.qa.map((item, idx) => (
              <div
                key={`info-faq-item-${idx}`}
                className={`w-full ${idx < i18n.info.faq.qa.length - 1 && "border-b-2"} py-4`}
              >
                <button
                  className="flex w-full flex-row justify-between text-left text-xl"
                  onClick={() => {
                    toggleCollapseAnswer(item.question);
                  }}
                >
                  <div>{item.question}</div>
                  <div>
                    {isExpanded(item.question) ? (
                      <ChevronDown></ChevronDown>
                    ) : (
                      <ChevronRight></ChevronRight>
                    )}
                  </div>
                </button>
                {isExpanded(item.question) && (
                  <Markdown className="mt-4 grid gap-4 text-slate-500 [&>p>a]:underline">
                    {item.answer}
                  </Markdown>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
