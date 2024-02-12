import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import OverlayTitle from '../OverlayTitle/';
import Icon from '../../Icons';
import OverlayDescription from '../OverlayDescription/';
import ButtonRound from '../../ButtonRound';
import Credits from '../../Credits';

import { useActions, useStoreState } from '../../../state/unistore-hooks';
import OverlayClose from '../OverlayClose';
import OverlayTiles from '../OverlayTiles';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

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
  padding: 20px 0 0 0;
  grid-area: intro;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    overflow-y: initial;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  padding: 20px 40px 0px 40px;
  cursor: pointer;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 32px;
  flex-direction: row;
  position: relative;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
    align-items: start;
  }
`;

const CreditsContainer = styled.div`
  position: relative;
  margin-top: 20px;
  align-self: flex-end;
  width: 60%;
  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    width: 100%;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: -40px;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0) 100%
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
  const { intro, collaborate, whatsNew } = useLocalizedContent();
  const { title, subline, description, action } = intro;
  const language = useStoreState('language');
  const { setLanguage } = useActions();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
  }, [closeOverlay]);

  return (
    <StyledTop>
      <Logo>
        <OverlayTitle size='xxl' title={title} />
        <Icon iconType='trees' />

        {/*
          TODO: Uncomment as soon as all translations are reviewed and ready
         <Switch
          firstOption={Language.de}
          secondOption={Language.en}
          selectedOption={language}
          onOptionSelect={option => {
            setLocalStorageLanguage(option as Language);
            setLanguage(option as Language);
          }}
        ></Switch> */}
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
            type='cta'
          >
            {action}
          </ButtonRound>
        </StyledButtonWrapper>

        <CreditsContainer>
          <Credits />
        </CreditsContainer>
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
