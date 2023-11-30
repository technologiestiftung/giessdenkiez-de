export const theme = {
  colorPrimary: '#37DE8A',
  colorAlarm: '#FF8585',
  colorPrimaryHover: '#B5F2D0',
  colorPrimaryVeryLight: '#F7FFFA',
  colorPrimaryDark: '#2E7D5F',
  colorGreyVeryLight: '#F3F3F4',
  colorGreyLight: '#E6E6E6',
  colorTextDark: '#2c303b',
  colorTextLight: 'rgb(94, 101, 115);',
  colorTextMedium: '#D9D9D9',
  colorLightGrey: '#F9F9F9',
  colorWhite: '#FFFFFF',

  boxShadow: `0 2px 40px 0 rgba(30,55,145,0.15)`,

  spacingS: '10px',
  spacingM: '20px',

  borderRadius: '4px',
  borderRadiusS: '6px',
  borderRadiusM: '12px',

  sidebarWidth: '300px',
  sidebarTileWidth: '260px',

  screenWidthM: '1050px',
  screenWidthS: '600px',

  colorLight: '#777777',

  lineHeightHeadline: '125%',
  lineHeightBody: '150%',

  fontFamily: 'IBM Plex Sans',

  fontSizeXxl: '1.5rem',
  fontSizeXl: '1.25rem',
  fontSizeLl: '1rem',
  fontSizeL: '.8rem',
  fontSizeM: '.8rem',
  fontSizeS: '.7rem',

  timeS: '.125s',
  timeM: '.25s',
  timeL: '.5s',

  screens: {
    mobile: '440px',
    tablet: '767px',
    laptop: '1024px',
    desktop: '1440px',
  },

  transition: 'all .125s ease-in-out',
};

export type ThemeType = typeof theme;

export const colorByState = (state: number): string => {
  if (state < 15) {
    return theme.colorPrimary;
  } else {
    return theme.colorAlarm;
  }
};
