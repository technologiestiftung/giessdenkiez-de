import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const StyledButtonAdopted = styled.div`
  font-size: 12px;
  border: 1px solid ${p => p.theme.colorTextDark};
`;

const Label = styled.span``;

const ButtonAdopted = p => {

  
  return (
    <StyledButtonAdopted>
      <Label>Abonniert</Label>
      <CloseIcon />
    </StyledButtonAdopted>
  )
}

export default ButtonAdopted;