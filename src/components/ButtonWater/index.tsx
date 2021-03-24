import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ButtonWaterGroup } from '../../common/types';
import { useTreeData } from '../../utils/hooks/useTreeData';

import ButtonRound from '../ButtonRound';
import CardParagraph from '../Card/CardParagraph';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import Login from '../Login';
// import ButtonWaterGroup from './BtnWaterGroup';
import { ParticipateButton } from '../ParticipateButton';

import { buttonLabels, getButtonLabel } from './button-water-label-maker';
// import { adoptTree } from '../../utils/requests/adoptTree';
// import { waterTree } from '../../utils/requests/waterTree';
// import { useTreeData } from '../../utils/hooks/useTreeData';

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BtnWaterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;
const StyledLogin = styled(Login)`
  cursor: pointer;
  align-self: stretch;
`;

export interface ButtonWaterProps {
  // user: User;
  isAuthenticated?: boolean;
  // token: string;
  isEmailVerified: boolean;
  onAdoptTreeClick: () => Promise<void>;
  onWaterTreeClick: (treeId: string, amount: number) => Promise<void>;
  waterGroup: ButtonWaterGroup;
  setWaterGroup: React.Dispatch<React.SetStateAction<ButtonWaterGroup>>;
}
// =======
// const getButtonLabel = (state: string) => {
//   switch (state) {
//     case 'visible':
//       return 'Ich habe gegossen!';

//     case 'watering':
//       return 'Wieviel Wasser?';

//     case 'watered':
//       return 'Begießung wurde eingetragen.';

//     default:
//       return;
//   }
// };

// const ButtonWater: FC = () => {
//   const userdata = useStoreState('user');
//   const [waterGroup, setWaterGroup] = useState('visible');

//   const { user, isAuthenticated, getTokenSilently } = useAuth0();
//   const isEmailVerified = user && user.email_verified;

//   const onButtonWaterClick = async (id: string, amount: number) => {
//     if (!userdata) return;
//     setWaterGroup('watered');
//     const token = await getTokenSilently();
//     await waterTree({
//       id,
//       amount,
//       username: userdata.username,
//       userId: user.sub,
//       token,
//     });

//     invalidate();
//     setWaterGroup('visible');
//   };

//   const onAdoptClick = async () => {
//     if (!treeId) return;
//     setIsAdopting(true);
//     const token = await getTokenSilently();
//     await adoptTree(treeId, token, user.sub);
//     const communityData = await getCommunityData();
//     store.setState(communityData);
//     invalidate();
//     setIsAdopting(false);
//   };
// >>>>>>> bcd0547b653aa3fe3848547ebbb3ceead657a918

const ButtonWater: FC<ButtonWaterProps> = ({
  onAdoptTreeClick,
  onWaterTreeClick,
  isEmailVerified,
  isAuthenticated,
  waterGroup,
  setWaterGroup,
}) => {
  const [isAdopting, setIsAdopting] = useState<boolean>(false);
  const { treeId, treeData, invalidate } = useTreeData();
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
          <ButtonRound
            margin='15px'
            onClick={() => {
              // TODO: The unadopt button is not showing anymore
              if (!treeId) return;
              setIsAdopting(true);
              onAdoptTreeClick().catch(console.error);
              invalidate();
              setIsAdopting(false);
            }}
            type='secondary'
          >
            {treeData && !isAdopting && 'Baum adoptieren'}
            {treeData && isAdopting && 'Adoptiere Baum ...'}
          </ButtonRound>
        </BtnContainer>
      )}
      <ButtonRound
        width='-webkit-fill-available'
        onClick={() => setWaterGroup('watering')}
        type='primary'
      >
        {getButtonLabel(waterGroup)}
      </ButtonRound>
      {waterGroup === 'watering' && treeId && (
        <BtnWaterContainer>
          {buttonLabels.map(btn => {
            return (
              <ButtonRound
                key={`${btn.amount}`}
                width='fit-content'
                onClick={() => {
                  // TODO: Need to fix the watering of the tree
                  alert('Trees should get water. Needs a fix');
                  onWaterTreeClick(treeId, btn.amount).catch(console.error);
                }}
                type='primary'
              >
                {btn.label}
              </ButtonRound>
            );
          })}
        </BtnWaterContainer>
      )}
      <ParticipateButton />
    </>
  );
};

export default ButtonWater;
