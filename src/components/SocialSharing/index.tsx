import React from 'react';
import styled from 'styled-components';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  span {
    font-size: ${p => p.theme.fontSizeL};
  }
`;

const ButtonsContainer = styled.div`
  margin-left: 10px;

  > *:not(:first-child) {
    margin-left: 5px;
  }
`;

const SocialSharing = () => {
  return (
    <StyledContainer>
      <span>Teilen:</span>
      <ButtonsContainer>
        <FacebookShareButton url="https://www.giessdenkiez.de/">
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <TwitterShareButton url="https://www.giessdenkiez.de/">
          <TwitterIcon size={36} round />
        </TwitterShareButton>
      </ButtonsContainer>
    </StyledContainer>
  );
};

export default SocialSharing;
