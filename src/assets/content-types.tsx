interface Item {
  title: string;
  description: string;
}

type TreeTypeId = 'LINDE' | 'AHORN' | 'EICHE' | 'KASTANIE' | 'PLATANE';
export interface TreeType extends Item {
  id: TreeTypeId;
}

type IconType = 'info' | 'zoom' | 'water' | 'subscribe';
export interface CollaborationItem extends Item {
  icon: IconType;
}
interface FAQ extends Item {
  qa: Array<{ question: string; answer: string }>;
}
interface PumpStates {
  working: string;
  defect: string;
  locked: string;
  unknown: string;
}
export interface Content {
  faq: FAQ;
  imprintAndPrivacy: {
    title: string;
    description: string;
    attribution: string;
  };
  intro: {
    title: string;
    subline: string;
    description: string[];
    action: string;
  };
  credits: {
    projectOf: string;
    executedBy: string;
    fundedBy: string;
  };
  cookies: {
    disclaimer: string;
    accept: string;
    info: string;
  };
  legend: {
    title: string;
    pumps: string;
    precipitation: string;
    precipitationAreas: string;
    dataPoints: string;
    treeLayer: string;
    ofLastDays: string;
    pumpState: PumpStates;
  };
  sharing: {
    title: string;
    content: string;
  };
  //pls do not delete the following eventNote section to facilitate process of enabling/disabling future news & notes
  //if event announcemnt is needed just de-comment this section and fill in the announcement text below
  eventNote?: {
    title: string;
  };
  whatsNew?: {
    title: string;
    description: string[];
  };
  loading: {
    snippets: string[];
  };
  sidebar: {
    title: string;
    locationSearchTitle: string;
    dataViewTitle: string;
    dataViewDescription: string;
    precipitation: string;
    adopted: string;
    lastWatered: string;
    waterNeedsTitle: string;
    waterNeedsDescription: string;
    treeAgeTitle: string;
    treeAgeDescription: string;
    about: Item[];
    waterNeeds: Item[];
    treetypes: TreeType[];
  };
  auth: {
    signinTitle: string;
    email: string;
    username: string;
    password: string;
    signinAction: string;
    noAccountHint: string;
    registerLink: string;
    forgotPasswordHint: string;
    forgotPasswordLink: string;
  };
  collaborate: {
    tiles: CollaborationItem[];
  };
  sales: {
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonLink: string;
  };
}

export enum Language {
  de = 'de',
  en = 'en',
}

export interface LocalizedContent {
  de: Content;
  en: Content;
}
