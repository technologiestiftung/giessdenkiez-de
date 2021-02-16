import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import RoundButton from '../../../components/RoundButton';

const StyledLink = styled(Link)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
`;

const SidebarClose = () => {
  // const handleClick = _evt => {};

  return (
    <StyledLink
      // onClick={() => {
      //   handleClick();
      // }}
      to={{ pathname: '/', search: '' }}
    >
      <RoundButton aria-label='Leiste schließen' title='Leiste schließen'>
        <CloseIcon />
      </RoundButton>
    </StyledLink>
  );
};

export default SidebarClose;
