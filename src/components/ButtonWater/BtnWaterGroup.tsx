import React, { FC } from 'react';
import styled from 'styled-components';

import ButtonRound from '../ButtonRound';

const BtnWaterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const btnArray = [
  {
    label: '5l',
    id: 5,
  },
  {
    label: '10l',
    id: 10,
  },
  {
    label: '25l',
    id: 25,
  },
  {
    label: '50l',
    id: 50,
  },
];
/**
 *
 * @deprecated
 */
const BtnWaterGroup: FC<{
  onClick: (id: string, btnId: number) => void;
  id: string;
}> = ({ onClick, id }) => (
  <BtnWaterContainer>
    {btnArray.map(btn => {
      return (
        <ButtonRound
          key={`${btn.id}`}
          width='fit-content'
          onClick={() => {
            onClick(id, btn.id);
          }}
          type='primary'
        >
          {btn.label}
        </ButtonRound>
      );
    })}
  </BtnWaterContainer>
);

export default BtnWaterGroup;
