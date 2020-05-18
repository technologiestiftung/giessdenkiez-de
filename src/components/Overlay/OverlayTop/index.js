import React, { cloneElement, Children } from 'react';
import styled from 'styled-components';

import Actions from '../../../state/Actions';
import Store from '../../../state/Store';
import { connect } from 'unistore/react';

// import history from '../../../history';

import OverlayTitle from '../OverlayTitle/';
import OverlayIcon from '../OverlayIcon/';
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
  margin: 20px 40px 0 40px;
  cursor: pointer;
  >* {
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
  const { intro } = content;
  const { title, subline, description } = intro;

  const handleClick = () => {
    Store.setState({ legendExpanded: true });
    toggleOverlay(false);
  };

  return (
    <StyledTop>
      <Wrapper>
        <OverlayTitle size="large" content={title} />
        <OverlayIcon icon="trees" />
      </Wrapper>
      <OverlayTitle size="large" content={subline} />
      <OverlayDescription content={description} />
      {Children.map(children, childElement => {
        return cloneElement(childElement, {});
      })}
      <StyledWrapper>
        <ButtonRound width="fit-content" toggle={handleClick} type="primary">
          Los geht&apos;s
        </ButtonRound>
        <Login width="fit-content" noLogout={true} />
      </StyledWrapper>
    </StyledTop>
  );
};

export default connect(
  state => ({
    user: state.user,
  }),
  Actions
)(OverlayTop);
