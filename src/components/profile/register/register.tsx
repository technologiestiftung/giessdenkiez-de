import React from "react";
import { useAuthStore } from "../../../auth/auth-store";
import PrimaryButton from "../../buttons/primary";
import { useUrlState } from "../../router/store";
import UsernameInputWithValidation from "./username-input-with-validation";
import PasswordInputWithValidation from "./password-input-with-validation";
import EmailInputWithValidation from "./email-input-with-validation";

const Register: React.FC = () => {
  const { register } = useAuthStore();
  const { setPathname } = useUrlState();

  return (
    <>
      <div
        className={`
        h-full w-full px-4 pt-10
        lg:mx-auto lg:my-auto lg:max-h-[40rem] lg:max-w-[42rem] lg:rounded lg:border lg:shadow`}
      >
        <a
          className="font-semibold text-blue-600"
          href="/profile"
          onClick={(e) => {
            e.preventDefault();
            setPathname("/profile");
          }}
        >
          <span>&lt;</span> zurück zum Login
        </a>

        <h1 className="pt-12 text-2xl font-semibold">Registrieren</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register({
              email: e.currentTarget.email.value,
              username: e.currentTarget.username.value,
              password: e.currentTarget.password.value,
            });
          }}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-y-2 pt-5">
            <EmailInputWithValidation />
          </div>

          <div className="flex flex-col gap-y-2 pt-6">
            <UsernameInputWithValidation />
          </div>

          <div className="flex flex-col gap-y-2 pt-6">
            <PasswordInputWithValidation />
          </div>

          <div className="pt-11">
            <PrimaryButton type="submit" label="Registrieren" />
          </div>
        </form>

        <p className="pt-6">Du hast schon einen Account?</p>
        <a
          className="font-semibold text-blue-600"
          href="/profile"
          onClick={(e) => {
            e.preventDefault();
            setPathname("/profile");
          }}
        >
          Melde Dich an
        </a>
      </div>
    </>
  );
};

export default Register;
