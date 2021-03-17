import React, { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadCommunityData } from '../../state/Actions';
import { useStoreState } from '../../state/unistore-hooks';
import store from '../../state/Store';
import {
  createAPIUrl,
  isTreeAdopted,
  requests,
  waitFor,
  loadCommunityData as loadCommunityD,
} from '../../utils';
import { useAuth0 } from '../../utils/auth/auth0';
import ButtonRound from '../ButtonRound';
import CardParagraph from '../Card/CardParagraph';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import Login from '../Login';
import ButtonWaterGroup from './BtnWaterGroup';
import { ParticipateButton } from '../ParticipateButton';
import { SelectedTreeType, Tree } from '../../common/interfaces';

const loadCommunityDataAction = store.action(loadCommunityData(store));

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLogin = styled(Login)`
  cursor: pointer;
  align-self: stretch;
`;

const adoptTree = async (
  id: string,
  token: string,
  userId: string
): Promise<Tree> => {
  const url = createAPIUrl(`/post`);

  await requests(url, {
    token,
    override: {
      method: 'POST',
      body: JSON.stringify({ tree_id: id, uuid: userId, queryType: 'adopt' }),
    },
  });

  const res = await requests<{ data: Tree[] }>(
    createAPIUrl(`/get?&queryType=byid&id=${id}`)
  );
  const tree = res.data[0];

  tree.radolan_days = (tree.radolan_days || []).map(
    (d: number): number => d / 10
  ) as number[];

  tree.radolan_sum = (tree.radolan_sum || 0) / 10;

  const adopted = await isTreeAdopted({
    id,
    uuid: userId,
    token,
    isAuthenticated: !!userId,
    store,
  });

  return { ...tree, adopted };
};

const ButtonWater: FC = () => {
  const { selectedTree } = useStoreState('selectedTree');
  const { selectedTreeState } = useStoreState('selectedTreeState');
  const { user: userdata } = useStoreState('user');
  const { treeAdopted } = useStoreState('treeAdopted');

  const [waterGroup, setWaterGroup] = useState('visible');
  const { user, isAuthenticated, getTokenSilently } = useAuth0();
  const [adopted] = useState(false);

  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState<boolean | undefined>(
    undefined
  );

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

  const waterTree = async (id, amount, username) => {
    try {
      store.setState({ selectedTreeState: 'WATERING' });
      const token = await getTokenSilently();
      const urlPostWatering = createAPIUrl(`/post`);

      await requests<undefined, { method: 'POST'; body: string }>(
        urlPostWatering,
        {
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
        }
      );
      const geturl = createAPIUrl(`/get?id=${id}&queryType=byid`);
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
          createAPIUrl(`/get?queryType=lastwatered&id=${id}`)
        );
        store.setState({ treeLastWatered: jsonWatered.data });
        await waitFor(500, () => {
          const url = createAPIUrl(`/get?queryType=watered`);
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

  const setWaterAmount = (id: string, amount: number) => {
    setWaterGroup('watered');
    waterTree(id, amount, userdata.username);

    setTimeout(() => {
      setWaterGroup('visible');
    }, 1000);
  };

  const onAdoptClick = async () => {
    store.setState({ selectedTreeState: 'ADOPT' });
    const token = await getTokenSilently();
    await adoptTree(selectedTree.id, token, user.sub)
      .then(tree =>
        store.setState({
          selectedTreeState: 'ADOPTED',
          selectedTree: tree as SelectedTreeType,
        })
      )
      .then(() => loadCommunityD())
      .then(store.setState)
      .catch(console.error);
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
                  toggle={onAdoptClick}
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
            <ParticipateButton />
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
      <div>
        <StyledLogin width='-webkit-fill-available' />
        <ParticipateButton />
      </div>
    );
  }
};

export default ButtonWater;
