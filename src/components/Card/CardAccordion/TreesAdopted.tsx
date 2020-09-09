import React, { useState } from 'react';
import styled from 'styled-components';
import Actions from '../../../state/Actions';
import { connect } from 'unistore/react';
import store from '../../../state/Store';
import CloseIcon from '@material-ui/icons/Close';

import { useAuth0 } from '../../../utils/auth/auth0';
import { createAPIUrl, requests } from '../../../utils';

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

interface TreesAdoptedProps {
  data: any;
  setViewport: any;
  state: any;
  adoptedTrees: any;
}
const TreesAdopted: React.FC<TreesAdoptedProps> = p => {
  const { data, setViewport } = p;
  const [unadopting, setUnadopting] = useState(false);
  const { user, getTokenSilently } = useAuth0();

  const handleClick = async info => {
    store.setState({ selectedTree: info });
    const coordinates = [parseFloat(info.lat), parseFloat(info.lng)];
    setViewport(coordinates);
  };

  // FIXME: Duplicate code appears also in
  // SidebarAdopted
  // TreesAdopted
  // ButtonAdopted
  // all three have a little bit different code
  const unadoptTree = async (id: string) => {
    try {
      store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      // const header = {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // };

      const urlUnadopt = createAPIUrl(
        store.getState(),
        // `/private/unadopt-tree?tree_id=${id}&uuid=${user.sub}`
        `/delete?tree_id=${id}&uuid=${user.sub}`
      );

      const urlAdoptedTrees = createAPIUrl(
        store.getState(),
        // `/private/get-adopted-trees?uuid=${user.sub}`
        `/get?queryType=adopted&uuid=${user.sub}`
      );

      await requests(urlUnadopt, {
        token,
        override: {
          method: 'DELETE',
          body: JSON.stringify({
            // eslint-disable-next-line @typescript-eslint/camelcase
            tree_id: id,
            uuid: user.sub,
            queryType: 'unadopt',
          }),
        },
      });

      const resAdoptedTrees = await requests(urlAdoptedTrees, { token });
      store.setState({
        selectedTreeState: 'FETCHED',
        adoptedTrees: resAdoptedTrees.data,
      });
      setUnadopting(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleClickUnadopt = (id: string) => {
    setUnadopting(true);
    unadoptTree(id);
  };

  if (data.length === 0) {
    return (
      <WrapperOuter>
        <Title>Du hast noch keine Bäume adoptiert.</Title>
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

export default connect<TreesAdoptedProps, any, any, any>(
  state => ({
    state: state,
    adoptedTrees: state.adoptedTrees,
  }),
  Actions
)(TreesAdopted);
