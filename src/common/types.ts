export type ContextProps = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: any;
  loginWithPopup: any;
  handleRedirectCallback: any;
  getIdTokenClaims: any;
  loginWithRedirect: any;
  getTokenSilently: any;
  getTokenWithPopup: any;
  logout: any;
};

export type DailyWaterAmountsType = {
  timestamp: Date;
  rainValue: number;
  wateringValue: number;
};

export type RadolanDays = number[];

export type WateredDayType = {
  tree_id: string;
  time: string;
  uuid: string;
  amount: string;
  timestamp: string;
  username: string;
};

export type TreeLastWateredType = WateredDayType[];

export type SelectedTreeType = {
  radolan_days: RadolanDays;
  radolan_sum: number;
  lat: string;
  lng: string;
  id: string;
}
