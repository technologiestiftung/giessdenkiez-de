import React, {useEffect} from 'react';
import styled from 'styled-components';
import { interpolateColor } from '../../../utils/';
import Store from '../../../state/Store';
import { connect } from "unistore/react";
import Actions from '../../../state/Actions';

import CardDescription from '../CardDescription/';

const StyledCardDescription = styled(CardDescription)`
  font-weight: bold;
  opacity: 1;
`;

const StyledCardDescriptionSecond = styled(CardDescription)`
  margin-bottom: 10px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Btn = styled.span`
  font-size: .8rem;
  margin-right: 10px;
  opacity: ${p => p.active ? 1 : .5};
  cursor: pointer;
`;

const LegendDot = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 100px;
  margin-right: 5px;
  background-color: ${p => p.color}
`;

const ItemLabel = styled.label`
  font-size: ${p => p.theme.fontSizeL};
  opacity: .66;
  margin-right: 15px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
`;

const Cardlegend = p => {
  const {treesVisible, rainVisible} = p;
  const legendArray = [
    {
      label: '< 10',
      value: 10,
    },
    {
      label: '< 20',
      value: 20,
    },
    {
      label: '< 30',
      value: 30,
    },
    {
      label: '< 40',
      value: 40,
    },
    {
      label: '< 50',
      value: 50,
    },
    {
      label: '< 60',
      value: 60,
    },
    {
      label: '< 70',
      value: 70,
    },
    {
      label: '< 80',
      value: 80,
    },
    {
      label: '< 90',
      value: 90,
    },
    {
      label: '100',
      value: 100,
    },
  ];

  useEffect(() => {
    console.log(interpolateColor(50), 'interpolate')
  }, [])
  
  return (
    <>
      <Flex>
        <StyledCardDescription>Erhaltene Wassermenge</StyledCardDescription>
        <StyledCardDescriptionSecond>der letzten 30 Tage aus Regen & Gießungen</StyledCardDescriptionSecond>
        {legendArray.map(item => (
          <>
          <ItemContainer>
            <LegendDot color={interpolateColor(item.value)} />
            <ItemLabel>{item.label}</ItemLabel>
          </ItemContainer>
          </>
        ))}
      </Flex>
      <Flex>
        <Btn class="btn" active={rainVisible} onClick={() => {Store.setState({ rainVisible: !rainVisible })}}>Regen</Btn>
        <Btn class="btn" active={treesVisible} onClick={() => {Store.setState({ treesVisible: !treesVisible })}}>Bäume</Btn>
      </Flex>
    </>
  )
}


export default connect(state => ({
	treesVisible: state.treesVisible,
	rainVisible: state.rainVisible,
}), Actions)(Cardlegend);