import React, { FC } from 'react';
import styled from 'styled-components';
import { GeolocateControl, NavigationControl } from 'react-map-gl';

interface mapControlsProps {
  onViewStateChange: (e: unknown) => void;
}

interface StyledControlWrapper {
  isNavOpen?: boolean;
}

const ControlWrapper = styled.div<StyledControlWrapper>`
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props =>
      props.isNavOpen ? 'translate3d(350px, 0, 0)' : 'none'};
  }
`;

const mapControls: FC<mapControlsProps> = ({ onViewStateChange }) => {
  return (
    <ControlWrapper /*TODO:*/ isNavOpen={false}>
      <GeolocateControl
        style={{ position: 'static' }}
        positionOptions={{ enableHighAccuracy: true }}
        // TODO:
        // trackUserLocation={isMobile ? true : false}
        showUserLocation={true}
      />
      <NavigationControl
        style={{ position: 'static' }}
        showCompass={false}
        onViewStateChange={onViewStateChange}
      />
    </ControlWrapper>
  );
};

export default mapControls;
