import React, { FC } from 'react';
import styled from 'styled-components';

const SmallParagraphContainer = styled.p`
  line-height: 150%;
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  letter-spacing: 0.125px;
  padding: 0;
  margin: 0;
  font-weight: normal;

  a {
    color: ${p => p.theme.colorTextDark};
    transition: opacity 200ms ease-out;
    opacity: 1;
  }
  a:hover {
    opacity: 0.33;
  }
`;

const SmallParagraph: FC<{ className?: string; onClick?: () => void }> = ({
  children,
  className = '',
  onClick = () => undefined,
}) =>
  typeof children === 'string' ? (
    <SmallParagraphContainer
      className={className}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  ) : (
    <SmallParagraphContainer className={className} onClick={onClick}>
      {children}
    </SmallParagraphContainer>
  );

export default SmallParagraph;
