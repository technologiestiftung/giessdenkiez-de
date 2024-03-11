import React from "react";
import { useUrlState } from "./store";
import { useLocationEventListener } from "./hooks/use-location-event-listener";
import Navbar from "../navbar/navbar";
import Profile from "../profile/profile";
import Info from "../info/info";
import PageNotFound from "../page-not-found/page-not-found";
import LocationSearch from "../location-search/location-search";
import TreeDetail from "../tree-detail/tree-detail";

const Router: React.FC = () => {
  const url = useUrlState((state) => state.url);
  const setPathname = useUrlState((state) => state.setPathname);
  const treeId = url.searchParams.get("treeId");

  useLocationEventListener();

  switch (url.pathname) {
    case "/":
      setPathname("/map");
      return <></>;

    case "/map":
      return (
        <div className="flex h-full flex-col justify-between lg:flex-row">
          <div
            className={`${treeId && "hidden lg:block"} order-last lg:order-first`}
          >
            <Navbar />
          </div>

          <div className={`${treeId && "hidden lg:block"} w-full`}>
            <LocationSearch />
          </div>

          {treeId && (
            <div>
              <TreeDetail></TreeDetail>
            </div>
          )}
        </div>
      );
    case "/profile":
      return (
        <div className="flex h-screen w-screen flex-col-reverse bg-white lg:flex-row">
          <Navbar />
          <Profile />
        </div>
      );
    case "/about":
      return (
        <div className="flex h-screen w-screen flex-col-reverse bg-white lg:flex-row">
          <Navbar />
          <Info />
        </div>
      );
    default:
      return (
        <div className="flex h-screen w-screen flex-col-reverse bg-white lg:flex-row">
          <Navbar />
          <PageNotFound />
        </div>
      );
  }
};

export default Router;
