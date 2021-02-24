import React from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';
import CardWrapper from './../Card/CardWrapper';
import CardHeadline from './../Card/CardHeadline';
import CardProperty from './../Card/CardProperty';

export interface HoverObjectProps {
  message_addr: string;
  message_status: string;
  message_date: string;
  message_style: string;
  coordinates: number[];
}

// TODO: check why this is exported and where it's used
export interface StyledProps {
  pointer: number[];
  width: number;
  height: number;
}

const StyledLocation = styled.span`
  padding-bottom: ${({ theme }) => theme.spacingS};
  margin-bottom: ${({ theme }) => theme.spacingS};
  color: ${({ theme }) => theme.colorTextLight};
  border-bottom: 1px solid ${({ theme }) => theme.colorGreyLight};
`;

const ModifiedCardHeadline = styled(CardHeadline)`
  margin-bottom: 2px;
`;

const ModifiedCardWrapper = styled(CardWrapper)`
  width: 340px;
  padding ${({ theme }) => theme.spacingS};
  margin-bottom: 0;
`;

export const HoverObject: React.FC<HoverObjectProps> = ({
  message_addr,
  message_status,
  message_date,
  message_style,
  coordinates,
}) => {
  const [longitude, latitude] = coordinates;

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeButton={false}
      closeOnClick={false}
    >
      <ModifiedCardWrapper>
        <ModifiedCardHeadline>Öffentliche Straßenpumpe</ModifiedCardHeadline>
        <StyledLocation>{message_addr}</StyledLocation>
        <CardProperty name='Status' value={message_status} />
        <CardProperty name='Letzter Check' value={message_date} />
        <CardProperty name='Pumpentyp' value={message_style} />
      </ModifiedCardWrapper>
    </Popup>
  );
};
