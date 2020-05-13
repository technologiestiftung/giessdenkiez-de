import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import Store from '../../state/Store';
import Actions, { loadCommunityData } from '../../state/Actions';
import { fetchAPI, createAPIUrl } from '../../utils';
import { useAuth0 } from '../../utils/auth0';
import history from '../../history';
import Login from '../Login';
import ButtonRound from '../ButtonRound';
import ButtonWaterGroup from './BtnWaterGroup';
import CardDescription from '../Card/CardDescription/';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import CardParagraph from '../Card/CardParagraph';

const loadCommunityDataAction = Store.action(loadCommunityData(Store));

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

const ButtonWater = p => {
  const {
    selectedTree,
    state,
    toggleOverlay,
    selectedTreeState,
    userdata,
    treeAdopted,
    endpoints,
  } = p;
  const { id } = selectedTree;
  const [waterGroup, setWaterGroup] = useState('visible');
  const { user, isAuthenticated, getTokenSilently } = useAuth0();
  const [adopted, setAdopted] = useState(false);

  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState(false);

  useEffect(() => {
    if (!user) return;
    setIsEmailVerifiyed(user.email_verified);
  }, [user, setIsEmailVerifiyed]);

  const btnLabel = state => {
    switch (state) {
      case 'visible':
        return 'Ich habe gegossen!';

      case 'watering':
        return 'Wieviel Wasser?';

      case 'watered':
        return 'Begießung wurde eingetragen.';

      default:
        break;
    }
  };

  const handleClick = () => {
    history.push('/');
    toggleOverlay(true);
  };

  const setWaterAmount = (id, amount) => {
    setWaterGroup('watered');
    waterTree(id, amount, userdata.username);
    setTimeout(() => {
      setWaterGroup('visible');
    }, 1000);
  };

  const isTreeAdopted = async (treeid, uuid) => {
    const token = await getTokenSilently();
    try {
      const url = createAPIUrl(
        state,
        `/private/get-is-tree-adopted?uuid=${uuid}&treeid=${treeid}`
      );
      const r = await fetchAPI(url, { headers: { Authorization: 'Bearer ' + token } });
      Store.setState({treeAdopted: r.data});
    } catch (error) {
      console.log(error);
    }
  };

  const waterTree = async (id, amount, username) => {
    Store.setState({ selectedTreeState: 'WATERING' });
    const token = await getTokenSilently();
    const url = createAPIUrl(
      state,
      `/private/water-tree?id=${id}&uuid=${user.sub}&amount=${amount}&username=${username}`
    );

    // TODO: neste promises
    await fetchAPI(url, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(_r => {
        const url = createAPIUrl(state, `/get-tree?id=${id}`);
        fetchAPI(url)
          .then(r => {
            Store.setState({
              selectedTreeState: 'WATERED',
              selectedTree: r.data,
            });
            setTimeout(() => {
              loadCommunityDataAction();
            }, 250);
            return;
          })
          .catch(console.error);
        return;
      })
      .then(r => {
        fetchAPI(`${endpoints.prod}/get-tree-last-watered?id=${id}`)
          .then(r => {
            Store.setState({ treeLastWatered: r.data });
            return;
          })
          .catch(console.error);
        setTimeout(() => {
          const url = createAPIUrl(state, `/get-watered-trees`);
          fetchAPI(url)
            .then(r => {
              Store.setState({ wateredTrees: r.data.watered });
              return;
            })
            .catch(console.error);
        }, 500);
        return;
      })
      .catch(console.error);
  };

  const adoptTree = async id => {
    Store.setState({ selectedTreeState: 'ADOPT' });
    const token = await getTokenSilently();
    // const time = timeNow();
    const url = createAPIUrl(
      state,
      `/private/adopt-tree?tree_id=${id}&uuid=${user.sub}`
    );

    // TODO: nested promises
    await fetchAPI(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(r => {
        const url = createAPIUrl(state, `/get-tree?id=${id}`);
        fetchAPI(url)
          .then(r => {
            Store.setState({
              selectedTreeState: 'ADOPTED',
              selectedTree: r.data,
            });
            setTimeout(() => {
              loadCommunityDataAction();
            }, 250);
            return;
          })
          .catch(console.error);
        return;
      })
      .catch(console.error);

      await isTreeAdopted(id, user.sub);
  };

  if (isAuthenticated) {
    return (
      <>
        {isEmailVerifiyed ? (
          <Fragment>
            {!treeAdopted && (
              <BtnContainer>
                <ButtonRound  
                  margin='15px'
                  toggle={() => adoptTree(id)}
                  type='secondary'
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
              width='-webkit-fill-available'
              toggle={() => setWaterGroup('watering')}
              type='primary'
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
        <StyledLogin width='-webkit-fill-available' />
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
    treeAdopted: state.treeAdopted,
    state: state,
    userdata: state.user,
    endpoints: state.endpoints,
  }),
  Actions
)(ButtonWater);
