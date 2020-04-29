import React, {useEffect} from 'react';
import styled from 'styled-components';

import DeckGlMap from '../map';
import Sidebar from '../Sidebar';
import NavBar from '../Navbar';
import Nav from '../Nav';
import Legend from '../Legend';
import Loading from '../Loading';
import Overlay from '../Overlay';

import logoCitylab from '!file-loader!../../assets/citylab-logo.svg';
import logoTSB from '!file-loader!../../assets/tsb-logo-coloured.svg';


const AppWrapperDiv = styled.div`
  font-family: ${props => props.theme.fontFamily};
  height: 100vh;
  width: 100vw;
`;

const CreditsContainer = styled.div`
  width: 150px;
  height: auto;
  position: absolute;
  flex-direction: column;
  display: flex;
  justify-content: end;
  top: 12px;
  right: 12px;

  span {
    margin-bottom: 5px;
    width: fit-content;
    font-size: ${p => p.theme.fontSizeL}
  }

  a.tsb {
    width: fit-content;
    img {
      width: 110px;
    }
  }

  a.citylab {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }
`;

const AppWrapper = p => {
  const { isLoading, data, overlay } = p;
  return (
    <AppWrapperDiv>
      { isLoading && (<Loading/>) }
      {!isLoading && data && (<DeckGlMap data={data}/>)}
      {!isLoading && data && (<Sidebar/>)}
      {overlay && data && (<Overlay/>)}
      <Nav/>
      <CreditsContainer>
        <span>Ein Projekt des</span>
        <a className="citylab" href="https://citylab-berlin.org" target="_blank">
          <img src={logoCitylab} />
        </a>
        <a className="tsb" href="https://technologiestiftung-berlin.de" target="_blank">
          <img src={logoTSB} />
        </a>
      </CreditsContainer>
      <Legend />
    </AppWrapperDiv>
  )
}

export default AppWrapper;