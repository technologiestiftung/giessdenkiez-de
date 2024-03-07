import React from "react";

export interface PrimaryButtonProps {
  label: string | React.ReactNode;
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
      pointer-events-auto my-4 flex h-[51px] w-fit items-center justify-center rounded-[10px] px-8 font-semibold`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex flex-row  items-center gap-3">{label}</span>
    </button>
  );
};

export default PrimaryButton;
