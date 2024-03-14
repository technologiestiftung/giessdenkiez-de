import React from "react";
import { PartialCircleProps } from "./tree-types";

const PartialProgressCircle: React.FC<PartialCircleProps> = ({
  parts,
  title,
  size,
}) => {
  const scale = 0.45;
  const dasharray = 2 * Math.PI * (size * scale);
  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="col-start-1 row-start-1 flex items-center justify-center">
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size * scale}
            fill="none"
            stroke="#ddd"
            strokeWidth="15"
            strokeDasharray={dasharray.toString()}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
      </div>

      {parts.map((part, idx) => {
        const previousParts = parts.slice(0, idx);
        const previousPartsProgressSum = previousParts
          .map((p) => p.progress)
          .reduce((l, r) => l + r, 0);
        const rotate = Math.round(previousPartsProgressSum * 360);

        return (
          <div
            className="col-start-1 row-start-1 flex items-center justify-center"
            key={`part-${idx}`}
          >
            <svg width={size} height={size}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={size * scale}
                fill="none"
                stroke={part.color}
                strokeWidth="15"
                strokeDasharray={dasharray.toString()}
                strokeDashoffset={((1 - part.progress) * dasharray).toString()}
                transform={`rotate(${-90 + rotate} ${size / 2} ${size / 2})`}
              ></circle>
            </svg>
          </div>
        );
      })}
      <div className="col-start-1 row-start-1 flex items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="m-12">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default PartialProgressCircle;
