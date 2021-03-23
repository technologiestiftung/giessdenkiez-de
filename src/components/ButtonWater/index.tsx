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
      {
        <BtnContainer>
          <ButtonRound
            margin='15px'
            onClick={() => {
              if (isSelectedTreeAdopted) return;
              onAdoptTreeClick().catch(console.error);
            }}
            type='secondary'
          >
            {selectedTreeState !== 'ADOPT' && selectedTreeState !== 'ADOPTED'
              ? 'Baum adoptieren'
              : ''}
            {selectedTreeState === 'ADOPT' ? 'Adoptiere Baum ...' : ''}
            {selectedTreeState === 'ADOPTED' ? 'Baum adoptiert!' : ''}
          </ButtonRound>
        </BtnContainer>
      }
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
