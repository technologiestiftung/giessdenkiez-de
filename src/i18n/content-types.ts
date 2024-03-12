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

interface TreeDetail {
  title: string;
  adoptIt: string;
  alreadyAdoptedBy: string;
  ageTitle: string;
  age: (age: number) => string;
  ageUnknown: string;
  waterNeed: WaterNeed;
}

export interface Content {
  locationSearch: LocationSearch;
  navbar: Navbar;
  notFound: NotFound;
  info: Info;
  treeDetail: TreeDetail;
}
