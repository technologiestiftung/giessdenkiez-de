import React from "react";

export interface DestructiveButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const DestructiveButton: React.FC<DestructiveButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`text-gdk-white bg-gdk-dark-red hover:bg-gdk-light-red disabled:bg-gdk-light-gray 
      pointer-events-auto my-4 flex  h-[51px] w-fit items-center justify-center rounded-xl px-8 py-3.5`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex flex-row  items-center gap-3">{label}</span>
    </button>
  );
};

export default DestructiveButton;
