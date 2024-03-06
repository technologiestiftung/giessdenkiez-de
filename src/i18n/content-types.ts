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

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface Info {
  about: QuestionAnswer[];
  qa: QuestionAnswer[];
}

export interface Content {
  locationSearch: LocationSearch;
  navbar: Navbar;
  notFound: NotFound;
  info: Info;
}
