import React, {Fragment} from 'react';
import { connect } from 'unistore/react';
import {render} from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Store from '../../state/Store';
import Actions from '../../state/Actions';
import content from '../../assets/content';
import { fetchAPI, createAPIUrl } from '../../state/utils';
import { useAuth0 } from "../../utils/auth0";

const ButtonWaterSpan = styled.span`
  padding: 10px;
  cursor: pointer;
  background: ${props => props.theme.colorPrimary};
  transition: background ${props => props.theme.timeS} ease-in-out;
  border-radius: ${props => props.theme.borderRadiusS};
  text-align: center;
  font-size: ${props => props.theme.fontSizeL};

  &:hover {
      background: ${props => props.theme.colorPrimaryHover};
      transition: background ${props => props.theme.timeS} ease-in-out;
  }
`

const ButtonWater = (p) => {
  const { selectedTree, state } = p;
  const { id } = selectedTree;
  const { loading, user, isAuthenticated } = useAuth0();

  const adopted = selectedTree.adopted == user.email;

  console.log(adopted, selectedTree, user.email)

  const timeNow = () => {
      const date = + new Date;
      return date;
  }

  const waterTree = (id) => {
      Store.setState({ selectedTreeState: 'WATERING' });
      const time = timeNow();
      const url = createAPIUrl(state, `/api/water-tree?id=${id}&timestamp=${time}`);

  const res = fetchAPI(url)
          .then(r => {
              const url = createAPIUrl(state, `/api/get-tree?id=${id}`);
              const res = fetchAPI(url)
                  .then(r => { Store.setState({ selectedTreeState: 'WATERED', selectedTree: r.data }); });
          })
  }

  const adoptTree = (id) => {
      Store.setState({ selectedTreeState: 'ADOPT' });
      const time = timeNow();
      const url = createAPIUrl(state, `/api/adopt-tree?id=${id}&mail=${user.email}`);

  const res = fetchAPI(url)
          .then(r => {
              const url = createAPIUrl(state, `/api/get-tree?id=${id}`);
              const res = fetchAPI(url)
                  .then(r => { Store.setState({ selectedTreeState: 'WATERED', selectedTree: r.data }); });
          })
  }

  if (isAuthenticated) {
      return (
        <Fragment>
          { adopted && (<ButtonWaterSpan onClick={() => {waterTree(id)}}>{content.en.sidebar.btnWater}</ButtonWaterSpan>)}
          { !adopted && (<ButtonWaterSpan onClick={() => {adoptTree(id)}}>Baum abonnieren</ButtonWaterSpan>)}
        </Fragment>
      )
  } else if (!isAuthenticated) {
    return (
      <ButtonWaterSpan onClick={() => {waterTree(id)}}>{content.en.sidebar.btnWater}</ButtonWaterSpan>
    )
  }

}

export default connect(state => ({
  selectedTree: state.selectedTree,
  state: state
}), Actions)(ButtonWater);

