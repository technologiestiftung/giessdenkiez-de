import React from 'react';
import styled from 'styled-components';

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const DescriptionSpan = styled.span`
    opacity: .3;
    margin-bottom: 2px;
`

const SublineSpanDesc = styled.span`
    margin-bottom: 10px;
`

const Property = p => {
  const { value, name } = p;

  return (
    <FlexColumnDiv>
        <DescriptionSpan>{name}</DescriptionSpan>
        <SublineSpanDesc>{value}</SublineSpanDesc>
    </FlexColumnDiv>
  )
}

export default Property;