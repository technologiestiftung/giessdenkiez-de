import React, { FC } from 'react';
import styled from 'styled-components';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SquareButton from '../SquareButton';
import { useActions } from '../../state/unistore-hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface StyledProps {
  active?: boolean;
  isNavOpened?: boolean;
}
const NavWrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: ${props => props.theme.boxShadow};
  flex-grow: 0;
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  z-index: 1;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props =>
      props.isNavOpened ? 'translate3d(350px, 0, 0)' : 'none'};
  }
`;

const NavItem = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  text-decoration: none;
`;

const navConfig = [
  { path: '/search', title: 'Suche und Filter', icon: <SearchIcon /> },
  { path: '/about', title: 'Info', icon: <InfoIcon /> },
  { path: '/profile', title: 'Profil', icon: <AccountCircle /> },
];

const Nav: FC<{
  isNavOpened: boolean;
}> = ({ isNavOpened }) => {
  const { openNav } = useActions();
  const { pathname } = useRouter();

  return (
    <NavWrapper isNavOpened={isNavOpened}>
      {navConfig.map(item => (
        <Link
          href={{ pathname: item.path, search: '' }}
          onClick={() => openNav()}
          title={item.title}
          key={item.path}
        >
          <NavItem>
            <SquareButton
              title={item.title}
              aria-label={item.title}
              isActive={pathname === item.path}
            >
              {item.icon}
            </SquareButton>
          </NavItem>
        </Link>
      ))}
    </NavWrapper>
  );
};

export default Nav;
