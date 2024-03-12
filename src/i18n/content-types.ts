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

interface WaterNeed {
  title: string;
  hint: string;
  needXLiters: (liters: number) => string;
  needsOnlyOnDryDays: string;
  waterManaged: string;
  unknown: string;
  unknownTitle: string;
  liters: string;
  watered: string;
  rained: string;
  stillMissing: string;
  dataOfLastXDays: string;
  manager: string;
  alreadyWateredByManager: string;
  stillWaterXLiters: (liters: number) => string;
  shouldBeWatered: string;
  sufficientlyWatered: string;
  ageAndWaterHintTitle: string;
  ageAndWaterHint: string;
  lastXDaysYLitersWater: (days: number, liters: number) => string;
  lastXDaysYLitersRain: (days: number, liters: number) => string;
}

interface Problem {
  title: string;
  description: string;
  link: string;
}

interface LastWaterings {
  title: string;
  thisWeek: string;
  nothingThisWeek: string;
  thisMonth: string;
  nothingThisMonth: string;
  thisYear: string;
  nothingThisYear: string;
}

interface TreeDetail {
  title: string;
  adoptIt: string;
  alreadyAdoptedBy: string;
  ageTitle: string;
  age: (age: number) => string;
  ageUnknown: string;
  waterNeed: WaterNeed;
  lastWaterings: LastWaterings;
  problem: Problem;
}

export interface Content {
  locationSearch: LocationSearch;
  navbar: Navbar;
  notFound: NotFound;
  info: Info;
  treeDetail: TreeDetail;
}
