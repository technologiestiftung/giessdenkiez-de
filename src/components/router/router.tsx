import React from "react";
import { Search } from "./search";
import { useUrlState } from "./store";
import { useLocationEventListener } from "./hooks/use-location-event-listener";

const Router: React.FC = () => {
  const url = useUrlState((state) => state.url);
  const setPathname = useUrlState((state) => state.setPathname);

  useLocationEventListener();

  switch (url.pathname) {
    case "/":
      setPathname("/map");
      return <></>;

    case "/map":
      return (
        <h1>
          map{" "}
          <a
            href="/profile"
            onClick={(e) => {
              e.preventDefault();
              setPathname("/profile");
            }}
          >
            profile
          </a>{" "}
          <Search />
        </h1>
      );
    case "/profile":
      return <h1>profile</h1>;
    case "/info":
      return <h1>info</h1>;
    default:
      return <h1>404</h1>;
  }
};

export default Router;
