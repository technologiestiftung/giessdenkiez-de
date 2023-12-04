import React, { FC } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

import RoundButton from '../../../components/RoundButton';
import { useActions } from '../../../state/unistore-hooks';
import Link from 'next/link';

const StyledLink = styled.a`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
`;

const SidebarClose: FC = () => {
  const { closeNav } = useActions();

  return (
    <Link href={{ pathname: '/', search: '' }}>
      <StyledLink>
        <RoundButton
          aria-label='Leiste schließen'
          title='Leiste schließen'
          onClick={closeNav}
        >
          <CloseIcon />
        </RoundButton>
      </StyledLink>
    </Link>
  );
};

export default SidebarClose;
