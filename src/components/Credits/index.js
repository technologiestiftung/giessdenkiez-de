import React from 'react';
import styled from 'styled-components';

import logoCitylab from '!file-loader!../../assets/citylab-logo.svg';
import logoTSB from '!file-loader!../../assets/tsb-logo-coloured.svg';

const StyledCreditsContainer = styled.div`
  width: 150px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;

  span {
    margin-bottom: 5px;
    width: fit-content;
    font-size: ${p => p.theme.fontSizeL}
  }

  a.tsb {
    width: fit-content;
    img {
      width: 110px;
    }
  }

  a.citylab {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }
`;

const Credits = p => {
  return (
    <StyledCreditsContainer>
      <span>Ein Projekt des</span>
      <a className="citylab" href="https://citylab-berlin.org" target="_blank">
        <img src={logoCitylab} />
      </a>
      <a className="tsb" href="https://technologiestiftung-berlin.de" target="_blank">
        <img src={logoTSB} />
      </a>
    </StyledCreditsContainer>
  )
}

export default Credits;