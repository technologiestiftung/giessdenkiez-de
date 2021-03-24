import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../state/unistore-hooks';
import store from '../../state/Store';
import { getCommunityData } from '../../utils/requests/getCommunityData';
import { useAuth0 } from '../../utils/auth/auth0';
import ButtonRound from '../ButtonRound';
import CardParagraph from '../Card/CardParagraph';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import Login from '../Login';
import ButtonWaterGroup from './BtnWaterGroup';
import { ParticipateButton } from '../ParticipateButton';
import { adoptTree } from '../../utils/requests/adoptTree';
import { waterTree } from '../../utils/requests/waterTree';
import { useTreeData } from '../../utils/hooks/useTreeData';

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

const getButtonLabel = (state: string) => {
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

const ButtonWater: FC = () => {
  const userdata = useStoreState('user');
  const [waterGroup, setWaterGroup] = useState('visible');
  const [isAdopting, setIsAdopting] = useState<boolean>(false);
  const { treeId, treeData, invalidate } = useTreeData();

  const { user, isAuthenticated, getTokenSilently } = useAuth0();
  const isEmailVerified = user && user.email_verified;

  const onButtonWaterClick = async (id: string, amount: number) => {
    if (!userdata) return;
    setWaterGroup('watered');
    const token = await getTokenSilently();
    await waterTree({
      id,
      amount,
      username: userdata.username,
      userId: user.sub,
      token,
    });

    invalidate();
    setWaterGroup('visible');
  };

  const onAdoptClick = async () => {
    if (!treeId) return;
    setIsAdopting(true);
    const token = await getTokenSilently();
    await adoptTree(treeId, token, user.sub);
    const communityData = await getCommunityData();
    store.setState(communityData);
    invalidate();
    setIsAdopting(false);
  };

  if (!isAuthenticated) {
    return (
      <div>
        <StyledLogin width='-webkit-fill-available' />
        <ParticipateButton />
      </div>
    );
  }

  if (!isEmailVerified) {
    return (
      <>
        <CardParagraph>
          Bäume adoptieren und wässern ist nur möglich mit verifiziertem
          Account.
        </CardParagraph>
        <NonVerfiedMailCardParagraph></NonVerfiedMailCardParagraph>
      </>
    );
  }

  return (
    <>
      {treeData && treeData.adopted === false && (
        <BtnContainer>
          <ButtonRound margin='15px' toggle={onAdoptClick} type='secondary'>
            {treeData && !isAdopting && 'Baum adoptieren'}
            {treeData && isAdopting && 'Adoptiere Baum ...'}
          </ButtonRound>
        </BtnContainer>
      )}
      <ButtonRound
        width='-webkit-fill-available'
        toggle={() => setWaterGroup('watering')}
        type='primary'
      >
        {getButtonLabel(waterGroup)}
      </ButtonRound>
      {waterGroup === 'watering' && treeId && (
        <ButtonWaterGroup id={treeId} onClick={onButtonWaterClick} />
      )}
      <ParticipateButton />
    </>
  );
};

export default ButtonWater;
