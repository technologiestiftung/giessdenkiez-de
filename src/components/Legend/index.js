import React, { Component } from 'react';
import styled from 'styled-components';
import { interpolateColor } from "../../utils/";

import CardDescription from "../Card/CardDescription/";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const TileHeadline = styled.span`
  opacity: 1;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  transform: translateX(-4px);
`;

const LegendDot = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 100px;
  margin-right: 5px;
  background-color: ${(p) => p.color};
`;

const StrokedLegendDot = styled(LegendDot)`
  background: none;
  width: 10px;
  height: 10px;
  border: 2px solid ${ p => p.theme.colorTextDark };
`;

const ItemLabel = styled.label`
  font-size: ${(p) => p.theme.fontSizeL};
  opacity: 0.66;
  padding-top: 5px;
  width: 100%;
`;

const StyledItemLabel = styled(ItemLabel)`
  width: auto;
  padding: 0;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const UnstyledFlex = styled(Flex)`
  border-bottom: none;
  margin-bottom: 0;
`;

const UnstyledFlexWidth = styled(UnstyledFlex)`
  border-bottom: none;
  width: auto;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const LegendDiv = styled.div`
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    font-size: 12px;
    box-shadow: ${p => p.theme.boxShadow};
    height: auto;
    padding: 10px 13px 5px 15px;
    width: 210px;
    background: white;
`

const StyledCardDescription = styled(CardDescription)`
  font-weight: bold;
  font-size: 1rem;
  opacity: 1;
`;

const StyledCardDescriptionSecond = styled(CardDescription)`
  padding-top: 5px;
  margin-bottom: 15px;
`;

const legendArray = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "40",
    value: 40,
  },
  {
    label: "60",
    value: 60,
  },
  {
    label: "80",
    value: 80,
  },
  {
    label: "100",
    value: 100,
  },
];

const Legend = () => {
  return (
    <LegendDiv>
      <UnstyledFlex>
        <StyledCardDescription>Erhaltene Wassermenge</StyledCardDescription>
        <StyledCardDescriptionSecond>
          der letzten 30 Tage aus Regen & Gießungen in Liter.
        </StyledCardDescriptionSecond>
        {legendArray.map((item) => (
          <>
            <ItemContainer>
              <LegendDot color={interpolateColor(item.value)} />
              <ItemLabel>{item.label}</ItemLabel>
            </ItemContainer>
          </>
        ))}
      </UnstyledFlex>
      <UnstyledFlex>
        <UnstyledFlexWidth>
          <LegendDot color={'#2c303b'} />
          <StyledItemLabel>Baum</StyledItemLabel>
        </UnstyledFlexWidth>
        <UnstyledFlexWidth>
          <StrokedLegendDot />
          <StyledItemLabel>Öffentl. Pumpe</StyledItemLabel>
        </UnstyledFlexWidth>
      </UnstyledFlex>
    </LegendDiv>
  )
}

export default Legend;