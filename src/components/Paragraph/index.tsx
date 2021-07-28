import React, { FC } from 'react';
import styled from 'styled-components';

const ParagraphContainer = styled.p`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 1;
  line-height: 150%;
  width: 100%;

  a {
    color: #2c303b;
    transition: opacity 200ms ease-out;
    opacity: 1;
  }
  a:hover {
    opacity: 0.33;
  }
`;

const Paragraph: FC<{ className?: string; onClick?: () => void }> = ({
  children,
  className = '',
  onClick = () => undefined,
}) =>
  typeof children === 'string' ? (
    <ParagraphContainer
      className={className}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  ) : (
    <ParagraphContainer className={className} onClick={onClick}>
      {children}
    </ParagraphContainer>
  );

export default Paragraph;
