import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";
import EditIcon from "../icons/edit-icon.tsx";
import TertiaryButton from "../buttons/tertiary.tsx";
import InputFieldIcon from "../input/input-field-icon.tsx";

const ProfileDetails: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const [usernameIsDisabled, setUsernameDisabled] = useState(true);
  const [emailIsDisabled, setEmailDisabled] = useState(true);

  return (
    <div className="mb-3 md:rounded-2xl md:border md:p-7 md:shadow-sm">
      <h2 className="text-2xl font-semibold">
        {i18n.navbar.profile.settings.subtitle}
      </h2>

      <InputFieldIcon
        label={i18n.navbar.profile.settings.username}
        placeholder={i18n.navbar.profile.settings.placeholderUser}
        onClick={() => {
          setUsernameDisabled(!usernameIsDisabled);
        }}
        disabled={usernameIsDisabled}
        setDisabled={setUsernameDisabled}
        icon={<EditIcon />}
      ></InputFieldIcon>

      <InputFieldIcon
        label={i18n.navbar.profile.settings.email}
        placeholder={i18n.navbar.profile.settings.placeholderMail}
        onClick={() => {
          setEmailDisabled(!emailIsDisabled);
        }}
        disabled={emailIsDisabled}
        setDisabled={setEmailDisabled}
        icon={<EditIcon />}
      ></InputFieldIcon>

      <div className="mt-6 flex flex-col">
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
            onClick={() => {}}
            label={i18n.navbar.profile.settings.changePassword}
          ></TertiaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;