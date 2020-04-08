import React from 'react';
import styled from 'styled-components';

import DeckGlMap from '../map';
import Sidebar from '../Sidebar';
import NavBar from '../Navbar';
import Nav from '../Nav';
import Loading from '../Loading';
import Overlay from '../Overlay';

import logo from '!file-loader!../../assets/citylab-logo.svg';

const AppWrapperDiv = styled.div`
  font-family: ${props => props.theme.fontFamily};
  height: 100vh;
  width: 100vw;
`;

const AppWrapper = p => {
  const { isLoading, data, overlay } = p;
  console.log('overlay', overlay)
  return (
    <AppWrapperDiv>
      { isLoading && (<Loading/>) }
      {!isLoading && data && (<DeckGlMap data={data}/>)}
      {!isLoading && data && (<Sidebar/>)}
      {overlay && data && (<Overlay/>)}
      <Nav/>
    </AppWrapperDiv>
  )
}

export default AppWrapper;