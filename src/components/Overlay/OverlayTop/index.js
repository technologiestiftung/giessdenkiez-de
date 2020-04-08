import React, { cloneElement, Children } from "react";
import styled from "styled-components";

import Actions from '../../../state/Actions';
import { connect } from 'unistore/react';

import history from '../../../../history';

import OverlayTitle from "../OverlayTitle/";
import OverlayDescription from "../OverlayDescription/";
import ButtonRound from "../../../components/ButtonRound/";
import Login from "../../../components/Login/";

import content from "../../../assets/content";

const StyledTop = styled.div`
  height: 500px;
  height: auto;
  padding: 40px 0;
`;

const StyledWrapper = styled.div`
  display: flex;
  margin: 20px 40px 0 40px;
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

const OverlayTop = (p) => {
  const { children, toggleOverlay } = p;
  const { intro } = content;
  const { title, subline, description } = intro;

  const handleClick = () => {
    history.push('/search');
    toggleOverlay(false);
  }

  return (
    <StyledTop>
      <OverlayTitle content={title} />
      <OverlayTitle content={subline} />
      <OverlayDescription content={description} />
      {Children.map(children, (childElement) => {
        return cloneElement(childElement, {});
      })}
      <StyledWrapper>
        <ButtonRound toggle={handleClick} type="primary">Jetzt loslegen</ButtonRound>
        <Login />
      </StyledWrapper>
    </StyledTop>
  );
};

export default connect(state => ({
}), Actions)(OverlayTop);
