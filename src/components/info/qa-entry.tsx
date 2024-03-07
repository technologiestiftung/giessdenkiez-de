import { useState } from "react";
import Markdown from "react-markdown";
import ChevronDown from "../icons/chevron-down";
import ChevronRight from "../icons/chevron-right";

interface QaEntryProps {
  question: string;
  answer: string;
  key: string;
  isLast: boolean;
  isInitiallyExpanded: boolean;
}

const QaEntry: React.FC<QaEntryProps> = ({
  question,
  answer,
  key,
  isLast,
  isInitiallyExpanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  return (
    <div key={key} className={`w-full ${!isLast && "border-b-2"} py-4`}>
      <button
        className="flex w-full flex-row justify-between text-xl"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div>{question}</div>
        <div>
          {isExpanded ? (
            <ChevronDown></ChevronDown>
          ) : (
            <ChevronRight></ChevronRight>
          )}
        </div>
      </button>
      {isExpanded && (
        <Markdown className="mt-4 grid gap-4 text-slate-500 [&>p>a]:underline">
          {answer}
        </Markdown>
      )}
    </div>
  );
};

export default QaEntry;
