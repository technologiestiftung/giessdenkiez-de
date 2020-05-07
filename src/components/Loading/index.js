import React, {Component} from 'react';
import styled from 'styled-components';

import LoadingIcon from '../LoadingIcon/';

const LoadingDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background: white;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;

  &.off {
      transition: opacity .25s ease-in-out;
      opacity: 0;
  }

  div {
      text-align: center;
      margin: 0 auto;

      h2 {
          margin-bottom: 5px;
          color: ${props => props.theme.colorTextDark};
          font-size: ${props => props.theme.fontSizeXxl};
      }

      span {
          color: ${props => props.theme.colorTextLight};
      }
  }
`

const StyledSpan = styled.span`
  margin-top: 20px;
  font-size: 1rem;
`;

const Loading = (props) => {
  if (props.show) {
      return ( null ) 
  } else if (!props.show) {
      return <LoadingDiv>
        <div>
            <LoadingIcon text='Lade Berlins Bäume ...' />
        </div>
      </LoadingDiv>
  }
}

export default Loading;