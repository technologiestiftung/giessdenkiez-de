import React from 'react';
import styled from 'styled-components';

const SpinnerDiv = styled.div`
  width: 15px;
  height: 15px;
  transform: translateY(3px);
  margin-right: 10px;

  position: relative;
  float: left;

  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #37de8a;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 2s infinite ease-in-out;
    animation: sk-bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const Spinner = _p => {
  return (
    <SpinnerDiv>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </SpinnerDiv>
  );
};

export default Spinner;
