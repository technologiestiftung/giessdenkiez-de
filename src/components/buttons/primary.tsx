import React from "react";

export interface PrimaryButtonProps {
  label: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <button
      className={`
      my-4 flex h-[51px] w-full items-center justify-center rounded-[10px] bg-gdk-blue px-8 font-semibold 
      text-gdk-white hover:bg-gdk-light-blue disabled:bg-gdk-light-gray sm:w-fit`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span className="flex flex-row items-center gap-3">{label}</span>
    </button>
  );
};

export default PrimaryButton;
