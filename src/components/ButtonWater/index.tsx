import React, { FC } from 'react';
import styled from 'styled-components';
import { StoreProps } from '../../common/interfaces';
import { ButtonWaterGroup } from '../../common/types';

import ButtonRound from '../ButtonRound';
import CardParagraph from '../Card/CardParagraph';
import { NonVerfiedMailCardParagraph } from '../Card/non-verified-mail';
import Login from '../Login';
// import ButtonWaterGroup from './BtnWaterGroup';
import { ParticipateButton } from '../ParticipateButton';

const btnArray: { label: string; amount: number }[] = [
  {
    label: '5l',
    amount: 5,
  },
  {
    label: '10l',
    amount: 10,
  },
  {
    label: '25l',
    amount: 25,
  },
  {
    label: '50l',
    amount: 50,
  },
];

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

export type WaterGroup = 'visible' | 'watered' | 'watering';

const getButtonLabel = (state: WaterGroup) => {
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

export interface ButtonWaterProps {
  // user: User;
  isAuthenticated?: boolean;
  // token: string;
  isEmailVerified: boolean;
  isSelectedTreeAdopted?: boolean;
}

const ButtonWater: FC<ButtonWaterProps> = ({
  adoptTreeClickHandler,
  waterTreeClickHandler,
  isEmailVerified,
  isAuthenticated,
  waterGroup,
  setWaterGroup,
  isSelectedTreeAdopted,
}) => {
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
      {!treeAdopted && (
        <BtnContainer>
          <ButtonRound
            margin='15px'
            onClick={() => {
              onAdoptClick();
              adoptTreeClickHandler().catch(console.error);
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
        onClick={() => setWaterGroup('watering')}
        type='primary'
      >
        {getButtonLabel(waterGroup)}
      </ButtonRound>
      {waterGroup === 'watering' && selectedTreeId && (
        <BtnWaterContainer>
          {btnArray.map(btn => {
            return (
              <ButtonRound
                key={`${btn.amount}`}
                width='fit-content'
                onClick={() => {
                  onButtonWaterClick(selectedTreeId, btn.amount);
                  waterTreeClickHandler(selectedTreeId, btn.amount).catch(
                    console.error
                  );
                }}
                type='primary'
              >
                {btn.label}
              </ButtonRound>
            );
          })}
        </BtnWaterContainer>
        // <ButtonWaterGroup id={selectedTreeId} onClick={onButtonWaterClick} />
      )}
      <ParticipateButton />
    </>
  );
};

export default ButtonWater;
