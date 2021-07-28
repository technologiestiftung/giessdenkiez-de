import React, { FC } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import OverlayTitle from '../OverlayTitle/';
import Icon from '../../Icons';
import OverlayBeta from '../OverlayBeta/';
import OverlayDescription from '../OverlayDescription/';
import ButtonRound from '../../../components/ButtonRound/';
import Login from '../../../components/Login/';

import content from '../../../assets/content';
import { useActions } from '../../../state/unistore-hooks';
import OverlayClose from '../OverlayClose';

const Wrapper = styled.div`
  display: flex;
  img {
    transform: translate(-35px, -20px);
    @media screen and (max-width: ${p => p.theme.screens.tablet}) {
      transform: translate(-35px, -40px);
    }
  }
`;

const StyledTop = styled.div`
  height: 500px;
  height: auto;
  padding: 40px 0;
`;

const StyledWrapper = styled.div`
  display: flex;
  margin: 20px 40px 20px 40px;
  cursor: pointer;
  div {
    margin-right: 10px;
    @media screen and (max-width: ${p => p.theme.screens.tablet}) {
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
  }
`;

const StyledNewsSection = styled.section`
  background-color: ${({ theme }) => theme.colorPrimaryHover};
  border: 1px solid ${({ theme }) => theme.colorPrimary};
  padding: 30px 0;
  margin: 40px;
`;

const OverlayTop: FC = () => {
  const { closeOverlay } = useActions();
  const { intro, whatsNew } = content;

  const { title, subline, description, disclaimer } = intro;

  return (
    <StyledTop>
      <Wrapper>
        <OverlayTitle size='xxl' title={title} />
        <Icon iconType='trees' />
        <OverlayBeta />
      </Wrapper>
      <OverlayTitle size='xxl' title={subline} />
      {isMobile && <OverlayTitle size='medium' title={disclaimer} />}
      {/* the beow is here for local testing */}
      {/* {true && <OverlayTitle size='medium' content={disclaimer} />} */}
      <OverlayDescription content={description} />
      <OverlayClose onClick={closeOverlay} />
      <StyledWrapper>
        <ButtonRound
          width='fit-content'
          onClick={() => {
            closeOverlay();
          }}
          type='primary'
        >
          Los geht&apos;s
        </ButtonRound>
        <Login width='fit-content' noLogout={true} />
      </StyledWrapper>
      {whatsNew && (
        <StyledNewsSection aria-label='News und Updates'>
          <OverlayTitle size='xl' title={whatsNew.title} />
          <div></div>
          <OverlayDescription content={whatsNew.description} />
        </StyledNewsSection>
      )}
    </StyledTop>
  );
};

export default OverlayTop;
