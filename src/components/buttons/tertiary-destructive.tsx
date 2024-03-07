import React from "react";

export interface TertiaryDestructiveButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const TertiaryDestructiveButton: React.FC<TertiaryDestructiveButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`hover:text-bg-gdk-light-blue disabled:text-gdk-light-gray enabled:hover:text-gdk-light-blue
      text-gdk-dark-red enabled:hover:text-gdk-light-red" flex h-[51px] w-fit items-center justify-center rounded-[10px] 
      p-3.5 font-semibold
        `}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex flex-row  items-center gap-3">{label}</span>
    </button>
  );
};

export default TertiaryDestructiveButton;
