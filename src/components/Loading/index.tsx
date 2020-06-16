import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { isMobile } from 'react-device-detect';

import LoadingIcon from '../LoadingIcon/';
import content from '../../assets/content';

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
    transition: opacity 0.25s ease-in-out;
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
`;

// const StyledLabel = styled.span`
//   font-size: ${p => p.theme.fontSizeM};
//   opacity: 0.66;
// `;

const Loading = (props: { show?: any }) => {
  const { loading } = content;
  // const { disclaimer } = intro;
  const { snippets } = loading;
  const [current, setCurrent] = useState(0);
  const maxIndex = snippets.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === maxIndex) {
        setCurrent(0);
      } else {
        setCurrent(current => current + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [current, maxIndex]);

  if (props.show) {
    return null;
  } else {
    return (
      <LoadingDiv>
        <div>
          <LoadingIcon text={snippets[current]} />
        </div>
      </LoadingDiv>
    );
  }
};

export default Loading;
