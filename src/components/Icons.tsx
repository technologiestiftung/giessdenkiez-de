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
interface StyledIconProps {
  height?: number;
}
const width = 45;
const height = 55;
const ratio = width / height;
const StyledIcon = styled.img<StyledIconProps>`
  width: ${p => (p.height ? p.height * ratio : `${width}`)}px;
  height: ${p => (p.height ? p.height : `${height}`)}px;
`;

const Icon: React.FC<{ iconType: string; height?: number }> = ({
  iconType,
  height,
}) => {
  const geticon = (type: string): string => {
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
        return '';
    }
  };

  return (
    <IconWrapper>
      <StyledIcon src={geticon(iconType)} height={height} />
    </IconWrapper>
  );
};

export default Icon;
