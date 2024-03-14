import React, { useState } from "react";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import { useFetchTreeWateringData } from "./hooks/use-fetch-tree-watering-data";
import { useWaterTree } from "./hooks/use-water-tree";
import { TreeData } from "./tree-types";

import { format, parse, parseISO } from "date-fns";

interface WateringDialogProps {
  treeData: TreeData;
  close: () => void;
}

const WateringDialog: React.FC<WateringDialogProps> = ({ treeData, close }) => {
  const dateFormat = "yyyy-MM-dd'T'hh:mm";

  const { waterTree } = useWaterTree(treeData.id);
  const { fetchWateringData } = useFetchTreeWateringData(treeData);
  const [amount, setAmount] = useState(0);
  const [waterDate, setWaterDate] = useState(new Date());

  return (
    <dialog className="shadow-gdk-hard absolute top-[50%] flex w-[100%] -translate-y-[50%] flex-col rounded-lg bg-gdk-white p-8 md:w-[30%]">
      <div className="flex flex-col gap-6">
        <div className="text-xl font-bold">Gießung eintragen</div>
        <div className="flex flex-col gap-2">
          <div>Wie viele Liter?</div>
          <input
            className="rounded-lg border-2 p-4"
            type="number"
            placeholder="Liter"
            value={amount}
            onChange={(e) => {
              setAmount(Math.max(0, parseInt(e.target.value)));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Wann?</div>
          <input
            className="rounded-lg border-2 p-4"
            type="datetime-local"
            value={format(parseISO(waterDate.toISOString()), dateFormat)}
            onChange={(e) => {
              const parsedDate = parse(e.target.value, dateFormat, new Date());
              setWaterDate(parsedDate);
            }}
          />
        </div>
        <div className="flex flex-row justify-between">
          <SecondaryButton
            label={"Abbrechen"}
            disabled={false}
            onClick={close}
          />
          <PrimaryButton
            label={"Speichern"}
            disabled={false}
            onClick={async () => {
              await waterTree(amount, waterDate);
              await fetchWateringData();
              close();
            }}
          />
        </div>
      </div>
    </dialog>
  );
};

export default WateringDialog;
