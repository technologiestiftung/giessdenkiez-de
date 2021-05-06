import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import RoundButton from '../../../components/RoundButton';
import { useActions } from '../../../state/unistore-hooks';

const StyledLink = styled(Link)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
`;

const SidebarClose: FC = () => {
  const { closeNav } = useActions();

  return (
    <StyledLink to={{ pathname: '/', search: '' }}>
      <RoundButton
        aria-label='Leiste schließen'
        title='Leiste schließen'
        onClick={closeNav}
      >
        <CloseIcon />
      </RoundButton>
    </StyledLink>
  );
};

export default SidebarClose;
