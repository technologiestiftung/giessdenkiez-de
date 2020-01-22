import React from 'react';
import styled from 'styled-components';

import Spinner from '../../Spinner/';

const SidebarLoadingCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 3;
  height: auto;
  margin-top: 20px;
  width: ${props => props.theme.sidebarTileWidth};
  padding: ${props => props.theme.spacingM};
  width: ${props => props.theme.sidebarTileWidth};
  border-radius: ${props => props.theme.borderRadiusS};
  margin-bottom: 10px;
  background: white;
`;

const SidebarLoadingCard = p => {
  return (
    <SidebarLoadingCardDiv>
      <Spinner/>
      <span>Lade Informationen zum Baum.</span>
    </SidebarLoadingCardDiv>
  )
}

export default SidebarLoadingCard;
