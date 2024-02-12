import React, { FC } from 'react';

import SmallParagraph from '../SmallParagraph';
import styled from 'styled-components';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

const ImprintAndPrivacySpan = styled(SmallParagraph)`
  display: block;
`;

export const ImprintAndPrivacy: FC = () => (
  <ImprintAndPrivacySpan>
    {useLocalizedContent().imprintAndPrivacy.description}
  </ImprintAndPrivacySpan>
);

export const MapAttributionImprintAndPrivacy: FC = () => (
  <ImprintAndPrivacySpan>
    {[
      useLocalizedContent().imprintAndPrivacy.attribution,
      useLocalizedContent().imprintAndPrivacy.description,
    ].join(' – ')}
  </ImprintAndPrivacySpan>
);
