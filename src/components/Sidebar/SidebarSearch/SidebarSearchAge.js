import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import Actions, { getTreeByAge } from '../../../state/Actions';
import Store from '../../../state/Store';
import { connect } from 'unistore/react';

const getTreeByAgeAction = Store.action(getTreeByAge(Store));

const FilterAgeDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: auto;
  margin-top: 10px;
  padding: ${props => props.theme.spacingM};
  width: 260px;
  border-radius: ${props => props.theme.borderRadiusS};
  margin-bottom: 10px;
  background: white;
  box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
`

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonWaterSpan = styled.span`
  padding: 6px;
  cursor: pointer;
  width: 70px;
  margin-left: 30px;
  background: ${props => props.theme.colorPrimary};
  transition: background ${props => props.theme.timeS} ease-in-out;
  border-radius: ${props => props.theme.borderRadiusS};
  text-align: center;
  font-size: ${props => props.theme.fontSizeL};
  transform: translateY(-3px);

  &:hover {
      background: ${props => props.theme.colorPrimaryHover};
      transition: background ${props => props.theme.timeS} ease-in-out;
  }
`

const TileHeadline = styled.span`
  opacity: 1;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  transform: translateX(-4px);
`;


const TreesCountSpan = styled.span`
  transform: translateX(-4px);
  margin-top: 10px;
  opacity: .5;
  font-size: 12px;
`;

const SidebarAgeRange = p => {
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(320);

  const range = [0,300]
  return (
    <FilterAgeDiv>
        <TileHeadline>Pflanzalter: {min} - {max} Jahre</TileHeadline>
        <FlexRowDiv>
            <Range
                min={0}
                max={320}
                marks={{ 0: 0, 80: 80, 160: 160, 240: 240, 320: 320 }} 
                onChange={(arr) => { setMin(arr[0]); setMax(arr[1]); }}
                onAfterChange={(arr) => { setMin(arr[0]); setMax(arr[1]); }}
                defaultValue={[min, max]}
            />
            <ButtonWaterSpan onClick={() => { getTreeByAgeAction(2010,2012) }}>Filter</ButtonWaterSpan>
        </FlexRowDiv>
        <TreesCountSpan>treesCount</TreesCountSpan>
    </FilterAgeDiv>
  )
}

export default connect(state => ({
isLoading: state.isLoading,
}), Actions)(SidebarAgeRange);