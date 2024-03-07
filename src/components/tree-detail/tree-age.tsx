import React, { useState } from "react";

interface TreeAgeProps {
  age: number;
}

const TreeAge: React.FC<TreeAgeProps> = ({ age }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    </div>
  );
};

export default TreeAge;
