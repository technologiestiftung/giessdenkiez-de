import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import RoundButton from '../../../components/RoundButton';

const StyledRoundButton = styled(RoundButton)`
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
`;

const OverlayClose: React.FC<{
  toggleOverlay: (isToggled: boolean) => void;
}> = ({ toggleOverlay }) => {
  const handleClick = () => {
    toggleOverlay(false);
  };

  return (
    <StyledRoundButton
      onClick={handleClick}
      aria-label='Leiste schließen'
      title='Leiste schließen'
    >
      <CloseIcon />
    </StyledRoundButton>
  );
};

export default OverlayClose;
