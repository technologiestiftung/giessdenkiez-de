import React from 'react';
import styled from 'styled-components';

import Spinner from '../../Spinner/';

const SidebarLoadingCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 3;
  height: auto;
  margin-top: 20px;
  padding: ${props => props.theme.spacingM};
  width: 100%;
  border-radius: ${props => props.theme.borderRadiusS};
  margin-bottom: 10px;
  background: white;
`;

const SidebarLoadingCard = p => {
  const { state } = p;

  return (
    <SidebarLoadingCardDiv>
      <Spinner/>
      <span>Lade Informationen</span>
    </SidebarLoadingCardDiv>
  )
}

export default SidebarLoadingCard;
