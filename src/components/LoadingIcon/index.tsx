import React, { FC } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import content from '../../assets/content';

const iconTrees = '/images/icon-trees.svg';

const IconContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 200px;
`;

const StyledLoadingIcon = styled.img`
  width: 45px;
  height: 55px;
  margin-bottom: 16px;
  transition: transform 1000ms ease-out;

  @keyframes pulse {
    0% {
      transform: rotate(0) scale(0.95);
      opacity: 0.1;
    }
    50% {
      transform: rotate(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: rotate(0) scale(0.95);
      opacity: 0.1;
    }
  }

  animation: ${({ hasError }: { hasError?: boolean }) =>
    hasError ? 'none' : 'pulse 1.5s infinite ease-in-out'};
`;

const StyledLabel = styled.div`
  font-size: ${p => p.theme.fontSizeM};
  opacity: 0.66;
  padding-bottom: 10px;
  text-align: center;
`;

export const SidebarLoadingContainer = styled.div`
  /* 100vh - Sidebar outer margin - Sidebar title size - Sidebar bottom padding - Height of impressum link  */
  min-height: calc(100vh - 48px - 57px - 24px - 19px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingIcon: FC<{ text?: string; hasError?: boolean }> = ({
  text,
  hasError,
}) => {
  const { intro } = content;
  const { disclaimer } = intro;
  return (
    <IconContainer>
      <StyledLoadingIcon src={iconTrees} hasError={hasError} />
      {text && <StyledLabel>{text}</StyledLabel>}
      {isMobile && <StyledLabel>{disclaimer}</StyledLabel>}
    </IconContainer>
  );
};

export default LoadingIcon;
