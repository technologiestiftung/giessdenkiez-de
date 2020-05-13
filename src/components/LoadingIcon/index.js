import React from 'react';
import styled from 'styled-components';

const iconTrees = '/images/icon-trees.svg';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: auto;
  width: 180px;
`;

const StyledIcon = styled.img`
  width: 45px;
  height: 55px;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.1;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.1;
    }
  }

  animation: pulse 1.5s infinite ease-in-out;
`;

const StyledLabel = styled.span`
  font-size: ${p => p.theme.fontSizeM};
  opacity: 0.66;
`;

const LoadingIcon = p => {
  const { text } = p;
  return (
    <IconContainer>
      <StyledIcon src={iconTrees} />
      {text && <StyledLabel>{text}</StyledLabel>}
    </IconContainer>
  );
};

export default LoadingIcon;
