import React from "react";

interface ProgressPart {
  color: string;
  progress: number;
}

interface PartialCircleProps {
  parts: ProgressPart[];
  needsWaterAmount: number;
}

const PartialProgressCircle: React.FC<PartialCircleProps> = ({
  parts,
  needsWaterAmount,
}) => {
  const dasharray = 2 * Math.PI * 80;
  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="col-start-1 row-start-1 flex items-center justify-center">
        <svg width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#ddd"
            strokeWidth="15"
            strokeDasharray={dasharray.toString()}
            transform="rotate(-90 100 100)"
          ></circle>
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
            <svg width="200" height="200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={part.color}
                strokeWidth="15"
                strokeDasharray={dasharray.toString()}
                strokeDashoffset={((1 - part.progress) * dasharray).toString()}
                transform={`rotate(${-90 + rotate} 100 100)`}
              ></circle>
            </svg>
          </div>
        );
      })}
      <div className="col-start-1 row-start-1 flex items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div>Noch</div>
          <div className="font-bold">{needsWaterAmount} Liter</div>
          <div>gießen</div>
        </div>
      </div>
    </div>
  );
};

export default PartialProgressCircle;
