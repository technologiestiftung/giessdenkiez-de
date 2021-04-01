import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  x: number;
  y: number;
}
interface StyledProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const StyledSpan = styled.span`
  padding: 1rem 1rem 0.2rem 1rem;
  margin: 2rem auto;
  color: ${props => props.theme.colorTextLight};
`;
const Bubble = styled.div<StyledProps>`
  height: 30px;
  line-height: 30px;
  font-size: ${props => props.theme.fontSizeL};
  box-sizing: border-box;
  box-shadow: rgba(51, 51, 102, 0.5) 2px 2px 2px;
  font-family: ${props => props.theme.fontFamily};
  position: absolute;
  z-index: 10;
  pointer-events: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  left: ${props => props.x - props.width / 2 - 3}px;
  top: ${props => props.y - 45}px;
  background-color: #ffffff;
  margin: 0 auto;
  &::after {
    transform: rotate(45deg);
    border-width: 7px;
    border-style: solid;
    border-color: transparent #fff #fff transparent;
    content: '';
    position: absolute;
    bottom: -6px;
    left: 48%;
    box-shadow: rgba(51, 51, 102, 0.5) 2px 2px 2px;
  }
`;

export const Tooltip: React.FC<TooltipProps> = ({ children, x, y }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref) return;
    const w = ref.current ? ref.current?.offsetWidth : 0;
    const h = ref.current ? ref.current?.offsetHeight : 0;
    setWidth(w);
    setHeight(h);
  }, [ref]);

  return (
    <>
      <div>
        <Bubble
          className='tooltip'
          ref={ref}
          x={x}
          y={y}
          width={width}
          height={height}
        >
          <StyledSpan>{children}</StyledSpan>
        </Bubble>
      </div>
    </>
  );
};
