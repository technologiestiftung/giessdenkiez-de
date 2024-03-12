import React from "react";
import { TreeWateringData } from "./tree-types";

interface WateringCardProps {
  wateringData: TreeWateringData;
}

const LastWaterings: React.FC<WateringCardProps> = ({ wateringData }) => {
  return (
    <div className="shadow-gdk-hard flex flex-col gap-2 rounded-lg p-4">
      <div className="font-bold">{wateringData.username}</div>
      <div className="flex flex-row items-center justify-between">
        <div>
          {new Date(wateringData.timestamp).toLocaleDateString(undefined, {
            dateStyle: "full",
          })}
        </div>
        <div className="flex flex-row items-center gap-2">
          <img
            src="/images/drop-icon.svg"
            alt="Drop Icon"
            width={15}
            height={15}
          />
          <div>{wateringData.amount}l</div>
        </div>
      </div>
    </div>
  );
};

export default LastWaterings;
