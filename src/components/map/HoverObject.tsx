import React from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';
import CardWrapper from './../Card/CardWrapper';
import CardHeadline from './../Card/CardHeadline';
import CardProperty from './../Card/CardProperty';

export interface HoverObjectProps {
  address: string;
  status: string;
  check_date: string;
  style: string;
  coordinates: [number, number];
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
  address,
  check_date,
  status,
  style,
  coordinates,
}) => {
  const [longitude, latitude] = coordinates;

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeButton={false}
      closeOnClick={false}
      sortByDepth={true}
    >
      <ModifiedCardWrapper>
        <ModifiedCardHeadline>Öffentliche Straßenpumpe</ModifiedCardHeadline>
        <StyledLocation>{address}</StyledLocation>
        <CardProperty name='Status' value={status} />
        <CardProperty name='Letzter Check' value={check_date} />
        <CardProperty name='Pumpentyp' value={style} />
      </ModifiedCardWrapper>
    </Popup>
  );
};
