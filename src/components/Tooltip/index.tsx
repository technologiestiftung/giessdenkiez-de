import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

export interface HoverObjectProps {
  data: any;
  pointer: number[];
}
interface StyledProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Bubble = styled.div<StyledProps>`
  height: ${props => props.height + "px"};
  width: ${props => props.width + "px"};
  font-size: ${props => props.theme.fontSizeXL};
  box-sizing: border-box;
  box-shadow: rgba(51, 51, 102, 0.5) 2px 2px 2px;
  font-family: ${props => props.theme.fontFamily};
  position: absolute;
  padding: 10px 10px 10px 10px;
  z-index: 10;
  pointer-events: none;
  display: inline-block;
  text-align: left;
  vertical-align: left;
  left: ${props => props.pointer[0] - (props.width / 2-3)}px;
  top: ${props => props.pointer[1] - props.height  - 15}px;
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

export const HoverObject: React.FC<HoverObjectProps> = ({
  data,
  pointer,
}) => {
  const refBubble = useRef<HTMLDivElement | null>(null);
  const [widthBubble, setWidthBubble] = useState(0);
  const [heightBubble, setHeightBubble] = useState(0);

  useEffect(() => {
    if (!refBubble) return;
    const w = refBubble.current ? 300 : 0;
    const allHintLength = data.hints.reduce((all, hint) => all + hint, "").length
    const h = refBubble.current ? Math.round(200 + (allHintLength * 0.32)) : 0;
    setWidthBubble(w);
    setHeightBubble(h);
  }, [refBubble.current]);

  return (
    <>
      <div key={`${data.name}-${data.created}`}>
        <Bubble
          ref={refBubble}
          pointer={pointer}
          width={widthBubble}
          height={heightBubble}
        >
          <div>
            <b>Bereitsteller*in:</b> {data.name}<br />
            <b>Adresse:</b> {data.address}<br />
            <b>Eingetragen am:</b> {data.created}<br />
            { data.hints && data.hints.length > 0 && (
              <><b>Hinweise:</b><ul>
                { data.hints.map((hint, index) => (
                  <li key={`${data.name}-${data.created}-${index}`}>{hint}</li>
                ))}
              </ul></>
            )}
          </div>
        </Bubble>
      </div>
    </>
  );
};
