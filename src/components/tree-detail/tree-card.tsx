import React from "react";

interface TreeCardProps {
  data: any;
}

const TreeCard: React.FC<TreeCardProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-slate-100 p-4 drop-shadow-lg">
      <div className="flex flex-row items-center justify-between text-xl">
        <div className="font-bold">{data.artdtsch}</div>
        <img
          src="/images/heart-icon.svg"
          alt="Tree Icon"
          width={24}
          height={24}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-slate-500">Diesen Baum adoptieren</div>
        <img
          src="/images/info-icon.svg"
          alt="Tree Icon"
          width={24}
          height={24}
        />
      </div>
      <div className="items-left flex flex-row gap-2">
        <img
          src="/images/hi-there-icon.svg"
          alt="Tree Icon"
          width={24}
          height={24}
        />
        <div className="italic leading-tight text-slate-500">
          Auch von anderen User:innen adoptiert
        </div>
      </div>
    </div>
  );
};

export default TreeCard;
