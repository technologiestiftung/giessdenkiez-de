import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import CardHeadline from '../../Card/CardHeadline/';
import CardDescription from '../../Card/CardDescription/';

const Flex = styled.div`
  display: flex;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  background: red;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;


const CardProgress = p => {
  const { data } = p;
  const [liters, setLiters] = useState(0);
  const [times, setTimes] = useState(0);

  useEffect(() => {
    const sumReducer = (acc, curr) => acc + parseInt(curr.amount);
    setTimes(data.length);
    setLiters(data.reduce(sumReducer, 0));
  }, [])
  
  const progressItems = [
    {
      icon: 'here',
      label: 'mal gegossen',
      id: 'timesSpend'
    },
    {
      icon: 'here',
      label: 'Liter gegossen.',
      id: 'liters'
    },
  ];
  return (
    <Flex>
      {progressItems.map(item => (
        <Flex>
          <Icon />
          <FlexColumn>
            <CardHeadline>{item.id === 'liters' ? liters : times}</CardHeadline>
            <CardDescription>{item.label}</CardDescription>
          </FlexColumn>
        </Flex>
      ))}
    </Flex>
  )
}

export default CardProgress;