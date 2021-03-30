import React, { FC } from 'react';

import SmallParagraph from '../SmallParagraph';
import content from '../../assets/content';
import styled from 'styled-components';

const ImprintAndPrivacySpan = styled.span`
  text-align: center;
  display: block;
`;

export const ImprintAndPrivacy: FC = () => (
  <SmallParagraph>
    <ImprintAndPrivacySpan
      dangerouslySetInnerHTML={{
        __html: content.imprintAndPrivacy.description,
      }}
    />
  </SmallParagraph>
);
