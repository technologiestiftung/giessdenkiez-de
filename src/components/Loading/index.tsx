import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import LoadingIcon from '../LoadingIcon/';
import { ImprintAndPrivacy } from '../ImprintAndPrivacy';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

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

const Loading: FC<{ show?: boolean }> = ({ show }) => {
  const { loading } = useLocalizedContent();
  const { snippets } = loading;

  // const { disclaimer } = intro;
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

  if (show) {
    return null;
  } else {
    return (
      <LoadingDiv>
        <div>
          <LoadingIcon text={snippets[current]} />
          <ImprintAndPrivacy />
        </div>
      </LoadingDiv>
    );
  }
};

export default Loading;
