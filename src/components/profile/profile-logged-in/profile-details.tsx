import React, { useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import InputFieldIcon from "../../input/input-field-icon";
import TertiaryButton from "../../buttons/tertiary";
import EditIcon from "../../icons/edit-icon";
import { useAuthStore } from "../../../auth/auth-store";

const ProfileDetails: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const [usernameIsDisabled, setUsernameDisabled] = useState(true);
  const [emailIsDisabled, setEmailDisabled] = useState(true);

  const { forgotPassword } = useAuthStore();
  const { getUserData } = useAuthStore();
  const userDate = getUserData();

  return (
    <div className="md:shadow-gdk-soft mb-3 md:rounded-2xl md:border-2 md:p-7">
      <h2 className="text-2xl font-semibold">
        {i18n.navbar.profile.settings.subtitle}
      </h2>

      <InputFieldIcon
        label={i18n.navbar.profile.settings.username}
        placeholder={userDate.user_metadata.signup_username}
        onClick={() => {
          setUsernameDisabled(!usernameIsDisabled);
        }}
        disabled={usernameIsDisabled}
        setDisabled={setUsernameDisabled}
        icon={<EditIcon />}
      ></InputFieldIcon>

      <InputFieldIcon
        label={i18n.navbar.profile.settings.email}
        placeholder={userDate.email}
        onClick={() => {
          setEmailDisabled(!emailIsDisabled);
        }}
        disabled={emailIsDisabled}
        setDisabled={setEmailDisabled}
        icon={<EditIcon />}
      ></InputFieldIcon>

      <div className="mt-7 flex flex-col">
        <label className="font-semibold" htmlFor="email">
          {i18n.navbar.profile.settings.password}
        </label>
        <div className="flex flex-row justify-between gap-x-4 ">
          <input
            className="disabled:bg-gdk-white "
            disabled={true}
            id="password"
            type="password"
            value="1234567890"
          />
          <TertiaryButton
            onClick={() => {
              forgotPassword(userDate.email);
            }}
            label={i18n.navbar.profile.settings.changePassword}
          ></TertiaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
