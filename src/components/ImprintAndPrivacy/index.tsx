import React, { FC } from 'react';

import SmallParagraph from '../SmallParagraph';
import content from '../../assets/content';
import styled from 'styled-components';

const ImprintAndPrivacySpan = styled(SmallParagraph)`
  text-align: center;
  display: block;
`;

export const ImprintAndPrivacy: FC = () => (
  <ImprintAndPrivacySpan>
    {content.imprintAndPrivacy.description}
  </ImprintAndPrivacySpan>
);
