interface LocationSearch {
  placeholder: string;
}

interface Navbar {
  map: string;
  profile: string;
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
