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
  toggleOverlay: (state: any, payload?: any) => { overlay: any };
}> = ({ toggleOverlay }) => {
  // const { toggleOverlay } = p;
  // const { toggleOverlay } = useActions(Actions);
  const handleClick = (_evt: React.ChangeEvent<any>) => {
    toggleOverlay(false);
  };

  return (
    <StyledRoundButton
      onClick={(event: React.ChangeEvent<any>) => handleClick(event)}
      aria-label='Leiste schließen'
      title='Leiste schließen'
    >
      <CloseIcon />
    </StyledRoundButton>
  );
};

export default OverlayClose;
