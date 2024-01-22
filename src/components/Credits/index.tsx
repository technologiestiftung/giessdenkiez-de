import React, { FC } from 'react';
import styled from 'styled-components';

const logoCitylab =
  'https://logos.citylab-berlin.org/logo-citylab-berlin-outline.svg';
const logoTSB = 'https://logos.citylab-berlin.org/logo-tsb-outline.svg';
const logoBerlin =
  'https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg';

const LogoContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem 0rem 0.5rem 0rem;
  border-top: 1px solid ${(p) => p.theme.colorGreyLight};
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
`;

const LabelLogoGroup = styled.div`
  width: 100%;
`;

const Label = styled.div`
  width: 100%;
  font-size: ${(p) => p.theme.fontSizeL};
  margin-bottom: 0.5rem;
  color: ${(p) => p.theme.colorTextDark};
  opacity: 0.66;
`;

const Logo = styled.img`
  width: 80%;
`;

const Credits: FC = () => {
  return (
    <LogoContainer>
      <LabelLogoGroup>
        <Label>Ein Projekt der</Label>
        <Logo src={logoTSB} alt='Logo Technologiestiftung Berlin' />
      </LabelLogoGroup>
      <LabelLogoGroup>
        <Label>Durchgeführt von</Label>
        <Logo src={logoCitylab} alt='Logo Citylab' />
      </LabelLogoGroup>
      <LabelLogoGroup>
        <Label>Gefördert durch</Label>
        <Logo src={logoBerlin} alt='Logo Berlin' />
      </LabelLogoGroup>
    </LogoContainer>
  );
};

export default Credits;
