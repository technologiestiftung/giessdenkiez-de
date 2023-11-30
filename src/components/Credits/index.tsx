import React, { FC } from 'react';
import styled from 'styled-components';

const logoCitylab =
  'https://logos.citylab-berlin.org/logo-citylab-berlin-outline.svg';
const logoTSB =
  'https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg';
const logoBerlin =
  'https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg';

const CreditsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1.5rem;
  column-gap: 2rem;
`;

const LogoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.span`
  font-size: ${p => p.theme.fontSizeM};
  color: ${p => p.theme.colorTextLight};
  white-space: nowrap;
`;

const LogoLink = styled.a`
  width: fit-content;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px white, 0 0 0 6px ${p => p.theme.colorPrimary};
    border-radius: 1px;
  }
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
      <LogoGroup>
        <Label>Ein Projekt der</Label>
        <LogoLink
          href='https://technologiestiftung-berlin.de'
          target='_blank'
          rel='noopener noreferrer'
        >
          <TSBLogo src={logoTSB} alt='Logo Technologiestiftung Berlin' />
        </LogoLink>
      </LogoGroup>
      <LogoGroup>
        <Label>Durchgeführt vom</Label>
        <LogoLink
          href='https://citylab-berlin.org'
          rel='noopener noreferrer'
          target='_blank'
        >
          <CityLABLogo src={logoCitylab} alt='Logo Citylab' />
        </LogoLink>
      </LogoGroup>
      <LogoGroup>
        <Label>Gefördert durch</Label>
        <LogoLink
          href='https://www.berlin.de/rbmskzl/'
          rel='noopener noreferrer'
          target='_blank'
        >
          <BerlinLogo src={logoBerlin} alt='Logo Berlin' />
        </LogoLink>
      </LogoGroup>
    </CreditsContainer>
  );
};

export default Credits;
