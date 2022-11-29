// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorPrimary: string;
    colorAlarm: string;
    colorPrimaryHover: string;
    colorGreyVeryLight: string;
    colorGreyLight: string;
    colorTextDark: string;
    colorTextLight: string;
    colorTextMedium: string;
    colorLightGrey: string;
    colorWhite: string;

    boxShadow: string;

    spacingS: string;
    spacingM: string;

    borderRadius: string;
    borderRadiusS: string;
    borderRadiusM: string;

    sidebarWidth: string;
    sidebarTileWidth: string;

    screenWidthM: string;
    screenWidthS: string;

    colorLight: string;

    lineHeightHeadline: string;
    lineHeightBody: string;

    fontFamily: string;

    fontSizeXxl: string;
    fontSizeXl: string;
    fontSizeLl: string;
    fontSizeL: string;
    fontSizeM: string;
    fontSizeS: string;

    timeS: string;
    timeM: string;
    timeL: string;

    screens: {
      mobile: string;
      tablet: string;
      laptop: string;
      desktop: string;
    };

    transition: string;
  }
}
