import React from "react";

interface TreeAgeProps {
  age: number | undefined;
}

const TreeAge: React.FC<TreeAgeProps> = ({ age }) => {
  return (
    <div className="flex flex-row items-center justify-between border-b-2 pb-4 text-xl font-bold">
      <div className="flex flex-row items-center gap-2">
        <img
          src="/images/tree-age-icon.svg"
          alt="Tree Age Icon"
          width={36}
          height={36}
        />
        <div className="">Standalter</div>
      </div>
      {age ? <div>{age} Jahre</div> : <div>Unbekannt</div>}
    </div>
  );
};

export default TreeAge;
