import React from "react";

export interface TertiaryButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

const TertiaryButton: React.FC<TertiaryButtonProps> = ({
  label,
  onClick,
  disabled,
  destructive,
}) => {
  return (
    <button
      className={`hover:text-bg-gdk-light-blue disabled:text-gdk-light-gray enabled:hover:text-gdk-light-blue
      pointer-events-auto  my-4 flex h-[51px] w-fit items-center justify-center rounded-[10px] px-8 py-3.5 font-semibold
      ${!destructive ? "text-gdk-blue" : "text-gdk-dark-red enabled:hover:text-gdk-light-red"}
        `}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex flex-row  items-center gap-3">{label}</span>
    </button>
  );
};

export default TertiaryButton;
