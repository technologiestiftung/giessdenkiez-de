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

interface TreeDetail {
  title: string;
  adoptIt: string;
  alreadyAdoptedBy: string;
  ageTitle: string;
  age: (age: number) => string;
  ageUnknown: string;
}

export interface Content {
  locationSearch: LocationSearch;
  navbar: Navbar;
  notFound: NotFound;
  info: Info;
  treeDetail: TreeDetail;
}
