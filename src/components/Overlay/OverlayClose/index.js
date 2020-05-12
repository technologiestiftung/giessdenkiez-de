import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import Actions from '../../../state/Actions';
import { connect } from 'unistore/react';

import RoundButton from '../../../components/RoundButton';

const StyledRoundButton = styled(RoundButton)`
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
`;

const OverlayClose = p => {
  const { toggleOverlay } = p;

  const handleClick = evt => {
    toggleOverlay(false);
  };

  return (
    <StyledRoundButton
      onClick={() => handleClick()}
      aria-label="Leiste schließen"
      title="Leiste schließen"
    >
      <CloseIcon />
    </StyledRoundButton>
  );
};

// export default OverlayClose;

export default connect(_state => ({}), Actions)(OverlayClose);
