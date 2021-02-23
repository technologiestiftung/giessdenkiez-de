import React from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';

export interface HoverObjectProps {
  message_addr: string;
  message_status: string;
  message_date: string;
  message_style: string;
  coordinates: number[];
}
export interface StyledProps {
  pointer: number[];
  width: number;
  height: number;
}

const StyledSpan = styled.span`
  padding: 1rem 1rem 0.2rem 1rem;
  margin: 2rem auto;
  color: ${props => props.theme.colorTextLight};
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
      offsetTop={-20}
    >
      <div>
        <StyledSpan>
          <b>Öffentliche Straßenpumpe</b>
        </StyledSpan>
        <br></br>
        <StyledSpan>
          <b>Status:</b> {message_status}
        </StyledSpan>
        <br></br>
        <StyledSpan>
          <b>Standort:</b> {message_addr}
        </StyledSpan>
        <br></br>
        <StyledSpan>
          <b>Pumpentyp:</b> {message_style}
        </StyledSpan>
        <br></br>
        <StyledSpan>
          <b>Letzter Status-Check:</b> {message_date}
        </StyledSpan>
      </div>
    </Popup>
  );
};
