import React, { FC } from 'react';
import styled from 'styled-components';

const logoCitylab = '/images/citylab-logo.svg';
const logoTSB = '/images/tsb-logo-coloured.svg';
const logoBerlin = '/images/berlin.svg';

const CreditsContainer = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(2, auto);
  row-gap: 0.8rem;
  column-gap: 2rem;
`;

const Label = styled.span`
  font-size: ${p => p.theme.fontSizeL};
  color: ${p => p.theme.colorTextLight};
  white-space: nowrap;
`;

const TSBLink = styled.a`
  width: fit-content;
`;

const TSBLogo = styled.img`
  height: 30px;
`;

const CityLABLogo = styled.img`
  height: 30px;
`;

const BerlinLogo = styled.img`
  height: 30px;
`;

const Credits: FC = () => {
  return (
    <CreditsContainer>
      <Label>Ein Projekt der</Label>
      <TSBLink
        href='https://technologiestiftung-berlin.de'
        target='_blank'
        rel='noopener noreferrer'
      >
        <TSBLogo src={logoTSB} alt='Logo Technologiestiftung Berlin' />
      </TSBLink>
      <Label>Durchgeführt vom</Label>
      <a
        href='https://citylab-berlin.org'
        rel='noopener noreferrer'
        target='_blank'
      >
        <CityLABLogo src={logoCitylab} alt='Logo Citylab' />
      </a>
      <Label>Gefördert durch</Label>
      <BerlinLogo src={logoBerlin} alt='Logo Berlin' />
    </CreditsContainer>
  );
};

export default Credits;
