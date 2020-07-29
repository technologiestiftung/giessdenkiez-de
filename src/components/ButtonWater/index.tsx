import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import store from '../../state/Store';
import Actions, { loadCommunityData } from '../../state/Actions';
import { createAPIUrl, requests, waitFor, isTreeAdopted } from '../../utils';
import { useAuth0 } from '../../utils/auth0';
import history from '../../history';
import Login from '../Login';
import ButtonRound from '../ButtonRound';
import ButtonWaterGroup from './BtnWaterGroup';
import CardDescription from '../Card/CardDescription';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import CardParagraph from '../Card/CardParagraph';
import { Generic } from '../../common/interfaces';

const loadCommunityDataAction = store.action(loadCommunityData(store));

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
  const [adopted] = useState(false);

  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState(false);

  useEffect(() => {
    if (!user) return;
    setIsEmailVerifiyed(user.email_verified);
  }, [user, setIsEmailVerifiyed]);

  const btnLabel = (state: string) => {
    switch (state) {
      case 'visible':
        return 'Ich habe gegossen!';

      case 'watering':
        return 'Wieviel Wasser?';

      case 'watered':
        return 'Begießung wurde eingetragen.';

      default:
        return;
    }
  };

  const handleClick = () => {
    history.push('/');
    toggleOverlay(true);
  };

  const setWaterAmount = (id: any, amount: any) => {
    setWaterGroup('watered');
    waterTree(id, amount, userdata.username);
    setTimeout(() => {
      setWaterGroup('visible');
    }, 1000);
  };

  // const isTreeAdopted = async (treeid: any, uuid: any) => {
  //   const token = await getTokenSilently();
  //   try {
  //     const url = createAPIUrl(
  //       state,
  //       `/private/get-is-tree-adopted?uuid=${uuid}&treeid=${treeid}`
  //     );
  //     const r =
  //       /* TODO: replace URL */
  //       await fetchAPI(url, {
  //         headers: { Authorization: 'Bearer ' + token },
  //       });
  //     //@ts-ignore
  //     store.setState({ treeAdopted: r.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const waterTree = async (id, amount, username) => {
    try {
      store.setState({ selectedTreeState: 'WATERING' });
      const token = await getTokenSilently();
      const urlPostWatering = createAPIUrl(
        state,
        `/post?id=${id}&uuid=${user.sub}&amount=${amount}&username=${username}&comment=URL_QUERY_NOT_NEEDED_USE_BODY`
      );

      // TODO: neste promises
      /* TODO: replace URL */
      await requests<{ method: 'POST'; body: string }>(urlPostWatering, {
        token,
        override: {
          method: 'POST',
          body: JSON.stringify({
            tree_id: id,
            amount,
            uuid: user.sub,
            username,
            queryType: 'water',
          }),
        },
      });
      const geturl = createAPIUrl(state, `/get?id=${id}&queryType=byid`);
      const json: { data: Generic[] } = await requests(geturl);
      if (json.data.length > 0) {
        const tree = json.data[0];
        // ISSUE:141
        //@ts-ignore
        tree.radolan_days = tree.radolan_days.map(d => d / 10);
        //@ts-ignore
        tree.radolan_sum = tree.radolan_sum / 10;

        store.setState({
          //@ts-ignore
          selectedTreeState: 'WATERED',
          //@ts-ignore
          selectedTree: tree,
        });

        await waitFor(250, loadCommunityDataAction);

        // setTimeout(() => {
        //   loadCommunityDataAction();
        // }, 250);
        const jsonWatered = await requests(
          `${endpoints.prod}/get?queryType=lastwatered&id=${id}`
        );
        store.setState({ treeLastWatered: jsonWatered.data });
        await waitFor(500, () => {
          const url = createAPIUrl(state, `/get?queryType=watered`);
          requests(url)
            .then(json => {
              console.log('waited for 500 ms for watered data', json);
              store.setState({ wateredTrees: json.data.watered });
            })
            .catch(console.error);
        });
      }

      // await fetchAPI(url, {
      //   headers: { Authorization: 'Bearer ' + token },
      // })
      //   .then(_r => {
      //     const url = createAPIUrl(state, `/get?id=${id}&queryType=byid`);
      //     fetchAPI(url)
      //       .then(r => {
      //         // // ISSUE:141
      //         // //@ts-ignore
      //         // r.data.radolan_days = r.data.radolan_days.map(d => d / 10);
      //         // //@ts-ignore
      //         // r.data.radolan_sum = r.data.radolan_sum / 10;
      //         // store.setState({
      //         //   //@ts-ignore
      //         //   selectedTreeState: 'WATERED',
      //         //   //@ts-ignore
      //         //   selectedTree: r.data,
      //         // });
      //         // setTimeout(() => {
      //         //   loadCommunityDataAction();
      //         // }, 250);
      //         // return;
      //       })
      //       .catch(console.error);
      //     return;
      //   })
      //   .then(r => {
      //     // fetchAPI(`${endpoints.prod}/get?queryType=lastwatered&id=${id}`)
      //     //   .then(r => {
      //     //     //@ts-ignore
      //     //     store.setState({ treeLastWatered: r.data });
      //     //     return;
      //     //   })
      //     //   .catch(console.error);
      //     // setTimeout(() => {
      //     //   const url = createAPIUrl(state, `/get?queryType=watered`);
      //     //   fetchAPI(url)
      //     //     .then(r => {
      //     //       //@ts-ignore
      //     //       store.setState({ wateredTrees: r.data.watered });
      //     //       return;
      //     //     })
      //     //     .catch(console.error);
      //     // }, 500);
      //     return;
      //   })
      //   .catch(console.error);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const adoptTree = async (id: string) => {
    try {
      store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      // const time = timeNow();
      const url = createAPIUrl(state, `/post?tree_id=${id}&uuid=${user.sub}`);

      // TODO: nested promises
      /* TODO: replace URL */
      await requests(url, {
        token,
        override: {
          method: 'POST',
          body: JSON.stringify({
            tree_id: id,
            uuid: user.sub,
            queryType: 'adopt',
          }),
        },
      });
      const res = await requests(
        createAPIUrl(state, `/get?&queryType=byid&id=${id}`)
      );
      if (res.data.length > 0) {
        const tree = res.data[0];
        // ISSUE:141

        tree.radolan_days = tree.radolan_days.map(d => d / 10);

        tree.radolan_sum = tree.radolan_sum / 10;

        store.setState({
          selectedTreeState: 'ADOPTED',
          //@ts-ignore
          selectedTree: tree,
        });

        await waitFor(250, loadCommunityDataAction);

        await isTreeAdopted({
          id,
          uuid: user.sub,
          token,
          isAuthenticated,
          store,
          state,
        });
      }
      //   setTimeout(() => {
      //   loadCommunityDataAction();
      //   }, 250);
      //   return;
      // }
      // await fetchAPI(url, {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // })
      //   .then(r => {
      //     const url = createAPIUrl(state, `/get?&queryType=byid&id=${id}`);
      //     fetchAPI(url)
      //       .then(r => {
      //         // ISSUE:141
      //         //@ts-ignore
      //         r.data.radolan_days = r.data.radolan_days.map(d => d / 10);
      //         //@ts-ignore
      //         r.data.radolan_sum = r.data.radolan_sum / 10;

      //         store.setState({
      //           selectedTreeState: 'ADOPTED',
      //           //@ts-ignore
      //           selectedTree: r.data,
      //         });
      //         setTimeout(() => {
      //           loadCommunityDataAction();
      //         }, 250);
      //         return;
      //       })
      //       .catch(console.error);
      //     return;
      //   })
      //   .catch(console.error);
    } catch (error) {
      console.error(error);
      throw error;
    }
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
                    ? 'Baum adoptieren'
                    : ''}
                  {!adopted && selectedTreeState === 'ADOPT'
                    ? 'Adoptiere Baum ...'
                    : ''}
                  {!adopted && selectedTreeState === 'ADOPTED'
                    ? 'Baum adoptiert!'
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
              Bäume adoptieren und wässern ist nur möglich mit verifiziertem
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
