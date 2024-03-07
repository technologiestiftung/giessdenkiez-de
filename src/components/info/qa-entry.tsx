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
        className="flex w-full flex-row justify-between gap-2 text-left text-xl"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="text-2xl font-semibold">{question}</div>
        <div className="text-gdk-blue">
          {isExpanded ? (
            <ChevronDown></ChevronDown>
          ) : (
            <ChevronRight></ChevronRight>
          )}
        </div>
      </button>
      {isExpanded && (
        <Markdown className="text-gdk-gray mt-4 grid gap-4 [&>p>a]:underline">
          {answer}
        </Markdown>
      )}
    </div>
  );
};

export default QaEntry;
