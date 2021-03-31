import React, { FC } from 'react';
import styled from 'styled-components';

const logoCitylab = '/images/citylab-logo.svg';
const logoTSB = '/images/tsb-logo-coloured.svg';
const logoBerlin = '/images/berlin.svg';

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
`;

const Credits: FC = () => {
  return (
    <CreditsContainer>
      <a
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
  );
};

export default Credits;
