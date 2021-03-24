import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ButtonWaterGroup } from '../../common/types';

import ButtonRound from '../ButtonRound';
import CardParagraph from '../Card/CardParagraph';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import Login from '../Login';
// import ButtonWaterGroup from './BtnWaterGroup';
import { ParticipateButton } from '../ParticipateButton';

import { buttonLabels, getButtonLabel } from './button-water-label-maker';

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
  isTreeAdoptedByUser: boolean;
  treeId: string;
}

const ButtonWater: FC<ButtonWaterProps> = ({
  onAdoptTreeClick,
  onWaterTreeClick,
  isEmailVerified,
  isAuthenticated,
  waterGroup,
  setWaterGroup,
  isTreeAdoptedByUser,
  treeId,
}) => {
  const [isAdopting, setIsAdopting] = useState<boolean>(false);

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
      <BtnContainer>
        <ButtonRound
          margin='15px'
          onClick={() => {
            // TODO: [GDK-84] Unadopting works but it is not showing that Baum adoptieren...
            setIsAdopting(true);
            onAdoptTreeClick().catch(console.error);
            setIsAdopting(false);
          }}
          type='secondary'
        >
          {(() => {
            if (isTreeAdoptedByUser === true) {
              return 'Baum unadoptieren';
            } else {
              return isAdopting ? 'Adoptiere Baum ...' : 'Baum adoptieren';
            }
          })()}
        </ButtonRound>
      </BtnContainer>

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
