import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import Icon from '../Icons';
import { WateringType } from '../../common/interfaces';
import SmallParagraph from '../SmallParagraph';

const Wrapper = styled.div`
  display: flex;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const WateringInfoWrapper = styled.div`
  display: flex;
  width: 50%;
`;

const WateringInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LitersAmountNumber = styled.span`
  font-size: ${p => p.theme.fontSizeXl};
  font-weight: bold;
`;

const WateredTreesIndicator: FC<{ waterings: WateringType[] }> = ({
  waterings,
}) => {
  const [liters, setLiters] = useState(0);
  const [times, setTimes] = useState(0);

  useEffect(() => {
    const sumReducer = (acc: number, curr: WateringType) => acc + curr.amount;
    setTimes(waterings.length);
    setLiters(waterings.reduce(sumReducer, 0));
  }, [waterings]);

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
    <Wrapper>
      {progressItems.map(item => (
        <WateringInfoWrapper key={item.id}>
          <Icon iconType={item.id === 'timesSpend' ? 'trees' : 'water'} />
          <WateringInfoContent>
            <LitersAmountNumber>
              {item.id === 'liters' ? liters : times}
            </LitersAmountNumber>
            <SmallParagraph>{item.label}</SmallParagraph>
          </WateringInfoContent>
        </WateringInfoWrapper>
      ))}
    </Wrapper>
  );
};

export default WateredTreesIndicator;
