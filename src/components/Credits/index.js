import React from 'react';
import styled from 'styled-components';

//TODO: remove file-loader and let webpack handle this
import logoCitylab from '!file-loader!../../assets/citylab-logo.svg';
import logoTSB from '!file-loader!../../assets/tsb-logo-coloured.svg';
import logoBerlin from '!file-loader!../../assets/berlin.svg';

const StyledCreditsContainer = styled.div`
  width: 150px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;

  span {
    margin-bottom: 5px;
    width: fit-content;
    font-size: ${p => p.theme.fontSizeL};
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

const FoerderlogoContainer = styled.div`
  margin-top: 10px;

  img.berlin {
    width: 120px;
    margin: 10px 0 5px 0;
  }
`;

const Credits = p => {
  return (
    <StyledCreditsContainer>
      <span>Ein Projekt des</span>
      <a
        className="citylab"
        href="https://citylab-berlin.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={logoCitylab} alt="Logo Citylab" />
      </a>
      <a
        className="tsb"
        href="https://technologiestiftung-berlin.de"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logoTSB} alt="Logo Technologiestiftung Berlin" />
      </a>
      <FoerderlogoContainer>
        <span>Gefördert durch</span>
        <img className="berlin" src={logoBerlin} alt="Logo Berlin" />
      </FoerderlogoContainer>
    </StyledCreditsContainer>
  );
};

export default Credits;
