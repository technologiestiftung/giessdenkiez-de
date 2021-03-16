import React, { FC, useState } from 'react';
import styled from 'styled-components';
import store from '../../../state/Store';
import CloseIcon from '@material-ui/icons/Close';

import { useAuth0 } from '../../../utils/auth/auth0';
import { createAPIUrl, requests } from '../../../utils';
import { useActions } from '../../../state/unistore-hooks';
import Actions from '../../../state/Actions';

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

const TreesAdopted: FC<{
  data: Array<{
    id: string;
    artdtsch: string;
  }>;
}> = ({ data }) => {
  const { setViewport } = useActions(Actions);
  const [unadopting, setUnadopting] = useState(false);
  const { user, getTokenSilently } = useAuth0();

  const handleClick = async info => {
    store.setState({ selectedTree: info });
    const coordinates = [parseFloat(info.lat), parseFloat(info.lng)];
    setViewport(coordinates);
  };

  // FIXME: Duplicate code appears also in
  // TreesAdopted
  // ButtonAdopted
  // all three have a little bit different code
  const unadoptTree = async (id: string) => {
    try {
      store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();

      const urlUnadopt = createAPIUrl(
        store.getState(),
        `/delete?tree_id=${id}&uuid=${user.sub}`
      );

      const urlAdoptedTrees = createAPIUrl(
        store.getState(),
        `/get?queryType=adopted&uuid=${user.sub}`
      );

      await requests(urlUnadopt, {
        token,
        override: {
          method: 'DELETE',
          body: JSON.stringify({
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
        {data.map(info => {
          return (
            <WrapperRow key={info.id}>
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

export default TreesAdopted;
