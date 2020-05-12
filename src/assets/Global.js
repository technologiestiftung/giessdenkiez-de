import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${styledNormalize}

  @keyframes sweep {
    0%    {opacity: 0;}
    0%    {opacity: 0;}
    100%  {opacity: 1;}
  }

  br.large {
    display: none;
    @media screen and (min-width: 768px) {
      display: block;
    }
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
      box-shadow: 0 2px 40px 0 rgba(30,55,145,0.15) !important;
      height: 40px !important;
      background: white !important;
    }
  }

`;
