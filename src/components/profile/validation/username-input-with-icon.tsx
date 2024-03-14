import React, { useCallback, useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store.ts";
import EditIcon from "../../icons/edit-icon";
import { UsernameErrors } from "./types";
import Warning from "./warning";
import { checkIfUsernameIsTaken, validateUsername } from "./validation";
import { useAuthStore } from "../../../auth/auth-store.tsx";

export interface UsernameInputWithIconProps {
  label: string | React.ReactNode;
  placeholder: string | undefined;
}

const UsernameInputWithIcon: React.FC<UsernameInputWithIconProps> = ({
  label,
  placeholder,
}) => {
  const i18n = useI18nStore().i18n();
  const { updateUsername } = useAuthStore();

  const [usernameIsDisabled, setUsernameDisabled] = useState(true);

  const [usernameErrors, setUsernameErrors] = useState<UsernameErrors>({
    validLength: false,
    onlyNumberAndLetters: false,
  });
  const [isUsernameTakenWarningVisible, setIsUsernameTakenWarningVisible] =
    useState(false);

  const checks: {
    name: keyof UsernameErrors;
    description: string;
  }[] = [
    {
      name: "validLength",
      description: "mindestens 3–50 Zeichen lang sein,",
    },
    {
      name: "onlyNumberAndLetters",
      description: "und nur aus Zeichen oder Zahlen bestehen",
    },
  ];

  const onChange = useCallback(
    async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setIsUsernameTakenWarningVisible(false);

      const usernameErrors = validateUsername(target.value);

      setUsernameErrors(usernameErrors);

      const hasErrors = Object.values(usernameErrors).some((error) => !error);

      if (hasErrors) {
        target.setCustomValidity("Bitte überprüfe Deine Eingabe");
        return;
      }

      const isTaken = await checkIfUsernameIsTaken(target.value);
      setIsUsernameTakenWarningVisible(isTaken);

      if (isTaken) {
        target.setCustomValidity("Bitte überprüfe Dein Eingabe");
        return;
      }

      target.setCustomValidity("");
    },
    [],
  );

  return (
    <div className="mt-7 flex flex-col">
      <label className="mb-2 font-semibold">{label}</label>
      {usernameIsDisabled && (
        <div className="flex flex-row justify-between gap-x-8">
          <p className="italic">{placeholder}</p>
          <button
            className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
            onClick={() => {
              setUsernameDisabled(!usernameIsDisabled);
            }}
          >
            <EditIcon />
          </button>
        </div>
      )}
      {!usernameIsDisabled && (
        <form
          className="flex flex-col justify-between gap-x-8"
          onSubmit={(e) => {
            e.preventDefault();
            updateUsername(e.currentTarget.username.value);
            setUsernameDisabled(!usernameIsDisabled);
          }}
        >
          <div className="flex flex-col justify-between gap-x-8 md:flex-row">
            <input
              className={`h-14 flex-auto rounded-2xl px-3 py-2 outline-1 focus:outline-2
              focus:outline-gdk-blue enabled:outline disabled:bg-gdk-white `}
              type="text"
              name="username"
              disabled={usernameIsDisabled}
              placeholder={placeholder}
              onChange={onChange}
            />
            <button
              className="mt-2 cursor-pointer self-end font-semibold text-gdk-blue enabled:hover:text-gdk-light-blue md:mt-0 md:self-center"
              type="submit"
            >
              {i18n.navbar.profile.settings.approve}
            </button>
            {isUsernameTakenWarningVisible && (
              <Warning label="Dieser Benutzername ist bereits vergeben" />
            )}
            <p className="font-medium">Dein Benutzername sollte: </p>
            <ul>
              {checks.map((check) => (
                <li key={check.name} className="flex gap-2">
                  {usernameErrors[check.name] ? (
                    <span className="text-blue-600">✓</span>
                  ) : (
                    <span>•</span>
                  )}
                  {check.description}
                </li>
              ))}
            </ul>
          </div>
        </form>
      )}
    </div>
  );
};

export default UsernameInputWithIcon;
