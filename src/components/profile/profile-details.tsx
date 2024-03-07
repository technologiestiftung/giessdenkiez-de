import React from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";

const ProfileDetails: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <>
      <h2 className="mt-11 text-2xl font-semibold">
        {i18n.navbar.profile.settings.subtitle}
      </h2>

      <div className="mt-7 flex flex-col">
        <label className="font-semibold" htmlFor="username">
          {i18n.navbar.profile.settings.username}
        </label>
        <input className="italic" id="username" type="text" value="Username" />
      </div>

      <div className="mt-4 flex flex-col">
        <label className="font-semibold" htmlFor="email">
          {i18n.navbar.profile.settings.email}
        </label>
        <input
          className="italic"
          id="email"
          type="email"
          value="xyz@ts.berlin"
        />
      </div>

      <div className="mt-1 flex flex-col">
        <label className="font-semibold" htmlFor="email">
          {i18n.navbar.profile.settings.password}
        </label>
        <input id="password" type="password" value="1234567890" />
      </div>
    </>
  );
};

export default ProfileDetails;
