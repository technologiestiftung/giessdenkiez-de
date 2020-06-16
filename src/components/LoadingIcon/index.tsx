import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import content from '../../assets/content';

const iconTrees = '/images/icon-trees.svg';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: centet;
  height: 100%;
  width: 200px;
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

const StyledLabel = styled.div`
  font-size: ${p => p.theme.fontSizeM};
  opacity: 0.66;
  padding-bottom: 10px;
`;

const StyledLabelBottom = styled.div`
  font-size: ${p => p.theme.fontSizeM};
  opacity: 0.66;
  padding-bottom: 10px;
  position: absolute;
  bottom: 15px;
`;
const LoadingIcon = (p: { text: any }) => {
  const { intro, imprintAndPrivacy } = content;
  const { disclaimer } = intro;
  const { text } = p;
  return (
    <IconContainer>
      <StyledIcon src={iconTrees} />
      {text && <StyledLabel>{text}</StyledLabel>}
      {isMobile && <StyledLabel>{disclaimer}</StyledLabel>}
      {
        <StyledLabelBottom
          dangerouslySetInnerHTML={{ __html: imprintAndPrivacy.description }}
        />
      }
    </IconContainer>
  );
};

export default LoadingIcon;
