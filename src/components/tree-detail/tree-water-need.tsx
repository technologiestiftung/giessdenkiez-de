import React from "react";

interface TreeWaterNeedProps {
  age: number;
}

const TreeWaterNeed: React.FC<TreeWaterNeedProps> = ({ age }) => {
  return (
    <div className="flex flex-row items-center justify-between border-b-2 pb-4 text-xl font-bold">
      <div className="flex flex-row items-center gap-2">
        <img
          src="/images/watering-can.svg"
          alt="Tree Watering Can Icon"
          width={36}
          height={36}
        />
        <div className="">Wasserbedarf</div>
      </div>
      <div>{age} Jahre</div>
    </div>
  );
};

export default TreeWaterNeed;
