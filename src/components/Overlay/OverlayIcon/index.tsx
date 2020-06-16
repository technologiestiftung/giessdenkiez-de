import React from 'react';
import styled from 'styled-components';

const iconWater = '/images/icon-water.svg';
const iconInfo = '/images/icon-info.svg';
const iconSubscribe = '/images/icon-subscribe.svg';
const iconZoom = '/images/icon-zoom.svg';
const iconTrees = '/images/icon-trees.svg';

const IconWrapper = styled.div`
  height: auto;
  transform: translateY(-5px);
  min-width: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    justify-content: flex-start;
    align-items: flex-end;
    height: 70px;
  }
`;

const StyledIcon = styled.img`
  width: 45px;
  height: 55px;
`;

const OverlayIcon = p => {
  const { icon } = p;

  const geticon = type => {
    switch (type) {
      case 'water':
        return iconWater;
      case 'info':
        return iconInfo;
      case 'zoom':
        return iconZoom;
      case 'subscribe':
        return iconSubscribe;
      case 'trees':
        return iconTrees;
      default:
        break;
    }
  };

  return (
    <IconWrapper>
      <StyledIcon src={geticon(icon)} />
    </IconWrapper>
  );
};

export default OverlayIcon;
