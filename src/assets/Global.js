import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${styledNormalize}

  a.mapboxgl-ctrl-logo {
    display: none !important;
  }

  .mapbox-improve-map {
      display: none;
  }

  .mapboxgl-ctrl {
    background: none;
    border-radius: none;
  }

  .mapboxgl-ctrl-group {
    background: none !important;
    display: flex;
    flex-direction: column;
    border-radius: 0px !important;
    
    button {
      background: black;
      border: 100%;

      span {
        background-image: none;
      }
    }
  }
`;