import React, { useState } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import EditIcon from "../../../icons/edit-icon";
import { useAuthStore } from "../../../../auth/auth-store";
import UsernameInputWithValidation from "../../validation/username-input-with-validation";

const EditUsername: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const { updateUsername, getUserData } = useAuthStore();

  const [usernameIsDisabled, setUsernameDisabled] = useState(true);

  return (
    <div className="mt-7 flex flex-col">
      {usernameIsDisabled ? (
        <>
          <p className="mb-2 font-semibold">
            {i18n.navbar.profile.settings.username}
          </p>
          <div className="flex flex-row justify-between gap-x-8">
            <p className="italic">
              {getUserData()?.user_metadata.signup_username}
            </p>
            <button
              className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
              onClick={() => {
                setUsernameDisabled(!usernameIsDisabled);
              }}
            >
              <EditIcon />
            </button>
          </div>
        </>
      ) : (
        <form
          className="flex flex-col justify-between gap-x-8"
          onSubmit={(e) => {
            e.preventDefault();
            updateUsername(e.currentTarget.username.value);
            setUsernameDisabled(!usernameIsDisabled);
          }}
        >
          <div className="flex flex-col justify-between gap-x-8 md:flex-row">
            <UsernameInputWithValidation
              label={i18n.navbar.profile.settings.editUsername}
              defaultValue={getUserData()?.user_metadata.signup_username}
            />
            <button
              className={`mt-2 cursor-pointer self-end  font-semibold 
              text-gdk-blue enabled:hover:text-gdk-light-blue md:mb-12 md:mt-0 md:self-center `}
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

export default EditUsername;
