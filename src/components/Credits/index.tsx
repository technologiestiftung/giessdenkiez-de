import React, { FC } from 'react';
import styled from 'styled-components';

const logoCitylab = '/images/citylab-logo.svg';
const logoCodeForLeipzig = '/images/cfg-leipzig-logo.svg';
const logoWirImQuartier = '/images/wiq-logo.png';
const logoStiftungEckenWecken = '/images/sew-logo.png';
const logoBUNDLeipzig = '/images/bund-leipzig.png';
const logoLeipzigASG = '/images/leipzig-asg.png';

const CreditsContainer = styled.div`
  width: 300px;
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

  span {
    margin-top: 5px;
    margin-bottom: 15px;
    width: fit-content;
    font-size: ${p => p.theme.fontSizeL};
  }

  span.project {
    padding-left: 35px;
  }
`;

const CityLABLogo = styled.img`
  width: 220px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const ASGLogo = styled.img`
  height: 60px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const BUNDLogo = styled.img`
  height: 80px;
  margin: 10px 0 5px 0;
  padding-left: 20px;
`;

const WIQLogo = styled.img`
  height: 60px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const SEWLogo = styled.img`
  height: 80px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const CFGLogo = styled.img`
  height: 80px;
  margin: 0px 0 5px 0;
`;

const Credits: FC = () => {
  return (
    <CreditsContainer>
      <span className="project">Ein Projekt von:</span>
      <a
        className='cfg'
        href='https://codefor.de/leipzig'
        target='_blank'
        rel='noopener noreferrer'
      >
        <CFGLogo src={logoCodeForLeipzig} alt='Logo Code for Leipzig' />
      </a>
      <a
        className='asg'
        href='https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/behoerden-und-dienstleistungen/dienststelle/amt-fuer-stadtgruen-und-gewaesser-67/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <ASGLogo src={logoLeipzigASG} alt='Logo Leipzig Amt für Stadtgrün und Gewässer' />
      </a>
      <a
        className='sew'
        href='https://stiftung-ecken-wecken.de'
        target='_blank'
        rel='noopener noreferrer'
      >
        <SEWLogo src={logoStiftungEckenWecken} alt='Logo Stiftung Ecken Wecken' />
      </a>
      <a
        className='wiq'
        href='https://stiftung-ecken-wecken.de/WIQ'
        rel='noopener noreferrer'
        target='_blank'
      >
        <WIQLogo src={logoWirImQuartier} alt='Logo Wir im Quartier' />
      </a>
      <a
        className='bund'
        href='https://www.bund-leipzig.de/'
        rel='noopener noreferrer'
        target='_blank'
      >
        <BUNDLogo src={logoBUNDLeipzig} alt='Logo BUND Leipzig' />
      </a>
      <span className="project">Unterstützt durch:</span>
      <a
        className='citylab'
        href='https://www.citylab-berlin.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        <CityLABLogo src={logoCitylab} alt='Logo CityLab Berlin' />
      </a>
    </CreditsContainer>
  );
};

export default Credits;
