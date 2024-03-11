// <p> </p> input field submit + button
import React from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";

export interface InputFieldIconProps {
  label: string | React.ReactNode;
  placeholder: string;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
}

const InputFieldIcon: React.FC<InputFieldIconProps> = ({
  label,
  onClick,
  disabled,
  icon,
  placeholder,
}) => {
  const i18n = useI18nStore().i18n();

  return (
    <div className="mt-6 flex flex-col">
      <form
        className="flex flex-col justify-between gap-x-8"
        action=""
        method="get"
      >
        <label className="mb-2 font-semibold">{label}</label>
        {disabled && (
          <div className="flex flex-row justify-between gap-x-8">
            <p className="italic">{placeholder}</p>
            <button className="self-end text-gdk-blue" onClick={onClick}>
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
            <input
              className="mt-2 cursor-pointer self-end font-semibold text-gdk-blue md:mt-0 md:self-center"
              type="submit"
              value={i18n.navbar.profile.settings.approve}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default InputFieldIcon;
