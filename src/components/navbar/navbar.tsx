import React from "react";
import { useUrlState } from "../router/store";
import MapIcon from "../icons/map-icon";
import UserIcon from "../icons/user-icon";
import InfoIcon from "../icons/info-icon";
import { useI18nStore } from "../../i18n/i18n-store";

const Navbar: React.FC = () => {
  const i18n = useI18nStore().i18n();

  const setPathname = useUrlState((state) => state.setPathname);
  const url = useUrlState((state) => state.url);

  const navItems = [
    { label: i18n.navbar.map, path: "/map", icon: <MapIcon /> },
    {
      label: i18n.navbar.profile.sidebarLabel,
      path: "/profile",
      icon: <UserIcon />,
    },
    { label: i18n.navbar.info, path: "/about", icon: <InfoIcon /> },
  ];

  return (
    <nav
      className={`pointer-events-auto
      flex h-auto w-full justify-center rounded-tl-3xl rounded-tr-3xl bg-white pt-0 shadow 
      lg:h-full lg:w-auto lg:justify-start lg:rounded-br lg:rounded-tl-none lg:rounded-tr lg:px-2 lg:pt-20`}
    >
      <div
        className={`
        flex flex-row gap-x-16 gap-y-0 pb-2 pt-1 
        lg:h-auto lg:flex-col lg:gap-x-0 lg:gap-y-8`}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              setPathname(item.path);
            }}
            className={`
            flex h-14 w-14 flex-col items-center justify-center rounded-xl pt-1 text-sm font-medium
            hover:bg-blue-600 hover:bg-opacity-10 lg:text-base 
            ${url.pathname === item.path ? "bg-blue-600 bg-opacity-10 text-blue-600" : "text-black"}
            `}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
