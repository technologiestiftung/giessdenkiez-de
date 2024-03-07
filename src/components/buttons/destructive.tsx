import React from "react";

export interface DestructiveButtonProps {
  label: string;
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
      pointer-events-auto my-4 flex w-fit justify-center rounded-xl px-8 py-3.5`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default DestructiveButton;
