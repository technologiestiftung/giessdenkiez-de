import React, { cloneElement, Children } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import Actions from '../../../state/Actions';
import store from '../../../state/Store';
import { connect } from 'unistore/react';

// import history from '../../../history';

import OverlayTitle from '../OverlayTitle/';
import OverlayEvent from '../OverlayEvent/';
import OverlayIcon from '../OverlayIcon/';
import OverlayBeta from '../OverlayBeta/';
import OverlayDescription from '../OverlayDescription/';
import ButtonRound from '../../../components/ButtonRound/';
import Login from '../../../components/Login/';

import content from '../../../assets/content';

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

const OverlayTop = p => {
  const { children, toggleOverlay } = p;
  const { intro, eventNote, whatsNew } = content;

  const { title, subline, description, disclaimer } = intro;

  const handleClick = () => {
    store.setState({ legendExpanded: true });
    toggleOverlay(false);
  };

  return (
    <StyledTop>
      <Wrapper>
        <OverlayTitle size='xxl' title={title} />
        <OverlayIcon icon='trees' />
        <OverlayBeta />
      </Wrapper>
      <OverlayTitle size='xxl' title={subline} />
      {isMobile && <OverlayTitle size='medium' title={disclaimer} />}
      {/* the beow is here for local testing */}
      {/* {true && <OverlayTitle size='medium' content={disclaimer} />} */}
      <OverlayDescription content={description} />
      {Children.map(children, childElement => {
        return cloneElement(childElement, {});
      })}
      <StyledWrapper>
        <ButtonRound width='fit-content' toggle={handleClick} type='primary'>
          Los geht&apos;s
        </ButtonRound>
        <Login width='fit-content' noLogout={true} />
      </StyledWrapper>
      {(eventNote !== undefined || whatsNew !== undefined) && (
        <OverlayTitle size='xl' title={'News & Updates'} />
      )}

      {eventNote && <OverlayEvent size='Ll' title={eventNote.title} />}
      {whatsNew && <OverlayDescription content={whatsNew.description} />}
    </StyledTop>
  );
};

export default connect(
  state => ({
    user: state.user,
  }),
  Actions
)(OverlayTop);
