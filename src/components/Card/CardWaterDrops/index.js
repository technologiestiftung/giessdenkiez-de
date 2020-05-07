import React from 'react';
import styled from 'styled-components';

const Icon = p => {
  return (
    <svg width="9px" height="14px" viewBox="0 0 9 14">
      <g id="water-drop" fill="#75ADE8">
          <path d="M4.5,14 C6.98528137,14 9,11.8235471 9,9.13875632 C9,6.45396557 4.5,0 4.5,0 C4.5,0 0,6.45396557 0,9.13875632 C0,11.8235471 2.01471863,14 4.5,14 Z" id="water-drop-path"></path>
      </g>
    </svg>
  )
}

const IconWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;

  svg {
    margin-right: 5px;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledLabel = styled.span`
  font-size: ${p => p.theme.fontSizeM};
  font-weight: bold;
`;

const CardWaterDrops = p => {
  const { data, liters } = p;
  return (
    <FlexRow>
      {data && (<IconWrapper>
        <StyledLabel>{liters} Liter</StyledLabel>
      </IconWrapper>)}
    </FlexRow>
  )
}

export default CardWaterDrops;