import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/theme';
import { Router } from 'react-router-dom';
import history from '../history';
import { connect } from 'unistore/react';
import store from '../state/Store';

import { getCookieValue } from '../utils/';

import Actions, {
  loadData,
  getWateredTrees,
  loadTrees,
  loadCommunityData,
} from '../state/Actions';
import '../assets/style.scss';

import AppWrapper from './AppWrapper';

const loadEntryDataAction = store.action(loadData(store));
const loadTreesAction = store.action(loadTrees(store));
const loadWateredTreesAction = store.action(getWateredTrees(store));
const loadCommunityDataAction = store.action(loadCommunityData(store));

loadEntryDataAction();
loadWateredTreesAction();
loadTreesAction();
loadCommunityDataAction();

const cookie = getCookieValue('disclaimerAccepted');

if (cookie === 'true') {
  store.setState({ cookiesAccepted: true });
}

// const AppWrapperDiv = styled.div`
//   font-family: ${props => props.theme.fontFamily};
// `;

// const TsbLinkDiv = styled.div`
//   position: absolute;
//   z-index: 1;
//   top: 30px;
//   left: 30px;

//   a {
//     display: flex;
//     flex-direction: column;
//     text-decoration: none;
//     color: black;
//     font-weight: bold;
//   }
// `;

// const LogoImg = styled.img`
//   margin-top: 10px;
//   width: 160px;
// `;

// const TSBLink = () => {
//   return (
//     <TsbLinkDiv className="link">
//       <a href="https://citylab-berlin.org">
//         <LogoImg src={logo}></LogoImg>
//       </a>
//     </TsbLinkDiv>
//   );
// };

const AppContainer = p => {
  const { isLoading, data, overlay } = p;
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppWrapper isLoading={isLoading} overlay={overlay} data={data} />
      </ThemeProvider>
    </Router>
  );
};

export default connect(
  state => ({
    isLoading: state.isLoading,
    overlay: state.overlay,
    data: state.data,
  }),
  Actions
)(AppContainer);
