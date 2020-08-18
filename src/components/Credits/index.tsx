import React, { FC } from 'react';
import styled from 'styled-components';

const logoCitylab = '/images/citylab-logo.svg';
const logoCodeForLeipzig = '/images/cfg-leipzig-logo.svg';
const logoWirImQuartier = '/images/wiq-logo.png';
const logoStiftungEckenWecken = '/images/sew-logo.png';

const CreditsContainer = styled.div`
  width: 150px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;
  position: absolute;
  top: 12px;
  right: 12px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }
`;

const Label = styled.span`
  margin-top: 5px;
  margin-bottom: 15px;
  width: fit-content;
  font-size: ${p => p.theme.fontSizeL};
`;

<<<<<<< HEAD
const TSBLink = styled.a`
  width: fit-content;
`;

const TSBLogo = styled.img`
  width: 110px;
`;

const CityLABLogo = styled.img`
  width: 150px;
  margin: 10px 0 5px 0;
`;

const FoerderlogoContainer = styled.div`
  margin-top: 10px;
`;

const BerlinLogo = styled.img`
  width: 120px;
  margin: 10px 0 5px 0;
=======
  a.citylab {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }

  a.wiq {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }

  a.sew {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }

  a.cfg {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }
>>>>>>> 5fe2135... exchange logos
`;

const Credits: FC = () => {
  return (
    <CreditsContainer>
      <a
<<<<<<< HEAD
        href='https://citylab-berlin.org'
        rel='noopener noreferrer'
        target='_blank'
      >
        <CityLABLogo src={logoCitylab} alt='Logo Citylab' />
      </a>
      <Label>Ein Projekt der</Label>
      <TSBLink
        href='https://technologiestiftung-berlin.de'
        target='_blank'
        rel='noopener noreferrer'
      >
        <TSBLogo src={logoTSB} alt='Logo Technologiestiftung Berlin' />
      </TSBLink>
      <FoerderlogoContainer>
        <Label>Gefördert durch</Label>
        <BerlinLogo src={logoBerlin} alt='Logo Berlin' />
      </FoerderlogoContainer>
    </CreditsContainer>
=======
        className='wiq'
        href='https://stiftung-ecken-wecken.de/WIQ'
        rel='noopener noreferrer'
        target='_blank'
      >
        <img src={logoWirImQuartier} alt='Logo Wir im Quartier' />
      </a>
      <span>Ein Projekt der</span>
      <a
        className='sew'
        href='https://stiftung-ecken-wecken.de'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={logoStiftungEckenWecken} alt='Logo Stiftung Ecken Wecken' />
      </a>
      <span>Migriert für Leipzig</span>
      <a
        className='cfg'
        href='https://codefor.de/leipzig'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={logoCodeForLeipzig} alt='Logo Code for Leipzig' />
      </a>
      <span>Unterstützt von</span>
      <a
        className='citylab'
        href='https://www.citylab-berlin.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={logoCitylab} alt='Logo CityLab Berlin' />
      </a>
    </StyledCreditsContainer>
>>>>>>> 5fe2135... exchange logos
  );
};

export default Credits;
