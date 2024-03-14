import React, { useState } from "react";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import { useFetchTreeWateringData } from "./hooks/use-fetch-tree-watering-data";
import { useWaterTree } from "./hooks/use-water-tree";
import { TreeData } from "./tree-types";
import { format, parse, parseISO } from "date-fns";
import "../../index.css";

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
    <dialog id="water-dialog" className="shadow-3xl flex-col rounded-lg p-8">
      <div className="flex flex-col gap-6">
        <div className="text-xl font-bold">Gießung eintragen</div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold">Wie viele Liter?</div>
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
          <div className="text-lg font-semibold">Wann?</div>
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
        <div className="flex flex-row flex-wrap justify-between gap-4">
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
