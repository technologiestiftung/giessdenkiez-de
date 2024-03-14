import React, { useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store.ts";
import EditIcon from "../../icons/edit-icon.tsx";
import { useAuthStore } from "../../../auth/auth-store.tsx";

export interface EmailInputWithIconProps {
  label: string | React.ReactNode;
  placeholder: string | undefined;
}

const EmailInputWithIcon: React.FC<EmailInputWithIconProps> = ({
  label,
  placeholder,
}) => {
  const i18n = useI18nStore().i18n();
  const { updateEmail } = useAuthStore();

  const [emailIsDisabled, setEmailDisabled] = useState(true);

  return (
    <div className="mt-7 flex flex-col">
      <label className="mb-2 font-semibold">{label}</label>
      {emailIsDisabled && (
        <div className="flex flex-row justify-between gap-x-8">
          <p className="italic">{placeholder}</p>
          <button
            className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
            onClick={() => {
              setEmailDisabled(!emailIsDisabled);
            }}
          >
            <EditIcon />
          </button>
        </div>
      )}
      {!emailIsDisabled && (
        <form
          className="flex flex-col justify-between gap-x-8"
          onSubmit={(e) => {
            e.preventDefault();
            updateEmail(e.currentTarget.email.value);
            setEmailDisabled(!emailIsDisabled);
          }}
        >
          <div className="flex flex-col justify-between gap-x-8 md:flex-row">
            <input
              className={`h-14 flex-auto rounded-2xl px-3 py-2 outline-1 focus:outline-2
              focus:outline-gdk-blue enabled:outline disabled:bg-gdk-white `}
              type="text"
              name="email"
              disabled={emailIsDisabled}
              placeholder={placeholder}
            />
            <button
              className="mt-2 cursor-pointer self-end font-semibold text-gdk-blue enabled:hover:text-gdk-light-blue md:mt-0 md:self-center"
              type="submit"
            >
              {i18n.navbar.profile.settings.approve}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailInputWithIcon;
