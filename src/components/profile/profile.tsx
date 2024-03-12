import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { useAuthStore } from "../../auth/auth-store";
import AuthCard from "./auth-card";
import Overview from "./overview";
import AdoptedTrees from "./adopted-trees";
import ProfileDetails from "./profile-details";
import SecondaryButton from "../buttons/secondary";

const Profile: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const { isLoggedIn, logout } = useAuthStore();

  switch (isLoggedIn()) {
    case undefined:
      return <div className="mx-auto my-auto">Loading...</div>;

    case false:
      return (
        <div className="h-full overflow-y-auto">
          <AuthCard />
        </div>
      );

    default:
      return (
        <div className="w-full overflow-y-auto px-5 pt-11">
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-[100%] flex-col gap-4 px-0 py-8 md:w-[70%] md:px-4 lg:w-[70%] xl:w-[60%]">
              <h1 className="text-3xl font-bold">{i18n.navbar.profile.title}</h1>

              <Overview />

              <AdoptedTrees />

              <ProfileDetails />

              <div className="self-center">
                <SecondaryButton
                  onClick={() => logout()}
                  label={i18n.navbar.profile.logOut}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default Profile;
