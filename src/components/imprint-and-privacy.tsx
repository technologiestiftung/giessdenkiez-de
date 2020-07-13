import React from 'react';
import styled from 'styled-components';

import CardParagraph from './Card/CardParagraph';
import content from '../assets/content';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-family: 'IBM Plex Sans';
  font-size: 0.8rem;
  opacity: 1;
  a {
    color: ${p => p.theme.colorTextDark};
    &:hover {
      opacity: 0.66;
    }
  }
`;
const StyledSpan = styled.span`
  opacity: 1;
  a {
    color: ${p => p.theme.colorTextDark};
    &:hover {
      opacity: 0.66;
    }
  }
`;

export const ImprintAndPrivacyCard = () => {
  return (

    <CardParagraph>
      <StyledSpan
        dangerouslySetInnerHTML={{
          __html: content.imprintAndPrivacy.description,
        }}
      />
    </CardParagraph>
  );
};

export const ImprintAndPrivacyContainer = () => {
  return (
    <StyledDiv
      dangerouslySetInnerHTML={{
        __html: content.imprintAndPrivacy.description,
      }}
    >
    </StyledDiv>
  );
};
