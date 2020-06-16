import React from 'react';
import styled from 'styled-components';

const FlexRowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding-bottom: 5px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const DescriptionSpan = styled.span``;

const SublineSpanDesc = styled.span`
  margin-bottom: 10px;
`;

const CardProperty = p => {
  const { value, name } = p;

  return (
    <FlexRowDiv>
      <DescriptionSpan>{name}</DescriptionSpan>
      <SublineSpanDesc>{value}</SublineSpanDesc>
    </FlexRowDiv>
  );
};

export default CardProperty;
