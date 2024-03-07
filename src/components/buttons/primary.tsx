import React from "react";

export interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`text-gdk-white bg-gdk-blue hover:bg-gdk-light-blue disabled:bg-gdk-light-gray 
      pointer-events-auto my-4 flex w-fit justify-center rounded-xl px-8 py-3.5`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
