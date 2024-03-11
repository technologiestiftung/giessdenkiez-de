import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import Overview from "./overview";
import AdoptedTrees from "./adopted-trees";
import ProfileDetails from "./profile-details";

const Profile: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <div className="w-full overflow-y-auto px-5 pt-11">
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-[100%] flex-col gap-4 px-0 py-8 md:w-[70%] md:px-4 lg:w-[60%] xl:w-[50%]">
          <h1 className="text-3xl font-bold">{i18n.navbar.profile.title}</h1>

          <Overview />

          <AdoptedTrees />

          <ProfileDetails />
        </div>
      </div>
    </div>
  );
};

export default Profile;
