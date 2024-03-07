import React from "react";

export interface TertiaryButtonProps {
  label: string;
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
      pointer-events-auto  my-4 flex w-fit justify-center rounded-xl px-8 py-3.5 
      ${!destructive ? "text-gdk-blue" : "text-gdk-dark-red enabled:hover:text-gdk-light-red"}
        `}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TertiaryButton;
