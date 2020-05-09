import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'unistore/react';
import { render } from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Store from '../../state/Store';
import Actions, { loadCommunityData } from '../../state/Actions';
import content from '../../assets/content';
import { fetchAPI, createAPIUrl } from '../../utils';
import { useAuth0 } from '../../utils/auth0';

import history from '../../../history';

const loadCommunityDataAction = Store.action(loadCommunityData(Store));

import Login from '../Login';
import ButtonRound from '../ButtonRound';

import ButtonWaterGroup from './BtnWaterGroup';
import CardDescription from '../Card/CardDescription/';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import CardParagraph from '../Card/CardParagraph';

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCardDescription = styled(CardDescription)`
  text-decoration: underline;
  padding-top: 6px;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
    transition: all 0.125s ease-in-out;
  }
`;

const StyledLogin = styled(Login)`
  cursor: pointer;
  align-self: stretch;
`;

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
`;

const ButtonWaterSpanOther = styled.span`
  padding: 10px;
  color: ${props => props.theme.colorTextLight};
  background: ${props => props.theme.colorLightGrey};
  transition: background ${props => props.theme.timeS} ease-in-out;
  border-radius: ${props => props.theme.borderRadiusS};
  text-align: center;
  font-size: 13px;
`;

const ButtonWater = p => {
  const { selectedTree, state, toggleOverlay, selectedTreeState, userdata, endpoints } = p;
  const { id } = selectedTree;
  const [waterGroup, setWaterGroup] = useState('visible');
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();
  const [adopted, setAdopted] = useState(false);

  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState(false);
  useEffect(() => {
    if (!user) return;
    setIsEmailVerifiyed(user.email_verified);
  }, [user, setIsEmailVerifiyed]);

  useEffect(() => {
    if (userdata) {
      isTreeAdopted(id, user.sub);
    }
  }, [userdata]);

  const btnLabel = state => {
    switch (state) {
      case 'visible':
        return 'Ich habe gewässert!';
        break;
      case 'watering':
        return 'Wieviel Wasser?';
        break;
      case 'watered':
        return 'Bewässerung wurde eingetragen!';
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    history.push('/');
    toggleOverlay(true);
  };

  const waterHandler = () => {
    setWaterGroup('watering');
  };

  const setWaterAmount = (id, amount) => {
    createUser(user);
    setWaterGroup('watered');
    waterTree(id, amount, userdata.username);
    setTimeout(() => {
      setWaterGroup('visible');
    }, 1000);
  };

  const timeNow = () => {
    const date = +new Date();
    return date;
  };

  const createUser = async user => {
    const token = await getTokenSilently();
    const url = createAPIUrl(
      state,
      `/private/create-user?mail=${user.email}&uuid=${user.sub}`
    );
  };

  const isTreeAdopted = async (treeid, uuid) => {
    const token = await getTokenSilently();
    const url = createAPIUrl(
      state,
      `/private/get-is-tree-adopted?uuid=${uuid}&treeid=${treeid}`
    );

    const res = await fetchAPI(url, {
      headers: { Authorization: 'Bearer ' + token },
    }).then(r => {
      setAdopted(r.data);
    });
  };

  const waterTree = async (id, amount, username) => {
    const { selectedTreeState } = p;
    Store.setState({ selectedTreeState: 'WATERING' });
    const token = await getTokenSilently();
    const time = timeNow();
    const url = createAPIUrl(
      state,
      `/private/water-tree?id=${id}&uuid=${user.sub}&amount=${amount}&username=${username}`
    );

    const res = await fetchAPI(url, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(r => {
        const url = createAPIUrl(state, `/get-tree?id=${id}`);
        const res = fetchAPI(url).then(r => {
          Store.setState({
            selectedTreeState: 'WATERED',
            selectedTree: r.data,
          });
          setTimeout(() => {
            loadCommunityDataAction();
        }, 250);
        });
      })
      .then(r => {
        const url = createAPIUrl(state, `/get-watered-trees`);
        const res = fetchAPI(url).then(r => {
          Store.setState({ wateredTrees: r.data.watered });
        });
        const resWatered = fetchAPI(`${endpoints.prod}/get-tree-last-watered?id=${id}`).then(r => {
          Store.setState({ treeLastWatered: r.data });
        });

      });
  };

  const adoptTree = async id => {
    Store.setState({ selectedTreeState: 'ADOPT' });
    const token = await getTokenSilently();
    const time = timeNow();
    const url = createAPIUrl(
      state,
      `/private/adopt-tree?tree_id=${id}&uuid=${user.sub}`
    );

    const res = await fetchAPI(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(r => {
      const url = createAPIUrl(state, `/get-tree?id=${id}`);
      const res = fetchAPI(url).then(r => {
        Store.setState({ selectedTreeState: 'ADOPTED', selectedTree: r.data });
        setTimeout(() => {
          loadCommunityDataAction();
        }, 250);
      });
    });
  };

  if (isAuthenticated) {
    return (
      <>
        {isEmailVerifiyed ? (
          <Fragment>
            {/* {adopted && adopted === "other" && (
          <BtnContainer>
            <ButtonRound
              width="-webkit-fill-available"
              toggle={() => setWaterGroup("watering")}
              type="primary"
            >
              {btnLabel(waterGroup)}
            </ButtonRound>
            {waterGroup === "watering" && (
              <ButtonWaterGroup id={id} toggle={setWaterAmount} />
            )}
            <StyledCardDescription onClick={() => handleClick()}>
              Wie kann ich mitmachen?
            </StyledCardDescription>
          </BtnContainer>
        )}
        {adopted && adopted !== "other" && (
          <BtnContainer>
            <ButtonRound
              width="-webkit-fill-available"
              toggle={() => setWaterGroup("watering")}
              type="primary"
            >
              {btnLabel(waterGroup)}
            </ButtonRound>
            {waterGroup === "watering" && (
              <ButtonWaterGroup id={id} toggle={setWaterAmount} />
            )}
            <StyledCardDescription onClick={() => handleClick()}>
              Wie kann ich mitmachen?
            </StyledCardDescription>
          </BtnContainer>
        )} */}
            {!adopted && (
              <BtnContainer>
                <ButtonRound
                  width="-webkit-fill-available"
                  margin="15px"
                  toggle={() => adoptTree(id)}
                  type="secondary"
                >
                  {!adopted &&
                  selectedTreeState !== 'ADOPT' &&
                  selectedTreeState !== 'ADOPTED'
                    ? 'Baum abonnieren'
                    : ''}
                  {!adopted && selectedTreeState === 'ADOPT'
                    ? 'Abonniere Baum ...'
                    : ''}
                  {!adopted && selectedTreeState === 'ADOPTED'
                    ? 'Baum abonniert!'
                    : ''}
                </ButtonRound>
              </BtnContainer>
            )}
            <ButtonRound
              width="-webkit-fill-available"
              toggle={() => setWaterGroup('watering')}
              type="primary"
            >
              {btnLabel(waterGroup)}
            </ButtonRound>
            {waterGroup === 'watering' && (
              <ButtonWaterGroup id={id} toggle={setWaterAmount} />
            )}
            <StyledCardDescription onClick={() => handleClick()}>
              Wie kann ich mitmachen?
            </StyledCardDescription>
          </Fragment>
        ) : (
          <>
            <CardParagraph>
              Bäume abonnieren und wässern ist nur möglich mit verifiziertem
              Account.
            </CardParagraph>
            <NonVerfiedMailCardParagraph></NonVerfiedMailCardParagraph>
          </>
        )}
      </>
    );
  } else if (!isAuthenticated) {
    return (
      <BtnContainer>
        <StyledLogin width="-webkit-fill-available" />
        <StyledCardDescription onClick={() => handleClick()}>
          Wie kann ich mitmachen?
        </StyledCardDescription>
      </BtnContainer>
    );
  }
};

export default connect(
  state => ({
    selectedTree: state.selectedTree,
    selectedTreeState: state.selectedTreeState,
    state: state,
    userdata: state.user,
    endpoints: state.endpoints,
  }),
  Actions
)(ButtonWater);
