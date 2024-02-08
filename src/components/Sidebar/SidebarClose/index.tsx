import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import RoundButton from '../../../components/RoundButton';
import { useActions } from '../../../state/unistore-hooks';
import Link from 'next/link';

const SidebarClose: FC = () => {
  const { closeNav } = useActions();

  return (
    <Link
      href={{ pathname: '/', search: '' }}
      style={{ position: 'absolute', top: '15px', right: '15px', zIndex: '10' }}
    >
      <RoundButton
        aria-label='Leiste schließen'
        title='Leiste schließen'
        onClick={closeNav}
      >
        <CloseIcon />
      </RoundButton>
    </Link>
  );
};

export default SidebarClose;
