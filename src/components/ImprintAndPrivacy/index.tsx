import React, { FC } from 'react';

import SmallParagraph from '../SmallParagraph';
import content from '../../assets/content';
import styled from 'styled-components';

const ImprintAndPrivacySpan = styled(SmallParagraph)`
  display: block;
`;

export const ImprintAndPrivacy: FC = () => (
  <ImprintAndPrivacySpan>
    {content.imprintAndPrivacy.description}
  </ImprintAndPrivacySpan>
);

export const MapAttributionImprintAndPrivacy: FC = () => (
  <ImprintAndPrivacySpan>
    {[
      content.imprintAndPrivacy.attribution,
      content.imprintAndPrivacy.description,
    ].join(' – ')}
  </ImprintAndPrivacySpan>
);
