import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import Overview from "./overview";
import AdoptedTrees from "./adopted-trees";
import ProfileDetails from "./profile-details";

const Profile: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <div className="overflow-y-auto px-5 pt-11">
      <h1 className="text-3xl font-bold">{i18n.navbar.profile.title}</h1>

      <Overview />

      <AdoptedTrees />

      <ProfileDetails />
    </div>
  );
};

export default Profile;
