import React from 'react';
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

const BtnWaterGroup = (p: { toggle: any; id: any }) => {
  const { toggle, id } = p;
  return (
    <BtnWaterContainer>
      {btnArray.map((btn, i) => {
        return (
          <ButtonRound
            key={`Btn-water-${i}`}
            width='fit-content'
            toggle={() => {
              toggle(id, btn.id);
            }}
            type='primary'
          >
            {btn.label}
          </ButtonRound>
        );
      })}
    </BtnWaterContainer>
  );
};

export default BtnWaterGroup;
