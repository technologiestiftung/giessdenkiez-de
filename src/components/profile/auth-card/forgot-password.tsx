import React from "react";
import { useAuthStore } from "../../../auth/auth-store";
import PrimaryButton from "../../buttons/primary";
import TextInput from "../../input/text-input";
import { useUrlState } from "../../router/store";

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuthStore();
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

        <h1 className="pt-12 text-2xl font-semibold">Passwort Vergessen</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            forgotPassword(e.currentTarget.email.value);
          }}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-y-2 pt-7">
            <label htmlFor="email" className="">
              Email
            </label>
            <TextInput type="email" id="email" name="email" />
          </div>

          <div className="pt-11">
            <PrimaryButton type="submit" label="Passwort zurücksetzen" />
          </div>
        </form>

        <p className="pt-6">Zurück zur Anmeldung?</p>
        <a
          className="font-semibold text-blue-600"
          href="/profile"
          onClick={(e) => {
            e.preventDefault();
            setPathname("/profile");
          }}
        >
          Hier klicken
        </a>
      </div>
    </>
  );
};

export default ForgotPassword;
