interface LocationSearch {
  placeholder: string;
}

interface Navbar {
  map: string;
  profile: {
    sidebarLabel: string;
    title: string;
    overview: {
      subtitle: string;
      irrigations: string;
      liter: string;
      adoptedTrees: string;
    };
    adoptedTrees: {
      subtitle: string;
      irrigationTimes: string;
      irrigationAmount: string;
      showAll: string;
    };
    settings: {
      subtitle: string;
      username: string;
      email: string;
      password: string;
      changePassword: string;
      deleteAccount: string;
    };
    logOut: string;
  };
  info: string;
}

interface NotFound {
  title: string;
}

export interface Content {
  locationSearch: LocationSearch;
  navbar: Navbar;
  notFound: NotFound;
}
