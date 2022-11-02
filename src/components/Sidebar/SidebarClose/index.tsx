import { FC } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import RoundButton from '../../../components/RoundButton';
import { useActions } from '../../../state/unistore-hooks';
import Link from 'next/link';

const StyledLink = styled(Link)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
`;

const SidebarClose: FC = () => {
  const { closeNav } = useActions();

  return (
    <StyledLink href={{ pathname: '/', search: '' }}>
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
