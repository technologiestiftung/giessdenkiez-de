import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

const ProblemCard: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <div className="mt-8 flex flex-col gap-2 rounded-lg border-2 p-4">
      <div className="flex flex-col justify-start gap-4">
        <div className="flex flex-row gap-2 text-xl">
          <img
            src="/images/attention-icon.svg"
            alt="Attention Icon"
            width={20}
            height={20}
          />
          <div className="font-bold">Problem melden</div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            Du hast einen Baumschaden entdeckt, oder die Baumscheibe wird
            missbraucht? Teile es dem Ordnungsamt mit!
          </div>
          <div>
            <a href="/" className="font-bold text-gdk-blue">
              Zum offiziellen Formular
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
