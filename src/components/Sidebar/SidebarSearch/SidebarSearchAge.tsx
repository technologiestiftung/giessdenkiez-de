import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';
import ButtonRound from '../../../components/ButtonRound';
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

const SpinnerDiv = styled.div`
  font-size: .8rem;
  font-weight: lighter;
  padding-top: 7px;
  padding-left: 5px;
  padding-right: 5px; 
  float: left;
`;

const UpArrow = styled.div`
  cursor: pointer;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`

const DownArrow = styled.div`
  cursor: pointer;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`

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
  const maxAge = 320;

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxAge);

  const minRef = useRef(null)
  const maxRef = useRef(null)

  useEffect(() => {
    if (!ageRange) return;

    setMin(ageRange[0]);
    setMax(ageRange[1]);
  }, [ageRange]);

  if (!ageRange) return null;

  const handleMinChange = newValue => {
    if (newValue >= 0 && newValue <= maxAge) {
      setMin(newValue);
      if (newValue > max) {
        setMax(newValue);
        setAgeRange([newValue, newValue]);
      } else {
        setAgeRange([newValue, max]);
      }
    }
  }

  const handleMaxChange = newValue => {
    if (newValue >= 0 && newValue <= maxAge) {
      setMax(newValue);
      if (newValue < min) {
        setMin(newValue);
        setAgeRange([newValue, newValue]);          
      } else {
        setAgeRange([min, newValue]);
      }
    }    
  }

  const UpHandler = ({ fun, value }) => (
    <UpArrow onClick={() => fun(parseInt(value()) + 1)} />
  )

  const DownHandler = ({ fun, value }) => (
    <DownArrow onClick={() => fun(parseInt(value()) - 1)} />
  )
  
  const MinInputField = () => (
    <InputNumber ref={minRef} id={"minAgeField"} style={{ width: "80px", float: "left" }}
      defaultValue={min} min={0} max={maxAge} value={min} 
      step={1}
      upHandler={<UpHandler fun={handleMinChange} value={() => minRef.current.value} />}
      downHandler={<DownHandler fun={handleMinChange} value={() => minRef.current.value} />}
      onBlur={() => {
        const newValue = minRef.current.value;
        handleMinChange(newValue);
    }}/> 
  )

  const MaxInputField = () => (
    <InputNumber ref={maxRef} id={"maxAgeField"} style={{ width: "80px", float: "left" }} 
      defaultValue={max} value={max} min={0} max={maxAge} 
      step={1}
      upHandler={<UpHandler fun={handleMaxChange} value={() => maxRef.current.value} />}
      downHandler={<DownHandler fun={handleMaxChange} value={() => maxRef.current.value} />}
      onBlur={() => {
        const newValue = maxRef.current.value;
        handleMaxChange(newValue)
    }}/>
  )

  return (
    <FilterAgeDiv>
      <ButtonRound
        margin='15px'
        onClick={() => {
          setMin(4);
          setMax(15);
          setAgeRange([4, 15]);
        }}
        type='secondary'
      >
        Gießbedürftige Bäume anzeigen
      </ButtonRound>
      <ButtonRound
        margin='15px'
        onClick={() => {
          setMin(0);
          setMax(320);
          setAgeRange([0, 320]);
        }}
        type='secondary'
      >
        Alle Bäume anzeigen
      </ButtonRound>
      <TileHeadline>
        <SpinnerDiv>von </SpinnerDiv>
        <MinInputField />
        <SpinnerDiv> bis </SpinnerDiv>
        <MaxInputField />
        <SpinnerDiv> Jahre</SpinnerDiv>
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
