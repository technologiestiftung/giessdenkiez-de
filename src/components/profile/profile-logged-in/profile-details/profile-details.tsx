import React from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import EditEmail from "./edit-email";
import EditUsername from "./edit-username";
import EditPassword from "./edit-password";

const ProfileDetails: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <div className="mb-3 md:rounded-2xl md:border-2 md:p-7 md:shadow-gdk-soft">
      <h2 className="text-2xl font-semibold">
        {i18n.navbar.profile.settings.subtitle}
      </h2>

      <EditUsername />
      <EditEmail />
      <EditPassword />
    </div>
  );
};

export default ProfileDetails;
