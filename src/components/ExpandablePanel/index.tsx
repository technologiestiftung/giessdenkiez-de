import React, { FC, useState, useEffect, ReactNode } from 'react';
import styled from 'styled-components';
import SmallParagraph from '../SmallParagraph';

const Title = styled.div`
  max-width: 90%;
`;

const Wrapper = styled.div`
  @keyframes sweep {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  animation: sweep 0.125s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  line-height: 1.3rem;
  padding: 8px 0;
  cursor: pointer;
`;

const Content = styled.div`
  animation: sweep 200ms ease-out forwards;
  padding-bottom: 16px;
`;

const Indicator = styled.span`
  width: 28px;
  justify-content: center;
  height: 28px;
  align-items: center;
  display: flex;
  border-radius: 100px;
  opacity: 1;
  cursor: pointer;
  transition: opacity 0.125s ease-in-out;
  margin: 0;
  padding: 0;

  &:hover {
    opacity: 0.5;
  }
`;

const ExpandablePanel: FC<{
  title: ReactNode;
  isExpanded?: boolean;
}> = ({ title, children, isExpanded: isExpandedExternal = false }) => {
  const [isExpandedLocal, toggleIsExpanded] = useState(isExpandedExternal);

  useEffect(() => {
    toggleIsExpanded(isExpandedExternal);
  }, [isExpandedExternal]);

  return (
    <Wrapper>
      <Header onClick={() => toggleIsExpanded(!isExpandedLocal)}>
        <Title>{title}</Title>
        <Indicator onClick={() => toggleIsExpanded(!isExpandedLocal)}>
          {isExpandedLocal ? '–' : '+'}
        </Indicator>
      </Header>
      {isExpandedLocal && (
        <Content>
          {typeof children === 'string' ? (
            <SmallParagraph>{children}</SmallParagraph>
          ) : (
            children
          )}
        </Content>
      )}
    </Wrapper>
  );
};

export default ExpandablePanel;
