import React from "react";
import { useAuthStore } from "../../auth/auth-store";
import PasswordInputWithValidation from "./register/password-input-with-validation";
import PrimaryButton from "../buttons/primary";
import TertiaryButton from "../buttons/tertiary";

const PasswordReset: React.FC = () => {
  const { updatePassword } = useAuthStore();

  return (
    <div
      className={`
        h-full w-full px-5 pt-10 lg:mx-auto lg:my-auto lg:max-h-[40rem] 
        lg:max-w-[42rem] lg:rounded-2xl lg:border-2  lg:p-14 lg:shadow-sm`}
    >
      <h1 className="text-2xl font-semibold">Passwort ändern</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePassword(e.currentTarget.password.value);
        }}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-y-2 pt-6">
          <PasswordInputWithValidation />
        </div>

        <div className="md: flex flex-row items-center justify-between gap-24 pt-11">
          <TertiaryButton label="Abbrechen" onClick={() => {}} />
          <PrimaryButton type="submit" label="Speichern" />
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
