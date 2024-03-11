import React from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";
import EditIcon from "../icons/edit-icon.tsx";
import TertiaryButton from "../buttons/tertiary.tsx";

const ProfileDetails: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <>
      <h2 className="mt-11 text-2xl font-semibold">
        {i18n.navbar.profile.settings.subtitle}
      </h2>

      <div className="mt-7 flex flex-col">
        <label className="font-semibold " htmlFor="username">
          {i18n.navbar.profile.settings.username}
        </label>
        <div className="flex flex-row justify-between gap-x-4 ">
          <input
            className="flex-auto italic disabled:bg-gdk-white"
            id="username"
            type="text"
            value="Username"
          />
          <button className=" self-end text-gdk-blue">
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <label className="font-semibold" htmlFor="email">
          {i18n.navbar.profile.settings.email}
        </label>
        <div className="flex flex-row justify-between gap-x-4 ">
          <input
            className="flex-auto italic disabled:bg-gdk-white"
            id="email"
            type="email"
            value="xyz@ts.berlin"
            disabled={true}
          />
          <button className=" self-end text-gdk-blue">
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="mt-1 flex flex-col">
        <label className="font-semibold" htmlFor="email">
          {i18n.navbar.profile.settings.password}
        </label>
        <div className="flex flex-row justify-between gap-x-4 ">
          <input id="password" type="password" value="1234567890" />
          <TertiaryButton
            onClick={() => {}}
            label="Passwort ändern"
          ></TertiaryButton>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
