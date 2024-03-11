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
      showLess: string;
    };
    settings: {
      subtitle: string;
      username: string;
      placeholderUser: string;
      email: string;
      placeholderMail: string;
      password: string;
      changePassword: string;
      deleteAccount: string;
      approve: string;
    };
    logOut: string;
  };
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
  about: {
    head: QuestionAnswer;
    qa: QuestionAnswer[];
  };
  faq: {
    title: string;
    description: string;
    qa: QuestionAnswer[];
  };
  share: {
    title: string;
    content: string;
    openSource: string;
  };
}

export interface Content {
  locationSearch: LocationSearch;
  navbar: Navbar;
  notFound: NotFound;
  info: Info;
}
