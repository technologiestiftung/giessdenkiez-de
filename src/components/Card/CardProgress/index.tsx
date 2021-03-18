import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import CardHeadline from '../../Card/CardHeadline/';
import CardDescription from '../../Card/CardDescription/';
import Icon from '../../Icons';
import { WateredDayType } from '../../../common/interfaces';

const FlexOuter = styled.div`
  display: flex;
  width: 50%;
`;

const StyledCardDescription = styled(CardDescription)`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardProgress: FC<{ trees: WateredDayType[] }> = ({ trees }) => {
  const [liters, setLiters] = useState(0);
  const [times, setTimes] = useState(0);

  useEffect(
    () => {
      const sumReducer = (acc: number, curr: WateredDayType) =>
        acc + parseInt(curr.amount);
      setTimes(trees.length);
      setLiters(trees.reduce(sumReducer, 0));
    },
    [...trees] as WateredDayType[]
  );

  const progressItems = [
    {
      icon: 'here',
      label: 'mal gegossen',
      id: 'timesSpend',
    },
    {
      icon: 'here',
      label: 'Liter gegossen.',
      id: 'liters',
    },
  ];

  return (
    <Flex>
      {progressItems.map(item => (
        <FlexOuter key={item.id}>
          <Icon iconType={item.id === 'timesSpend' ? 'trees' : 'water'} />
          <FlexColumn>
            <CardHeadline>{item.id === 'liters' ? liters : times}</CardHeadline>
            <StyledCardDescription>{item.label}</StyledCardDescription>
          </FlexColumn>
        </FlexOuter>
      ))}
    </Flex>
  );
};

export default CardProgress;
