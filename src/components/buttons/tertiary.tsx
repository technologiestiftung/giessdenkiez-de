import React from "react";

export interface TertiaryButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const TertiaryButton: React.FC<TertiaryButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`hover:text-bg-gdk-light-blue p-y-3.5 flex
      h-[51px] w-fit items-center justify-center rounded-[10px] font-semibold text-gdk-blue enabled:hover:text-gdk-light-blue disabled:text-gdk-light-gray`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex flex-row  items-center gap-3">{label}</span>
    </button>
  );
};

export default TertiaryButton;
