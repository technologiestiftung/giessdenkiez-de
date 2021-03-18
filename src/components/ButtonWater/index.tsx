import React, { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../state/unistore-hooks';
import store from '../../state/Store';
import { loadCommunityData } from '../../utils';
import { useAuth0 } from '../../utils/auth/auth0';
import ButtonRound from '../ButtonRound';
import CardParagraph from '../Card/CardParagraph';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import Login from '../Login';
import ButtonWaterGroup from './BtnWaterGroup';
import { ParticipateButton } from '../ParticipateButton';
import { SelectedTreeType } from '../../common/interfaces';
import { adoptTree } from '../../utils/requests/adoptTree';
import { waterTree } from '../../utils/requests/waterTree';
import { getTreeData } from '../../utils/requests/getTreeData';

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

  const setWaterAmount = async (id: string, amount: number) => {
    setWaterGroup('watered');
    const token = await getTokenSilently();
    await waterTree({
      id,
      amount,
      username: userdata.username,
      userId: user.sub,
      token,
    });

    const treeData = await getTreeData(id);
    store.setState(treeData);
    setWaterGroup('visible');
  };

  const onAdoptClick = async () => {
    store.setState({ selectedTreeState: 'ADOPT' });
    const token = await getTokenSilently();
    const tree = await adoptTree(selectedTree.id, token, user.sub);
    store.setState({
      selectedTreeState: 'ADOPTED',
      selectedTree: tree as SelectedTreeType,
    });
    const communityData = await loadCommunityData();
    store.setState(communityData);
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
