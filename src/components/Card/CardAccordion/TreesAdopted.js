import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Actions from '../../../state/Actions';
import { connect } from 'unistore/react';
import Store from '../../../state/Store';
import CloseIcon from '@material-ui/icons/Close';

import { useAuth0 } from '../../../utils/auth0';
import { fetchAPI, createAPIUrl } from '../../../utils';

// import TreeType from './TreeType';
// import CardWaterDrops from '../CardWaterDrops';

// const StyledTreeType = styled(TreeType)`
//   margin-bottom: 10px;
//   padding: 0;
// `;

const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-right: 5px;

  svg {
    width: 0.75em;
    height: 0.75em;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const WrapperOuter = styled.div`
  padding-top: 5px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.span`
  height: fit-content;
  cursor: pointer;
  font-weight: normal;
  font-size: ${p => p.theme.fontSizeL};

  &:hover {
    opacity: 0.5;
  }
`;

const TreesAdopted = p => {
  const { data, setViewport, state } = p;
  const [unadopting, setUnadopting] = useState(false);
  const { user, getTokenSilently } = useAuth0();

  const handleClick = async info => {
    Store.setState({ selectedTree: info });
    const coordinates = [parseFloat(info.lat), parseFloat(info.lng)];
    setViewport(coordinates);
  };

  const handleClickUnadopt = id => {
    setUnadopting(id);
    unadoptTree(id);
  };

  const unadoptTree = async id => {
    try {
      Store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      const header = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const urlUnadopt = createAPIUrl(
        state,
        `/private/unadopt-tree?tree_id=${id}&uuid=${user.sub}`
      );

      const urlAdoptedTrees = createAPIUrl(
        Store.getState(),
        `/private/get-adopted-trees?uuid=${user.sub}`
      );
      
      const res = await fetchAPI(urlUnadopt, header);

      const resAdoptedTrees = await fetchAPI(urlAdoptedTrees, header);

      Store.setState({
        selectedTreeState: 'FETCHED',
        adoptedTrees: resAdoptedTrees.data,
      });
      setUnadopting(false);

    } catch (error) {
      console.error(error);
    }
  };

  if (data.length === 0) {
    return (
      <WrapperOuter>
        <Title>Du hast noch keine Bäume abonniert.</Title>
      </WrapperOuter>
    );
  } else {
    return (
      <WrapperOuter>
        {data.map((info, i) => {
          return (
            <WrapperRow key={i}>
              <Title onClick={() => handleClick(info)}>
                {info.id === unadopting ? 'Entferne Baum ...' : info.artdtsch}
              </Title>
              <CloseIcon onClick={() => handleClickUnadopt(info.id)}>
                x
              </CloseIcon>
            </WrapperRow>
          );
        })}
      </WrapperOuter>
    );
  }
};

export default connect(
  state => ({
    state: state,
    adoptedTrees: state.adoptedTrees,
  }),
  Actions
)(TreesAdopted);
