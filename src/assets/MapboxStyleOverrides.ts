import { css } from 'styled-components';

export const MapboxStyleOverrides = css`
  .mapboxgl-ctrl-attrib {
    display: none;
  }

  a.mapboxgl-ctrl-logo {
    display: none !important;
  }

  .mapbox-improve-map {
    display: none;
  }

  .mapboxgl-user-location-dot {
    display: none;
  }

  .mapboxgl-ctrl-group {
    background-color: transparent !important;
    box-shadow: none !important;
    button.mapboxgl-ctrl-compass {
      display: none;
    }

    button {
      margin-top: 10px !important;
      width: 40px !important;
      border-radius: 100px !important;
      box-shadow: 0 2px 40px 0 rgba(30, 55, 145, 0.15) !important;
      height: 40px !important;
      background: white !important;
    }
  }

  #view-default-view > div {
    z-index: unset !important;
  }

  #deckgl-overlay {
    z-index: 1;
  }
`;
