import React, { FC } from 'react';
import styled from 'styled-components';

import OverlayTitle from '../OverlayTitle/';
import Icon from '../../Icons';
import OverlayDescription from '../OverlayDescription/';
import ButtonRound from '../../ButtonRound';

import content from '../../../assets/content';
import { useActions } from '../../../state/unistore-hooks';
import OverlayClose from '../OverlayClose';
import OverlayTiles from '../OverlayTiles';

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
  overflow-y: auto;
  grid-area: intro;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    overflow-y: initial;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  margin: 60px 40px 0px 24px;
  cursor: pointer;
  justify-content: flex-end;
  align-items: start;
  gap: 16px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
  }
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
          <ButtonRound
            width='fit-content'
            onClick={() => {
              closeOverlay();
            }}
            type='primary'
          >
            Los geht&apos;s
          </ButtonRound>
        </StyledButtonWrapper>
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
