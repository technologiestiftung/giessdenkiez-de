import React from "react";

export interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`bg-gdk-white outline-gdk-blue text-gdk-blue enabled:hover:bg-gdk-light-blue hover:text-gdk-white 
      disabled:outline-gdk-light-gray disabled:text-gdk-light-gray  
      pointer-events-auto my-4 flex w-fit justify-center rounded-xl px-8 py-3.5 outline outline-2`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
