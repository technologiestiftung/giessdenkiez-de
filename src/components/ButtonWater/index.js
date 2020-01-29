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
  font-size: 13px;

  &:hover {
      background: ${props => props.theme.colorPrimaryHover};
      transition: background ${props => props.theme.timeS} ease-in-out;
  }
`

const ButtonWaterSpanOther = styled.span`
  padding: 10px;
  color: ${props => props.theme.colorTextLight};
  background: ${props => props.theme.colorLightGrey};
  transition: background ${props => props.theme.timeS} ease-in-out;
  border-radius: ${props => props.theme.borderRadiusS};
  text-align: center;
  font-size: 13px;
`

const ButtonWater = (p) => {
  const { selectedTree, state } = p;
  const { id } = selectedTree;
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();
  let adopted = false;

  if (user) {

    if (selectedTree.adopted == user.email) {
      adopted = true
    }

    if (selectedTree.adopted) {
      if (selectedTree.adopted != user.email && selectedTree.adopted.length > 0) {
        adopted = 'other'
      }
    }

  }

  const timeNow = () => {
      const date = + new Date;
      return date;
  }

  const waterTree = async (id) => {
      Store.setState({ selectedTreeState: 'WATERING' });
      const token = await getTokenSilently();
      const time = timeNow();
      const url = createAPIUrl(state, `/private/water-tree?id=${id}&timestamp=${time}`);

      const res = await fetchAPI(url,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(r => {
            const url = createAPIUrl(state, `/get-tree?id=${id}`);
            const res = fetchAPI(url)
                .then(r => { Store.setState({ selectedTreeState: 'WATERED', selectedTree: r.data }); });
        })
  }

  const adoptTree = async (id) => {
      Store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      const time = timeNow();
      const url = createAPIUrl(state, `/private/adopt-tree?id=${id}&mail=${user.email}`);

      const res = await fetchAPI(url,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(r => {
            const url = createAPIUrl(state, `/get-tree?id=${id}`);
            const res = fetchAPI(url)
                .then(r => { Store.setState({ selectedTreeState: 'WATERED', selectedTree: r.data }); });
        })
  }

  if (isAuthenticated) {
      return (
        <Fragment>
          { adopted && adopted != 'other' && (<ButtonWaterSpan onClick={() => {waterTree(id)}}>{content.en.sidebar.btnWater}</ButtonWaterSpan>)}
          { !adopted && (<ButtonWaterSpan onClick={() => {adoptTree(id)}}>Baum abonnieren</ButtonWaterSpan>)}
          { adopted == 'other' && (<ButtonWaterSpanOther>Baum bereits vergeben</ButtonWaterSpanOther>)}
        </Fragment>
      )
  } else if (!isAuthenticated) {
    return (
      <></>
    )
  }

}

export default connect(state => ({
  selectedTree: state.selectedTree,
  state: state
}), Actions)(ButtonWater);

