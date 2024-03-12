import React, { Dispatch, SetStateAction } from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";

export interface InputFieldIconProps {
  label: string | React.ReactNode;
  placeholder: string;
  onClick: () => void;
  disabled?: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  icon: React.ReactNode;
}

const InputFieldIcon: React.FC<InputFieldIconProps> = ({
  label,
  onClick,
  disabled,
  setDisabled,
  icon,
  placeholder,
}) => {
  const i18n = useI18nStore().i18n();

  return (
    <div className="mt-7 flex flex-col">
      <form
        className="flex flex-col justify-between gap-x-8"
        onSubmit={(e) => {
          e.preventDefault();
          setDisabled(!disabled);
        }}
      >
        <label className="mb-2 font-semibold">{label}</label>
        {disabled && (
          <div className="flex flex-row justify-between gap-x-8">
            <p className="italic">{placeholder}</p>
            <button
              className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
              onClick={onClick}
            >
              {icon}
            </button>
          </div>
        )}
        {!disabled && (
          <div className="flex flex-col justify-between gap-x-8 md:flex-row">
            <input
              className={`h-14 flex-auto rounded-2xl px-3 py-2 outline-1 focus:outline-2
              focus:outline-gdk-blue enabled:outline disabled:bg-gdk-white `}
              name="submitted-name"
              type="text"
              disabled={disabled}
              placeholder={placeholder}
            />
            <button
              className="mt-2 cursor-pointer self-end font-semibold text-gdk-blue enabled:hover:text-gdk-light-blue md:mt-0 md:self-center"
              type="submit"
            >
              {i18n.navbar.profile.settings.approve}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default InputFieldIcon;
