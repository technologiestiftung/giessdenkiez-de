import React from 'react';
import styled from 'styled-components';

const logoCitylab = '/images/citylab-logo.svg';
const logoTSB = '/images/tsb-logo-coloured.svg';
const logoBerlin = '/images/berlin.svg';

const StyledCreditsContainer = styled.div`
  width: 150px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;

  span {
    margin-top: 5px;
    margin-bottom: 15px;
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
      <a
        className='citylab'
        href='https://citylab-berlin.org'
        rel='noopener noreferrer'
        target='_blank'
      >
        <img src={logoCitylab} alt='Logo Citylab' />
      </a>
      <span>Ein Projekt der</span>
      <a
        className='tsb'
        href='https://technologiestiftung-berlin.de'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={logoTSB} alt='Logo Technologiestiftung Berlin' />
      </a>
      <FoerderlogoContainer>
        <span>Gefördert durch</span>
        <img className='berlin' src={logoBerlin} alt='Logo Berlin' />
      </FoerderlogoContainer>
    </StyledCreditsContainer>
  );
};

export default Credits;
