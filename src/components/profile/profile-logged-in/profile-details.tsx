import React, { useState, useCallback } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import TertiaryButton from "../../buttons/tertiary";
import { useAuthStore } from "../../../auth/auth-store";
import EmailInputWithIcon from "../validation/email-input-with-icon";
import UsernameInputWithIcon from "../validation/username-input-with-icon";

const ProfileDetails: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const [usernameIsDisabled, setUsernameDisabled] = useState(true);
  const [emailIsDisabled, setEmailDisabled] = useState(true);

  const { forgotPassword, getUserData, updateEmail, updateUsername } =
    useAuthStore();

  return (
    <div className="md:shadow-gdk-soft mb-3 md:rounded-2xl md:border-2 md:p-7">
      <h2 className="text-2xl font-semibold">
        {i18n.navbar.profile.settings.subtitle}
      </h2>

      <form
        className="flex flex-col justify-between gap-x-8"
        onSubmit={(e) => {
          e.preventDefault();
          setUsernameDisabled(!usernameIsDisabled);
          updateUsername(e.currentTarget.username.value);
        }}
      >
        <UsernameInputWithIcon
          label={i18n.navbar.profile.settings.username}
          placeholder={getUserData()?.user_metadata.signup_username}
          disabled={usernameIsDisabled}
          onClick={() => {
            setUsernameDisabled(!usernameIsDisabled);
          }}
        ></UsernameInputWithIcon>
      </form>

      <form
        className="flex flex-col justify-between gap-x-8"
        onSubmit={(e) => {
          e.preventDefault();
          updateEmail(e.currentTarget.email.value);
          setEmailDisabled(!emailIsDisabled);
        }}
      >
        <EmailInputWithIcon
          label={i18n.navbar.profile.settings.email}
          placeholder={getUserData()?.email}
          disabled={emailIsDisabled}
          onClick={() => {
            setEmailDisabled(!emailIsDisabled);
          }}
        ></EmailInputWithIcon>
      </form>

      <div className="mt-7 flex flex-col">
        <label className="font-semibold" htmlFor="email">
          {i18n.navbar.profile.settings.password}
        </label>
        <form className="flex flex-row justify-between gap-x-4 ">
          <input
            className="disabled:bg-gdk-white "
            disabled={true}
            id="password"
            type="password"
            value="1234567890"
          />
          <TertiaryButton
            onClick={() => {
              forgotPassword(getUserData()?.email ?? "");
            }}
            label={i18n.navbar.profile.settings.changePassword}
          ></TertiaryButton>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
