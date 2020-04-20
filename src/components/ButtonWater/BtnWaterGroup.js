import React from 'react';
import styled from 'styled-components';

import ButtonRound from '../ButtonRound/';

const BtnWaterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const btnArray = [
  {
    label: '5 l',
    id: 5
  },
  {
    label: '10 l',
    id: 10
  },
  {
    label: '25 l',
    id: 25
  },
  {
    label: '50 l',
    id: 50
  },
];

const BtnWaterGroup = p => {
  const { toggle, id } = p;
  return (
    <BtnWaterContainer>
      { btnArray.map(btn => {
        return (
          <ButtonRound toggle={() => {toggle(id, btn.id) }} type="primary">{btn.label}</ButtonRound>
        )
      }) }
    </BtnWaterContainer>
  )
}

export default BtnWaterGroup;