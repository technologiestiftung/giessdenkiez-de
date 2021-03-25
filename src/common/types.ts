import { User } from '@auth0/auth0-spa-js';
import { GeoJsonLayer, GeoJsonLayerProps } from '@deck.gl/layers';
import { HoveredPump, ViewState } from './interfaces';

export type ContextProps = {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  popupOpen: any;
  loginWithPopup: any;
  handleRedirectCallback: any;
  getIdTokenClaims: any;
  loginWithRedirect: any;
  getTokenSilently: () => Promise<string>;
  getTokenWithPopup: any;
  logout: any;
};

export type RadolanDays = number[];

export type ButtonWaterGroup = 'visible' | 'watered' | 'watering';

//NewMap
export type OnViewStateChange = (viewState: ViewState) => void;

export type SetLayer = (layer: string) => void;

export type Layer<FeatureType> = GeoJsonLayer<
  FeatureType,
  GeoJsonLayerProps<FeatureType>
>;
export type SetHoveredPump = (info: HoveredPump | null) => void;

export type SetSelectedTree = (id: string) => void;

export type AgeRange = [number, number];

