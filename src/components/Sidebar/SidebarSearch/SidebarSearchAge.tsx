import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import { useStoreState, useActions } from '../../../state/unistore-hooks';

const FilterAgeDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: auto;
  padding: 0 0 5px 5px;
  width: 100%;
  margin-bottom: 10px;
  background: white;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 30px;
`;

const TileHeadline = styled.span`
  opacity: 1;
  font-size: 16px;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 10px;
  transform: translateX(-4px);
`;

const SidebarAgeRange: React.FC = () => {
  const ageRange = useStoreState('ageRange');

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);
  const { setAgeRange } = useActions();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(320);

  useEffect(() => {
    if (!ageRange) return;

    setMin(ageRange[0]);
    setMax(ageRange[1]);
  }, [ageRange]);

  if (!ageRange) return null;

  return (
    <FilterAgeDiv>
      <TileHeadline>
        {min} - {max} Jahre
      </TileHeadline>
      <FlexRowDiv>
        <Range
          min={0}
          max={320}
          marks={{ 0: 0, 80: 80, 160: 160, 240: 240, 320: 320 }}
          onAfterChange={arr => {
            setMin(arr[0]);
            setMax(arr[1]);
            setAgeRange([arr[0], arr[1]]);
          }}
          defaultValue={ageRange}
        />
      </FlexRowDiv>
    </FilterAgeDiv>
  );
};

export default SidebarAgeRange;
