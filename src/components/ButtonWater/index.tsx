import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
// import { connect } from 'unistore/react';
import history from '../../history';
import { loadCommunityData } from '../../state/Actions';
import { useStoreState } from '../../state/unistore-hooks';
import store from '../../state/Store';
import { createAPIUrl, isTreeAdopted, requests, waitFor } from '../../utils';
import { useAuth0 } from '../../utils/auth/auth0';
import ButtonRound from '../ButtonRound';
import CardDescription from '../Card/CardDescription';
import CardParagraph from '../Card/CardParagraph';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import Login from '../Login';
import ButtonWaterGroup from './BtnWaterGroup';

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

const ButtonWater = () => {
  // const {
  const { selectedTree } = useStoreState('selectedTree');
  const { toggleOverlay } = useStoreState('toggleOverlay');
  const { selectedTreeState } = useStoreState('selectedTreeState');
  const { user: userdata } = useStoreState('user');
  const { treeAdopted } = useStoreState('treeAdopted');
  const { endpoints } = useStoreState('endpoints');

  // const { id } = selectedTree;
  const [waterGroup, setWaterGroup] = useState('visible');
  const { user, isAuthenticated, getTokenSilently } = useAuth0();
  const [adopted] = useState(false);

  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState<boolean | undefined>(
    undefined
  );
  // let isMounted = true;
  // useEffect(() => {
  //   return () => {
  //     // isMounted = false;
  //   };
  // });
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

  const waterTree = async (id, amount, username) => {
    try {
      store.setState({ selectedTreeState: 'WATERING' });
      const token = await getTokenSilently();
      const urlPostWatering = createAPIUrl(
        store.getState(),
        `/post?id=${id}&uuid=${user.sub}&amount=${amount}&username=${username}&comment=URL_QUERY_NOT_NEEDED_USE_BODY`
      );

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
      const geturl = createAPIUrl(
        store.getState(),
        `/get?id=${id}&queryType=byid`
      );
      const json = await requests(geturl);
      if (json.data.length > 0) {
        const tree = json.data[0];
        // ISSUE:141
        tree.radolan_days = tree.radolan_days.map(d => d / 10);
        tree.radolan_sum = tree.radolan_sum / 10;

        store.setState({
          selectedTreeState: 'WATERED',
          selectedTree: tree,
        });

        await waitFor(250, loadCommunityDataAction);
        const jsonWatered = await requests(
          `${endpoints.prod}/get?queryType=lastwatered&id=${id}`
        );
        store.setState({ treeLastWatered: jsonWatered.data });
        await waitFor(500, () => {
          const url = createAPIUrl(store.getState(), `/get?queryType=watered`);
          requests(url)
            .then(json => {
              store.setState({ wateredTrees: json.data.watered });
              return;
            })
            .catch(console.error);
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setWaterAmount = (id: any, amount: any) => {
    setWaterGroup('watered');
    waterTree(id, amount, userdata.username);

    setTimeout(() => {
      setWaterGroup('visible');
    }, 1000);
  };
  const adoptTree = async (id: string) => {
    try {
      store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      // const time = timeNow();
      const url = createAPIUrl(
        store.getState(),
        `/post?tree_id=${id}&uuid=${user.sub}`
      );

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
      })
        .then(() => {
          return requests(
            createAPIUrl(store.getState(), `/get?&queryType=byid&id=${id}`)
          );
        })
        .then(res => {
          if (res.data.length > 0) {
            const tree = res.data[0];
            // ISSUE:141

            tree.radolan_days = tree.radolan_days.map(d => d / 10);

            tree.radolan_sum = tree.radolan_sum / 10;

            store.setState({
              selectedTreeState: 'ADOPTED',
              selectedTree: tree,
            });
          }
          return waitFor(250, loadCommunityDataAction);
        })
        .then(() => {
          return waitFor(500, () => undefined);
        })
        .then(() => {
          return isTreeAdopted({
            // isMounted,
            id,
            uuid: user.sub,
            token,
            isAuthenticated,
            store,
          });
        })
        .catch(console.error);
    } catch (error) {
      console.error(error);
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
                  toggle={() => {
                    adoptTree(selectedTree.id);
                  }}
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
              <ButtonWaterGroup id={selectedTree.id} toggle={setWaterAmount} />
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
  } else {
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

export default ButtonWater;
