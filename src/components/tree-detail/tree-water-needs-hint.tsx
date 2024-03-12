import React from "react";

interface TreeWaterNeedHintProps {}

const TreeWaterNeedHint: React.FC<TreeWaterNeedHintProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">Wasserbedarf und Standalter </h1>
      <div>
        <span className="font-bold">Jung (unter 4 Jahren):</span> Wir sind
        frische Jungbäume und unser Durst wird vom bezirklichen Grünflächenamt
        gestillt.
      </div>
      <div>
        <span className="font-bold">Jung (4-14 Jahre):</span> In dem Alter
        werden wir nicht mehr in allen Bezirken von der Verwaltung bewässert und
        sind noch keine „Selbstversorger“. Wir freuen uns über viel Wasser von
        bis zu 200l pro Gießung (ein Mal in der Woche).
      </div>
      <div>
        <span className="font-bold">Erwachsen (15-40 Jahre):</span>
        Wir haben ein gewisses Durchhaltevermögen aber brauchen in heißen Phasen
        auch einen ordentlichen extra Schluck Wasser: bis zu 100l ein Mal in der
        Woche.
      </div>
      <div>
        <span className="font-bold"> Alt (über 40 Jahre):</span> Wir kommen
        weitestgehend alleine klar, freuen uns in besonders trockenen Phasen
        aber dennoch über einen extra Schluck.
      </div>
    </div>
  );
};

export default TreeWaterNeedHint;
