import React, { FC } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import RoundButton from '../../../components/RoundButton';

const StyledRoundButton = styled(RoundButton)`
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
`;

const OverlayClose: FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <StyledRoundButton
    onClick={onClick}
    aria-label='Leiste schließen'
    title='Leiste schließen'
  >
    <CloseIcon />
  </StyledRoundButton>
);

export default OverlayClose;
