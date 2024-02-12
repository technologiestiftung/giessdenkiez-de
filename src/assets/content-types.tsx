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
interface UsernameRestrictions {
  part1: string;
  and: string;
  part2: string;
  part3: string;
}
interface PasswordRestrictions {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
}
interface AuthErrors {
  checkUsername: string;
  checkPassword: string;
  userExistsAlready: string;
  emailCouldNotBeSent: string;
  usernameOrPasswordWrong: string;
  ooops: string;
  checkMailForPasswordReset: string;
  usernameTaken: string;
}
interface Profile {
  logoutAction: string;
  loginAction: string;
  loggedInHint: string;
  title: string;
  progress: string;
  adoptedTrees: string;
  noTreesAdopted: string;
  deleteAccountHint: string;
  deleteAccountAction: string;
  deleteAccountWarning: string;
  timesWatered: string;
  litersWatered: string;
}
interface Account {
  confirm: string;
  title: string;
  username: string;
  registeredMail: string;
  editHint: string;
  editLink: string;
  passwordEditHint: string;
  passwordEditLink: string;
  editTitle: string;
  editSave: string;
  editSaving: string;
  editClose: string;
  editUsernameSuccess: string;
  editUsernameError: string;
  editEmailSuccess: string;
  editPasswordTitle: string;
  oldPasswordTitle: string;
  newPasswordTitle: string;
  repeatNewPasswordTitle: string;
  editPasswordSuccess: string;
}
interface Tree {
  title: string;
  age: string;
  needs: string;
  wateringAmount: string;
  ofLastDays: string;
  waterings: string;
  rain: string;
  litersPerSqm: string;
  years: string;
  adoptedByMe: string;
  adoptedAlsoByOthers: string;
  adoptedOnlyByOthers: string;
  regularlyWateredBy: string;
  lastWaterings: string;
  latestFirst: string;
  needsVerification: string;
  stopAdoption: string;
  stopAdoptionProgress: string;
  adopt: string;
  adoptProgress: string;
}

interface Error {
  title: string;
  contact: string;
  issue: string;
  reload: string;
  backToHome: string;
}

export interface Content {
  error: Error;
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
    publicPump: string;
    lastPumpCheck: string;
    pumpStyle: string;
    updatePumpLink: string;
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
    addressPlaceholder: string;
    participateButton: string;
    loading: string;
    furtherInfo: string;
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
    openSourceNote: string;
    openSourceLink: string;
    openSourceText: string;
    profile: Profile;
    account: Account;
    tree: Tree;
  };
  auth: {
    signinTitle: string;
    signupTitle: string;
    email: string;
    username: string;
    password: string;
    signinAction: string;
    signupAction: string;
    noAccountHint: string;
    alreadyRegisteredHint: string;
    alreadyRegisteredAction: string;
    registerLink: string;
    forgotPasswordHint: string;
    forgotPasswordLink: string;
    resetPassword: string;
    backToLogin: string;
    clickHere: string;
    bored: string;
    profile: string;
    usernameRestrictions: UsernameRestrictions;
    passwordRestrictions: PasswordRestrictions;
    errors: AuthErrors;
    passwordNotSecureEnough: string;
    passwordCouldNotBeChanged: string;
    passwordChangeSuccess: string;
    changePasswordFor: string;
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
