import React, { FC } from 'react';
import styled from 'styled-components';

import OverlayTitle from '../OverlayTitle/';
import Icon from '../../Icons';
import OverlayDescription from '../OverlayDescription/';
import ButtonRound from '../../ButtonRound';
import Credits from '../../Credits';

import content from '../../../assets/content';
import { useActions } from '../../../state/unistore-hooks';
import OverlayClose from '../OverlayClose';
import OverlayTiles from '../OverlayTiles';
import { SlackButton } from '../../SlackButton';

const { whatsNew } = content;

const StyledNewsSection = styled.section`
  background-color: #f7fffa;
  border: 1px solid ${({ theme }) => theme.colorPrimaryHover};
  padding: 30px 0;
  margin: 40px;
  position: relative;
  @media screen and (max-width: 817px) {
    padding-bottom: 270px;
  }
`;

const Logo = styled.div`
  display: flex;
  margin: 0 40px 20px;
  align-items: end;
  gap: 6px;

  & > div > img {
    translate: 0 6px;
  }

  h2 {
    margin: 0 0 0 0;
  }
`;

const StyledTop = styled.div`
  padding: 20px 0 40px 0;
  grid-area: intro;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    overflow-y: initial;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  padding: 40px 40px 0px 40px;
  margin-top: 40px;
  cursor: pointer;
  justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 32px;
  flex-direction: row-reverse;
  position: relative;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
    align-items: start;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0) 90%
    );
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const OverlayTop: FC = () => {
  const { closeOverlay } = useActions();
  const { intro, collaborate } = content;

  const { title, subline, description } = intro;

  return (
    <StyledTop>
      <Logo>
        <OverlayTitle size='xxl' title={title} />
        <Icon iconType='trees' />
      </Logo>
      <OverlayTitle size='xxl' title={subline} />
      {/* the beow is here for local testing */}
      {/* {true && <OverlayTitle size='medium' content={disclaimer} />} */}
      <OverlayDescription content={description} />
      <OverlayClose onClick={closeOverlay} />

      <OverlayTiles tiles={collaborate.tiles} />
      <StyledWrapper>
        <StyledButtonWrapper>
          <SlackButton />
          <ButtonRound
            width='fit-content'
            onClick={() => {
              closeOverlay();
            }}
            type='cta'
          >
            Los geht&apos;s
          </ButtonRound>
        </StyledButtonWrapper>

        <Credits />
      </StyledWrapper>
      {whatsNew && (
        <StyledNewsSection aria-label='News und Updates'>
          <OverlayTitle size='xl' title={whatsNew.title} />
          <OverlayDescription content={whatsNew.description} />
        </StyledNewsSection>
      )}
    </StyledTop>
  );
};

export default OverlayTop;
